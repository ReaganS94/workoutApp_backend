const Workout = require("../schemas/Workout");
const mongoose = require("mongoose");

const getAllWorkouts = async (req, res) => {
  try {
    // for the currently logged in user
    const user_id = req.user._id;
    const workouts = await Workout.find({ user_id });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getOneWorkout = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all fields", emptyFields });
  }
  try {
    //To create workouts for a specific user only
    const user_id = req.user._id;

    // we now add that id to the workout when created
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateWorkout = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
