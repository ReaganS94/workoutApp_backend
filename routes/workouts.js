const express = require("express");

const app = express.Router();

const {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workout");

const requireAuth = require("../middleware/requireAuth");

// this middleware will run for all the routes underneath it
app.use(requireAuth);

app.route("/").get(getAllWorkouts).post(createWorkout);
app.route("/:id").get(getOneWorkout).put(updateWorkout).delete(deleteWorkout);

module.exports = app;
