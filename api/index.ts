import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import axios from 'axios';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false, // For development and iframe compatibility
}));

// GitHub Activity API Proxy
app.get('/api/github/activity', async (req, res) => {
  try {
    const username = 'harsh2055'; 
    const [eventsRes, userRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}/events/public`),
      axios.get(`https://api.github.com/users/${username}`)
    ]);
    
    const events = eventsRes.data;
    const user = userRes.data;
    
    // Calculate real stats from last 30-100 events
    const repoCounts = {};
    const eventTypes = {};
    const contributionMap = {};
    let totalCommits = 0;

    events.forEach((event) => {
      const repoName = event.repo.name;
      repoCounts[repoName] = (repoCounts[repoName] || 0) + 1;
      
      const type = event.type;
      eventTypes[type] = (eventTypes[type] || 0) + 1;

      if (type === 'PushEvent') {
        totalCommits += (event.payload.size || 0);
      }

      const date = event.created_at.split('T')[0];
      contributionMap[date] = (contributionMap[date] || 0) + 1;
    });

    let mostActiveRepo = 'N/A';
    let maxCount = 0;
    Object.entries(repoCounts).forEach(([name, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostActiveRepo = name;
      }
    });

    // Simple Streak Calculation (Rough estimate from recent events)
    const dates = Object.keys(contributionMap).sort().reverse();
    let streak = 0;
    if (dates.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (dates[0] === today || dates[0] === yesterday) {
        streak = dates.length; // Placeholder for real streak logic
      }
    }

    const stats = {
      totalEvents: events.length,
      totalCommits,
      publicRepos: user.public_repos,
      followers: user.followers,
      mostActiveRepo: mostActiveRepo.replace(`${username}/`, ''),
      lastActive: events[0]?.created_at || new Date().toISOString(),
      streak: streak,
      contributionMap,
      eventTypes
    };

    res.json({ stats, raw: events.slice(0, 10) });
  } catch (error) {
    console.error('GitHub API error:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub activity' });
  }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  console.log(`New message from ${name} (${email}): ${message}`);
  // In a real app, this would save to Firestore or send an email
  res.json({ success: true, message: 'Transmission received.' });
});

// Resume Generation Logic (Keyword Extraction Proxy)
app.post('/api/resume/analyze', async (req, res) => {
  // This will be handled by Gemini on the frontend according to guidelines
  // But we can put some server-side logic here if needed.
  res.json({ message: 'Analysis ready on frontend' });
});

// Sitemap Generation
app.get('/sitemap.xml', async (req, res) => {
  try {
    const smStream = new SitemapStream({ hostname: 'https://harsh-singh-developer.run.app' }); // Update this when deploying
    const links = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/about', changefreq: 'monthly', priority: 0.8 },
      { url: '/projects', changefreq: 'weekly', priority: 0.9 },
      { url: '/skills', changefreq: 'monthly', priority: 0.7 },
      { url: '/contact', changefreq: 'monthly', priority: 0.6 },
    ];

    const sitemap = await streamToPromise(Readable.from(links).pipe(smStream)).then(data => data.toString());
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

export default app;
