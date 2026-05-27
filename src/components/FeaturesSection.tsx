/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  TrendingUp, 
  Coins, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  UserCheck, 
  Check, 
  Activity, 
  Zap, 
  BadgeAlert,
  HelpCircle,
  PiggyBank
} from 'lucide-react';

export default function FeaturesSection() {
  // Web3 Wallet state
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeChain, setActiveChain] = useState<'ethereum' | 'solana' | 'bitcoin'>('ethereum');
  const [walletCopied, setWalletCopied] = useState(false);

  const chainBalances = {
    ethereum: { address: '0xf8e9...9b27', balance: '4.85 ETH', valuation: '$16,587.00' },
    solana: { address: '8xJp...3uP2', balance: '124.50 SOL', valuation: '$22,708.80' },
    bitcoin: { address: 'bc1q...u8h4', balance: '0.185 BTC', valuation: '$17,843.25' }
  };

  const handleWalletConnectSim = () => {
    setWalletConnected(true);
    // Auto reset after some time if clicked again
  };

  const handleCopyWalletAddress = () => {
    setWalletCopied(true);
    setTimeout(() => setWalletCopied(false), 2000);
  };

  // Staking/Simple Earn Calculator State
  const [stakeAmount, setStakeAmount] = useState('1000');
  const [selectedAsset, setSelectedAsset] = useState<'USDT' | 'SUI' | 'SOL' | 'BTC'>('USDT');
  
  const apyRates = {
    USDT: { rate: 11.5, name: 'Tether' },
    SUI: { rate: 14.8, name: 'Sui' },
    SOL: { rate: 8.5, name: 'Solana' },
    BTC: { rate: 4.2, name: 'Bitcoin' }
  };

  const currentApy = apyRates[selectedAsset].rate;
  const yearlyEarning = (parseFloat(stakeAmount) || 0) * (currentApy / 100);
  const monthlyEarning = yearlyEarning / 12;
  const dailyEarning = yearlyEarning / 365;

  // Copy Trading pro athletes matching mock database
  const [traders, setTraders] = useState([
    { id: 't1', name: 'AlphaWhale', roi: 248.50, winRate: 98.2, copiers: 1420, maxCopiers: 1500, copied: false, avatar: 'AW' },
    { id: 't2', name: 'SatoshiPulse', roi: 182.15, winRate: 94.8, copiers: 890, maxCopiers: 1000, copied: false, avatar: 'SP' },
    { id: 't3', name: 'SolanaSurfer', roi: 312.40, winRate: 92.1, copiers: 495, maxCopiers: 500, copied: false, avatar: 'SS' }
  ]);

  const handleCopyTrader = (id: string) => {
    setTraders(prev => prev.map(t => {
      if (t.id === id) {
        const nextCopied = !t.copied;
        return {
          ...t,
          copied: nextCopied,
          copiers: nextCopied ? t.copiers + 1 : t.copiers - 1
        };
      }
      return t;
    }));
  };

  // Automated orderbook matching generator for visual trading card
  const [orderBook, setOrderBook] = useState<{ price: number; size: number; side: 'buy' | 'sell' }[]>([]);

  useEffect(() => {
    // Generate initial orderbook
    const initialBook: { price: number; size: number; side: 'buy' | 'sell' }[] = [];
    const basePrice = 96450;
    
    for (let i = 0; i < 5; i++) {
      initialBook.push({ price: basePrice + (5 - i) * 6, size: Math.random() * 0.8 + 0.05, side: 'sell' });
    }
    for (let i = 0; i < 5; i++) {
      initialBook.push({ price: basePrice - (i + 1) * 6, size: Math.random() * 1.2 + 0.1, side: 'buy' });
    }
    setOrderBook(initialBook);

    // Periodic updater
    const timer = setInterval(() => {
      setOrderBook(prev => {
        const side = Math.random() > 0.5 ? 'buy' : 'sell';
        const shiftIdx = Math.floor(Math.random() * prev.length);
        
        return prev.map((item, idx) => {
          if (idx === shiftIdx) {
            const variance = (Math.random() - 0.5) * 4;
            return {
              ...item,
              price: Math.round(item.price + variance),
              size: Math.max(0.01, Math.min(2.5, item.size + (Math.random() - 0.5) * 0.2))
            };
          }
          return item;
        });
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="features-section" className="bg-[#0b0e12] text-white py-16 lg:py-24 border-b border-dark-border relative">
      <div className="absolute right-[5%] bottom-[5%] w-[350px] h-[350px] rounded-full bg-brand/5 blur-[90px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        
        {/* Intro */}
        <div className="max-w-2xl text-left space-y-3 mb-16">
          <h2 className="font-display font-medium text-3xl sm:text-4xl tracking-tight leading-tight">
            One platform, endless <br />
            <span className="text-brand font-bold">financial possibilities</span>
          </h2>
          <p className="text-gray-400 font-sans leading-relaxed text-sm sm:text-base">
            Whether you want to trade with high-leverage derivatives, secure stable yield percentages, or explore multi-chain decentralized finance, OKX has a built-in powerhouse for you.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Cell 1: Web3 Wallet (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#12161e] border border-dark-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 text-left items-stretch hover:border-brand/35 transition-all">
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex p-3 rounded-xl bg-brand/10 text-brand border border-brand/20">
                  <Wallet className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">Your Portal to Web3</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  The most versatile non-custodial wallet with built-in support for 80+ networks. Manage multi-chain tokens, store NFTs, participate in DeFi swaps, and integrate dApps with military-grade safety.
                </p>
              </div>

              <div className="mt-6">
                <a href="#" className="inline-flex items-center space-x-1.5 text-xs text-brand font-semibold hover:underline group">
                  <span>Explore decentralized finance</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Interactive Dashboard Element for Wallet */}
            <div className="flex-1 bg-black/60 border border-dark-border rounded-xl p-4 flex flex-col justify-between text-xs font-mono relative">
              <div className="flex justify-between items-center border-b border-dark-border pb-2.5">
                <span className="text-gray-400 font-bold flex items-center">
                  <span className="h-2 w-2 bg-brand rounded-full mr-2"></span>
                  OKX WEB3 WALLET
                </span>
                
                <div className="flex gap-1">
                  <span 
                    onClick={() => setActiveChain('ethereum')} 
                    className={`cursor-pointer px-1.5 py-0.5 rounded text-[10px] uppercase ${activeChain === 'ethereum' ? 'bg-brand text-black font-bold' : 'text-slate-400 hover:text-white'}`}
                  >ETH</span>
                  <span 
                    onClick={() => setActiveChain('solana')} 
                    className={`cursor-pointer px-1.5 py-0.5 rounded text-[10px] uppercase ${activeChain === 'solana' ? 'bg-brand text-black font-bold' : 'text-slate-400 hover:text-white'}`}
                  >SOL</span>
                  <span 
                    onClick={() => setActiveChain('bitcoin')} 
                    className={`cursor-pointer px-1.5 py-0.5 rounded text-[10px] uppercase ${activeChain === 'bitcoin' ? 'bg-brand text-black font-bold' : 'text-slate-400 hover:text-white'}`}
                  >BTC</span>
                </div>
              </div>

              {/* Wallet Screen Content */}
              <div className="py-4 space-y-3 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Wallet Address</span>
                  <button 
                    onClick={handleCopyWalletAddress}
                    className="text-brand hover:underline font-bold"
                  >
                    {walletCopied ? 'Copied' : chainBalances[activeChain].address}
                  </button>
                </div>
                
                <div className="bg-[#12161f] p-3 rounded-lg border border-white/5">
                  <span className="text-[10px] text-gray-500 block">AVAILABLE BALANCE</span>
                  <span className="text-white text-lg font-bold">{chainBalances[activeChain].balance}</span>
                  <span className="text-gray-400 text-[10px] block mt-0.5">≈ {chainBalances[activeChain].valuation} USD</span>
                </div>
              </div>

              {/* Connected CTA */}
              {walletConnected ? (
                <div className="bg-brand/10 border border-brand/20 p-2 rounded text-brand font-bold text-center flex items-center justify-center space-x-1 pb-2.5">
                  <Check className="w-4 w-4" />
                  <span>Interactive Wallet Loaded Successfully</span>
                </div>
              ) : (
                <button
                  id="features-wallet-connect-btn"
                  onClick={handleWalletConnectSim}
                  className="w-full bg-white hover:bg-gray-100 text-black py-2.5 rounded-lg text-center font-semibold font-sans transition-colors cursor-pointer"
                >
                  Connect Wallet Demo
                </button>
              )}
            </div>
          </div>

          {/* Cell 2: Staking Calculator (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-[#12161e] border border-dark-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-left hover:border-brand/35 transition-all">
            
            <div className="space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <PiggyBank className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Simple Earn APY Calculator</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Deploy stablecoins or assets to earn premium compounding reward ratios. Slide or input values to preview potential staking profits immediately.
              </p>
              
              {/* Calculator Panel */}
              <div className="bg-[#090c10] border border-dark-border rounded-xl p-4 mt-4 font-mono text-xs space-y-4">
                
                {/* Asset Choice */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-sans">Calculate Asset:</span>
                  <div className="flex bg-[#12161f] p-0.5 rounded border border-white/5">
                    {Object.keys(apyRates).map((symbol) => (
                      <button
                        key={symbol}
                        onClick={() => setSelectedAsset(symbol as any)}
                        className={`px-2 py-1 rounded text-[10px] font-bold ${selectedAsset === symbol ? 'bg-brand text-black' : 'text-gray-400 hover:text-white'}`}
                      >
                        {symbol}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>Deposit Amount</span>
                    <span className="text-brand font-bold">{currentApy}% APY Rate</span>
                  </div>
                  <input
                    id="stake-amount-input"
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="w-full bg-[#12161f] text-white border border-white/5 rounded px-3 py-2 text-sm outline-none font-bold"
                  />
                </div>

                {/* Earnings */}
                <div className="grid grid-cols-3 gap-2 border-t border-dark-border/40 pt-3">
                  <div>
                    <span className="text-[9px] text-gray-500 block uppercase font-sans">Daily Earnings</span>
                    <span className="text-emerald-400 font-bold text-sm mt-0.5">${dailyEarning.toFixed(3)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 block uppercase font-sans">Monthly Yield</span>
                    <span className="text-emerald-400 font-bold text-sm mt-0.5">${monthlyEarning.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 block uppercase font-sans">Yearly Yield</span>
                    <span className="text-brand font-extrabold text-sm mt-0.5">${yearlyEarning.toFixed(2)}</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6">
              <a href="#" className="inline-flex items-center space-x-1.5 text-xs text-brand font-semibold hover:underline group">
                <span>Start earning up to 14.8% APY</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>

          {/* Cell 3: Live Orderbook Advanced Engine (lg:col-span-5) */}
          <div className="lg:col-span-12 xl:col-span-5 bg-[#12161e] border border-dark-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-left hover:border-brand/35 transition-all">
            <div className="space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Liquid Order Books</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Institutional-grade liquid depths, high speed API hooks, and maker options. OKX provides the tightest bid-ask spreads for derivatives and spot pairs across the ecosystem.
              </p>

              {/* Mini Streaming Orderbook widget */}
              <div className="bg-black/75 rounded-lg border border-dark-border p-3 font-mono text-[10px] h-48 flex flex-col justify-between text-left overflow-hidden">
                <div className="flex justify-between text-slate-500 font-bold border-b border-dark-border pb-1.5 mb-1 text-[9px]">
                  <span>PRICE (USD)</span>
                  <span>SIZE (BTC)</span>
                </div>
                
                {/* Asks (Sell) */}
                <div className="space-y-0.5">
                  {orderBook.filter(item => item.side === 'sell').slice(2).map((item, idx) => (
                    <div key={idx} className="flex justify-between text-rose-400 relative">
                      <div className="absolute top-0 right-0 h-full bg-rose-500/5 transition-all" style={{ width: `${item.size * 50}%` }}></div>
                      <span className="relative z-10 font-bold">{item.price.toLocaleString()}</span>
                      <span className="relative z-10 text-slate-400">{item.size.toFixed(4)}</span>
                    </div>
                  ))}
                </div>

                {/* Middle spread */}
                <div className="border-y border-dark-border/40 py-1 font-bold text-center text-white bg-slate-900/50 flex justify-between px-1 text-[11px]">
                  <span className="text-brand flex items-center">
                    <Activity className="w-3.5 h-3.5 mr-1" /> $96,450.00
                  </span>
                  <span className="text-slate-500 font-normal">Spread: $6.00</span>
                </div>

                {/* Bids (Buy) */}
                <div className="space-y-0.5">
                  {orderBook.filter(item => item.side === 'buy').slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex justify-between text-emerald-400 relative">
                      <div className="absolute top-0 right-0 h-full bg-emerald-500/5 transition-all" style={{ width: `${item.size * 55}%` }}></div>
                      <span className="relative z-10 font-bold">{item.price.toLocaleString()}</span>
                      <span className="relative z-10 text-slate-400">{item.size.toFixed(4)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <a href="#" className="inline-flex items-center space-x-1.5 text-xs text-brand font-semibold hover:underline group">
                <span>Access raw API endpoints</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Cell 4: Copy Trading Arena (lg:col-span-7) */}
          <div className="lg:col-span-12 xl:col-span-7 bg-[#12161e] border border-dark-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 text-left items-stretch hover:border-brand/35 transition-all">
            
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">Copy Trading Arena</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  Mirror top traders automatically. Easily filter through expert risk parameters, win-ratios, and historic gains. Allocate custom deposit fractions to lead-traders in one-click.
                </p>
                <div className="bg-[#090c10] border border-dark-border p-3.5 rounded-lg text-xs space-y-1 sm:space-y-1.5 font-sans leading-relaxed text-gray-400">
                  <div className="flex items-center text-white font-semibold">
                    <Zap className="w-4 h-4 text-brand mr-1.5" /> Automate, Relax, and Track
                  </div>
                  <p className="text-[11px]">When your copied trader opens/closes a position, OKX mirror execution copies them in real-time with ultra-low slippages.</p>
                </div>
              </div>

              <div className="mt-4">
                <a href="#" className="inline-flex items-center space-x-1.5 text-xs text-brand font-semibold hover:underline group">
                  <span>Browse expert traders rankings</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Simulated Traders Row */}
            <div className="flex-1 space-y-3.5 flex flex-col justify-center">
              {traders.map((trader) => (
                <div 
                  key={trader.id} 
                  className="bg-black/45 hover:bg-black/75 transition-colors border border-dark-border rounded-xl p-3 flex justify-between items-center text-xs"
                >
                  <div className="flex items-center space-x-2.5 text-left">
                    <div className="w-8 h-8 rounded-full bg-violet-500 text-black font-extrabold flex items-center justify-center font-mono">
                      {trader.avatar}
                    </div>
                    <div>
                      <span className="font-bold text-white block">{trader.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono">
                        Copiers: {trader.copiers}/{trader.maxCopiers}
                      </span>
                    </div>
                  </div>

                  <div className="text-right space-y-0.5">
                    <span className="text-emerald-400 font-extrabold font-mono font-bold block">
                      +{trader.roi}% ROI
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono font-normal">
                      Win Rate: {trader.winRate}%
                    </span>
                  </div>

                  {/* Copy Button */}
                  <button
                    id={`copy-trader-${trader.id}-btn`}
                    onClick={() => handleCopyTrader(trader.id)}
                    className={`py-1.5 px-3 rounded-full text-[11px] font-bold font-sans transition-all cursor-pointer ${
                      trader.copied 
                        ? 'bg-transparent border border-brand text-brand hover:bg-brand/5' 
                        : 'bg-brand text-black hover:bg-brand-hover'
                    }`}
                  >
                    {trader.copied ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
