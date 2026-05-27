/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, HardDrive, RefreshCw, Key, CheckCircle, Copy, FileText, ClipboardCheck } from 'lucide-react';

export default function SecuritySection() {
  const [copiedHash, setCopiedHash] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [userMerkleHash, setUserMerkleHash] = useState('71c4c9a...a8f2b1d');
  const [verifying, setVerifying] = useState(false);

  const reserveAssets = [
    { name: 'Bitcoin', symbol: 'BTC', ratio: 102, liability: '162,450 BTC', reserve: '165,699 BTC' },
    { name: 'Ethereum', symbol: 'ETH', ratio: 104, liability: '1,425,100 ETH', reserve: '1,482,104 ETH' },
    { name: 'Tether', symbol: 'USDT', ratio: 105, liability: '5,420,000,000 USDT', reserve: '5,691,000,000 USDT' }
  ];

  const handleCopyHash = () => {
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleVerifyMerkle = () => {
    setVerifying(true);
    setVerificationResult(null);
    setTimeout(() => {
      setVerifying(false);
      setVerificationResult('Verified! Match found in Merkle Tree Block #224,912. Liability is 1:1 collaterally backed.');
    }, 1500);
  };

  return (
    <section id="security-section" className="bg-[#000000] text-white py-16 lg:py-24 border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Row 1: Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 text-left space-y-4">
            <div className="inline-flex items-center space-x-2 bg-brand/10 text-brand border border-brand/20 px-3.5 py-1 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Security & Transparency</span>
            </div>
            
            <h2 className="font-display font-medium text-3xl sm:text-4xl tracking-tight leading-tight">
              Our safety reserves, <br />
              <span className="text-brand font-bold">audited and verifiable</span>
            </h2>
            
            <p className="text-gray-400 font-sans leading-relaxed text-sm sm:text-base">
              At OKX, user safety is our highest priority. We store more than 95% of our digital vault holdings in cold storage. Plus, we publishing monthly self-audited Proof of Reserves so anyone can query our on-chain ledger liabilities.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 font-sans text-left">
              <div className="space-y-1">
                <span className="text-brand font-extrabold text-2xl lg:text-3xl font-display">100%</span>
                <p className="text-xs text-slate-400">Clean reserve guarantee structure with no OKB reliance</p>
              </div>
              <div className="space-y-1">
                <span className="text-brand font-extrabold text-2xl lg:text-3xl font-display">95%+</span>
                <p className="text-xs text-slate-400">Funds stored in off-grid air-gapped cryptographic vaults</p>
              </div>
            </div>
          </div>

          {/* Right: Circle chart showing reserves liabilities */}
          <div className="lg:col-span-6 bg-[#0c0e12] border border-dark-border rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-white text-left font-display">Current Verified Reserve Ratios</h3>
            
            <div className="space-y-5 text-left">
              {reserveAssets.map((asset) => (
                <div key={asset.symbol} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <div className="flex items-center space-x-1.5 font-semibold">
                      <span className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-mono border border-white/5">{asset.symbol.slice(0, 1)}</span>
                      <span>{asset.name} ({asset.symbol})</span>
                    </div>
                    <div className="text-right font-mono text-gray-450 text-slate-450 text-xs">
                      <span>Reserve: <span className="text-brand font-bold">{asset.ratio}%</span></span>
                    </div>
                  </div>

                  {/* Horizontal Bar Visualizer */}
                  <div className="relative h-2.5 bg-[#181d26] rounded-full overflow-hidden border border-white/5">
                    {/* Glowing Fill bar */}
                    <div 
                      className="absolute left-0 top-0 h-full rounded-full bg-brand transition-all duration-1000" 
                      style={{ width: `${Math.min(100, asset.ratio - 10)}%` }}
                    ></div>
                    {/* Exceed indicator */}
                    <div 
                      className="absolute h-full w-1 bg-white" 
                      style={{ left: '90%' }} // 100% boundary
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                    <span>Liabilities: {asset.liability}</span>
                    <span>Verified Balance: {asset.reserve}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end p-2 border-t border-dark-border/40 pt-4">
              <span className="text-[10px] text-gray-500 flex items-center font-mono uppercase">
                <RefreshCw className="w-3 h-3 text-brand mr-1.5 animate-spin-slow" /> Published May 2026 Audit (Fresh)
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Merkle Tree On-Chain Verification Interactive Panel */}
        <div className="bg-[#12161e] border border-dark-border rounded-2xl p-6 sm:p-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 space-y-3">
              <div className="p-2.5 rounded-lg bg-brand/10 text-brand border border-brand/20 w-fit">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">Interactive Merkle Leaf Validator</h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                We hash your cryptographic records to generate a leaf on our Merkle Tree. Copy the mock SHA-256 root hash below and hit "Query" to simulate validating your account’s backup match on-chain!
              </p>
              
              {/* Pre-fill hash copyable box */}
              <div className="bg-black/45 hover:bg-black/60 p-3 rounded-lg border border-dark-border flex justify-between items-center text-xs font-mono">
                <span className="text-brand truncate max-w-[200px]" id="merkle-ref-hash">OKX-POR-ROOT-96450A2F3B1C5D</span>
                <button 
                  onClick={handleCopyHash}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  {copiedHash ? <ClipboardCheck className="w-4 h-4 text-brand" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="md:col-span-7 bg-black/60 rounded-xl p-5 border border-dark-border space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Input Account Merkle Leaf Hash</label>
                <div className="flex items-center gap-2">
                  <input
                    id="merkle-input"
                    type="text"
                    className="flex-1 bg-[#101319] text-white border border-dark-border rounded px-3 py-2.5 text-xs outline-none focus:border-brand"
                    value={userMerkleHash}
                    onChange={(e) => setUserMerkleHash(e.target.value)}
                  />
                  <button
                    id="merkle-verify-btn"
                    onClick={handleVerifyMerkle}
                    disabled={verifying}
                    className="bg-brand text-black hover:bg-brand-hover font-bold font-sans rounded px-5 py-2.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {verifying ? 'Querying...' : 'Validate'}
                  </button>
                </div>
              </div>

              {/* Status Display Area */}
              <div className="bg-[#05070a] p-4 rounded border border-white/5 min-h-[50px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {verifying ? (
                    <motion.div 
                      key="verifying"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-2 text-slate-400 text-xs"
                    >
                      <RefreshCw className="w-4 h-4 animate-spin text-brand" />
                      <span>Hashing leaf and parsing Merkle branch depth...</span>
                    </motion.div>
                  ) : verificationResult ? (
                    <motion.div 
                      key="verified"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start space-x-2.5 text-emerald-400 text-xs"
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand" />
                      <div className="text-left font-sans">
                        <span className="font-semibold block font-mono">Merkle Path Match Validated</span>
                        <p className="text-[11px] text-gray-400 mt-1 leading-normal">{verificationResult}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <span className="text-gray-500 font-sans text-xs">Enter your leaf hash and click Validate to run simulation</span>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
