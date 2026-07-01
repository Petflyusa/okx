/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../locales';
import { 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  Copy, 
  Check, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  FileText,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight
} from 'lucide-react';

export interface AssetHolding {
  symbol: string;
  name: string;
  qty: number;
  price: number;
  change: number;
  isUp: boolean;
  vol: string;
}

interface MyAssetsViewProps {
  userAccount: string;
  onBack: () => void;
  balanceVisible: boolean;
  setBalanceVisible: (visible: boolean) => void;
  holdings: {
    BTC: AssetHolding;
    ETH: AssetHolding;
    SOL: AssetHolding;
    USDT: AssetHolding;
  } | null;
  isLoading: boolean;
  onWithdrawClick: () => void;
}

export default function MyAssetsView({
  userAccount,
  onBack,
  balanceVisible,
  setBalanceVisible,
  holdings,
  isLoading,
  onWithdrawClick
}: MyAssetsViewProps) {
  const { language, t } = useLanguage();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  // Calculate totals
  const totalValue = holdings 
    ? (holdings.BTC.qty * holdings.BTC.price) + 
      (holdings.ETH.qty * holdings.ETH.price) + 
      (holdings.SOL.qty * holdings.SOL.price) + 
      (holdings.USDT.qty * holdings.USDT.price)
    : 0;

  const totalValue24hAgo = holdings
    ? (holdings.BTC.qty * (holdings.BTC.price / (1 + holdings.BTC.change / 100))) + 
      (holdings.ETH.qty * (holdings.ETH.price / (1 + holdings.ETH.change / 100))) + 
      (holdings.SOL.qty * (holdings.SOL.price / (1 + holdings.SOL.change / 100))) + 
      (holdings.USDT.qty * holdings.USDT.price) // USDT change is negligibly 0
    : 0;

  const portfolioChangePercent = totalValue24hAgo > 0 
    ? ((totalValue - totalValue24hAgo) / totalValue24hAgo) * 100
    : 0;

  const portfolioChangeValue = totalValue - totalValue24hAgo;

  const allocation = holdings ? [
    { name: 'Bitcoin', symbol: 'BTC', value: holdings.BTC.qty * holdings.BTC.price, color: 'bg-orange-500', barColor: 'bg-orange-500' },
    { name: 'Ethereum', symbol: 'ETH', value: holdings.ETH.qty * holdings.ETH.price, color: 'bg-indigo-500', barColor: 'bg-indigo-500' },
    { name: 'Solana', symbol: 'SOL', value: holdings.SOL.qty * holdings.SOL.price, color: 'bg-purple-500', barColor: 'bg-purple-500' },
    { name: 'Tether', symbol: 'USDT', value: holdings.USDT.qty * holdings.USDT.price, color: 'bg-emerald-500', barColor: 'bg-emerald-500' }
  ].sort((a, b) => b.value - a.value) : [];

  return (
    <div className="bg-[#f5f5f5] min-h-screen text-slate-800 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        
        {/* Top Header bar with Back button */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack} 
            className="p-1 px-3 py-1.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50 text-xs font-semibold flex items-center space-x-1 text-slate-600 cursor-pointer shadow-xs transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>{language === 'ZH' ? '返回資產中心' : 'Back to Dashboard'}</span>
          </button>
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight font-sans mb-8">
          {language === 'ZH' ? '我的資產' : 'My Assets'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT: ASSETS LIST AND ALLOCATION */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* CARD 1: BALANCE OVERVIEW */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-[13px] font-sans font-semibold text-slate-500">
                    <span>{language === 'ZH' ? '總資產估值' : 'Estimated total value'}</span>
                    <button 
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="text-slate-400 hover:text-slate-800 p-0.5 rounded transition-all cursor-pointer"
                    >
                      {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-baseline space-x-1.5">
                    <span className="font-sans font-extrabold text-[42px] tracking-tight text-slate-950 leading-none">
                      {isLoading ? (
                        <span className="inline-block w-48 h-10 bg-slate-100 animate-pulse rounded-md"></span>
                      ) : balanceVisible ? (
                        totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      ) : (
                        '•••••'
                      )}
                    </span>
                    {!isLoading && (
                      <span className="text-slate-500 font-semibold text-[15px] flex items-center space-x-0.5">
                        <span>USD</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </span>
                    )}
                  </div>

                  {/* Portfolio PnL formatted custom widget */}
                  {!isLoading && (
                    <div className="flex items-center space-x-1 text-xs">
                      <span className="text-slate-400 border-b border-dashed border-slate-300 pb-0.5">
                        {language === 'ZH' ? '今日盈虧' : "Today's PnL"}
                      </span>
                      <span className={`font-bold px-1.5 py-0.5 rounded-md flex items-center space-x-0.5 ${
                        portfolioChangePercent >= 0 ? 'text-green-600 bg-green-500/5' : 'text-red-500 bg-red-500/5'
                      }`}>
                        {portfolioChangePercent >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        <span>
                          {portfolioChangePercent >= 0 ? '+' : ''}
                          ${portfolioChangeValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                          ({portfolioChangePercent >= 0 ? '+' : ''}{portfolioChangePercent.toFixed(2)}%)
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTION PILL BUTTONS */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                <button className="bg-[#00a223] hover:bg-[#008f1e] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center space-x-1 transition-colors shadow-xs cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'ZH' ? '充值資產' : 'Deposit'}</span>
                </button>
                <button 
                  onClick={onWithdrawClick}
                  className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-full border border-slate-200 flex items-center space-x-1 transition-all cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>{language === 'ZH' ? '提現資產' : 'Withdraw'}</span>
                </button>
                <button className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-full border border-slate-200 flex items-center space-x-1 transition-all cursor-pointer">
                  <ArrowDownLeft className="w-3.5 h-3.5 text-slate-600" />
                  <span>{language === 'ZH' ? '資金轉賬' : 'Transfer'}</span>
                </button>
                <button className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-full border border-slate-200 flex items-center space-x-1 transition-all cursor-pointer">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-600" />
                  <span>{language === 'ZH' ? '簡單賺幣' : 'Earn'}</span>
                </button>
              </div>
            </div>

            {/* CARD 2: ASSETS HELD TABLE */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
                <h4 className="text-[16px] font-extrabold text-slate-900 font-sans">
                  {language === 'ZH' ? '資產明細' : 'Asset Allocations'}
                </h4>
                <div className="flex items-center space-x-2">
                  {copiedText && (
                    <span className="text-[10px] bg-slate-900 text-white font-semibold py-1 px-2.5 rounded-full transition-all">
                      {language === 'ZH' ? '複製成功' : 'Copied'}
                    </span>
                  )}
                </div>
              </div>

              {/* Table holding list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                      <th className="py-3">{language === 'ZH' ? '幣種' : 'Token'}</th>
                      <th className="py-3 text-right">{language === 'ZH' ? '持倉數量' : 'Quantity / Balance'}</th>
                      <th className="py-3 text-right">{language === 'ZH' ? '最新價' : 'Actual Price'}</th>
                      <th className="py-3 text-right">{language === 'ZH' ? '估值 (USD)' : 'Estimated Value'}</th>
                      <th className="py-3 text-right">{language === 'ZH' ? '24h 漲跌' : '24h Change'}</th>
                      <th className="py-3 text-right">{language === 'ZH' ? '操作' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoading || !holdings ? (
                      [1, 2, 3, 4].map(idx => (
                        <tr key={idx}>
                          <td className="py-4"><div className="w-16 h-4 bg-slate-100 animate-pulse rounded"></div></td>
                          <td className="py-4"><div className="w-20 h-4 bg-slate-100 animate-pulse rounded ml-auto"></div></td>
                          <td className="py-4"><div className="w-20 h-4 bg-slate-100 animate-pulse rounded ml-auto"></div></td>
                          <td className="py-4"><div className="w-24 h-4 bg-slate-100 animate-pulse rounded ml-auto"></div></td>
                          <td className="py-4"><div className="w-12 h-4 bg-slate-100 animate-pulse rounded ml-auto"></div></td>
                          <td className="py-4"><div className="w-16 h-7 bg-slate-100 animate-pulse rounded-full ml-auto"></div></td>
                        </tr>
                      ))
                    ) : (
                      (Object.values(holdings) as AssetHolding[]).map(asset => {
                        const totalAssetValue = asset.qty * asset.price;
                        return (
                          <tr key={asset.symbol} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="py-4">
                              <div className="flex items-center space-x-2.5">
                                <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-[10px] text-white border transition-all ${
                                  asset.symbol === 'BTC' ? 'bg-orange-500 border-orange-400' :
                                  asset.symbol === 'ETH' ? 'bg-indigo-500 border-indigo-400' :
                                  asset.symbol === 'SOL' ? 'bg-purple-500 border-purple-400' :
                                  'bg-emerald-500 border-emerald-400'
                                }`}>
                                  {asset.symbol === 'USDT' ? '₮' : asset.symbol}
                                </div>
                                <div>
                                  <div className="font-extrabold text-slate-900 flex items-center space-x-1.5">
                                    <span>{asset.symbol}</span>
                                  </div>
                                  <div className="text-[10px] text-slate-400 leading-none">{asset.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 text-right font-semibold text-slate-900 font-mono">
                              {balanceVisible ? asset.qty.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 6 }) : '•••••'}
                            </td>
                            <td className="py-4 text-right font-semibold text-slate-950 font-mono">
                              ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="py-4 text-right font-extrabold text-slate-950 font-mono">
                              {balanceVisible ? `$${totalAssetValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '•••••'}
                            </td>
                            <td className="py-4 text-right">
                              <span className={`font-bold inline-block px-1.5 py-0.5 rounded ${
                                asset.change >= 0 
                                  ? 'text-green-600 bg-green-500/5' 
                                  : 'text-red-500 bg-red-500/5'
                              }`}>
                                {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <div className="flex items-center justify-end space-x-1.5">
                                <button 
                                  onClick={() => copyText(asset.qty.toString())}
                                  className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-800 transition-colors"
                                  title="Copy amount"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={onWithdrawClick}
                                  className="bg-slate-900 hover:bg-black text-white font-bold text-[10px] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                                >
                                  {language === 'ZH' ? '提現' : 'Withdraw'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* RIGHT: ALLOCATION PIE CHART & DETAILS */}
          <div className="space-y-6">
            
            {/* BOX 1: ALLOCATION BREAKDOWN */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h4 className="text-[15px] font-extrabold text-slate-900 font-sans">
                {language === 'ZH' ? '資產配比分佈' : 'Asset Allocation'}
              </h4>

              {isLoading || !holdings ? (
                <div className="space-y-4 py-4">
                  <div className="h-6 bg-slate-100 animate-pulse rounded w-3/4 mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-100 animate-pulse rounded w-full"></div>
                    <div className="h-4 bg-slate-100 animate-pulse rounded w-5/6"></div>
                    <div className="h-4 bg-slate-100 animate-pulse rounded w-2/3"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Allocation Visual Bar */}
                  <div className="w-full h-3 rounded-full flex overflow-hidden bg-slate-150">
                    {allocation.map(item => {
                      const percentage = (item.value / totalValue) * 100;
                      if (percentage < 1) return null;
                      return (
                        <div 
                          key={item.symbol} 
                          className={`${item.barColor} h-full transition-all`}
                          style={{ width: `${percentage}%` }}
                          title={`${item.symbol}: ${percentage.toFixed(1)}%`}
                        />
                      );
                    })}
                  </div>

                  {/* List breakdown */}
                  <div className="space-y-3">
                    {allocation.map(item => {
                      const pct = totalValue > 0 ? (item.value / totalValue) * 100 : 0;
                      return (
                        <div key={item.symbol} className="flex items-center justify-between text-xs font-semibold">
                          <div className="flex items-center space-x-2">
                            <span className={`w-3 h-3 rounded-full ${item.color} shrink-0`} />
                            <span className="text-slate-800">{item.name} ({item.symbol})</span>
                          </div>
                          <div className="flex items-baseline space-x-2 font-mono">
                            <span className="text-slate-900 font-extrabold">{pct.toFixed(1)}%</span>
                            <span className="text-slate-400 text-[10px]">
                              {balanceVisible ? `$${item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '•••••'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* BOX 2: CUSTODY GUARANTEE */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start space-x-3.5 relative overflow-hidden bg-gradient-to-br from-emerald-50/10 to-white">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 border border-emerald-500/20">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-slate-900 font-sans uppercase tracking-wider">
                  {language === 'ZH' ? '準備金安全保障' : 'Solvency Backing'}
                </h4>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  {language === 'ZH' ? 'OKX 保證 100% 準備金比率。您的所有加密資產在鏈上均受 1:1 的準備金支持，可隨時自由存取提取。' : 'Your funds are fully backed 1:1 by OKX’s reserves on public ledgers, audited by Merkle-Tree proof protocols.'}
                </p>
                <a href="#" className="text-xs font-bold text-emerald-600 flex items-center space-x-0.5 pt-1.5 hover:underline">
                  <span>{language === 'ZH' ? '查看準備金證明 (PoR)' : 'Proof of Reserves'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
