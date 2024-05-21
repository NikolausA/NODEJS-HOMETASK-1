const mongoose = require("mongoose");

const PatienRequestSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Field name is required"],
  },
  phone: {
    type: String,
    required: [true, "Field phone is required"],
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: [true, "Field date is required"],
  },
});

const PatienRequest = mongoose.model("PatienRequest", PatienRequestSchema);

module.exports = PatienRequest;
