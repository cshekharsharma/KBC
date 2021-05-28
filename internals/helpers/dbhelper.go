package helpers

import (
	"gopkg.in/ini.v1"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func GetDbConnection() *gorm.DB {
	config, err := ini.Load("./internals/config/database.ini")

	if err != nil {
		return nil
	}

	dsn := config.Section("main").Key("dsn").String()
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	handle, _ := db.DB()

	// Handling connection pooling
	handle.SetMaxIdleConns(10)
	handle.SetMaxOpenConns(100)
	handle.SetConnMaxLifetime(time.Hour)

	if err != nil {
		return nil
	}

	return db
}
