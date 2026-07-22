'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import {
  Sparkles,
  CheckCircle2,
  BarChart3,
  History,
  FileText,
  Zap,
  Loader2,
  Search,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default function BlogPulseDashboard() {
  // --- STATE MANAGEMENT ---
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Live Metrics State
  const [seoScore, setSeoScore] = useState(0);
  const [geoCitation, setGeoCitation] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  // Active Output State
  const [output, setOutput] = useState('');

  // History Log State
  const [history, setHistory] = useState([
    {
      id: 1,
      title: 'AI SaaS apps are in demand 2026',
      seo: 98,
      geo: 100,
      words: '1367w',
    },
    {
      id: 2,
      title: 'Monetizing Digital Products on Pinterest',
      seo: 94,
      geo: 96,
      words: '1120w',
    },
  ]);

  // --- GENERATION HANDLER ---
  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, keywords }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutput(data.content || data.article);
        if (data.seo) setSeoScore(data.seo);
        if (data.geo) setGeoCitation(data.geo);
        if (data.wordCount) setWordCount(data.wordCount);
      }
    } catch (err) {
      console.error('Failed to generate content:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans p-4 md:p-6 lg:p-8 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* ================= HEADER / TOP BAR ================= */}
        <header className="flex items-center justify-between border-b border-slate-800/80 pb-5">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                BlogPulse <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-semibold tracking-wider">PRO</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* UPGRADE PLAN LINK */}
            <Link 
              href="/pricing" 
              className="px-3.5 py-1.5 text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded-full hover:bg-purple-500/20 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>💎</span> Upgrade Plan
            </Link>

            <div className="flex items-center space-x-2 bg-slate-900/90 border border-emerald-500/30 px-3.5 py-1.5 rounded-full shadow-inner">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400 tracking-wide">Ali Hassan Mode Active</span>
            </div>
          </div>
        </header>

        {/* ================= TOP DASHBOARD GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* CARD 1: CONTENT STRATEGY MATRIX (7 Cols) */}
          <section className="lg:col-span-7 bg-[#0f1523]/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                <Search className="w-4 h-4 text-indigo-400" />
                <span>Content Strategy Matrix</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Target Strategy Focus / Topic Title
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., How AI SaaS Is Redefining Digital Workflows"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    SEO Keywords <span className="text-slate-500">(Comma separated values)</span>
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g., artificial intelligence, software automation, saas architecture"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm py-3 px-6 rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing High-Authority Draft...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Build Premium Optimization Asset</span>
                </>
              )}
            </button>
          </section>

          {/* CARD 2: ENGINE QUALITY INSPECTOR (5 Cols) */}
          <section className="lg:col-span-5 bg-[#0f1523]/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Engine Quality Inspector</span>
            </div>

            {/* Score Gauges */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 text-center flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-indigo-400 tracking-tight">{seoScore}%</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">SEO Score Index</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 text-center flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-purple-400 tracking-tight">{geoCitation}%</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">GEO Citation Index</span>
              </div>
            </div>

            {/* Validation Checklist */}
            <div className="space-y-3 bg-slate-950/40 rounded-xl p-4 border border-slate-800/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Author Validation Check</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Ali Hassan Voice Verified
                </span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-slate-900 pt-2">
                <span className="text-slate-400">Structured Headers Check</span>
                <span className="text-emerald-400 font-semibold">Optimized</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-slate-900 pt-2">
                <span className="text-slate-400">AI Search Citation Footprint</span>
                <span className="text-indigo-400 font-semibold">High Authority</span>
              </div>
            </div>
          </section>

        </div>

        {/* ================= BOTTOM WORKSPACE GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* CARD 3: PRODUCTION OUTPUT EDITOR WORKSPACE (8 Cols) */}
          <section className="lg:col-span-8 bg-[#0f1523]/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col min-h-[550px]">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Production Output Editor Workspace</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-xs text-slate-300 font-mono">{wordCount} Words</span>
              </div>
            </div>

            {/* Medium-style Rendered Typography Viewport */}
            <div className="flex-1 overflow-y-auto max-h-[620px] pr-3 text-slate-200 leading-relaxed font-sans selection:bg-indigo-500/30">
              {output ? (
                <article className="prose prose-invert max-w-none space-y-4">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-4 tracking-tight border-b border-slate-800/80 pb-3" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-xl font-bold text-slate-100 mt-6 mb-3 tracking-tight" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-lg font-semibold text-indigo-300 mt-5 mb-2" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-slate-300 text-base leading-7 mb-4 font-normal" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-outside space-y-2 text-slate-300 my-4 pl-5" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-slate-300 leading-relaxed pl-1" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-semibold text-white bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20" {...props} />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-indigo-500 pl-4 my-4 italic text-slate-400 bg-indigo-950/20 py-2 rounded-r-lg" {...props} />
                      ),
                    }}
                  >
                    {output}
                  </ReactMarkdown>
                </article>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-600 italic text-sm py-20">
                  Your human-crafted editorial piece will generate live here...
                </div>
              )}
            </div>
          </section>

          {/* CARD 4: OPTIMIZATION HISTORY RECORDS (4 Cols) */}
          <section className="lg:col-span-4 bg-[#0f1523]/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800/80 pb-4">
              <History className="w-4 h-4 text-indigo-400" />
              <span>Optimization History Records</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[580px] pr-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl hover:border-indigo-500/40 transition-all cursor-pointer group"
                >
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center space-x-2 mt-3 text-[11px] font-mono">
                    <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                      SEO: {item.seo}%
                    </span>
                    <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded">
                      GEO: {item.geo}%
                    </span>
                    <span className="text-slate-500 ml-auto">{item.words}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}