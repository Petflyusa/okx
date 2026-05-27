/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpDown, Shield, ArrowRight, Play, TrendingUp, Sparkles, CheckCircle, Info } from 'lucide-react';

interface HeroSectionProps {
  onSignUpSubmit: (email: string) => void;
}

export default function HeroSection({ onSignUpSubmit }: HeroSectionProps) {
  const [emailInput, setEmailInput] = useState('');
  const [payAmount, setPayAmount] = useState('100');
  const [receiveAmount, setReceiveAmount] = useState('0.00104');
  const [payCurrency, setPayCurrency] = useState('USD');
  const [receiveCurrency, setReceiveCurrency] = useState('BTC');
  const [swapMode, setSwapMode] = useState<'buy' | 'sell'>('buy');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  
  // Custom crypto pricing simulator coefficients
  const prices: Record<string, number> = {
    BTC: 96450,
    ETH: 3420,
    SOL: 182.4,
    SUI: 3.12,
    USDT: 1.00
  };

  const fiatRates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 156.4
  };

  // Run dynamic price calculation
  useEffect(() => {
    const payVal = parseFloat(payAmount);
    if (isNaN(payVal) || payVal <= 0) {
      setReceiveAmount('0.00');
      return;
    }

    if (swapMode === 'buy') {
      // Pay Fiat, Receive Crypto
      const usdValue = payVal / (fiatRates[payCurrency] || 1.0);
      const cryptoPrice = prices[receiveCurrency] || 1.0;
      const result = usdValue / cryptoPrice;
      setReceiveAmount(result < 0.01 ? result.toFixed(6) : result.toFixed(2));
    } else {
      // Pay Crypto, Receive Fiat
      const cryptoPrice = prices[payCurrency] || 1.0;
      const usdValue = payVal * cryptoPrice;
      const fiatValue = usdValue * (fiatRates[receiveCurrency] || 1.0);
      setReceiveAmount(fiatValue.toFixed(2));
    }
  }, [payAmount, payCurrency, receiveCurrency, swapMode]);

  const handleSwapCurrencies = () => {
    const tempPay = payCurrency;
    const tempRec = receiveCurrency;
    const tempAmt = payAmount;
    
    setSwapMode(swapMode === 'buy' ? 'sell' : 'buy');
    setPayCurrency(tempRec);
    setReceiveCurrency(tempPay);
    setPayAmount(receiveAmount);
  };

  const handleOpenSwapSuccess = (e: FormEvent) => {
    e.preventDefault();
    setSuccessModalOpen(true);
  };

  const handleSignUpFast = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      onSignUpSubmit(emailInput);
    }
  };

  // Simulated live candlestick chart values
  const [candles, setCandles] = useState<number[]>([40, 48, 45, 52, 58, 54, 62, 70, 68, 75, 82, 78, 88]);
  const [liveCandleValue, setLiveCandleValue] = useState(88);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveCandleValue(prev => {
        const variance = (Math.random() - 0.45) * 4; // slight upward drift
        const next = Math.max(30, Math.min(100, Math.round(prev + variance)));
        
        // every few ticks, update standard candle chart list
        if (Math.random() > 0.7) {
          setCandles(c => [...c.slice(1), next]);
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero-section" className="relative bg-[#000000] text-white pt-10 pb-16 lg:py-24 overflow-hidden border-b border-dark-border">
      {/* Background ambient circular gradients for pure futuristic layout */}
      <div className="absolute right-[-10%] top-[10%] w-[500px] h-[500px] rounded-full bg-brand/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute left-[-5%] bottom-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Vision Statement, Copy, and Conversion Widget */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Promotional pill */}
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-brand"></span>
              <span className="text-gray-300">McLaren F1 Premium Global Co-Partner</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand" />
            </div>

            {/* Typography Display Headings */}
            <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05]">
              Faster, better, <br />
              stronger than your <br />
              <span className="text-brand font-bold relative inline-block">
                average exchange
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-xl font-sans font-light leading-relaxed">
              Buy, sell, and earn crypto securely. Access non-custodial Web3 tools, NFTs, yield pools, and expert-grade trading with the world’s most trusted reserve ratio exchange.
            </p>

            {/* Quick Email Registration Input */}
            <form onSubmit={handleSignUpFast} className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-lg">
              <input
                id="hero-email-input"
                type="email"
                required
                placeholder="Email address or phone number"
                className="flex-1 bg-[#101319] hover:bg-[#181d26] focus:bg-[#181d26] text-white border border-dark-border focus:border-brand rounded-full px-5 py-3.5 text-[15px] outline-none transition-all"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button
                id="hero-signup-submit-btn"
                type="submit"
                className="bg-white hover:bg-gray-100 text-black font-semibold rounded-full px-8 py-3.5 text-[15px] transition-all flex items-center justify-center space-x-1 hover:scale-[1.02] duration-200 cursor-pointer"
              >
                <span>Try OKX Now</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </form>

            <div className="flex items-center space-x-3.5 text-xs text-gray-500 font-mono pt-1">
              <div className="flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-brand" />
                <span>1:1 Audited Proof of Reserves</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-brand" />
                <span>Zero-Fee Registrations</span>
              </div>
            </div>

            {/* Brand Partners Row */}
            <div className="pt-6 border-t border-dark-border/40 max-w-lg">
              <p className="text-[11px] font-mono tracking-wider text-gray-400 uppercase mb-3.5">PROUD OFFICIAL PARTNER OF</p>
              <div className="grid grid-cols-3 gap-4 items-center opacity-40 hover:opacity-75 transition-opacity duration-300">
                <div className="flex flex-col text-left">
                  <span className="text-white font-display font-bold text-sm tracking-widest uppercase">McLAREN</span>
                  <span className="text-[9px] font-mono leading-none tracking-tight text-gray-400">Formula 1 Team Partner</span>
                </div>
                <div className="flex flex-col text-left border-l border-gray-800 pl-4">
                  <span className="text-white font-display font-medium text-sm tracking-tight">Man City FC</span>
                  <span className="text-[9px] font-mono leading-none tracking-tight text-gray-400">Official Sleeve Co-Partner</span>
                </div>
                <div className="flex flex-col text-left border-l border-gray-800 pl-4">
                  <span className="text-white font-display font-bold text-sm tracking-wider uppercase">Tribeca</span>
                  <span className="text-[9px] font-mono leading-none tracking-tight text-gray-400">Festival Primary Partner</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Buy/Sell Crypto Fast-Swap Calculator */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center">
            
            <div className="w-full bg-dark-card border border-dark-border rounded-2xl p-6 shadow-2xl relative neon-glow">
              
              {/* Header Toggles: Buy / Sell */}
              <div className="flex items-center justify-between pb-4 border-b border-dark-border/60">
                <div className="flex bg-black p-1 rounded-lg text-xs font-semibold">
                  <button
                    onClick={() => {
                      setSwapMode('buy');
                      setPayCurrency('USD');
                      setReceiveCurrency('BTC');
                    }}
                    className={`px-4 py-1.5 rounded-md transition-colors ${swapMode === 'buy' ? 'bg-brand text-black font-bold' : 'text-gray-400'}`}
                  >
                    Buy Crypto
                  </button>
                  <button
                    onClick={() => {
                      setSwapMode('sell');
                      setPayCurrency('BTC');
                      setReceiveCurrency('USD');
                    }}
                    className={`px-4 py-1.5 rounded-md transition-colors ${swapMode === 'sell' ? 'bg-brand text-black font-bold' : 'text-gray-400'}`}
                  >
                    Sell Crypto
                  </button>
                </div>
                
                <div className="flex items-center text-xs text-slate-400 font-mono">
                  <TrendingUp className="w-3.5 h-3.5 text-brand mr-1" />
                  <span>Fee: 0.1%</span>
                </div>
              </div>

              {/* Calculator Form */}
              <form onSubmit={handleOpenSwapSuccess} className="space-y-4 mt-5">
                
                {/* Pay Row */}
                <div className="bg-[#12161f]/80 rounded-xl p-4 border border-dark-border/40 hover:border-brand/20 transition-all">
                  <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5">
                    <span>You {swapMode === 'buy' ? 'Pay' : 'Sell'}</span>
                    <span>Available: {swapMode === 'buy' ? '$10,000.00' : '0.45 BTC'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="swap-pay-amount"
                      type="number"
                      step="any"
                      min="1"
                      className="bg-transparent text-white font-semibold text-2xl outline-none flex-1 max-w-[200px]"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                    />
                    
                    {/* Currency Selector */}
                    {swapMode === 'buy' ? (
                      <select
                        id="swap-pay-fiat-select"
                        value={payCurrency}
                        onChange={(e) => setPayCurrency(e.target.value)}
                        className="bg-black text-white font-medium text-sm py-1.5 px-3 border border-dark-border rounded-lg outline-none cursor-pointer hover:border-brand"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                      </select>
                    ) : (
                      <select
                        id="swap-pay-crypto-select"
                        value={payCurrency}
                        onChange={(e) => setPayCurrency(e.target.value)}
                        className="bg-black text-white font-medium text-sm py-1.5 px-3 border border-dark-border rounded-lg outline-none cursor-pointer hover:border-brand"
                      >
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="SOL">SOL</option>
                        <option value="SUI">SUI</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Transfer Swap Separator Button */}
                <div className="flex justify-center -my-3.5 relative z-10">
                  <button
                    type="button"
                    onClick={handleSwapCurrencies}
                    className="p-2.5 bg-[#181c25] hover:bg-brand hover:text-black border border-dark-border text-white rounded-full transition-all duration-300 transform hover:rotate-180 cursor-pointer shadow-lg shadow-black"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Receive Row */}
                <div className="bg-[#12161f]/80 rounded-xl p-4 border border-dark-border/40 hover:border-brand/20 transition-all">
                  <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5">
                    <span>You Get (Est.)</span>
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span id="swap-receive-amount" className="font-semibold text-2xl text-white outline-none flex-1">
                      {receiveAmount}
                    </span>
                    
                    {/* Currency Selector */}
                    {swapMode === 'buy' ? (
                      <select
                        id="swap-receive-crypto-select"
                        value={receiveCurrency}
                        onChange={(e) => setReceiveCurrency(e.target.value)}
                        className="bg-black text-white font-medium text-sm py-1.5 px-3 border border-dark-border rounded-lg outline-none cursor-pointer hover:border-brand"
                      >
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="SOL">SOL</option>
                        <option value="SUI">SUI</option>
                        <option value="USDT">USDT</option>
                      </select>
                    ) : (
                      <select
                        id="swap-receive-fiat-select"
                        value={receiveCurrency}
                        onChange={(e) => setReceiveCurrency(e.target.value)}
                        className="bg-black text-white font-medium text-sm py-1.5 px-3 border border-dark-border rounded-lg outline-none cursor-pointer hover:border-brand"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Price indicators */}
                <div className="bg-[#090b0e] p-3.5 rounded-lg border border-dark-border/45 text-xs text-gray-400 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span>Rate:</span>
                    <span className="font-mono text-white">
                      {swapMode === 'buy' 
                        ? `1 ${receiveCurrency} ≈ ${(prices[receiveCurrency] * (fiatRates[payCurrency] || 1.0)).toLocaleString()} ${payCurrency}`
                        : `1 ${payCurrency} ≈ ${(prices[payCurrency] * (fiatRates[receiveCurrency] || 1.0)).toLocaleString()} ${receiveCurrency}`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-dark-border/30 pt-1 mt-1 font-sans">
                    <span className="flex items-center text-[11px] text-gray-400 gap-1">
                      <Info className="w-3 h-3 text-slate-500" /> Secure Price Protection active
                    </span>
                    <span className="text-brand font-bold text-[11px]">Best price across 15 liquidity pools</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  id="swap-execute-submit-btn"
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-hover text-black font-semibold rounded-xl py-4 transition-all duration-200 transform hover:scale-[1.01] flex items-center justify-center space-x-1 font-sans text-[15px] cursor-pointer"
                >
                  <span>{swapMode === 'buy' ? 'Buy' : 'Sell'} {swapMode === 'buy' ? receiveCurrency : payCurrency} Instant</span>
                  <Play className="w-3.5 h-3.5 fill-black ml-1 scale-90" />
                </button>
              </form>

              {/* Miniature Live Chart Sparklines Tracker within Widget Card */}
              <div className="mt-5 pt-4 border-t border-dark-border/40 text-left">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-gray-400 flex items-center">
                    <span className="h-1.5 w-1.5 bg-brand rounded-full mr-1.5 animate-ping"></span>
                    BTC LIVE TRACKER (USD)
                  </span>
                  <span className="font-mono text-brand font-bold">${(prices.BTC + (liveCandleValue - 50) * 8).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                {/* SVG Live spark */}
                <div className="h-12 w-full bg-[#05070a] rounded flex items-center justify-center overflow-hidden border border-white/5 relative">
                  <svg className="w-full h-10 px-1 text-brand" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#96ff00" stopOpacity="0.15"></stop>
                        <stop offset="100%" stopColor="#96ff00" stopOpacity="0.0"></stop>
                      </linearGradient>
                    </defs>
                    {/* Background fill */}
                    <path
                      d={`M 0 20 ${candles.map((val, idx) => `L ${(idx / (candles.length - 1)) * 100} ${20 - (val / 100) * 16}`).join(' ')} L 100 20 Z`}
                      fill="url(#chart-grad)"
                    ></path>
                    {/* Line stroke */}
                    <path
                      d={candles.map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${(idx / (candles.length - 1)) * 100} ${20 - (val / 100) * 16}`).join(' ')}
                      fill="none"
                      stroke="#96ff00"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                  {/* Glowing end dot */}
                  <div 
                    className="absolute h-2 M 2 bg-white rounded-full border border-brand pointer-events-none"
                    style={{
                      right: '1px',
                      bottom: `${(liveCandleValue / 100) * 16 + 1}px`
                    }}
                  ></div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* SUCCESS MODAL TRIGGERED SECURELY */}
      <AnimatePresence>
        {successModalOpen && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/80 px-4">
            <motion.div
              id="swap-success-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c0e12] border border-dark-border rounded-2xl w-full max-w-md p-6 relative text-center"
            >
              <div className="w-16 h-16 bg-brand/10 text-brand border border-brand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">Order Submitted Securely</h3>
              <p className="text-xs text-gray-400 mb-6 px-2">
                Your order is being routed via our matching engine. Since this is a high-fidelity demonstration, we simulated a direct secure liquidity match for you.
              </p>
              
              {/* Order Invoice Block */}
              <div className="bg-[#101319] p-4 rounded-xl border border-dark-border/40 text-left text-xs space-y-2 font-mono mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction Type</span>
                  <span className="text-white uppercase font-bold text-brand">{swapMode} Mode</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Spent</span>
                  <span className="text-white font-semibold">{payAmount} {payCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Acquired Funds</span>
                  <span className="text-white font-semibold">{receiveAmount} {receiveCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-brand flex items-center">
                    <span className="h-1.5 w-1.5 bg-brand rounded-full mr-1.5 animate-pulse"></span>
                    Matching Liquidity
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  id="modal-success-confirm-btn"
                  onClick={() => setSuccessModalOpen(false)}
                  className="w-full bg-brand hover:bg-brand-hover text-black font-semibold py-3 rounded-xl transition-colors font-sans"
                >
                  Excellent, Thank You
                </button>
                <p className="text-[10px] text-gray-500 font-mono">
                  You can secure real accounts via the main OKX register prompts.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
