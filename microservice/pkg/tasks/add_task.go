package tasks

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rendegosling/task_service/pkg/common/models"
)

type AddTaskRequestBody struct {
    Name       string `json:"name"`
    Description string `json:"description"`
    DueDate     string `json:"due_date"`
}

func (h handler) AddTask(c *gin.Context) {
    body := AddTaskRequestBody{}

    // getting request's body
    if err := c.BindJSON(&body); err != nil {
        c.AbortWithError(http.StatusBadRequest, err)
        return
    }

    var task models.Task

    task.Name = body.Name
    task.Description = body.Description
	task.DueDate = body.DueDate


    if result := h.DB.Create(&task); result.Error != nil {
        c.AbortWithError(http.StatusNotFound, result.Error)
        return
    }

    c.JSON(http.StatusCreated, &task)
}