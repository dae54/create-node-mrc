const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./src/resources/routes");
const seeder = require("./src/utils/seeder");

const app = express();

app.use(cors());

// Middleware Configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (app.get("env") === "production") {
  // app.use(logger('combined'));
  // Enable packages or services to be run only in production
} else {
  // Morgan Configuration
  const logger = require("morgan");
  app.use(logger("dev"));
}

routes(app);
// init seeder
seeder.init();

// general app middelare for handle errors
app.use((err, req, res, next) => {
  if (err) return res.status(err.code ? err.code : 500).json(err);
});

module.exports = app;
