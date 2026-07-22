'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();

  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Modal Visibility State
  const [selectedPlan, setSelectedPlan] = useState(null); 
  const [isLoginOpen, setIsLoginOpen] = useState(false);  

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Checkout Form State
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutCard, setCheckoutCard] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // --- HANDLERS ---
  const handleOpenLogin = () => {
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    setLoginError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both your email address and password.');
      return;
    }

    setIsLoggingIn(true);
    
    // Simulate Authentication Delay
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoginOpen(false);
      router.push('/');
    }, 800);
  };

  const handleOpenCheckout = (plan) => {
    setSelectedPlan(plan);
    setCheckoutEmail('');
    setCheckoutCard('');
    setCheckoutError('');
    setPaymentSuccess(false);
  };

  const handleCloseCheckout = () => {
    setSelectedPlan(null);
    setCheckoutError('');
    setPaymentSuccess(false);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutError('');

    if (!checkoutEmail.trim() || !checkoutCard.trim()) {
      setCheckoutError('Please provide both your work email and card details.');
      return;
    }

    // Basic length check for payment card
    const cleanCard = checkoutCard.replace(/\s+/g, '');
    if (cleanCard.length < 12) {
      setCheckoutError('Please enter a valid card number.');
      return;
    }

    setIsProcessing(true);

    // Simulate Payment Processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-purple-500 selection:text-white relative">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="border-b border-slate-800/80 bg-[#0b0f17]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
            BP
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            BlogPulse <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold uppercase tracking-wider">PRO</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
          <Link href="/" className="hover:text-purple-400 transition-colors">Workspace</Link>
          <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={handleOpenLogin} 
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Log In
          </button>
          <Link href="/" className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md shadow-purple-900/30">
            Launch Workspace
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-6">
          <span>✨ The All-in-One AI Content & Citation Platform</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-6">
          Your Content Deserves to Rank. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-200">
            BlogPulse AI Makes Sure It Does.
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Optimize for Google. Get cited by ChatGPT, Perplexity, and Gemini. Write faster with practitioner-grade authority.
        </p>

        {/* TRUST BADGES */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Free Plan Available</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> No Credit Card Required</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Cancel Anytime</span>
        </div>
      </section>

      {/* 3. METRICS / PROOF BAR */}
      <section className="border-y border-slate-800/60 bg-[#0b0f17]/40 py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold text-white">67K+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Content Creators</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-purple-400">36M+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Articles Optimized</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">2 Sec</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Avg Generation Time</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-indigo-400">99.4%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">GEO Citation Rate</div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24 border-b border-slate-800/60">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Engineered for Search & AI Engines</h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Traditional SEO is no longer enough. BlogPulse equips your articles to dominate Google rankings and secure citations in ChatGPT, Gemini, and Perplexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0e1422] border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg mb-4">
              🎯
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Content Strategy Matrix</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Target high-converting keyword patterns with real-time semantic keyword suggestions designed to increase reach.
            </p>
          </div>

          <div className="bg-[#0e1422] border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg mb-4">
              🤖
            </div>
            <h3 className="text-lg font-bold text-white mb-2">GEO Citation Optimization</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Generative Engine Optimization ensures conversational AI search tools extract and credit your site as a direct primary source.
            </p>
          </div>

          <div className="bg-[#0e1422] border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-4">
              ✍️
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Voice & Humanization Engine</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Eliminates generic AI cliches and applies authentic editorial tone, making your articles read like high-level industry expertise.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Simple Pricing. Serious Results.</h2>
          <p className="text-slate-400 text-base">Start free. Upgrade when you are ready to scale your rankings.</p>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* STARTER PLAN */}
          <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">STARTER</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-extrabold text-white">$19</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <p className="text-slate-400 text-xs mb-6 pb-6 border-b border-slate-800">
                Perfect for solo creators and bloggers who are serious about ranking.
              </p>

              <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> 50 SEO analyses per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> 20 GEO optimizations per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> 15 long-form articles per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> 20 voice humanizations per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> Keyword research included
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleOpenCheckout({ 
                  name: 'Starter', 
                  price: '$19', 
                  priceId: 'price_starter_xxx' // Replace with your real Stripe Price ID
                })}
                className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-center text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
              > 
              Start Starter Plan
            </button>
          </div>

          {/* PRO PLAN */}
          <div className="bg-[#12192c] border-2 border-purple-500/80 rounded-2xl p-8 flex flex-col justify-between shadow-2xl shadow-purple-900/20 relative transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              MOST POPULAR
            </div>

            <div>
              <div className="text-xs font-bold text-purple-400 tracking-wider uppercase mb-2">PRO</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-extrabold text-white">$39</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <p className="text-slate-400 text-xs mb-6 pb-6 border-b border-slate-800">
                For professionals and growth writers who publish content consistently.
              </p>

              <ul className="space-y-3.5 text-xs text-slate-200 mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="text-purple-400 font-bold">✓</span> 200 SEO analyses per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-purple-400 font-bold">✓</span> 80 GEO optimizations per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-purple-400 font-bold">✓</span> 40 articles per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-purple-400 font-bold">✓</span> 80 voice humanizations per month
                </li>
                <li className="flex items-center gap-2.5 font-medium text-purple-300">
                  <span className="text-purple-400 font-bold">✓</span> Priority generation speed
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleOpenCheckout({ name: 'Pro', price: '$39' })}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-center text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/40"
            >
              Start Pro Plan
            </button>
          </div>

          {/* AGENCY PLAN */}
          <div className="bg-[#0e1422] border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="text-xs font-bold text-indigo-400 tracking-wider uppercase mb-2">AGENCY</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-extrabold text-white">$99</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <p className="text-slate-400 text-xs mb-6 pb-6 border-b border-slate-800">
                Built for agencies and digital teams managing multiple publication clients.
              </p>

              <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="text-indigo-400 font-bold">✓</span> 700 SEO analyses per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-indigo-400 font-bold">✓</span> 300 GEO optimizations per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-indigo-400 font-bold">✓</span> 200 articles per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-indigo-400 font-bold">✓</span> 300 voice humanizations per month
                </li>
                <li className="flex items-center gap-2.5 font-medium text-indigo-300">
                  <span className="text-indigo-400 font-bold">✓</span> Dedicated support & API access
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleOpenCheckout({ name: 'Agency', price: '$99' })}
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-center text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Start Agency Plan
            </button>
          </div>

        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-white mb-10">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {[
            { q: "What is BlogPulse AI?", a: "BlogPulse AI is an all-in-one AI content generation and optimization suite designed to craft long-form articles optimized for both Google SEO and AI Engine citations (ChatGPT, Perplexity, Gemini)." },
            { q: "What is the difference between SEO and GEO Optimization?", a: "SEO focuses on traditional search engine ranking factors. GEO (Generative Engine Optimization) structures content so AI language models cite your articles as primary sources." },
            { q: "Can I cancel my subscription anytime?", a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your workspace dashboard with no hidden fees." }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0e1422] border border-slate-800 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleFaq(idx)} 
                className="w-full text-left px-6 py-4 flex items-center justify-between text-sm font-semibold text-slate-200 hover:text-white"
              >
                <span>{item.q}</span>
                <span className="text-purple-400 font-bold">{activeFaq === idx ? '−' : '+'}</span>
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#070a10] py-12 px-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-xs">BP</div>
            <span className="font-bold text-slate-300">BlogPulse AI</span>
          </div>
          <div className="flex space-x-6 text-slate-400">
            <Link href="/" className="hover:text-white">Workspace</Link>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>
          <div>© 2026 BlogPulse AI. All rights reserved.</div>
        </div>
      </footer>

      {/* --- CHECKOUT MODAL --- */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f1523] border border-slate-800 rounded-2xl max-w-md w-full p-6 text-left space-y-5 shadow-2xl relative">
            <button 
              onClick={handleCloseCheckout}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>
            
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">
              Checkout Modal
            </div>

            {!paymentSuccess ? (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Subscribe to {selectedPlan.name} Plan</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    You are subscribing to the <strong className="text-purple-300">{selectedPlan.name} Plan</strong> at <strong className="text-white">{selectedPlan.price}/month</strong>. 
                  </p>
                </div>

                {checkoutError && (
                  <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs px-3.5 py-2 rounded-lg font-medium">
                    ⚠️ {checkoutError}
                  </div>
                )}

                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Work Email</label>
                    <input 
                      type="email" 
                      required
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      placeholder="name@company.com" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500" 
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isProcessing ? 'Redirecting to Stripe Checkout...' : `Proceed to Secure Checkout (${selectedPlan.price})`}
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Payment Successful!</h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Your subscription to the <strong className="text-white">{selectedPlan.name} Plan</strong> is now active.
                  </p>
                </div>
                <Link
                  href="/"
                  className="block w-full py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl hover:bg-purple-500 transition-all"
                >
                  Continue to Workspace
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- LOGIN MODAL --- */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f1523] border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-left space-y-4 shadow-2xl relative">
            <button 
              onClick={handleCloseLogin}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>
            
            <div>
              <h3 className="text-xl font-bold text-white">Log in to BlogPulse</h3>
              <p className="text-slate-400 text-xs mt-1">Access your high-authority content workspace.</p>
            </div>

            {loginError && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs px-3.5 py-2 rounded-lg font-medium">
                ⚠️ {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Password</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500" 
                />
              </div>
              
              <button 
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl hover:bg-purple-500 transition-all disabled:opacity-50 mt-2"
              >
                {isLoggingIn ? 'Authenticating...' : 'Sign In & Open Workspace'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}