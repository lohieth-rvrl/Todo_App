// routes/auth.js
const router = require("express").Router();
const User = require("../models/User");

router.post("/google", async (req, res) => {
  const { sub: googleId, name, email, picture } = req.body;

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({ googleId, name, email, picture });
      console.log("New user created");
    } else {
      console.log("Existing user logged in");
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
