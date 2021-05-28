package models

type Question struct {
	Id                int    `gorm:"column:id;primaryKey"`
	ContestLevel      int    `gorm:"column:contestLevel"`
	QuestionStatement string `gorm:"column:questionStatement"`
	OptionA           string `gorm:"column:optionA"`
	OptionB           string `gorm:"column:optionB"`
	OptionC           string `gorm:"column:optionC"`
	OptionD           string `gorm:"column:optionD"`
	CorrectOption     int    `gorm:"column:correctOption"`
	QuestionCategory  int    `gorm:"column:questionCategory"`
	QuestionMetadata  string `gorm:"column:questionMetadata"`
	CreatedAt         string `gorm:"column:createdAt"`
	UpdatedAt         string `gorm:"column:updatedAt"`
	IsDeleted         int    `gorm:"column:isDeleted"`
}
