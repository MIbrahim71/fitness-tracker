const express = require("express");
const authMiddleware = require("../middleware/auth");
const CheckIn = require("../models/CheckIn");
const User = require("../models/User");
const router = express.Router();

router.post("/checkin", authMiddleware, async (req, res) => {
  const { date, userId } = req.body;

  try {
    // Check for existing check-in
    const existingCheckIn = await CheckIn.findOne({ userId, date });

    if (existingCheckIn) {
      // Toggle checkedIn status
      existingCheckIn.checkedIn = !existingCheckIn.checkedIn;
      await existingCheckIn.save();
      return res.json(existingCheckIn);
    }

    // If no check-in exists, create a new one with `checkedIn: true`
    const newCheckIn = new CheckIn({ userId, date, checkedIn: true });
    await newCheckIn.save();
    return res.json(newCheckIn);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const today = new Date().toISOString().split("T")[0];

    // If user hasn't checked in already today
    if (!user.checkIns.includes(today)) {
      user.checkIns.push(today);
      await user.save();
    }

    res.status(200).json({ message: "Check-in successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// In checkInRoutes.js
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    const past5days = new Date(today);
    past5days.setDate(today.getDate() - 4); // 5-day range

    const recentCheckIns = await CheckIn.find({
      userId,
      date: { $gte: past5days.toISOString().split("T")[0] },
    });

    res.json(recentCheckIns);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving check-in data" });
  }
});

module.exports = router;
