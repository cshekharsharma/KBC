package controllers

import (
	"github.com/cshekharsharma/KBC/internals/services"
	"net/http"
)

func UserLogin(w http.ResponseWriter, r *http.Request) {

	error := r.ParseForm()
	if error != nil {
		// throw some error
	}

	emailId := r.Form.Get("emailId")
	password := r.Form.Get("password")

	(&services.UserService{}).Login(r, w, emailId, password)

}

func UserSignup() {

}

func UserLogout() {

}
