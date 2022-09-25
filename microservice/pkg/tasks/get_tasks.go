package tasks

import (
	"fmt"
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

    for i := 0; i < len(tasks); i++ {
        // fmt.Println(tasks[i].Name)
        // tasks[i].Status = "Not Expired"
        // fmt.Println("time:", dateValue.In(time.Local).Format("January 02, 2006 (MST)"), "-- specify Local time zone")
        fmt.Println(tasks[i].DueDate)
    }

    c.JSON(http.StatusOK, &tasks)
}