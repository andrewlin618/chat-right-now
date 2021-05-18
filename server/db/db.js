const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.DATABASE_URL || `postgres://postgres:${process.env.PASS}@localhost:5432/messenger`, {
  logging: false
});

module.exports = db;
