/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, ArrowRight, BookMarked, Clock, X, Terminal } from 'lucide-react';
import { LearnArticle } from '../types';

export default function AcademySection() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Beginners' | 'Trading Pro' | 'Web3 Guides'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<LearnArticle | null>(null);

  const articles: LearnArticle[] = [
    {
      id: 'art1',
      title: 'How to Buy Bitcoin (BTC): A Beginner’s Guide',
      category: 'Beginners',
      readTime: '4 min read',
      difficulty: 'Easy',
      imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'art2',
      title: 'Leveraged perpetual futures trading strategies',
      category: 'Trading Pro',
      readTime: '8 min read',
      difficulty: 'Advanced',
      imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'art3',
      title: 'Cold Storage vs Hot Wallets: Web3 Cryptography',
      category: 'Web3 Guides',
      readTime: '6 min read',
      difficulty: 'Medium',
      imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'art4',
      title: 'How Liquidity Pools work in Decentralized Exchanges',
      category: 'Web3 Guides',
      readTime: '7 min read',
      difficulty: 'Advanced',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'art5',
      title: 'Understanding Options Trading: Calls and Puts',
      category: 'Trading Pro',
      readTime: '10 min read',
      difficulty: 'Advanced',
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'art6',
      title: 'What is a Crypto Air-Gapped Key Share Account?',
      category: 'Beginners',
      readTime: '5 min read',
      difficulty: 'Easy',
      imageUrl: 'https://images.unsplash.com/photo-1633156189776-6f368ef12176?auto=format&fit=crop&q=80&w=200'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchCat = activeCategory === 'All' || article.category === activeCategory;
    const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Articles descriptions/abstracts when clicked
  const articleAbstracts: Record<string, string> = {
    art1: 'To purchase Bitcoin securely on OKX: Sign up / log in, verify your regional KYC residency, go to "Express Buy", input the Fiat value (e.g. 100 USD), complete identity payments via card/wire, and immediately secure your Bitcoin in either the offline OKX exchange ledger or withdraw to your Web3 wallet.',
    art2: 'Perpetuals (perps) are derivative swap products that emulate spot markets but allow up to 125x custom leverages. Smart risk protocols necessitate automated trailing stop losses, maintenance margin protections, and funding rate adjustments every 8 hours, protecting from rapid market wicks.',
    art3: 'Hot wallets remain connected to standard servers, providing frictionless access for DeFi decentralized exchanges. Cold storage requires off-grid microprocessors (e.g. Ledger hardware, air-gapped secure elements) to prevent remote key extractions, establishing maximum safety reserves.',
    art4: 'Liquidity pools are secure smart contracts containing equal values of trade token pairings (e.g., ETH/USDT). Automated Market Makers (AMMs) calculate swapping rates using strict mathematical ratios (x * y = k), rewarding liquidity providers with fee allocations.',
    art5: 'Options contracts grant buyers the choice—without absolute obligations—to buy (Call Options) or sell (Put Options) underlying assets at fixed lock prices prior to specified timestamps. Used primarily for expert insurance hedging or leveraged spot exposure.',
    art6: 'Multi-party Computation (MPC) is a Web3 wallet standard that splits private key hashes into separate distinct shares stored across Google Drive, your physical device, and OKX clouds. To sign orders, these shares compute securely without ever assembling a complete vulnerable private key.'
  };

  return (
    <section id="academy-section" className="bg-[#0b0e12] text-white py-16 border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-300">
              <BookMarked className="w-3.5 h-3.5 text-brand" />
              <span>OKX Academy</span>
            </div>
            <h2 className="font-display font-medium text-2xl sm:text-3xl tracking-tight text-white">
              Learn crypto, level up your game
            </h2>
            <p className="text-sm text-gray-400 max-w-lg">
              Unlock complex crypto mechanics easily. Find expert trading strategies or beginner manuals authored by OKX analysts.
            </p>
          </div>

          {/* Search bar specifically for Academy */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              id="academy-search"
              type="text"
              placeholder="Filter topics or questions..."
              className="w-full bg-[#0c0e12] border border-dark-border rounded-full py-2.5 pl-10 pr-4 text-xs font-semibold text-white outline-none focus:border-brand transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tags filters */}
        <div className="flex gap-2.5 mb-8 overflow-x-auto pb-2 whitespace-nowrap scrollbar-none justify-start">
          {['All', 'Beginners', 'Trading Pro', 'Web3 Guides'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-white text-black border-white' 
                  : 'bg-[#0f1218] text-gray-400 border-dark-border hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.length === 0 ? (
            <div className="col-span-1 md:col-span-3 py-16 text-center text-gray-500 font-sans text-sm">
              We couldn't find any documents matching "{searchQuery}" under this category.
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div 
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-dark-card border border-dark-border/60 rounded-xl overflow-hidden hover:border-brand/40 transition-all cursor-pointer flex flex-col justify-between group h-full"
              >
                {/* Simulated Thumbnail */}
                <div className="h-44 bg-slate-900 overflow-hidden relative border-b border-white/5 flex items-center justify-center">
                  <div className="absolute inset-0 bg-cover bg-center opacity-60 filter grayscale group-hover:grayscale-0 transition-all duration-300" style={{ backgroundImage: `url(${article.imageUrl})` }}></div>
                  <div className="absolute top-3.5 left-3.5 bg-black/75 backdrop-blur border border-white/5 text-[10px] px-2 py-0.5 rounded font-mono font-bold text-brand uppercase">{article.category}</div>
                  <div className="absolute bottom-3.5 right-3.5 bg-black/75 border border-white/5 text-[10px] px-2 py-0.5 rounded font-mono text-white flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-brand" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left antialiased">
                  <div className="space-y-2.5">
                    <span className={`text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded ${
                      article.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/15' :
                      article.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-450 border border-orange-500/15' :
                      'bg-[#96ff00]/10 text-brand border border-[#96ff00]/15'
                    }`}>
                      {article.difficulty} Level
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-brand transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </div>

                  <div className="pt-5 flex items-center justify-between text-xs text-brand font-semibold hover:underline">
                    <span>Read Article Summary</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* ARTICLE SUMMARY POPUP MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/85 px-4">
            <motion.div
              layoutId={`art-modal-${selectedArticle.id}`}
              className="bg-[#0c0e12] border border-dark-border rounded-xl w-full max-w-xl p-6 relative"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-1 rounded-full bg-slate-900 border border-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 text-left font-sans">
                <span className="text-[10px] font-mono bg-brand/10 text-brand px-2 py-0.5 border border-brand/25 rounded uppercase">
                  {selectedArticle.category} • {selectedArticle.difficulty} Manual
                </span>
                
                <h3 className="text-xl font-bold font-display text-white pr-6">
                  {selectedArticle.title}
                </h3>

                <div className="h-px bg-dark-border/70 my-3"></div>

                <div className="space-y-4 py-2">
                  <p className="text-xs text-slate-400 flex items-center space-x-1 bg-slate-900 p-2.5 rounded font-mono">
                    <Clock className="w-3.5 h-3.5 text-brand" />
                    <span>Estimated Completion: <span className="text-white font-bold">{selectedArticle.readTime}</span></span>
                  </p>

                  <p className="text-sm text-gray-300 leading-relaxed font-sans first-letter:text-3xl first-letter:font-bold first-letter:text-brand first-letter:float-left first-letter:mr-2">
                    {articleAbstracts[selectedArticle.id] || 'OKX learning resources are available on the main exchange. Practice and refine risk actions with our virtual paper-trading modes.'}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[#1a1f29] flex flex-col sm:flex-row gap-3 justify-between items-center text-xs">
                  <span className="text-slate-500 font-mono">OKX Academy Code: AC-{selectedArticle.id.toUpperCase()}</span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="w-full sm:w-auto bg-white text-black hover:bg-slate-200 font-bold px-5 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Got It, Close Guide
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
