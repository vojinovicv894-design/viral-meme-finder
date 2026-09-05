# 🎬 Viral Meme Finder

A comprehensive meme finder app that aggregates viral videos from **TikTok**, **YouTube**, and **Vine** archives. Discover, search, and explore trending memes from multiple platforms in one place!

## ✨ Features

- 🔍 **Multi-Platform Search**: Search memes across TikTok, YouTube, and Vine simultaneously
- 🔥 **Trending Content**: Get the latest trending memes from each platform
- 📊 **Unified Results**: Aggregate results from all platforms in a single request
- 💾 **Video Caching**: Efficient caching of results for better performance
- 🎯 **Smart Recommendations**: Personalized meme recommendations based on categories
- 🚀 **REST API**: Easy-to-use API endpoints for integration

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **APIs**: YouTube API v3, TikTok API, Vine Archive
- **Package Manager**: npm
- **Development**: Nodemon for hot-reloading

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- API Keys:
  - YouTube Data API v3 key ([Get here](https://console.cloud.google.com/))
  - TikTok API credentials (optional)
  - Vine Archive API access (optional)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vojinovicv894-design/viral-meme-finder.git
   cd viral-meme-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key
   TIKTOK_API_KEY=your_tiktok_api_key
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with hot-reload:
   ```bash
   npm run dev
   ```

The API will be running at `http://localhost:5000`

## 📚 API Documentation

### Health Check
```http
GET /api/health
```

### YouTube Endpoints

**Search YouTube**
```http
GET /api/youtube/search?query=funny+cats&maxResults=10
```

**Get Trending YouTube Videos**
```http
GET /api/youtube/trending?maxResults=10
```

### TikTok Endpoints

**Search TikTok**
```http
GET /api/tiktok/search?query=viral+challenge&maxResults=10
```

**Get Trending TikTok Videos**
```http
GET /api/tiktok/trending?maxResults=10
```

### Vine Endpoints

**Search Vine Archive**
```http
GET /api/vine/search?query=vine+classics&maxResults=10
```

**Get Vine Archive**
```http
GET /api/vine/archive?maxResults=10
```

### Multi-Platform Search

**Search All Platforms**
```http
GET /api/search/all?query=epic+fails&maxResults=10
```

Response example:
```json
{
  "query": "epic fails",
  "platforms": {
    "youtube": {
      "status": "success",
      "results": [
        {
          "platform": "youtube",
          "id": "videoId123",
          "title": "Epic Fail Compilation",
          "thumbnail": "https://...",
          "url": "https://youtube.com/watch?v=...",
          "channel": "Channel Name",
          "publishedAt": "2024-01-01T00:00:00Z"
        }
      ]
    },
    "tiktok": { "status": "pending", "results": [] },
    "vine": { "status": "pending", "results": [] }
  },
  "total": 1
}
```

**Get Recommendations**
```http
GET /api/search/recommendations?category=popular&limit=20
```

## 📝 Response Format

All successful responses follow this format:
```json
{
  "platform": "youtube|tiktok|vine",
  "query": "search query",
  "results": [
    {
      "platform": "youtube",
      "id": "video_id",
      "title": "Video Title",
      "description": "Video description",
      "thumbnail": "https://thumbnail.url",
      "channel": "Channel Name",
      "publishedAt": "2024-01-01T00:00:00Z",
      "url": "https://platform.com/video_url",
      "views": "1000000",
      "likes": "50000"
    }
  ],
  "count": 10
}
```

## 🔐 Security

- Never commit `.env` files with real API keys
- Use environment variables for all sensitive data
- API keys should have appropriate scope restrictions
- Implement rate limiting for production use

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Integrate official TikTok API
- [ ] Add Vine archive full integration
- [ ] Implement caching layer (Redis)
- [ ] Add meme ratings and user favorites
- [ ] Build web UI dashboard
- [ ] Add advanced filtering options
- [ ] Implement user authentication
- [ ] Add meme download feature
- [ ] Create mobile app

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature suggestion? Please open an [issue](https://github.com/vojinovicv894-design/viral-meme-finder/issues) on GitHub.

## 📧 Contact

For questions or support, please reach out to the project maintainer.

---

**Made with ❤️ by [@vojinovicv894-design](https://github.com/vojinovicv894-design)**
