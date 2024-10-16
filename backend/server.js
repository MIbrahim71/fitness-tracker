const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const dbURI =
  "mongodb+srv://mibrahim:AP73EXmhoVwtCR4J@fitness-app-cluster.f2w1o.mongodb.net/?retryWrites=true&w=majority&appName=Fitness-app-cluster";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.error("MongoDB connection error", error));

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Simple route to check if server is running
app.get("/", (req, res) => res.send("Backend server is running!"));

const workoutRoutes = require("./routes/workouts");
app.use("/api/workouts", workoutRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
