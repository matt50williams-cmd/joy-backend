// Joy/backend/src/server.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const storiesRouter = require("./routes/stories");
const aiRouter = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "joy-backend" });
});

// Routes
app.use("/stories", storiesRouter);
app.use("/ai", aiRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);
  res.status(500).json({ error: "Something went wrong. Please try again." });
});

app.listen(PORT, () => {
  console.log(`Joy backend running on port ${PORT}`);
});
