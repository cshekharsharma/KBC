package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/cshekharsharma/KBC/internals/controllers"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	// Routes consist of a path and a handler function.

	staticDir := "/public/"

	// Create the route
	r.
		PathPrefix(staticDir).
		Handler(http.StripPrefix(staticDir, http.FileServer(http.Dir("."+staticDir))))

	r.HandleFunc("/", controllers.Home)
	r.HandleFunc("/contest", controllers.ContestPage)
	r.HandleFunc("/thanks", controllers.ThanksPage)
	r.HandleFunc("/contest/start", controllers.StartContest)
	r.HandleFunc("/contest/switchQuestion", controllers.SwitchQuestion)
	r.HandleFunc("/contest/deliverNextQuestion", controllers.DeliverNextQuestion)

	// Bind to a port and pass our router in
	fmt.Println("Server started successfully at http://localhost:80")
	log.Fatal(http.ListenAndServe(":80", r))
}
