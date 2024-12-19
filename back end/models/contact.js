const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
});

module.exports = mongoose.model("Contact", ContactSchema);
