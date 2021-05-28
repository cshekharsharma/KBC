package models

type Contest struct {
	Id                  int    `gorm:"column:id;primaryKey"`
	Name                string `gorm:"column:name"`
	UserId              int    `gorm:"column:userId"`
	CategoryId          int    `gorm:"column:categoryId"`
	FinalPrizeMoney     int    `gorm:"column:finalPrizeMoney"`
	FinalContestLevel   int    `gorm:"column:finalContestLevel"`
	FinalQuestionStatus string `gorm:"column:finalQuestionStatus"`
	Status              string `gorm:"column:status"`
	CreatedAt           string `gorm:"column:createdAt"`
	UpdatedAt           string `gorm:"column:updatedAt"`
	IsDeleted           int    `gorm:"column:isDeleted"`
}
