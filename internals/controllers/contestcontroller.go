package controllers

import (
	"fmt"
	"github.com/cshekharsharma/KBC/internals/models/apiresponse"
	"github.com/cshekharsharma/KBC/internals/services"
	"net/http"
	"strconv"
)

func StartContest(w http.ResponseWriter, r *http.Request) {

	error := r.ParseForm()
	if error != nil {
		fmt.Println(error)
	}

	userId, _ := strconv.Atoi(r.Form.Get("userId"))
	categoryId, _ := strconv.Atoi(r.Form.Get("categoryId"))

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

	resp := (&services.ContestService{}).DeliveryNextQuestion(contestId, answerObj)

	response := new(apiresponse.Response)

	fmt.Fprintf(w, "%s", response.Create("success", 200, resp, "OK"))

}
