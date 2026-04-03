// Joy/backend/src/routes/stories.js

const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const STORIES_DIR = __dirname;

// GET /stories — return the story index
router.get("/", (req, res) => {
  try {
    const indexPath = path.join(STORIES_DIR, "story-index.json");
    if (!fs.existsSync(indexPath)) {
      return res.status(404).json({ error: "Story index not found." });
    }
    const data = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
    res.json(data);
  } catch (err) {
    console.error("[stories] index error:", err.message);
    res.status(500).json({ error: "Could not load stories." });
  }
});

// GET /stories/:id?level=level-1 — return a full story
router.get("/:id", (req, res) => {
  const baseId = req.params.id;
  const level = req.query.level || "level-1";

  // Sanitize: only allow safe characters in file paths
  const safeBase = baseId.replace(/[^a-z0-9\-]/g, "");
  const safeLevel = level.replace(/[^a-z0-9\-]/g, "");

  const leveledFile = path.join(STORIES_DIR, `${safeBase}-${safeLevel}.json`);
  const fallbackFile = path.join(STORIES_DIR, `${safeBase}-level-1.json`);
  const directFile = path.join(STORIES_DIR, `${safeBase}.json`);

  let filePath = null;

  if (fs.existsSync(leveledFile)) {
    filePath = leveledFile;
  } else if (fs.existsSync(fallbackFile)) {
    filePath = fallbackFile;
  } else if (fs.existsSync(directFile)) {
    filePath = directFile;
  }

  if (!filePath) {
    return res.status(404).json({ error: `Story '${safeBase}' not found.` });
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.json(data);
  } catch (err) {
    console.error("[stories] load error:", err.message);
    res.status(500).json({ error: "Could not load story." });
  }
});

module.exports = router;
