/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, TrendingUp, TrendingDown, Star, ChevronRight, Eye } from 'lucide-react';
import { CryptoAsset } from '../types';

interface TickerSectionProps {
  onTradeClick: (asset: CryptoAsset) => void;
}

export default function TickerSection({ onTradeClick }: TickerSectionProps) {
  const [activeTab, setActiveTab] = useState<'hot' | 'new' | 'gainers' | 'volume'>('hot');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['BTC', 'ETH']);
  
  // High-fidelity seed assets
  const [assets, setAssets] = useState<CryptoAsset[]>([
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 96450.25,
      change24h: 2.45,
      high24h: 97800.00,
      low24h: 93200.00,
      volume24h: 34200000000,
      sparkline: [44, 48, 45, 52, 58, 54, 62, 70, 68, 75, 82, 78, 88],
      category: 'hot'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3420.15,
      change24h: -1.12,
      high24h: 3550.80,
      low24h: 3380.10,
      volume24h: 18500000000,
      sparkline: [60, 58, 55, 52, 48, 50, 47, 42, 45, 43, 39, 41, 38],
      category: 'hot'
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      price: 182.40,
      change24h: 5.80,
      high24h: 185.90,
      low24h: 171.20,
      volume24h: 4200000000,
      sparkline: [30, 35, 32, 40, 45, 42, 55, 62, 58, 65, 76, 72, 80],
      category: 'hot'
    },
    {
      id: 'sui',
      name: 'Sui',
      symbol: 'SUI',
      price: 3.12,
      change24h: 12.42,
      high24h: 3.25,
      low24h: 2.75,
      volume24h: 950000000,
      sparkline: [20, 22, 18, 25, 38, 35, 48, 52, 60, 58, 72, 85, 95],
      category: 'new'
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'DOGE',
      price: 0.385,
      change24h: -3.85,
      high24h: 0.412,
      low24h: 0.372,
      volume24h: 1200000000,
      sparkline: [80, 75, 68, 72, 65, 58, 62, 50, 48, 52, 42, 46, 35],
      category: 'hot'
    },
    {
      id: 'okb',
      name: 'OKC Token',
      symbol: 'OKB',
      price: 48.50,
      change24h: 0.85,
      high24h: 49.30,
      low24h: 47.90,
      volume24h: 150000000,
      sparkline: [50, 51, 49, 52, 52, 50, 53, 54, 52, 55, 56, 54, 57],
      category: 'hot'
    },
    // Additionals
    {
      id: 'pepe',
      name: 'Pepe',
      symbol: 'PEPE',
      price: 0.00001452,
      change24h: 18.52,
      high24h: 0.00001510,
      low24h: 0.00001180,
      volume24h: 840000000,
      sparkline: [10, 15, 12, 22, 38, 30, 45, 52, 68, 60, 78, 85, 98],
      category: 'gainers'
    },
    {
      id: 'optimism',
      name: 'Optimism',
      symbol: 'OP',
      price: 2.15,
      change24h: 1.45,
      high24h: 2.22,
      low24h: 2.08,
      volume24h: 220000000,
      sparkline: [40, 42, 45, 41, 44, 43, 46, 45, 48, 47, 49, 48, 51],
      category: 'new'
    },
    {
      id: 'floki',
      name: 'Floki Inu',
      symbol: 'FLOKI',
      price: 0.000185,
      change24h: 14.28,
      high24h: 0.000192,
      low24h: 0.000155,
      volume24h: 310000000,
      sparkline: [30, 25, 38, 45, 42, 55, 62, 58, 65, 72, 85, 80, 92],
      category: 'gainers'
    },
    {
      id: 'arbitrum',
      name: 'Arbitrum',
      symbol: 'ARB',
      price: 1.12,
      change24h: -0.45,
      high24h: 1.16,
      low24h: 1.09,
      volume24h: 450000000,
      sparkline: [50, 48, 51, 49, 47, 48, 46, 47, 45, 46, 44, 46, 45],
      category: 'volume'
    }
  ]);

  // Keep track of which coin symbol flashed recently
  const [flashSymbol, setFlashSymbol] = useState<string | null>(null);
  const [flashDirection, setFlashDirection] = useState<'up' | 'down'>('up');

  // Real-time tick fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random asset to fluctuate
      const randomIndex = Math.floor(Math.random() * assets.length);
      const targetAsset = assets[randomIndex];
      
      const isUp = Math.random() > 0.42; // slight bias upwards
      const percentChange = (Math.random() * 0.4 + 0.05) / 100; // 0.05% to 0.45% fluctuation
      const priceDelta = targetAsset.price * percentChange * (isUp ? 1 : -1);
      
      setAssets(prevAssets => {
        return prevAssets.map((asset, idx) => {
          if (idx === randomIndex) {
            const nextPrice = Math.max(0.00000001, asset.price + priceDelta);
            const nextSpark = [...asset.sparkline.slice(1), Math.max(5, Math.min(95, Math.round(asset.sparkline[asset.sparkline.length - 1] + (isUp ? 4 : -4))))];
            
            // set flash states
            setFlashSymbol(asset.symbol);
            setFlashDirection(isUp ? 'up' : 'down');
            
            return {
              ...asset,
              price: nextPrice,
              change24h: asset.change24h + (isUp ? 0.03 : -0.03),
              sparkline: nextSpark
            };
          }
          return asset;
        });
      });

      // Clear flash highlighting after 800ms
      const timeout = setTimeout(() => {
        setFlashSymbol(null);
      }, 800);

      return () => clearTimeout(timeout);
    }, 2500);

    return () => clearInterval(interval);
  }, [assets]);

  const toggleFavorite = (symbol: string) => {
    if (favorites.includes(symbol)) {
      setFavorites(favorites.filter(s => s !== symbol));
    } else {
      setFavorites([...favorites, symbol]);
    }
  };

  const filteredAssets = assets.filter(asset => {
    // category filter
    let matchesCategory = false;
    if (activeTab === 'hot') {
      matchesCategory = asset.category === 'hot' || favorites.includes(asset.symbol);
    } else if (activeTab === 'new') {
      matchesCategory = asset.category === 'new';
    } else if (activeTab === 'gainers') {
      matchesCategory = asset.change24h > 5;
    } else if (activeTab === 'volume') {
      matchesCategory = asset.volume24h > 1000000000;
    }

    // search filter
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="ticker-section" className="bg-[#000000] text-white py-14 border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Row 1: Heading & Search Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
          <div className="space-y-2">
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
              Real-time Market Analytics
            </h2>
            <p className="text-sm text-gray-400">
              Instantly track live quotes, bid sizes, and buy options for top assets.
            </p>
          </div>

          {/* Search bar inside Section */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              id="ticker-search"
              type="text"
              placeholder="Search coin symbol/name..."
              className="w-full bg-[#0c0e12] border border-dark-border rounded-full py-2.5 pl-10 pr-4 text-xs font-medium text-white outline-none focus:border-brand transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Tabs & Actions */}
        <div className="flex border-b border-dark-border mb-6 overflow-x-auto whitespace-nowrap">
          <button
            id="tab-hot-btc"
            onClick={() => setActiveTab('hot')}
            className={`px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors relative flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'hot' ? 'border-brand text-white' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span>Favorites & Popular</span>
            <span className="h-1.5 w-1.5 bg-brand rounded-full"></span>
          </button>
          <button
            id="tab-new-btc"
            onClick={() => setActiveTab('new')}
            className={`px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'new' ? 'border-brand text-white' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            New Listings
          </button>
          <button
            id="tab-gainer-btc"
            onClick={() => setActiveTab('gainers')}
            className={`px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center space-x-1 cursor-pointer ${
              activeTab === 'gainers' ? 'border-brand text-white' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span>Top Gainers</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1 rounded-sm font-mono">+10%</span>
          </button>
          <button
            id="tab-volume-btc"
            onClick={() => setActiveTab('volume')}
            className={`px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'volume' ? 'border-brand text-white' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Top Volume (&gt;$1B)
          </button>
        </div>

        {/* Assets List Layout Table */}
        <div className="overflow-x-auto rounded-xl border border-dark-border bg-dark-card shadow-lg">
          <table className="w-full min-w-[700px] text-left border-collapse">
            <thead>
              <tr className="border-b border-dark-border text-xs uppercase font-mono text-gray-400">
                <th className="py-4 pl-6 w-12 text-center">Fav</th>
                <th className="py-4 px-4">Name</th>
                <th className="py-4 px-4 text-right">Price (USD)</th>
                <th className="py-4 px-4 text-right">24h Change</th>
                <th className="py-4 px-4 text-center">Last 7 Days</th>
                <th className="py-4 px-4 text-right">24h Volume</th>
                <th className="py-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border text-sm">
              <AnimatePresence initial={false}>
                {filteredAssets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-sm text-gray-500 font-sans">
                      No assets found matching "{searchQuery}" under this category.
                    </td>
                  </tr>
                ) : (
                  filteredAssets.map((asset) => {
                    const isFlashed = flashSymbol === asset.symbol;
                    const isUp = asset.change24h >= 0;
                    
                    return (
                      <motion.tr
                        key={asset.id}
                        layoutId={`asset-row-${asset.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-white/2 transition-colors group cursor-pointer"
                      >
                        {/* Favorite Button */}
                        <td className="py-4 pl-6 text-center align-middle">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(asset.symbol);
                            }}
                            className="p-1 hover:text-brand outline-none transition-colors"
                          >
                            <Star 
                              className={`w-4 h-4 ${
                                favorites.includes(asset.symbol) 
                                  ? 'fill-brand text-brand' 
                                  : 'text-gray-650 hover:text-brand text-slate-500'
                              }`} 
                            />
                          </button>
                        </td>

                        {/* Name & Symbol */}
                        <td className="py-4 px-4 align-middle">
                          <div className="flex items-center space-x-3 text-left">
                            <div className="w-8 h-8 rounded-full bg-[#181a20] flex items-center justify-center font-bold text-xs text-white uppercase border border-white/5 group-hover:border-brand/30 transition-all">
                              {asset.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-semibold text-white group-hover:text-brand transition-colors flex items-center space-x-1.5">
                                <span>{asset.name}</span>
                                <span className="text-[10px] font-mono font-normal text-gray-500 bg-[#161920] px-1.5 rounded">{asset.symbol}</span>
                              </div>
                              <span className="text-[11px] font-mono text-gray-500">Vol: {asset.symbol}/USDT</span>
                            </div>
                          </div>
                        </td>

                        {/* Price with realistic Flashing highlighting */}
                        <td className={`py-4 px-4 text-right font-mono transition-colors duration-300 align-middle ${
                          isFlashed 
                            ? flashDirection === 'up'
                              ? 'text-emerald-400 font-bold bg-emerald-500/5'
                              : 'text-rose-400 font-bold bg-rose-500/5'
                            : 'text-white'
                        }`}>
                          ${asset.price.toLocaleString(undefined, {
                            minimumFractionDigits: asset.price < 1 ? 6 : 2,
                            maximumFractionDigits: asset.price < 1 ? 6 : 2
                          })}
                        </td>

                        {/* 24h Change */}
                        <td className="py-4 px-4 text-right align-middle">
                          <div className={`inline-flex items-center space-x-1 font-mono font-medium ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            <span>{isUp ? '+' : ''}{asset.change24h.toFixed(2)}%</span>
                          </div>
                        </td>

                        {/* SVG sparkline */}
                        <td className="py-4 px-4 text-center align-middle">
                          <div className="h-8 w-28 mx-auto flex items-center">
                            <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                              <path
                                d={asset.sparkline.map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${(idx / (asset.sparkline.length - 1)) * 100} ${20 - (val / 100) * 16}`).join(' ')}
                                fill="none"
                                stroke={isUp ? '#10B981' : '#EF4444'}
                                strokeWidth="1.5"
                              ></path>
                            </svg>
                          </div>
                        </td>

                        {/* Volume 24h formatted nicely */}
                        <td className="py-4 px-4 text-right font-mono text-xs text-gray-400 align-middle">
                          ${(asset.volume24h / 1000000000).toFixed(2)}B
                        </td>

                        {/* Trade Action CTA */}
                        <td className="py-4 pr-6 text-right align-middle">
                          <button
                            id={`trade-${asset.symbol}-btn`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onTradeClick(asset);
                            }}
                            className="text-xs font-semibold bg-[#181d26] hover:bg-brand hover:text-black border border-dark-border text-white px-3.5 py-1.5 rounded-full transition-all flex items-center space-x-0.5 ml-auto"
                          >
                            <span>Trade</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Global Live Market Summary Bottom Widget */}
        <div className="mt-6 flex flex-wrap gap-4 items-center justify-between text-xs text-gray-500 font-mono px-2">
          <div className="flex gap-4 items-center">
            <span>Market Cap: <span className="text-white">$3.25T</span> <span className="text-emerald-400 font-bold">+1.85%</span></span>
            <span>•</span>
            <span>24h Gas Fee: <span className="text-white">12 Gwei</span></span>
            <span>•</span>
            <span>Liquidity Depth: <span className="text-brand">Ultra High</span></span>
          </div>
          <button className="text-brand hover:underline flex items-center space-x-1">
            <span>View All 850+ Markets live</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
