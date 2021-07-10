const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

const Url = require("../models/Url");
const View = require("../models/View");
const User = require("../models/User");

router.get("/:code", (req, res) => {
  const { code } = req.params;
  res.send(`
    <script>
      const userId = localStorage.getItem("userId");
      const url = 'redirectToUrl/' + '${code}' + '/' + (userId || 'createAnonymsUser');
      window.location.replace(url);
    </script>
  `);
});

router.get("/redirectToUrl/:code/:userId", async (req, res) => {
  try {
    const { code: urlCode, userId } = req.params;
    const url = await Url.findOne({ urlCode });

    if (url) {
      let currentUserId;
      if (userId === "createAnonymsUser") {
        const newUser = User({
          uid: uuid(),
        });
        await newUser.save();
        currentUserId = newUser.uid;
      } else {
        currentUserId = userId;
      }

      const newView = new View({
        urlCode,
        userId: currentUserId,
      });

      await newView.save();
      return res.send(`
          <script>
            localStorage.setItem('userId', "${currentUserId}");
            window.location.replace("${url.longUrl}");
          </script>
       `);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
