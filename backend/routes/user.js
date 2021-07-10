const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json("This username already exists");
    }

    const newUser = new User({
      userName,
      password,
      uid: uuid(),
    });

    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

router.post("/auth", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json("There is no user found with this username");
    }

    if (password !== user.password) {
      return res.status(400).json("Password is wrong");
    }

    res.json({ uid: user.uid });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
