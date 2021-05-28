package models

type User struct {
	Id          int    `gorm:"column:id"`
	FirstName   string `gorm:"column:firstName"`
	LastName    string `gorm:"column:lastName"`
	EmailId     string `gorm:"column:emailId"`
	Password    string `gorm:"column:password"`
	PhoneNumber string `gorm:"column:phoneNumber"`
	Gender      string `gorm:"column:gender`
	CreatedAt   string `gorm:"column:createdAt"`
	UpdatedAt   string `gorm:"column:updatedAt"`
	IsDeleted   int    `gorm:"column:isDeleted"`
}
