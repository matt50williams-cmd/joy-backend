// Joy/backend/src/middleware/validate.js

/**
 * Middleware factory that checks required fields exist and are non-empty strings or arrays.
 * Returns 400 with a clear error if validation fails.
 */
function validate(requiredFields) {
  return (req, res, next) => {
    const missing = [];

    for (const field of requiredFields) {
      const value = req.body[field];
      if (value === undefined || value === null) {
        missing.push(field);
        continue;
      }
      if (typeof value === "string" && value.trim().length === 0) {
        missing.push(field);
        continue;
      }
      if (Array.isArray(value) && value.length === 0) {
        // Arrays are allowed to be empty (sentencesReadSoFar at start of story)
        continue;
      }
    }

    if (missing.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    // Length guard — prevent enormous payloads from reaching OpenAI
    const question = req.body.question || req.body.word || "";
    if (typeof question === "string" && question.length > 500) {
      return res.status(400).json({ error: "Input too long." });
    }

    next();
  };
}

module.exports = { validate };
