/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Copy, 
  ExternalLink, 
  ChevronDown, 
  Search, 
  Settings, 
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Globe,
  Grid
} from 'lucide-react';
import { WithdrawalRecord } from './WithdrawalView';
import { useLanguage } from '../locales';

// Helper functions for matching the Screenshots' TRON consensus addresses & hex data structures
const getPaddedAddressTopic = (addr: string) => {
  if (addr === 'TDVshdVrSJ9vmtZi4vopbkw2gvPD5xHXUg') {
    return '00000000000000000000000026b529322e82c3c487581ec62b088c9748fcf322';
  }
  // Standard hex derivation fallback for any other custom generated withdrawal addresses
  let hash = 0;
  for (let i = 0; i < addr.length; i++) {
    hash = addr.charCodeAt(i) + ((hash << 5) - hash);
  }
  let hex = '';
  for (let i = 0; i < 20; i++) {
    const value = (hash >> ((i % 4) * 8)) & 0xFF;
    hex += ('00' + value.toString(16)).slice(-2);
  }
  return `000000000000000000000000${hex.padEnd(40, 'a')}`.toLowerCase();
};

const getPaddedAmountData = (amount: number) => {
  const valueMicro = Math.round(amount * 1000000);
  return valueMicro.toString(16).padEnd(64, '0').toLowerCase();
};

interface TronExplorerViewProps {
  record: WithdrawalRecord;
  onBack: () => void;
}

