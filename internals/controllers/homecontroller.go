package controllers

import (
	"html/template"
	"net/http"
)

func Home(w http.ResponseWriter, r *http.Request) {
	path := "./public/index.html"

	tmpl := template.Must(template.ParseFiles(path))
	tmpl.Execute(w, nil)
}

func ContestPage(w http.ResponseWriter, r *http.Request) {
	path := "./public/contest.html"

	tmpl := template.Must(template.ParseFiles(path))
	tmpl.Execute(w, nil)
}

func ThanksPage(w http.ResponseWriter, r *http.Request) {
	path := "./public/thanks.html"

	tmpl := template.Must(template.ParseFiles(path))
	tmpl.Execute(w, nil)
}
