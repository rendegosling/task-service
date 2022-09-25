package tasks

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rendegosling/task_service/pkg/common/models"
)

func (h handler) GetTask(c *gin.Context) {
    id := c.Param("id")

    var Task models.Task

    if result := h.DB.First(&Task, id); result.Error != nil {
        c.AbortWithError(http.StatusNotFound, result.Error)
        return
    }

    c.JSON(http.StatusOK, &Task)
}