export default function TronExplorerView({ record, onBack }: TronExplorerViewProps) {
  const { language } = useLanguage();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Token transfers' | 'Event logs'>('Overview');

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  // Safe TX hash representation (if mock random string or full ID)
  const txHash = record.txId.includes('......') 
    ? `316fa878bc4e5ccb29c25d03942764f${record.referenceNo}ee2466c232783f8`
    : record.txId;

  // Let's match the exact TRON Explorer visual layout
  return (
    <div className="bg-[#000000] text-[#e5e7eb] min-h-screen font-sans selection:bg-rose-500 selection:text-white">
      
      {/* 1. TOP NAVBAR (OKX Wallet look) */}
      <nav className="border-b border-zinc-900 bg-[#000000] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          
          {/* Logo brand & items */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-1 cursor-pointer" onClick={onBack}>
              {/* Back chevron style */}
              <ArrowLeft className="w-4 h-4 text-zinc-400 hover:text-white mr-2" />
              
              {/* Authentic OKX Wallet Logo in white */}
              <div className="flex items-center space-x-1.5 text-white">
                <svg id="okx-wallet-logo" width="104" height="32" viewBox="0 0 104 32" fill="currentColor" className="h-4.5 w-[60px] tracking-normal shrink-0">
                  {/* Block 1: O */}
                  <rect x="0" y="0" width="10" height="10" rx="1.2" />
                  <rect x="11" y="0" width="10" height="10" rx="1.2" />
                  <rect x="22" y="0" width="10" height="10" rx="1.2" />
                  <rect x="0" y="11" width="10" height="10" rx="1.2" />
                  <rect x="22" y="11" width="10" height="10" rx="1.2" />
                  <rect x="0" y="22" width="10" height="10" rx="1.2" />
                  <rect x="11" y="22" width="10" height="10" rx="1.2" />
                  <rect x="22" y="22" width="10" height="10" rx="1.2" />

                  {/* Block 2: K */}
                  <rect x="36" y="0" width="10" height="10" rx="1.2" />
                  <rect x="58" y="0" width="10" height="10" rx="1.2" />
                  <rect x="36" y="11" width="10" height="10" rx="1.2" />
                  <rect x="47" y="11" width="10" height="10" rx="1.2" />
                  <rect x="36" y="22" width="10" height="10" rx="1.2" />
                  <rect x="58" y="22" width="10" height="10" rx="1.2" />

                  {/* Block 3: X */}
                  <rect x="72" y="0" width="10" height="10" rx="1.2" />
                  <rect x="94" y="0" width="10" height="10" rx="1.2" />
                  <rect x="83" y="11" width="10" height="10" rx="1.2" />
                  <rect x="72" y="22" width="10" height="10" rx="1.2" />
                  <rect x="94" y="22" width="10" height="10" rx="1.2" />
                </svg>
                <span className="font-sans text-xs md:text-sm font-black tracking-tight select-none">
                  Wallet
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-6 text-[13px] font-bold text-zinc-400">
              <span className="hover:text-white cursor-pointer transition-colors">
                {language === 'ZH' ? '資產管理' : 'Portfolio'}
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                {language === 'ZH' ? '級差市場' : 'Market'}
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                {language === 'ZH' ? 'Meme 爆發' : 'Meme Pump'}
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                {language === 'ZH' ? '策略交易' : 'Strategy'}
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                {language === 'ZH' ? '閃兌 Swap' : 'Swap'}
              </span>
              <span className="text-white flex items-center space-x-1 cursor-pointer hover:opacity-95">
                <span>{language === 'ZH' ? '鏈上 OS' : 'Onchain OS'}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                {language === 'ZH' ? '更多' : 'More'}
              </span>
            </div>
          </div>

          {/* Top right widgets */}
          <div className="flex items-center space-x-4">
            <div className="bg-zinc-900/80 border border-zinc-800 text-xs px-3 py-1.5 rounded-full flex items-center space-x-2 font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>0xf1e9...60a0</span>
            </div>
            <button className="bg-[#96ff00] hover:opacity-95 text-black font-black text-xs px-4 py-2 rounded-full flex items-center space-x-1 cursor-pointer transition-all">
              <TrendingUp className="w-3 h-3" />
              <span>{language === 'ZH' ? '加速' : 'Boost'}</span>
            </button>
            <button className="text-zinc-400 hover:text-white p-1">
              <Grid className="w-4 h-4" />
            </button>
          </div>

        </div>
      </nav>

      {/* 2. SECOND HEADER - Explorer Header */}
      <div className="border-b border-zinc-900 bg-[#09090b] py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            {/* TRON Red Icon */}
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-500/20">
              ▲
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-white font-extrabold text-base tracking-tight uppercase">TRON</span>
                <span className="text-[11px] font-black tracking-widest text-[#96ff00] bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                  {language === 'ZH' ? '官方數據瀏覽器' : 'EXPLORER'}
                </span>
              </div>
            </div>
          </div>

          {/* Explorer Search Input container */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 w-full md:max-w-md relative">
            <Search className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder={language === 'ZH' ? '輸入 地址 / 交易哈希 / 區塊編號 / 代幣名稱' : 'By address/transaction/block/token'} 
              className="bg-transparent border-none text-xs text-white placeholder-zinc-500 outline-none w-full font-semibold"
              defaultValue={txHash}
              readOnly
            />
            <div className="flex items-center space-x-1 relative">
              <button className="text-[10px] bg-zinc-800 hover:bg-zinc-700 font-bold text-zinc-400 px-2 py-0.5 rounded-md flex items-center space-x-1 border border-zinc-700">
                <span>{language === 'ZH' ? '區塊鏈' : 'Blockchain'}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>
              <button className="text-[10px] bg-zinc-800 hover:bg-zinc-700 font-bold text-zinc-400 px-2 py-0.5 rounded-md flex items-center space-x-1 border border-zinc-700">
                <span>{language === 'ZH' ? '代幣 & NFT' : 'Tokens & NFTs'}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>
              <button className="text-[10px] bg-zinc-800 hover:bg-zinc-700 font-bold text-zinc-400 px-2 py-0.5 rounded-md flex items-center space-x-1 border border-zinc-700">
                <span>{language === 'ZH' ? '開發團隊' : 'Developers'}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>
              <button className="text-[10px] bg-zinc-800 hover:bg-zinc-700 font-bold text-zinc-400 px-2 py-0.5 rounded-md border border-zinc-700">
                <span>{language === 'ZH' ? '更多' : 'More'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN EXPLORER DETAILS */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        
        {/* Back and title bar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-white tracking-tight leading-none">
            {language === 'ZH' ? '全網交易詳細數據' : 'Transaction details'}
          </h2>
          <button 
            onClick={onBack}
            className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'ZH' ? '關閉波場瀏覽器' : 'Close TRON Explorer'}</span>
          </button>
        </div>

        {/* Tab row */}
        <div className="flex border-b border-zinc-900 text-xs font-bold text-zinc-500 mb-6 w-full overflow-x-auto">
          {['Overview', 'Token transfers', 'Event logs'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t as any)}
              className={`pb-3 px-4 transition-colors select-none whitespace-nowrap border-b-2 cursor-pointer ${
                activeTab === t 
                  ? 'border-white text-white font-black' 
                  : 'border-transparent hover:text-zinc-300'
              }`}
            >
              {t === 'Overview' 
                ? (language === 'ZH' ? '系統概述' : 'Overview') 
                : t === 'Token transfers' 
                ? (language === 'ZH' ? '代幣轉帳' : 'Token transfers') 
                : (language === 'ZH' ? '合約日誌' : 'Event logs')}
            </button>
          ))}
        </div>        {/* Transaction detailed cards grid */}
        <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative">
          
          {copiedText && (
            <div className="absolute top-4 right-4 bg-zinc-900 border border-zinc-805 text-[#96ff00] text-[10px] font-black tracking-wide py-1 px-3 rounded-full animate-in fade-in slide-in-from-top-1">
              {language === 'ZH' ? '複製成功！' : 'COPIED TO CLIPBOARD'}
            </div>
          )}

          {activeTab === 'Overview' && (
            <div className="space-y-6">
              {/* Txn Hash Row */}
              <div className="flex flex-col md:flex-row md:items-center py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? '交易哈希:' : 'Txn hash:'}</span>
                <div className="flex items-center space-x-2 font-mono text-xs text-white max-w-full overflow-hidden">
                  <span className="truncate select-all">{txHash}</span>
                  <button 
                    onClick={() => copyText(txHash, 'Txn Hash')}
                    className="p-1 hover:bg-zinc-950 rounded text-zinc-500 hover:text-white transition-colors shrink-0"
                    title="Copy Transaction Hash"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Txn Type Row */}
              <div className="flex flex-col md:flex-row md:items-center py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? '交易類型:' : 'Txn type:'}</span>
                <span className="text-xs font-bold text-zinc-200">{language === 'ZH' ? '呼叫智能合約Trigger' : 'Contract trigger'}</span>
              </div>

              {/* Result Row */}
              <div className="flex flex-col md:flex-row md:items-center py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? '執行結果:' : 'Result:'}</span>
                <div className="flex items-center space-x-1.5">
                  <span className="bg-emerald-950/80 border border-emerald-900 text-emerald-400 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{language === 'ZH' ? '交易完成 / Success' : 'Success'}</span>
                  </span>
                </div>
              </div>

              {/* Status Row */}
              <div className="flex flex-col md:flex-row md:items-center py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-[#a1a1aa] tracking-tight shrink-0">{language === 'ZH' ? '確認狀態:' : 'Status:'}</span>
                <div className="flex items-center space-x-1.5 text-xs">
                  <span className="text-emerald-400 font-black">{language === 'ZH' ? '已安全存儲在鏈' : 'Confirmed'}</span>
                  <span className="text-zinc-500 font-semibold">{language === 'ZH' ? '全網已有至少 19 個超級代表節點確認該合約呼叫' : 'At least 19 SRs have confirmed this transaction'}</span>
                </div>
              </div>

              {/* Block Row */}
              <div className="flex flex-col md:flex-row md:items-center py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? '區塊高度:' : 'Block:'}</span>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-blue-400 hover:underline font-mono font-bold cursor-pointer">82692435</span>
                  <span className="bg-emerald-950/40 border border-emerald-900/30 text-emerald-400 text-[9px] px-1.5 py-0.2 rounded font-black font-sans uppercase">
                    {language === 'ZH' ? '已確認 370,976 個區塊' : '370,976 blocks confirmed'}
                  </span>
                </div>
              </div>

              {/* Date Time Row */}
              <div className="flex flex-col md:flex-row md:items-center py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? '打包時間:' : 'Date time:'}</span>
                <span className="text-xs text-white font-mono font-bold">
                  {record.time} {language === 'ZH' ? '(當前波場區塊高度共識)' : '(Current block height consensus)'}
                </span>
              </div>

              {/* From Row */}
              <div className="flex flex-col md:flex-row md:items-center py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? '發送賬戶:' : 'From:'}</span>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-blue-400 hover:underline font-mono font-bold cursor-pointer">
                    TLaGjwhvA8XQYSxFAcAxy7Dvuue9eGYitv
                  </span>
                  <button 
                    onClick={() => copyText('TLaGjwhvA8XQYSxFAcAxy7Dvuue9eGYitv', 'Sender Address')}
                    className="p-1 hover:bg-zinc-950 rounded text-zinc-500"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 font-bold font-mono">
                    # {language === 'ZH' ? '機構熱錢包: OKX 撥款合約地址_159' : 'Exchange: OKX. Withdraw_159'}
                  </span>
                </div>
              </div>

              {/* Contract Address Row */}
              <div className="flex flex-col md:flex-row md:items-center py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? '合約地址:' : 'Contract address:'}</span>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-blue-400 hover:underline font-mono font-bold cursor-pointer">
                    TR7NHqjeKQXGTCi8q8ZY4pL8otSzgjLj6t
                  </span>
                  <button 
                    onClick={() => copyText('TR7NHqjeKQXGTCi8q8ZY4pL8otSzgjLj6t', 'Contract Address')}
                    className="p-1 hover:bg-zinc-950 rounded text-zinc-500"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 font-bold font-mono">
                    # {language === 'ZH' ? '泰達代幣: Tether USD Contract' : 'Token: Tether USD'}
                  </span>
                </div>
              </div>

              {/* TRC20 Token Transfers Section */}
              <div className="flex flex-col md:flex-row py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? 'TRC20 轉帳事件:' : 'TRC20 token transfers:'} <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.1 select-none text-[9px] font-bold rounded">1</span></span>
                <div className="text-xs space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-zinc-400 leading-relaxed font-semibold">
                    <span>{language === 'ZH' ? '從' : 'From'}</span>
                    <span className="text-white hover:underline cursor-pointer font-mono font-bold">{language === 'ZH' ? 'OKX 發放地址_159' : 'OKX. Withdraw_159'}</span>
                    <span>{language === 'ZH' ? '發送至' : 'To'}</span>
                    {/* To withdrawal address */}
                    <span className="text-blue-400 hover:underline cursor-pointer font-mono font-bold">{record.address}</span>
                    <button 
                      onClick={() => copyText(record.address, 'withdrawal address')}
                      className="p-1 hover:bg-zinc-950 rounded text-zinc-500"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <span>{language === 'ZH' ? '額度為' : 'For'}</span>
                    {/* Amount details */}
                    <span className="text-yellow-400 font-mono font-extrabold text-[13px]">
                      {record.amount} (${record.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                    </span>
                    
                    {/* USDT Coin Representation */}
                    <div className="flex items-center space-x-1 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 shrink-0 ml-1">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#26a17b] flex items-center justify-center text-white text-[7px] font-bold">₮</div>
                      <span className="text-white text-[10px] font-extrabold leading-none">{record.crypto}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transfer Amount Row */}
              <div className="flex flex-col md:flex-row md:items-center py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? '轉帳 TRX 數額:' : 'Transfer amount:'}</span>
                <div className="text-xs font-mono font-extrabold text-zinc-300 flex items-center space-x-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-600/20 border border-red-500/20 text-red-500 flex items-center justify-center text-[7px] font-black">▲</div>
                  <span>0 TRX</span>
                  <span className="text-zinc-500">($0)</span>
                </div>
              </div>

              {/* Bandwidth Consumption Row */}
              <div className="flex flex-col md:flex-row py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? '扣除網絡帶寬(Bandwidth):' : 'Bandwidth consumption:'}</span>
                <div className="text-xs space-y-1">
                  <p className="font-extrabold text-zinc-300">{language === 'ZH' ? '345 單位帶寬' : '345 Bandwidth'}</p>
                  <div className="text-zinc-500 text-[11px] font-medium space-y-0.5">
                    <p>{language === 'ZH' ? '↳ 免費帶寬: 345 (由質押豁免)' : '↳ Free Bandwidth: 345 (from staking)'}</p>
                    <p>{language === 'ZH' ? '↳ 額外帶寬: 0 (透過銷毀 0 TRX)' : '↳ Extra Bandwidth: 0 (through burning of 0 TRX)'}</p>
                  </div>
                </div>
              </div>

              {/* Energy Consumption Row */}
              <div className="flex flex-col md:flex-row py-1 border-b border-zinc-900 pb-4 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? '扣除合約能量(Energy):' : 'Energy consumption:'}</span>
                <div className="text-xs space-y-1">
                  <p className="font-extrabold text-[#96ff00]">{language === 'ZH' ? '64,285 單位能量' : '64,285 Energy'}</p>
                  <div className="text-zinc-500 text-[11px] font-medium space-y-0.5">
                    <p>{language === 'ZH' ? '↳ 免費能量: 64,285 (由質押豁免)' : '↳ Free Energy: 64,285 (from staking)'}</p>
                    <p>{language === 'ZH' ? '↳ 額外能量: 0 (透過銷毀 0 TRX)' : '↳ Extra Energy: 0 (through burning of 0 TRX)'}</p>
                  </div>
                </div>
              </div>

              {/* Energy Consumption Cap Row */}
              <div className="flex flex-col md:flex-row md:items-center py-1 gap-2">
                <span className="w-48 text-xs font-bold text-zinc-500 tracking-tight shrink-0">{language === 'ZH' ? '最大能量消耗限額:' : 'Energy consumption cap:'}</span>
                <span className="text-xs text-zinc-300 font-extrabold">50 TRX</span>
              </div>
            </div>
          )}

          {activeTab === 'Token transfers' && (
            <div className="space-y-6">
              {/* Selector Pills header line */}
              <div className="flex items-center space-x-2 text-xs mb-8">
                <button className="bg-zinc-800 text-white font-extrabold px-3 py-1.5 rounded-md border border-zinc-700/50">
                  TRC20
                </button>
                <span className="text-zinc-850 font-semibold select-none">|</span>
                <button className="bg-transparent text-zinc-300 hover:text-white font-bold px-3 py-1.5 rounded-md border border-zinc-800 flex items-center space-x-1.5">
                  <span>{language === 'ZH' ? '代幣類型: 全部' : 'Token: All'}</span>
                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                </button>
              </div>

              {/* Sub-table mapping to the token transfer transfers exactly */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-400 border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900/80 pb-3 font-bold text-zinc-500">
                      <th className="pb-3 pt-1 font-bold">{language === 'ZH' ? '發出方' : 'From'}</th>
                      <th className="pb-3 pt-1 font-bold">{language === 'ZH' ? '接收方' : 'To'}</th>
                      <th className="pb-3 pt-1 font-bold">{language === 'ZH' ? '轉帳金額' : 'Amount'}</th>
                      <th className="pb-3 pt-1 font-bold">{language === 'ZH' ? '合約代幣' : 'Token'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/40">
                    <tr className="align-middle">
                      {/* From */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center space-x-1.5 text-blue-400 hover:underline cursor-pointer font-bold font-mono">
                          <span>{language === 'ZH' ? 'OKX 出帳熱錢包_159' : 'OKX. Withdraw_159'}</span>
                          <button 
                            onClick={() => copyText('OKX. Withdraw_159', 'From pool')}
                            className="p-1 hover:bg-zinc-900 rounded text-zinc-500 hover:text-white transition-all"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      {/* To */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-emerald-500 text-sm font-black select-none leading-none">→</span>
                          <span className="text-blue-400 hover:underline font-mono font-bold cursor-pointer">{record.address}</span>
                          <button 
                            onClick={() => copyText(record.address, 'withdrawal address')}
                            className="p-1 hover:bg-zinc-900 rounded text-zinc-500 hover:text-white transition-all"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      {/* Amount: formatted dynamic amount and 2 decimal spread amount for realistic USDT display */}
                      <td className="py-4 px-4 font-mono">
                        <div className="font-extrabold text-white text-[13px]">{record.amount}</div>
                        <div className="text-[10px] text-zinc-500 font-bold">
                          ${(record.amount * 0.99833).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </td>
                      {/* Token structure */}
                      <td className="py-4 pl-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-[#26a17b] flex items-center justify-center text-white text-xs font-black select-none">₮</div>
                          <div>
                            <div className="font-extrabold text-white leading-tight">{record.crypto}</div>
                            <div className="text-[10px] text-zinc-500 font-bold leading-none">Tether USD</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Event logs' && (
            <div className="flex items-start space-x-4 md:space-x-6 text-xs md:text-sm">
              {/* Left grey pill containing '0' */}
              <div className="bg-zinc-900 text-zinc-400 font-black px-3.5 py-1.5 rounded-lg border border-zinc-800 shrink-0 leading-none h-fit">
                0
              </div>

              {/* Right details layout */}
              <div className="flex-1 space-y-5">

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-1 pb-4 border-b border-zinc-900/60">
                  <span className="text-zinc-500 font-bold">{language === 'ZH' ? '交易合約地址:' : 'Address:'}</span>
                  <div className="md:col-span-3 flex items-center space-x-2">
                    <div className="flex items-center space-x-1.5 text-blue-400 hover:underline cursor-pointer font-bold font-mono">
                      <span>TR7NHqjeKQXGTCi8q8ZY4pL8otSzgjLj6t</span>
                    </div>
                    <button 
                      onClick={() => copyText('TR7NHqjeKQXGTCi8q8ZY4pL8otSzgjLj6t', 'Contract Address')}
                      className="p-1 hover:bg-zinc-900 rounded text-zinc-400 hover:text-white transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Method calling */}
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-1 pb-4 border-b border-zinc-900/60">
                  <span className="text-zinc-500 font-bold">{language === 'ZH' ? '觸發方法:' : 'Method calling:'}</span>
                  <span className="md:col-span-3 text-white font-mono font-extrabold text-xs">a9059cbb <span className="text-zinc-500 text-[10px] font-semibold font-sans normal-case ml-2">{language === 'ZH' ? '(轉帳方法特徵碼)' : '(Transfer signature descriptor)'}</span></span>
                </div>

                {/* Topics */}
                <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-1 pb-4 border-b border-zinc-900/60">
                  <span className="text-zinc-500 font-bold">{language === 'ZH' ? '日誌主題(Topics):' : 'Topics:'}</span>
                  <div className="md:col-span-3 space-y-3 font-mono text-xs text-zinc-300">
                    <div className="text-white hover:underline cursor-pointer truncate font-bold select-all leading-normal">
                      ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
                    </div>
                    
                    {/* Topic items with gray numbered badges */}
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 font-extrabold text-[10px] w-5 h-5 flex items-center justify-center rounded shrink-0">
                          1
                        </span>
                        <span className="truncate break-all select-all font-bold text-zinc-400">
                          ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
                        </span>
                      </div>

                      <div className="flex items-start space-x-2">
                        <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 font-extrabold text-[10px] w-5 h-5 flex items-center justify-center rounded shrink-0">
                          2
                        </span>
                        <span className="truncate break-all select-all font-bold text-zinc-400">
                          00000000000000000000000007452f02038a6039b730c7ec929a3380ff1b4a6e7
                        </span>
                      </div>

                      <div className="flex items-start space-x-2">
                        <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 font-extrabold text-[10px] w-5 h-5 flex items-center justify-center rounded shrink-0">
                          3
                        </span>
                        <span className="truncate break-all select-all font-bold text-zinc-400">
                          {getPaddedAddressTopic(record.address)}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Data */}
                <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-1">
                  <span className="text-zinc-500 font-bold col-span-1">{language === 'ZH' ? '事件數據(Data):' : 'Data:'}</span>
                  <div className="md:col-span-3 font-mono font-bold text-white text-xs tracking-wider leading-relaxed truncate break-all select-all">
                    {getPaddedAmountData(record.amount)}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </main>

      {/* 4. FOOTER */}
      <footer className="border-t border-zinc-900 mt-16 py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>{language === 'ZH' ? '© 2026 波場鏈上共識數據網絡, OKX 錢包官方技術對接。' : '© 2026 TRON Block Consensus Network, OKX Wallet Integration.'}</p>
          <div className="flex space-x-4">
            <span className="hover:underline cursor-pointer">{language === 'ZH' ? '安全中心' : 'Security Center'}</span>
            <span className="hover:underline cursor-pointer">{language === 'ZH' ? '網絡共識協議' : 'Protocol Consensus'}</span>
            <span className="hover:underline cursor-pointer">{language === 'ZH' ? '服務使用條款' : 'Terms of Service'}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
