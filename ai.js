// Joy/backend/src/routes/ai.js

const express = require("express");
const router = express.Router();

const openaiService = require("./openaiService");
const promptBuilder = require("../services/promptBuilder");
const guardrails = require("../services/guardrails");
const validate = require("./validate");
// POST /ai/explain-word
router.post("/explain-word", validate(["word", "sentence", "storyId"]), async (req, res) => {
  const { word, sentence, storyId } = req.body;

  if (guardrails.isOffTopic(word) || guardrails.hasDisputedTheology(word)) {
    return res.json({ response: guardrails.offTopicFallback() });
  }

  const messages = promptBuilder.explainWord({ word, sentence, storyId });

  const response = await openaiService.complete(messages);
  res.json({ response });
});

// POST /ai/discuss-story
router.post("/discuss-story", validate(["storyId", "sentencesReadSoFar", "question"]), async (req, res) => {
  const { storyId, sentencesReadSoFar, question } = req.body;

  if (guardrails.hasDisputedTheology(question)) {
    return res.json({ response: guardrails.theologyFallback() });
  }

  if (guardrails.isOffTopic(question)) {
    return res.json({ response: guardrails.offTopicFallback() });
  }

  const messages = promptBuilder.discussStory({ storyId, sentencesReadSoFar, question });

  const response = await openaiService.complete(messages);
  res.json({ response });
});

// POST /ai/comprehension
router.post("/comprehension", validate(["storyId", "question", "answerGuidance", "childResponse", "questionType"]), async (req, res) => {
  const { storyId, question, answerGuidance, childResponse, questionType } = req.body;

  const messages = promptBuilder.comprehensionFeedback({
    storyId,
    question,
    answerGuidance,
    childResponse,
    questionType,
  });

  const response = await openaiService.complete(messages);
  res.json({ response });
});

module.exports = router;
