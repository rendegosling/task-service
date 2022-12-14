package tasks

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rendegosling/task_service/pkg/common/models"
)

func (h handler) GetTasks(c *gin.Context) {
    var tasks []models.Task

    if result := h.DB.Find(&tasks); result.Error != nil {
        c.AbortWithError(http.StatusNotFound, result.Error)
        return
    }

    c.JSON(http.StatusOK, &tasks)
}