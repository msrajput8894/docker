const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user"); // Ensure you have your user model
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const mongoURI =
  "mongodb://admin:password@localhost:27017/user-account?authSource=admin";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Initialization logic to create default user
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultUser = new User({
        name: "Mahendra Rajput",
        interests: "Coding",
        role: "Cloud Engineer",
      });
      await defaultUser.save();
      console.log("Default user created:", defaultUser);
    } else {
      console.log("Default user already exists.");
    }
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes to get and update user profile
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/user", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({}, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
