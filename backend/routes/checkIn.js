const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

router.post("/checkin", authMiddleware, async (req, res) => {
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

router.get("/checkin/summary", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const today = new Date();
    const last7days = user.checkIns.filter((date) => {
      const difference = today - new Date(date);
      return difference <= 7 * 24 * 60 * 60 * 1000; // 7 days in ms
    });

    const last30days = user.checkIns.filter((date) => {
      const difference = today - new Date(date);
      return difference <= 30 * 24 * 60 * 60 * 1000;

      res.json({ last7days, last30days });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
