package services

import (
	"strings"
	"time"

	"github.com/cshekharsharma/KBC/internals/helpers"
	"github.com/cshekharsharma/KBC/internals/models"
)

type UserService struct{}

func (us *UserService) CreateUser(fullName string) int {
	nameParts := strings.Split(fullName, " ")

	lastName := nameParts[len(nameParts)-1]
	firstName := strings.Join(nameParts[:len(nameParts)-1], " ")

	db := helpers.GetDbConnection()

	newUser := new(models.User)

	newUser.Id = 0
	newUser.FirstName = firstName
	newUser.LastName = lastName
	newUser.EmailId = "newuser@example.com"
	newUser.Password = "password"
	newUser.PhoneNumber = "9999999999"
	newUser.Gender = "NA"
	newUser.CreatedAt = time.Now().Format("2006-01-02 15:04:05")
	newUser.UpdatedAt = time.Now().Format("2006-01-02 15:04:05")
	newUser.IsDeleted = 0

	db.Table("users").Create(&newUser)

	handle, _ := db.DB()
	handle.Close()

	return newUser.Id
}
