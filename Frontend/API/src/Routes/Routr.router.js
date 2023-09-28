const { getRamdata } = require("../Controller/Ram.controller");
const { getProcessF, getCpuUsage } = require("../Controller/Cpu.controller");
const { Router } = require("express");
const gRouter = Router();

gRouter.get("/ramdata", getRamdata);
gRouter.get("/procsdata", getProcessF);
gRouter.get("/cpudata", getCpuUsage);

module.exports = gRouter;