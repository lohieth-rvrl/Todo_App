const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = generateToken;


// === routes/auth.js === (incomplete example - customize as per your flow)
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

router.post("/google", async (req, res) => {
    const { email, name } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({ email, name });
    }
    const token = generateToken(user);
    res.json({ token });
});

module.exports = router;