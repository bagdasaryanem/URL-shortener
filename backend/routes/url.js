const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const { v4: uuid } = require("uuid");

const Url = require("../models/Url");
const User = require("../models/User");
const View = require("../models/View");

router.post("/shorten", async (req, res) => {
  try {
    const { longUrl, userId, urlName } = req.body;

    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(401);
    }

    if (!validUrl.isUri(longUrl) || !urlName) {
      return res.status(400).json("Please pass valid URL");
    }

    if (!urlName) {
      return res.status(400).json("Please pass URL name");
    }

    const urlCode = uuid();

    const newUrl = new Url({
      urlCode,
      longUrl,
      userId,
      urlName,
    });

    await newUrl.save();

    res.json({
      urlName,
      urlCode,
      longUrl,
      uniqueViews: 0,
      views: 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

router.delete("/deleteUrl", async (req, res) => {
  try {
    const { urlCode, userId } = req.body;

    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(401);
    }

    const url = await Url.findOne({ urlCode });
    if (!url) {
      return res.status(400).json("Url does not exist");
    }

    await Url.deleteOne({ urlCode });
    await View.deleteMany({ urlCode });

    res.json({ urlCode });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

router.get("/userUrls/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ uid: userId });

    if (!user) {
      return res.status(401);
    }

    const urls = await Url.find({ userId });
    const userUrls = [];

    await Promise.all(
      urls.map(async ({ urlCode, longUrl, urlName }) => {
        const views = await View.find({ urlCode: urlCode });
        const uniqueViews = [];

        views.forEach(({ userId }) => {
          if (!uniqueViews.includes(userId)) {
            uniqueViews.push(userId);
          }
        });

        userUrls.push({
          urlName,
          urlCode,
          longUrl,
          uniqueViews: uniqueViews.length,
          views: views.length,
        });
      })
    );

    res.json(userUrls);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
