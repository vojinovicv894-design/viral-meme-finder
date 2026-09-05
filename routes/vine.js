const express = require('express');
const axios = require('axios');
const router = express.Router();

// Search for memes on Vine Archive
router.get('/search', async (req, res) => {
  try {
    const { query, maxResults = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Note: Vine was shut down in 2017, but archive APIs exist
    // This is a placeholder for Vine archive integration
    
    res.json({
      platform: 'vine',
      query: query,
      message: 'Vine search - using archive data',
      results: [],
      count: 0,
      note: 'Vine was shut down in 2017. Using archived content only.'
    });
  } catch (error) {
    console.error('Vine search error:', error.message);
    res.status(500).json({ error: 'Failed to search Vine archive', details: error.message });
  }
});

// Get popular Vine memes from archive
router.get('/archive', async (req, res) => {
  try {
    const { maxResults = 10 } = req.query;

    res.json({
      platform: 'vine',
      category: 'archive',
      message: 'Vine archive - popular classic memes',
      results: [],
      count: 0,
      note: 'Vine was shut down in January 2017. This endpoint provides archived content.'
    });
  } catch (error) {
    console.error('Vine archive error:', error.message);
    res.status(500).json({ error: 'Failed to fetch Vine archive', details: error.message });
  }
});

module.exports = router;
