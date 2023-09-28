const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const lRoutr = require("./Routes/Routr.router");

class Server {
  constructor() {
    this.port = 5000;
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        origin: true,
        optionsSuccessStatus: 200,
      })
    );
  }

  routes() {
    this.app.use(express.json());
    this.app.get("/", (req, res) => {
      res.status(200).send({ message: `Server ok! port ${this.port}` });
    });
    this.app.use("/api", lRoutr);
  }

  serve() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;