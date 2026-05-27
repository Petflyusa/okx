/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, Play, Apple, Smartphone, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export default function DownloadSection() {
  const [qrHovered, setQrHovered] = useState(false);

  return (
    <section id="download-section" className="bg-[#000000] text-white py-16 lg:py-24 border-b border-dark-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: CTA & Badges */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-brand/10 text-brand border border-brand/20 rounded-full text-xs font-semibold">
              <Smartphone className="w-4 h-4" />
              <span>OKX Mobile Companion</span>
            </div>

            <h2 className="font-display font-medium text-3xl sm:text-4xl tracking-tight leading-tight">
              Trade on the go, <br />
              <span className="text-brand font-bold">anywhere, anytime</span>
            </h2>

            <p className="text-gray-400 font-sans leading-relaxed text-sm sm:text-base max-w-lg">
              Download the official OKX application to buy, trade, stake, and use non-custodial Web3 vaults right from your smartphone. Highly rated, fast biometric verification, on-chain widgets, and localized notifications.
            </p>

            {/* Downloader App Badges */}
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#" className="flex items-center space-x-2.5 bg-[#12161f] hover:bg-[#1c2230] hover:border-brand/40 border border-dark-border px-5 py-3 rounded-xl transition-all font-sans">
                <Apple className="w-5 h-5 text-white" />
                <div className="text-left font-sans">
                  <span className="text-[10px] text-gray-500 block uppercase font-mono">Download on the</span>
                  <span className="text-sm font-bold text-white block -mt-1">App Store</span>
                </div>
              </a>

              <a href="#" className="flex items-center space-x-2.5 bg-[#12161f] hover:bg-[#1c2230] hover:border-brand/40 border border-dark-border px-5 py-3 rounded-xl transition-all font-sans">
                <Play className="w-5 h-5 text-white fill-white" />
                <div className="text-left font-sans">
                  <span className="text-[10px] text-gray-500 block uppercase font-mono">Get it on</span>
                  <span className="text-sm font-bold text-white block -mt-1">Google Play</span>
                </div>
              </a>
            </div>

            {/* QR Zoom Instruction card */}
            <div className="bg-[#12161e] p-4.5 rounded-xl border border-dark-border border-dashed max-w-md flex items-center space-x-4">
              <div 
                onMouseEnter={() => setQrHovered(true)}
                onMouseLeave={() => setQrHovered(false)}
                className="bg-white p-2 rounded-lg cursor-pointer transition-transform duration-300 relative group flex-shrink-0"
                style={{ transform: qrHovered ? 'scale(1.15)' : 'scale(1.0)' }}
              >
                {/* Embedded mock QR Code */}
                <div className="w-16 h-16 grid grid-cols-4 gap-1 transform">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-[1px] ${
                        (i % 2 === 0 || i % 5 === 0 || i < 4 || i > 12) ? 'bg-black' : 'bg-transparent'
                      }`}
                    ></div>
                  ))}
                </div>
                {qrHovered && (
                  <div className="absolute inset-0 bg-brand/5 rounded-lg flex items-center justify-center border border-brand/50">
                    <span className="bg-black text-white text-[8px] font-bold px-1 rounded">ZOOMED</span>
                  </div>
                )}
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-white block mb-0.5 uppercase tracking-wide">Hover To Zoom QR Code</span>
                <p className="text-gray-400">Scan this interactive QR code to download the safe installation files directly to your iOS or Android device instantly.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual CSS Smartphone Mockup */}
          <div className="lg:col-span-6 h-full flex justify-center items-center relative py-10 lg:py-0">
            {/* Visual background elements */}
            <div className="absolute w-72 h-72 rounded-full bg-brand/10 blur-[80px] pointer-events-none"></div>

            <div className="w-64 h-[440px] bg-black border-[6px] border-[#1f242d] rounded-[36px] shadow-2xl relative overflow-hidden flex flex-col justify-between p-3.5 antialiased">
              
              {/* Speaker notch */}
              <div className="absolute top-1 left-12 right-12 h-4.5 bg-[#1f242d] rounded-b-2xl z-20 flex justify-center items-center">
                <div className="w-8 h-1 bg-[#1a1c22] rounded-full"></div>
              </div>

              {/* Top notch detail */}
              <div className="h-6 flex items-center justify-between text-[9px] font-mono text-gray-500 pt-1">
                <span>9:41 UTC</span>
                <div className="flex items-center space-x-1">
                  <span>5G</span>
                  <div className="w-4 h-2 bg-[#1f242d] rounded-[2px] p-0.5">
                    <div className="w-full h-full bg-brand rounded-[1px]"></div>
                  </div>
                </div>
              </div>

              {/* Handheld mockup interface */}
              <div className="flex-1 flex flex-col justify-between py-3">
                {/* App Head */}
                <div className="flex justify-between items-center bg-[#101319]/80 border border-white/5 p-2 rounded-xl text-left">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-brand flex items-center justify-center font-display font-black text-[10px] text-black">
                      O
                    </div>
                    <div>
                      <span className="text-[10px] text-white block font-bold leading-tight">OKX Pro App</span>
                      <span className="text-[8px] text-emerald-400 block font-mono">Secured Vault active</span>
                    </div>
                  </div>
                  <span className="text-[8px] bg-[#1a202c] px-1 rounded text-slate-400 font-mono">V8.2</span>
                </div>

                {/* Simulated Chart preview */}
                <div className="bg-[#0b0c10] border border-white/5 rounded-xl p-3 text-left space-y-1 my-3">
                  <div className="flex justify-between items-center text-[9px] text-gray-400">
                    <span>Portfolio Valuation</span>
                    <span className="text-emerald-450 text-emerald-400 font-bold">+4.5% 24h</span>
                  </div>
                  <span className="text-white text-base font-extrabold font-mono font-bold">$148,452.20</span>
                  
                  {/* Miniature canvas layout drawing spark graph */}
                  <div className="h-14 w-full bg-[#12151d] rounded overflow-hidden border border-white/5 relative flex items-end">
                    <svg className="w-full h-10 px-0.5 text-brand" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path
                        d="M 0 20 L 10 18 L 20 22 L 30 15 L 40 18 L 50 12 L 60 14 L 70 8 L 80 12 L 90 4 L 100 6 L 100 20 Z"
                        fill="rgba(150, 255, 0, 0.05)"
                      ></path>
                      <path
                        d="M 0 20 M 0 16 L 10 14 L 20 18 L 30 11 L 40 13 L 50 8 L 60 9 L 70 4 L 80 7 L 90 1 L 100 2"
                        fill="none"
                        stroke="#96ff00"
                        strokeWidth="1.5"
                      ></path>
                    </svg>
                  </div>
                </div>

                {/* Features Badges buttons */}
                <div className="grid grid-cols-2 gap-2 text-[9px]">
                  <div className="bg-[#12161f] border border-white/5 p-2 rounded-lg text-left">
                    <span className="text-gray-500 block">Fast Swap</span>
                    <span className="text-white font-bold block mt-0.5">0% Slippage</span>
                  </div>
                  <div className="bg-[#12161f] border border-white/5 p-2 rounded-lg text-left">
                    <span className="text-gray-500 block">Copy Bot</span>
                    <span className="text-brand font-bold block mt-0.5">Automated</span>
                  </div>
                </div>
              </div>

              {/* Bottom home handle bar */}
              <div className="h-6 flex items-center justify-center">
                <div className="w-20 h-1 bg-gray-500 rounded-full"></div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
