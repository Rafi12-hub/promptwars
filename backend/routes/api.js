const express = require('express');
const router = express.Router();
const engine = require('../inference/engine');

async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch {
    return null;
  }
}

router.post('/analyze-interest', async (req, res) => {
  try {
    const { reels = [], interactions = [] } = req.body;

    if (!reels.length) {
      return res.status(400).json({ error: 'No reels provided' });
    }

    const geminiResult = await callGemini(
      `Analyze viewer interests from these reels: ${JSON.stringify(reels)} and interactions: ${JSON.stringify(interactions)}. Return a JSON object with primaryInterest, confidence, secondaryInterests, evidence, reasoning, scores.`
    );
    if (geminiResult) {
      return res.json({ source: 'gemini', ...geminiResult });
    }

    const localResult = engine.analyzeInterest(reels, interactions);
    res.json({ source: 'local', ...localResult });
  } catch (err) {
    console.error('analyze-interest error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/recommend', async (req, res) => {
  try {
    const { interestProfile, existingReels = [], userInteractions = [] } = req.body;

    if (!interestProfile) {
      return res.status(400).json({ error: 'No interest profile provided' });
    }

    const geminiResult = await callGemini(
      `Given interest profile: ${JSON.stringify(interestProfile)}, recommend reels from: ${JSON.stringify(existingReels)}. User interactions: ${JSON.stringify(userInteractions)}. Return JSON with an array of recommended reels each having reelId, score, reason.`
    );
    if (geminiResult && Array.isArray(geminiResult.recommendations)) {
      return res.json({ source: 'gemini', recommendations: geminiResult.recommendations });
    }

    const localResult = engine.generateRecommendations(interestProfile, existingReels, userInteractions);
    res.json({ source: 'local', recommendations: localResult });
  } catch (err) {
    console.error('recommend error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/evaluate-reel', async (req, res) => {
  try {
    const { reel } = req.body;

    if (!reel) {
      return res.status(400).json({ error: 'No reel provided' });
    }

    const geminiResult = await callGemini(
      `Evaluate this reel for hype, clickbait, or misleading content: ${JSON.stringify(reel)}. Return JSON with score (0-100, higher = more hype), decision (genuine / hype / misleading), reason, signals array.`
    );
    if (geminiResult) {
      return res.json({ source: 'gemini', ...geminiResult });
    }

    const localResult = engine.evaluateHype(reel);
    res.json({ source: 'local', ...localResult });
  } catch (err) {
    console.error('evaluate-reel error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/surprise-scenario', async (req, res) => {
  try {
    const { scenario } = req.body;

    if (!scenario) {
      return res.status(400).json({ error: 'No scenario provided' });
    }

    const reels = scenario.reels || [];
    const dataset = scenario.dataset || [];

    const localResult = engine.analyzeScenario(reels, dataset);
    res.json({ source: 'local', ...localResult });
  } catch (err) {
    console.error('surprise-scenario error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
