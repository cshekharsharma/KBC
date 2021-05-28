package models

type ContestQuestionMapping struct {
	Id             int    `gorm:"column:id;primaryKey"`
	ContestId      string `gorm:"column:contestId"`
	QuestionId     int    `gorm:"column:questionId"`
	ContestLevelId int    `gorm:"column:contestLevelId"`
	IsSubmitted    int    `gorm:"column:isSubmitted"`
	IsCorrect      int    `gorm:"column:isCorrect"`
	IsWalkAway     int    `gorm:"column:isWalkAway"`
	CreatedAt      string `gorm:"column:createdAt"`
	UpdatedAt      string `gorm:"column:updatedAt"`
	IsDeleted      int    `gorm:"column:isDeleted"`
}
