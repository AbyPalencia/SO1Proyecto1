package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os/exec"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/go-sql-driver/mysql"
)

type lRam struct {
	Total  string `json:"total"`
	Free   string `json:"free"`
	Porcentaje string `json:"porcentaje"`
	Used   string `json:"used"`
}

func DbConnection() (conexion *sql.DB) {
	conexion, err := sql.Open("mysql", "root:palencia1.@tcp(34.41.222.47:3306)/dbsopes1")

	if err != nil {
		panic(err.Error())
	}

	return conexion
}

func leerRam() {
	ramcmd := exec.Command("sh", "-c", "cat /proc/ram_201700837")
	out, err := ramcmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}

	outram := string(out[:])

	//convertir string json a struct
	ramdata := lRam{}
	json.Unmarshal([]byte(outram), &ramdata)

	//insert ram
	lconnection := DbConnection()
	insert, err := lconnection.Prepare("insert into ramdata (total, free, porcentaje, used) values (?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	insert.Exec(ramdata.Total, ramdata.Free, ramdata.Porcentaje, ramdata.Used)

	fmt.Println("datos ram insertados")
}

func leerCpu() {
	cpucmd := exec.Command("sh", "-c", "cat /proc/cpu_201700837")
	out, err := cpucmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}

	outcpu := string(out[:])

	//insert cpu
	lconnection := DbConnection()
	insert, err := lconnection.Prepare("insert into cpudata (ldata) values (?)")
	if err != nil {
		panic(err.Error())
	}
	insert.Exec(outcpu)
	fmt.Println("datos cpu ingresados")
}

	func lCpuUsage() {
		cpucmd := exec.Command("sh", "-c", "mpstat -o JSON")
		out, err := cpucmd.CombinedOutput()
		if err != nil {
			fmt.Println(err)
		}

		outusage := string(out[:])

		//insert ram
		lconnection := DbConnection()
		insert, err := lconnection.Prepare("insert into cpuusage (ldata) values (?)")
		if err != nil {
			panic(err.Error())
		}
		insert.Exec(outusage)

		fmt.Println("datos cpu usage insertados")
}


func main() {

	app := fiber.New()

	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON("Server corriendo :D")
	})

	app.Get("/make", func(c *fiber.Ctx) error {
		leerRam()
		leerCpu()
		lCpuUsage()

		return c.JSON("true")
	})

	log.Fatal(app.Listen(":2000"))

}