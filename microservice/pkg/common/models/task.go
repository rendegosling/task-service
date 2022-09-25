package models

import (
	"gorm.io/gorm"
)

type Task struct {
    gorm.Model  // adds ID, created_at etc.
    Name        string `json:"name"`
    Description string `json:"description"`
    DueDate     string `json:"due_date"`
    Status      string `json:"status"`
}