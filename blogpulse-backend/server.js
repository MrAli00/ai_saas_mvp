// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

let memoryHistoryFallback = [];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogpulse')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('⚠️ MongoDB offline. Using fast In-Memory storage mode!'));

const PostSchema = new mongoose.Schema({
  topic: String,
  content: String,
  seoScore: Number,
  geoScore: Number, // Added premium GEO metrics tracking
  wordCount: Number,
  keywordsUsed: [String],
  createdAt: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', PostSchema);

// Helper function to dynamically analyze text for SEO & GEO compliance
function analyzeContentQuality(text, targetKeywordsStr) {
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  
  // SEO Scoring Logic
  const keywords = targetKeywordsStr ? targetKeywordsStr.split(',').map(k => k.trim().toLowerCase()) : [];
  let keywordsFound = 0;
  keywords.forEach(kw => {
    if (text.toLowerCase().includes(kw) && kw !== '') keywordsFound++;
  });
  
  const baseSeo = wordCount > 800 ? 50 : 30;
  const keywordBonus = keywords.length > 0 ? (keywordsFound / keywords.length) * 35 : 25;
  const structureBonus = (text.includes('#') || text.includes('##')) ? 15 : 0;
  const seoScore = Math.min(Math.round(baseSeo + keywordBonus + structureBonus), 100);

  // GEO (Generative Engine Optimization) Scoring Logic
  // Looks for citation markers, data patterns, and structured breakdowns AI models prefer
  let geoScore = 40; 
  if (/\d+%/.test(text) || /\b(2025|2026)\b/.test(text)) geoScore += 15; // Statistics / Date citation data
  if (/(\bsource\b|\bresearch\b|\baccording to\b)/i.test(text)) geoScore += 15; // Attribution phrasing
  if (text.includes('*') || text.includes('-')) geoScore += 15; // Bulleted structural optimization
  if (wordCount > 1000) geoScore += 15;
  geoScore = Math.min(geoScore, 100);

  return { seoScore, geoScore, wordCount };
}

// Live Production Content Factory Stream
app.get('/api/generate', async (req, res) => {
  const { topic, keywords } = req.query;

  if (!topic) {
    return res.status(400).json({ error: 'Topic parameter is required' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    // Premium, enterprise-tier structural system instructions
    const editorialSystemPrompt = `
You are a lead writer for Substack and Medium with years of hands-on experience. 
Write a high-authority, deeply engaging article on the given topic.

CRITICAL WRITING STYLE RULES:
1. BAN AI CLICHÉS: Never use phrases like "in today's fast-paced world", "symphony of", "relentless march", "unprecedented rate", "paradigm shift", "delve into", "testament to", or "tapestry".
2. PUNCHY HUMANKIND SENTENCES: Mix short 2-to-4 word punchy sentences with detailed insights. (Example: "It sounds trivial. It isn't." or "This is where people get stuck.")
3. EDITORIAL STRUCTURE:
   - Use numbered or simple clean subheadings (e.g., "1. The Reality of Prompting" or "Where Most Teams Fail").
   - Keep paragraphs short (maximum 3 sentences per paragraph).
   - Instead of huge bulleted lists, use narrative storytelling punctuated by brief **Bold Key Concepts**.
4. CONCRETE REALITY: Include practical takeaways, trade-offs, and realistic advice (what to learn, what to build, what to avoid).
5. FIRST-PERSON VOICE: Write naturally using "I", "you", and "we". Sound like a mentor, not a corporate observer.
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY.trim()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", 
        messages: [{ role: "user", content: editorialSystemPrompt }],
        max_tokens: 3000, 
        stream: true
      })
    });

    if (!response.ok) {
      res.write(`data: ${JSON.stringify({ text: `⚠️ OpenRouter Gateway Timeout.` })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }

    let completeText = '';
    let buffer = '';

    for await (const chunk of response.body) {
      buffer += new TextDecoder('utf-8').decode(chunk);
      const lines = buffer.split('\n');
      buffer = lines.pop(); 
      
      for (const line of lines) {
        const cleanLine = line.trim();
        if (!cleanLine || cleanLine === 'data: [DONE]') continue;
        
        if (cleanLine.startsWith('data: ')) {
          try {
            const parsed = JSON.parse(cleanLine.substring(6));
            const textChunk = parsed.choices?.[0]?.delta?.content || '';
            if (textChunk) {
              completeText += textChunk;
              // Broadcast layout content safely
              res.write(`data: ${JSON.stringify({ text: textChunk })}\n\n`);
            }
          } catch (err) {}
        }
      }
    }

    // Post-generation premium deep analysis
    if (completeText.trim()) {
      const metrics = analyzeContentQuality(completeText, req.query.keywords || '');
      
      const newPost = {
        _id: new Date().getTime().toString(),
        topic,
        content: completeText,
        ...metrics,
        createdAt: new Date()
      };

      memoryHistoryFallback.unshift(newPost);
      
      try {
        if (mongoose.connection.readyState === 1) {
          await Post.create({ topic, content: completeText, ...metrics });
        }
      } catch (dbErr) {}

      // Send down the calculated final audit scorecard parameters right before concluding the stream
      res.write(`data: ${JSON.stringify({ metrics: metrics })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error(error);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

// History Analytics Index
app.get('/api/posts', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const posts = await Post.find().sort({ createdAt: -1 });
      return res.json(posts);
    }
    res.json(memoryHistoryFallback);
  } catch (err) {
    res.json(memoryHistoryFallback);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Premium Analytics Engine running on port ${PORT}`));