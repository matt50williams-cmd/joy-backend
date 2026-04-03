// Joy/backend/src/services/openaiService.js

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const FALLBACK_RESPONSE =
  "That's a great question! Try asking a parent or teacher for help with that one.";

/**
 * Sends a messages array to OpenAI and returns the text response.
 * Falls back gracefully on error.
 */
async function complete(messages, maxTokens = 120) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    const text = completion.choices?.[0]?.message?.content?.trim();

    if (!text || text.length < 2) {
      return FALLBACK_RESPONSE;
    }

    return text;
  } catch (err) {
    console.error("[openai] completion error:", err.message);
    return FALLBACK_RESPONSE;
  }
}

module.exports = { complete };
