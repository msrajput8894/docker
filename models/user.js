const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, default: "Mahendra Rajput" },
  interests: { type: String, default: "Coding" },
  role: { type: String, default: "Cloud Engineer" },
});

module.exports = mongoose.model("User", UserSchema);
