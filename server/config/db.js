// config/db.js
const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db);  // No options needed in Mongoose v6+
        console.log("MongoDB is connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
