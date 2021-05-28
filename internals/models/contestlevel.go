package models

type ContestLevel struct {
	Id                   int    `gorm:"column:id;primaryKey"`
	ContestLevel         int    `gorm:"column:contestLevel"`
	LevelName            string `gorm:"column:levelName"`
	CorrectAnswerMoney   int    `gorm:"column:correctAnswerMoney"`
	IncorrectAnswerMoney int    `gorm:"column:incorrectAnswerMoney"`
	WalkAwayMoney        int    `gorm:"column:walkAwayMoney"`
	IsMilestone          int    `gorm:"column:isMilestone"`
	CreatedAt            string `gorm:"column:createdAt"`
	UpdatedAt            string `gorm:"column:updatedAt"`
	IsDeleted            int    `gorm:"column:isDeleted"`
}
