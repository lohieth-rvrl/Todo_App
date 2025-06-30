const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: [process.env.CLIENT_URL, "http://localhost:5173"], // Allow both prod and local
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-user-id"],
};

// Apply CORS globally
app.use(cors(corsOptions));

// Explicit OPTIONS handling for specific routes
app.options("/api/auth/google", cors(corsOptions)); // Google OAuth
app.options("/api/todo", cors(corsOptions));       // TODO routes

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));