const express = require('express');
const axios = require('axios');
const router = express.Router();

// Search across all platforms
router.get('/all', async (req, res) => {
  try {
    const { query, maxResults = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const results = {
      query: query,
      platforms: {
        youtube: { status: 'pending', results: [] },
        tiktok: { status: 'pending', results: [] },
        vine: { status: 'pending', results: [] }
      },
      total: 0
    };

    // Perform parallel searches
    const requests = [];

    // YouTube search
    if (process.env.YOUTUBE_API_KEY) {
      requests.push(
        axios.get(`http://localhost:${process.env.PORT || 5000}/api/youtube/search`, {
          params: { query, maxResults }
        }).then(response => {
          results.platforms.youtube.status = 'success';
          results.platforms.youtube.results = response.data.results;
          results.total += response.data.count;
        }).catch(error => {
          results.platforms.youtube.status = 'error';
          results.platforms.youtube.error = error.message;
        })
      );
    }

    // Execute all requests
    await Promise.all(requests);

    res.json(results);
  } catch (error) {
    console.error('Multi-platform search error:', error.message);
    res.status(500).json({ error: 'Failed to search across platforms', details: error.message });
  }
});

// Get recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const { category = 'popular', limit = 20 } = req.query;

    res.json({
      category: category,
      recommendations: [
        {
          query: 'Funny cat videos',
          platform: 'all',
          trending: true
        },
        {
          query: 'Epic fails',
          platform: 'all',
          trending: true
        },
        {
          query: 'Viral challenges',
          platform: 'tiktok',
          trending: true
        }
      ],
      note: 'More recommendations coming soon!'
    });
  } catch (error) {
    console.error('Recommendations error:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendations', details: error.message });
  }
});

module.exports = router;
