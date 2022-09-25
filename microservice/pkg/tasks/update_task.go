package tasks

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rendegosling/task_service/pkg/common/models"
)

type UpdateTaskRequestBody struct {
    Name        string `json:"name"`
    Description string `json:"description"`
    DueDate     string `json:"due_date"`
}

func (h handler) UpdateTask(c *gin.Context) {
    id := c.Param("id")
    body := UpdateTaskRequestBody{}

    // getting request's body
    if err := c.BindJSON(&body); err != nil {
        c.AbortWithError(http.StatusBadRequest, err)
        return
    }

    var task models.Task

    if result := h.DB.First(&task, id); result.Error != nil {
        c.AbortWithError(http.StatusNotFound, result.Error)
        return
    }

    task.Name = body.Name
    task.Description = body.Description
	task.DueDate = body.DueDate

    h.DB.Save(&task)

    c.JSON(http.StatusOK, &task)
}