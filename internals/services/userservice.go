package services

import (
	"github.com/cshekharsharma/KBC/internals/helpers"
	"github.com/cshekharsharma/KBC/internals/models"
	"github.com/gorilla/sessions"
	"net/http"
)

const (
	GOSESSIONKEY = "GOSESSIONKEY764"
)

var (
	// key must be 16, 24 or 32 bytes long (AES-128, AES-192 or AES-256)
	key   = []byte("super-secret-key")
	store = sessions.NewCookieStore(key)
)

type UserService struct{}

func (us *UserService) IsAuthenticated(r *http.Request) bool {
	session, _ := store.Get(r, GOSESSIONKEY)

	if auth, ok := session.Values["isAuthenticated"].(bool); !ok || !auth {
		return false
	}

	return true
}

func (us *UserService) Login(r *http.Request, w http.ResponseWriter, emailId string, password string) {
	session, _ := store.Get(r, GOSESSIONKEY)

	db := helpers.GetDbConnection()

	result := db.Table("users").
		Where(&models.User{EmailId: emailId, Password: password}).
		Limit(1).
		Find(&models.User{})

	if result.RowsAffected > 0 {
		// Set user as authenticated
		session.Values["authenticated"] = true
		session.Save(r, w)
	}
}
