const mysql = require("mysql2");
const database = require("./settings");

const db = mysql.createPool(database);

module.exports = db;