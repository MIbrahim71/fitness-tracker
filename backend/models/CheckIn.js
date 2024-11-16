const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // Store as "YYYY-MM-DD" for easy querying
      required: true,
    },
    checkedIn: {
      type: Boolean,
      default: true, // Since a record is created only when a user checks in
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CheckIn", checkInSchema);
