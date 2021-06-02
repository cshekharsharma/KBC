package services

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/cshekharsharma/KBC/internals/constants"
	"github.com/cshekharsharma/KBC/internals/helpers"
	"github.com/cshekharsharma/KBC/internals/models"
	"github.com/cshekharsharma/KBC/internals/models/components"
)

type ContestService struct{}

func (cs *ContestService) StartContest(userId int, categoryId int) int {
	db := helpers.GetDbConnection()
	currTime := time.Now()

	newContest := new(models.Contest)

	newContest.Id = 0
	newContest.Name = "KBC Contest"
	newContest.UserId = userId
	newContest.CategoryId = categoryId
	newContest.FinalPrizeMoney = 0
	newContest.FinalContestLevel = 0
	newContest.FinalQuestionStatus = constants.QUESTION_STATUS_WALKAWAY
	newContest.Status = "not_started"
	newContest.CreatedAt = currTime.Format("2006-01-02 15:04:05")
	newContest.UpdatedAt = currTime.Format("2006-01-02 15:04:05")
	newContest.IsDeleted = 0

	db.Create(&newContest)

	handle, _ := db.DB()
	handle.Close()

	return newContest.Id
}

func (cs *ContestService) DeliverNextQuestion(contestId int, answerJson string) interface{} {
	db := helpers.GetDbConnection()

	contest := new(models.Contest)
	db.Table("contests").Where("id = ?", contestId).Find(&contest)

	if contest.Status == constants.CONTEST_STATUS_COMPLETED {
		return nil
	}

	type apiRes struct {
		ContestEnded  bool
		PrevCorrect   bool
		NextQuestion  interface{}
		Contest       interface{}
		CurrQuesWorth int
	}

	apiResObj := new(apiRes)

	levelInfo := getAllContestLevels()

	// if contest hasnt already started
	if contest.Status == constants.CONTEST_STATUS_NOT_STARTED {
		contest.Status = constants.CONTEST_STATUS_IN_PROGRESS
		db.Exec("UPDATE contests SET status=? WHERE id=?", contest.Status, contest.Id)

		level := constants.CONTEST_LEVEL_MIN
		question := fetchNextQuestionToDeliver(level, contest.CategoryId)

		createContestQuestionMapping(question.Id, contestId, level)

		levelRTemp := levelInfo[level]
		levelRow := levelRTemp.(models.ContestLevel)

		apiResObj.ContestEnded = false
		apiResObj.PrevCorrect = false
		apiResObj.NextQuestion = question
		apiResObj.Contest = contest
		apiResObj.CurrQuesWorth = levelRow.CorrectAnswerMoney

		handle, _ := db.DB()
		handle.Close()

		return apiResObj
	} else {
		answerObject := new(components.AnswerObject)
		json.Unmarshal([]byte(answerJson), &answerObject)

		if !isValidAnswerObject(answerObject) {
			fmt.Println("Invalid answer object received, exiting")
			return nil
		}

		mapping := new(models.ContestQuestionMapping)
		db.Raw("SELECT * FROM contest_question_mapping WHERE contestId=? "+
			"AND questionId=? AND isDeleted=0 ORDER BY id DESC LIMIT 1",
			contest.Id, answerObject.QuestionId).Scan(&mapping)

		concluded, prevCorrect := concludeIfContestEnded(contest, answerObject, mapping)

		latestContest := new(models.Contest)
		db.Table("contests").Where("id = ?", contestId).Find(&latestContest)

		if !concluded {
			question := fetchNextQuestionToDeliver(mapping.ContestLevelId+1, contest.CategoryId)

			createContestQuestionMapping(question.Id, contestId, question.ContestLevel)

			levelRTemp := levelInfo[question.ContestLevel]
			levelRow := levelRTemp.(models.ContestLevel)

			apiResObj.ContestEnded = false
			apiResObj.PrevCorrect = prevCorrect
			apiResObj.NextQuestion = question
			apiResObj.Contest = latestContest
			apiResObj.CurrQuesWorth = levelRow.CorrectAnswerMoney
		} else {
			apiResObj.ContestEnded = true
			apiResObj.PrevCorrect = prevCorrect
			apiResObj.NextQuestion = nil
			apiResObj.Contest = latestContest
			apiResObj.CurrQuesWorth = 0
		}

		handle, _ := db.DB()
		handle.Close()

		return apiResObj

	}
}

func (cs *ContestService) SwitchQuestion(contestId int, questionId int, quesLevel int) interface{} {
	db := helpers.GetDbConnection()

	newQuestion := new(models.Question)

	db.Raw("SELECT * FROM questions WHERE contestLevel=? AND id != ? AND isDeleted=0",
		quesLevel, questionId).Find(&newQuestion)

	// updating existing mapping
	db.Exec("UPDATE contest_question_mapping SET questionId=? "+
		"WHERE questionId=? AND contestId=? AND isDeleted=0", newQuestion.Id, questionId, contestId)

	handle, _ := db.DB()
	handle.Close()

	type apiRes struct {
		Question interface{}
		Level    int
	}

	apiResObj := new(apiRes)

	apiResObj.Level = newQuestion.ContestLevel
	apiResObj.Question = newQuestion

	return apiResObj
}

