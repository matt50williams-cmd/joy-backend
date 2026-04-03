// Joy/backend/src/services/guardrails.js

// MARK: - Off-Topic Detection

const OFF_TOPIC_SIGNALS = [
  "fortnite", "minecraft", "roblox", "youtube", "tiktok", "instagram",
  "school", "homework", "teacher", "mom", "dad", "friend", "dog", "cat",
  "football", "basketball", "soccer", "video game", "movie", "netflix",
  "hate", "kill", "fight", "weapon", "gun", "bomb",
];

function isOffTopic(text) {
  if (!text || typeof text !== "string") return false;
  const lower = text.toLowerCase();
  return OFF_TOPIC_SIGNALS.some((signal) => lower.includes(signal));
}

// MARK: - Disputed Theology Detection

const THEOLOGY_SIGNALS = [
  "denomination", "catholic", "protestant", "baptist", "evangelical",
  "hell", "purgatory", "heaven", "salvation", "rapture", "end times",
  "baptism", "born again", "speak in tongues", "evolution",
  "is the bible true", "is god real", "does god exist",
  "which church", "which religion", "other religion", "islam", "buddhism",
  "hindu", "atheist", "pastor said", "my church",
];

function hasDisputedTheology(text) {
  if (!text || typeof text !== "string") return false;
  const lower = text.toLowerCase();
  return THEOLOGY_SIGNALS.some((signal) => lower.includes(signal));
}

// MARK: - Fallback Responses

const OFF_TOPIC_RESPONSES = [
  "Ha, great question — but let's stay in our story for now! We've got more adventure ahead! 📖",
  "Ooh, curious mind! Save that one for later — right now our story needs us! Let's go!",
  "Love that you're thinking big! Let's finish this story first and then talk to a grown-up about that one.",
  "That's outside my world for today! I only know this story — let's get back to it!",
];

const THEOLOGY_RESPONSES = [
  "That's a big question! The best person to talk to about that is a parent, pastor, or someone you trust. For now, let's stay in our story!",
  "I love that you're thinking about deep things! That one's for a grown-up — I'm just here for the story today. Let's keep reading!",
  "Great question, but that's bigger than what I know! Ask someone you trust at home or church. Ready to keep going?",
];

function offTopicFallback() {
  return OFF_TOPIC_RESPONSES[Math.floor(Math.random() * OFF_TOPIC_RESPONSES.length)];
}

function theologyFallback() {
  return THEOLOGY_RESPONSES[Math.floor(Math.random() * THEOLOGY_RESPONSES.length)];
}

module.exports = {
  isOffTopic,
  hasDisputedTheology,
  offTopicFallback,
  theologyFallback,
};
