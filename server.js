const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const youtubeRoutes = require('./routes/youtube');
const tiktokRoutes = require('./routes/tiktok');
const vineRoutes = require('./routes/vine');
const searchRoutes = require('./routes/search');

app.use('/api/youtube', youtubeRoutes);
app.use('/api/tiktok', tiktokRoutes);
app.use('/api/vine', vineRoutes);
app.use('/api/search', searchRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Meme Finder API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🎬 Meme Finder App running on port ${PORT}`);
  console.log(`📝 API Documentation available at http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