func concludeIfContestEnded(contest *models.Contest, answerObject *components.AnswerObject, mapping *models.ContestQuestionMapping) (bool, bool) {
	db := helpers.GetDbConnection()

	question := new(models.Question)
	db.Table("questions").Where("id = ?", mapping.QuestionId).Find(&question)

	levelInfo := getAllContestLevels()

	levelRTemp := levelInfo[mapping.ContestLevelId]
	levelRow := levelRTemp.(models.ContestLevel)

	if answerObject.IsWalkAway {
		db.Exec("UPDATE contest_question_mapping SET isSubmitted=1, isCorrect=0, isWalkAway=1 "+
			"WHERE id=? AND isDeleted=0", mapping.Id)

		finalPrizeMoney := levelRow.WalkAwayMoney
		db.Exec("UPDATE contests SET status=?, finalPrizeMoney=?, "+
			"finalContestLevel=?, finalQuestionStatus=? WHERE id=?",
			constants.CONTEST_STATUS_COMPLETED, finalPrizeMoney,
			mapping.ContestLevelId, constants.QUESTION_STATUS_WALKAWAY,
			contest.Id)

		handle, _ := db.DB()
		handle.Close()

		return true, false
	}

	if question.CorrectOption != answerObject.AnswerKey {
		db.Exec("UPDATE contest_question_mapping SET isSubmitted=1, isCorrect=0, isWalkAway=0 "+
			"WHERE id=? AND isDeleted=0", mapping.Id)

		finalPrizeMoney := levelRow.IncorrectAnswerMoney
		db.Exec("UPDATE contests SET status=?, finalPrizeMoney=?, "+
			"finalContestLevel=?, finalQuestionStatus=? WHERE id=?",
			constants.CONTEST_STATUS_COMPLETED, finalPrizeMoney,
			mapping.ContestLevelId, constants.QUESTION_STATUS_INCORRECT,
			contest.Id)

		handle, _ := db.DB()
		handle.Close()

		return true, false
	}

	if question.CorrectOption == answerObject.AnswerKey {

		db.Exec("UPDATE contest_question_mapping SET isSubmitted=1, isCorrect=1, isWalkAway=0 "+
			"WHERE id=? AND isDeleted=0", mapping.Id)

		if question.ContestLevel == mapping.ContestLevelId &&
			mapping.ContestLevelId == constants.CONTEST_LEVEL_MAX {

			finalPrizeMoney := levelRow.CorrectAnswerMoney
			db.Exec("UPDATE contests SET status=?, finalPrizeMoney=?, "+
				"finalContestLevel=?, finalQuestionStatus=? WHERE id=?",
				constants.CONTEST_STATUS_COMPLETED, finalPrizeMoney,
				mapping.ContestLevelId, constants.QUESTION_STATUS_CORRECT,
				contest.Id)

			handle, _ := db.DB()
			handle.Close()

			return true, true
		}

		handle, _ := db.DB()
		handle.Close()

		return false, true
	}

	return false, false
}

func fetchNextQuestionToDeliver(level int, categoryId int) *models.Question {
	db := helpers.GetDbConnection()

	question := new(models.Question)

	var categoryClause string = ""

	if categoryId > 1 {
		categoryClause = fmt.Sprintf(" AND questionCategory = %d ", categoryId)
	}

	sqlQuery := fmt.Sprintf("SELECT * FROM questions WHERE isDeleted=0 AND contestLevel = %d "+
		"%s ORDER BY RAND() LIMIT 1", level, categoryClause)

	db.Raw(sqlQuery).Scan(&question)

	handle, _ := db.DB()
	handle.Close()

	return question
}

func createContestQuestionMapping(qId int, contestId int, level int) bool {
	db := helpers.GetDbConnection()

	db.Exec("INSERT INTO contest_question_mapping SET contestId=?, contestLevelId=?, questionId=?,"+
		"isSubmitted=0, createdAt=NOW(), updatedAt=NOW(), isDeleted=0",
		contestId, level, qId)

	handle, _ := db.DB()
	handle.Close()

	return true

}

//func updatePrevContestQuestionMapping(mappingId, )

func getAllContestLevels() map[int]interface{} {
	db := helpers.GetDbConnection()

	var levelInfo []models.ContestLevel
	db.Table("contest_levels").Where("isDeleted=0").Find(&levelInfo)

	finalResult := make(map[int]interface{})

	for i := 0; i < len(levelInfo); i++ {
		levelId := levelInfo[i].ContestLevel
		finalResult[levelId] = levelInfo[i]
	}

	handle, _ := db.DB()
	handle.Close()

	return finalResult
}

func isValidAnswerObject(answerObject *components.AnswerObject) bool {

	if answerObject.QuestionId < 1 {
		return false
	}

	if answerObject.AnswerKey < 1 {
		return false
	}

	return true
}
