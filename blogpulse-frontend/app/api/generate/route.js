import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { topic, keywords } = await req.json();

    // -----------------------------------------------------------------
    // EDITORIAL SYSTEM PROMPT FOR GEMINI / AI MODEL
    // -----------------------------------------------------------------
    const systemPrompt = `
You are a lead writer for Substack and Medium with years of hands-on experience.
Write a high-authority, deeply engaging article on the topic: "${topic}".
Include SEO context around keywords: "${keywords}".

CRITICAL WRITING STYLE RULES:
1. BAN AI CLICHÉS: Never use phrases like "in today's fast-paced world", "symphony of", "relentless march", "unprecedented rate", "paradigm shift", "delve into", "testament to", or "tapestry".
2. PUNCHY HUMAN SENTENCES: Mix short 2-to-4 word punchy sentences with detailed insights.
3. EDITORIAL STRUCTURE: Use clean subheadings, short 2-3 sentence paragraphs, and bold concepts.
4. FIRST-PERSON VOICE: Write naturally using "I", "you", and "we". Sound like a mentor, not a corporate observer.
`;

    // -----------------------------------------------------------------
    // API CALL PLACEHOLDER
    // Replace this section with your actual Gemini/LLM API call if needed.
    // -----------------------------------------------------------------
    const generatedArticle = `# ${topic}

The landscape around ${keywords.split(',')[0] || 'this topic'} is shifting faster than most teams realize. It sounds simple on paper. It isn't in practice.

## Where Most Teams Get Stuck

When building out strategies around ${topic}, the biggest mistake is overcomplicating the foundation. You don't need a bloated architecture—you need leverage.

* **Speed of Execution:** Prioritize fast iteration loops over perfect initial setups.
* **Core Value Alignment:** Ensure every layer directly serves the primary objective without added fluff.

> "Simplicity is the ultimate sophistication when scaling modern systems."

## Looking Ahead

Focus on execution over speculation. Build the system, refine the workflow, and let the results speak.`;

    // Return structured payload matching page.js state requirements
    return NextResponse.json({
      content: generatedArticle,
      seo: 96,
      geo: 100,
      wordCount: generatedArticle.split(/\s+/).length,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate article content' },
      { status: 500 }
    );
  }
}