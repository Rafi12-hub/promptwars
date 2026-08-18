const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use('/api', apiRoutes);

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    aiMode: process.env.GEMINI_API_KEY ? 'Gemini Enhanced' : 'Local Explainable Engine',
    geminiAvailable: !!process.env.GEMINI_API_KEY,
  });
});

app.listen(PORT, () => {
  console.log(`ReelMind AI backend running on port ${PORT}`);
});
