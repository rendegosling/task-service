package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/rendegosling/task_service/pkg/common/db"
	"github.com/rendegosling/task_service/pkg/tasks"
	"github.com/spf13/viper"
)

func main() {
    viper.SetConfigFile("./pkg/common/envs/.env")
    viper.ReadInConfig()

    port := viper.Get("PORT").(string)
    dbUrl := viper.Get("DB_URL").(string)

    r := gin.Default()
    r.Use(cors.Default())
    h := db.Init(dbUrl)

    tasks.RegisterRoutes(r, h)
    // register more routes here

    r.Run(port)
}