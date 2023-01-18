const express = require("express");
require("dotenv").config();
require("colors");
const cors = require("cors");
const fs = require("fs");
const https = require("https");

const connectDB = require("./dbinit");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

connectDB();

const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("workout API");
});

app.use("/workouts", workoutRoutes);
app.use("/user", userRoutes);

// https
//   .createServer(
//     {
//       key: fs.readFileSync("server.key"),
//       cert: fs.readFileSync("server.cert"),
//     },
//     app
//   )
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
