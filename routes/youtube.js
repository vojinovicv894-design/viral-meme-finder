const express = require('express');
const axios = require('axios');
const router = express.Router();

// Search for memes on YouTube
router.get('/search', async (req, res) => {
  try {
    const { query, maxResults = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    if (!process.env.YOUTUBE_API_KEY) {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: maxResults,
        key: process.env.YOUTUBE_API_KEY,
        order: 'relevance'
      }
    });

    const videos = response.data.items.map(item => ({
      platform: 'youtube',
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      channel: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      url: `https://youtube.com/watch?v=${item.id.videoId}`
    }));

    res.json({
      platform: 'youtube',
      query: query,
      results: videos,
      count: videos.length
    });
  } catch (error) {
    console.error('YouTube search error:', error.message);
    res.status(500).json({ error: 'Failed to search YouTube', details: error.message });
  }
});

// Get trending memes from YouTube
router.get('/trending', async (req, res) => {
  try {
    const { maxResults = 10 } = req.query;

    if (!process.env.YOUTUBE_API_KEY) {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: maxResults,
        key: process.env.YOUTUBE_API_KEY,
        videoCategoryId: '23'
      }
    });

    const videos = response.data.items.map(item => ({
      platform: 'youtube',
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      channel: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      views: item.statistics.viewCount,
      likes: item.statistics.likeCount,
      url: `https://youtube.com/watch?v=${item.id}`
    }));

    res.json({
      platform: 'youtube',
      category: 'trending',
      results: videos,
      count: videos.length
    });
  } catch (error) {
    console.error('YouTube trending error:', error.message);
    res.status(500).json({ error: 'Failed to fetch YouTube trending', details: error.message });
  }
});

module.exports = router;
