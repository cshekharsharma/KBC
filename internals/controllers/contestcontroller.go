package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/cshekharsharma/KBC/internals/models/apiresponse"
	"github.com/cshekharsharma/KBC/internals/services"
)

func StartContest(w http.ResponseWriter, r *http.Request) {

	error := r.ParseForm()
	if error != nil {
		fmt.Println(error)
	}

	fullName := r.Form.Get("fullName")
	categoryId, _ := strconv.Atoi(r.Form.Get("categoryId"))

	userId := (&services.UserService{}).CreateUser(fullName)
	contestId := (&services.ContestService{}).StartContest(userId, categoryId)

	type data struct {
		ContestId int `json:"contestId"`
	}

	d := data{ContestId: contestId}
	response := new(apiresponse.Response)

	fmt.Fprintf(w, "%s", response.Create("success", 200, d, "OK"))
}

func DeliverNextQuestion(w http.ResponseWriter, r *http.Request) {
	error := r.ParseForm()
	if error != nil {
		// throw some error
	}

	contestId, _ := strconv.Atoi(r.Form.Get("contestId"))
	answerObj := r.Form.Get("answerObject")

	resp := (&services.ContestService{}).DeliverNextQuestion(contestId, answerObj)

	response := new(apiresponse.Response)

	fmt.Fprintf(w, "%s", response.Create("success", 200, resp, "OK"))

}
