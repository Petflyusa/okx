/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronRight,
  ShieldAlert, 
  Copy, 
  Check, 
  TrendingDown, 
  TrendingUp, 
  ArrowRight, 
  Search, 
  Bell, 
  Globe, 
  User, 
  Download, 
  MessageSquare, 
  Headphones, 
  HelpCircle,
  Menu,
  X,
  Sparkles,
  Percent,
  FileText,
  ShieldCheck,
  Zap,
  Star
} from 'lucide-react';
import WithdrawalView, { WithdrawalRecord } from './WithdrawalView';
import TronExplorerView from './TronExplorerView';

interface DashboardProps {
  userAccount: string;
  onLogout: () => void;
}

export default function DashboardView({ userAccount, onLogout }: DashboardProps) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(230980.95);
  const [activeView, setActiveView] = useState<'dashboard' | 'withdrawal' | 'explorer'>('dashboard');
  const [selectedRecord, setSelectedRecord] = useState<WithdrawalRecord | null>(null);
  const [copiedUid, setCopiedUid] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('Overview');
  const [activeTimeframe, setActiveTimeframe] = useState<'1D' | '1W' | '1M' | '6M' | '1Y'>('1D');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; val: number; label: string } | null>(null);
  const [chartWidth, setChartWidth] = useState(500);
  const [cryptoTab, setCryptoTab] = useState<'Favorites' | 'Top' | 'Hot' | 'Gainers' | 'New'>('Top');
  const [vipModalClosed, setVipModalClosed] = useState(false);

  // Lifted withdrawal records state
  const [withdrawalRecords, setWithdrawalRecords] = useState<WithdrawalRecord[]>([
    {
      time: 'May 14, 2026, 04:00 PM',
      referenceNo: '400709796',
      address: 'TDVshdVrSJ9vmtZi4vopbkw2gvPD5xHXUg',
      network: 'Tron (TRC20)',
      txId: '316f1a8e0f52dbfa1347895fbc9a49fcd09028a47291a13897ca2f4b0c1083f8',
      crypto: 'USDT',
      amount: 30,
      fee: 1.5,
      status: 'Sent'
    },
    {
      time: 'May 14, 2026, 10:42 AM',
      referenceNo: '400654710',
      address: 'TDVshdVrSJ9vmtZi4vopbkw2gvPD5xHXUg',
      network: 'Tron (TRC20)',
      txId: 'dd2813df95a5fbc4fa10374e55ce91a47291a13897ca2f4b23838d8fbc3fe55c',
      crypto: 'USDT',
      amount: 11,
      fee: 1.5,
      status: 'Sent'
    }
  ]);
  
  // Simulated interactive chat assistant
  const [showChatAssistant, setShowChatAssistant] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Hello! I am your OKX Security Assistant. How can I protect your digital assets today?' }
  ]);

  // Copy UID simulation
  const handleCopyUid = () => {
    setCopiedUid(true);
    navigator.clipboard.writeText('214875336776228864');
    setTimeout(() => setCopiedUid(false), 2000);
  };

  // Sub tabs at the top of the content
  const subTabs = [
    'Overview',
    'Profile',
    'Security',
    'Verification',
    'Preferences',
    'Sub-accounts',
    'API and connections',
    'Third-party authorization'
  ];

  const fundingSubTabs = [
    'Overview',
    'Funding',
    'Trading',
    'Grow',
    'Analysis',
    'Order center',
    'Fees',
    'Account statement',
    'PoR reports'
  ];

  // Intraday points matching the dip in the screenshot (around 230980.95, boundary: max 244351.75, min 230456.19)
  const MULTIPLIER = 13109.020998864927;
  const chartData = [
    { label: '15:00', value: 18.42 * MULTIPLIER },
    { label: '16:00', value: 18.25 * MULTIPLIER },
    { label: '17:00', value: 18.35 * MULTIPLIER },
    { label: '18:00', value: 18.12 * MULTIPLIER },
    { label: '19:40', value: 18.24 * MULTIPLIER },
    { label: '21:00', value: 18.05 * MULTIPLIER },
    { label: '22:00', value: 18.15 * MULTIPLIER },
    { label: '23:00', value: 17.92 * MULTIPLIER },
    { label: '00:30', value: 17.65 * MULTIPLIER },
    { label: '02:00', value: 17.78 * MULTIPLIER },
    { label: '03:30', value: 17.58 * MULTIPLIER }, // Lowest valley
    { label: '05:20', value: 17.72 * MULTIPLIER },
    { label: '07:00', value: 17.63 * MULTIPLIER },
    { label: '08:30', value: 17.79 * MULTIPLIER },
    { label: '10:00', value: 17.68 * MULTIPLIER },
    { label: '12:00', value: 17.62 * MULTIPLIER }  // Current
  ];

  // Top Crypto Row items
  const cryptoAssets = [
    { symbol: 'BTC', name: 'Bitcoin', price: 92430.50, change: 1.84, isUp: true, vol: '24.2B' },
    { symbol: 'ETH', name: 'Ethereum', price: 3412.10, change: -0.45, isUp: false, vol: '12.8B' },
    { symbol: 'SOL', name: 'Solana', price: 168.45, change: 4.12, isUp: true, vol: '3.9B' },
    { symbol: 'OKB', name: 'OKB Token', price: 44.80, change: 0.95, isUp: true, vol: '410M' },
    { symbol: 'SUI', name: 'Sui', price: 1.82, change: -2.67, isUp: false, vol: '720M' }
  ];

  // Map database indices for SVG drawing
  const svgHeight = 150;
  const svgWidth = 600;
  const minVal = 17.40 * MULTIPLIER;
  const maxVal = 18.80 * MULTIPLIER;

  const pointsString = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * svgWidth;
    const y = svgHeight - ((d.value - minVal) / (maxVal - minVal)) * (svgHeight - 20) - 10;
    return `${x},${y}`;
  }).join(' ');

  // SVG Area coordinate string (to fill lower gradient bounds)
  const firstX = 0;
  const firstY = svgHeight - ((chartData[0].value - minVal) / (maxVal - minVal)) * (svgHeight - 20) - 10;
  const lastX = svgWidth;
  const lastY = svgHeight - ((chartData[chartData.length - 1].value - minVal) / (maxVal - minVal)) * (svgHeight - 20) - 10;
  const areaPointsString = `${firstX},${svgHeight} ${pointsString} ${lastX},${svgHeight}`;

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const percentX = mouseX / rect.width;
    const dataIndex = Math.round(percentX * (chartData.length - 1));
    const point = chartData[Math.max(0, Math.min(chartData.length - 1, dataIndex))];
    if (point) {
      const x = (dataIndex / (chartData.length - 1)) * rect.width;
      const y = rect.height - ((point.value - minVal) / (maxVal - minVal)) * (rect.height - 20) - 10;
      setHoveredPoint({
        x,
        y,
        val: point.value,
        label: point.label
      });
    }
  };

  const supportSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatMessage('');
    
    setTimeout(() => {
      let reply = "I am processing your secure vault inquiry. Our hardware security modules (HSM) show premium asset level isolation for petflyusa@hotmail.com.";
      if (userMsg.toLowerCase().includes('withdraw') || userMsg.toLowerCase().includes('transfer')) {
        reply = "Initiating ledger clearance options. Your account security score is 3/5. Please activate Google Authenticator details for total clearance.";
      } else if (userMsg.toLowerCase().includes('pnl') || userMsg.toLowerCase().includes('balance')) {
        reply = "Current total estimated balance is 230,980.95 USD, fully locked inside cold multisig reserves. This mirrors our daily cryptographic Proof of Reserves protocol.";
      }
      setChatHistory(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1200);
  };

  if (activeView === 'explorer' && selectedRecord) {
    return (
      <TronExplorerView 
        record={selectedRecord} 
        onBack={() => setActiveView('withdrawal')} 
      />
    );
  }

  return (
    <div id="okx-logged-in-panel" className="bg-[#f5f5f5] text-slate-800 font-sans min-h-screen flex flex-col justify-between selection:bg-black selection:text-[#96ff00]">
      
      {/* 1. STUNNING LIGHT NAVBAR */}
      <nav id="light-master-navbar" className="bg-white border-b border-gray-200 sticky top-0 z-40 px-4 md:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Brand logo & Desktop Links */}
          <div className="flex items-center space-x-6">
            {/* Authentic OKX Wallet Logo in black */}
            <a href="#" className="flex items-center space-x-1.5 mr-2 text-black">
              <svg id="okx-wallet-logo" width="104" height="32" viewBox="0 0 104 32" fill="currentColor" className="h-[21px] w-[68px] tracking-normal shrink-0">
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
              <span className="font-sans text-lg md:text-xl font-extrabold tracking-tight select-none">
                Wallet
              </span>
            </a>

            <div className="hidden lg:flex items-center space-x-1 font-sans text-xs font-semibold text-slate-700">
              <button className="px-3 py-1.5 hover:text-black hover:bg-slate-100 rounded-md flex items-center space-x-0.5">
                <span>Buy crypto</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              <button className="px-3 py-1.5 hover:text-black hover:bg-slate-100 rounded-md">Markets</button>
              <button className="px-3 py-1.5 hover:text-black hover:bg-slate-100 rounded-md flex items-center space-x-0.5">
                <span>Trade</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              <button className="px-3 py-1.5 hover:text-black hover:bg-slate-100 rounded-md flex items-center space-x-0.5">
                <span>Grow</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              <button className="px-3 py-1.5 hover:text-black hover:bg-slate-100 rounded-md flex items-center space-x-0.5">
                <span>Institutional</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              <button className="px-3 py-1.5 hover:text-black hover:bg-slate-100 rounded-md flex items-center space-x-0.5">
                <span>Learn</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              <button className="px-3 py-1.5 hover:text-black hover:bg-slate-100 rounded-md">Orbit</button>
              <button className="px-3 py-1.5 hover:text-black hover:bg-slate-100 rounded-md flex items-center space-x-0.5">
                <span>More</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Right side: Tools, Assets, Profiles & Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Search inputs */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search crypto" 
                className="bg-slate-100 border-none outline-none font-sans pl-9 pr-3 py-1.5 rounded-full text-xs text-slate-800 w-44 hover:bg-slate-200/80 focus:bg-slate-200 focus:w-56 transition-all"
              />
            </div>

            {/* Direct black Deposit */}
            <button className="bg-black hover:bg-slate-800 text-white font-bold text-xs px-4 py-1.5 rounded-full transition-colors cursor-pointer">
              Deposit
            </button>

            {/* Asset panel with interactive hover popup */}
            <div className="relative group/assets hidden sm:block">
              <button className="flex items-center space-x-1 hover:bg-slate-100 rounded-md p-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <span>Assets</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover/assets:rotate-180 transition-transform duration-200" />
              </button>

              {/* Asset Dropdown Popup */}
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 hidden group-hover/assets:block z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                <div className="flex flex-col text-slate-950 font-sans">
                  
                  {/* My assets */}
                  <a href="#" className="flex items-center space-x-4 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="text-black shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-900">My assets</span>
                  </a>

                  {/* Deposit */}
                  <a href="#" className="flex items-center space-x-4 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="text-black shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M12 17V3m-4 10l4 4 4-4" />
                        <path d="M4 17a8 8 0 0 0 16 0" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-900">Deposit</span>
                  </a>

                  {/* Withdraw */}
                  <button 
                    onClick={() => {
                      setActiveSubTab('Funding');
                      setActiveView('withdrawal');
                    }}
                    className="w-full text-left flex items-center space-x-4 px-6 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="text-black shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M12 3v14M8 7l4-4 4 4" />
                        <path d="M4 11a8 8 0 0 0 16 0" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-900">Withdraw</span>
                  </button>

                  {/* Transfer */}
                  <a href="#" className="flex items-center space-x-4 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="text-black shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M17 10H3l4-4" />
                        <path d="M7 14h14l-4 4" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-900">Transfer</span>
                  </a>

                  {/* Analysis */}
                  <a href="#" className="flex items-center space-x-4 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="text-black shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M4 4v16h16" />
                        <path d="M9 15v-4M14 15V8M19 15v-10" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-900">Analysis</span>
                  </a>

                  {/* Order center */}
                  <a href="#" className="flex items-center space-x-4 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="text-black shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="5" y="4" width="14" height="16" rx="2" />
                        <path d="M9 2h6" />
                        <path d="M9 10h6M9 14h6" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-900">Order center</span>
                  </a>

                  {/* My trading fees */}
                  <a href="#" className="flex items-center space-x-4 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="text-black shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <circle cx="6.5" cy="6.5" r="2.5" />
                        <circle cx="17.5" cy="17.5" r="2.5" />
                        <line x1="17.5" y1="6.5" x2="6.5" y2="17.5" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-900">My trading fees</span>
                  </a>

                  {/* PoR reports */}
                  <a href="#" className="flex items-center space-x-4 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="text-black shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="4" y="3" width="16" height="18" rx="2" />
                        <path d="M8 7h8M8 11h8" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-900">PoR reports</span>
                  </a>

                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
              <div className="relative group">
                <button className="w-7 h-7 bg-orange-100 border border-orange-200 rounded-full flex items-center justify-center text-orange-600 transition-colors hover:border-orange-300">
                  <User className="w-4 h-4" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-4 hidden group-hover:block z-50 text-xs">
                  <div className="pb-2 border-b border-slate-100 mb-2">
                    <p className="font-bold text-slate-900 truncate">{userAccount}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Verified Safety Account</p>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left font-bold text-red-500 hover:text-red-600 transition-colors"
                  >
                    Log Out of Session
                  </button>
                </div>
              </div>
            </div>

            {/* General Utilities */}
            <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 hover:text-black">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 hover:text-black">
              <MessageSquare className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 hover:text-black relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 hover:text-black">
              <Globe className="w-4 h-4" />
            </button>

          </div>
        </div>
      </nav>

      {/* 2. SUBTABS LIST AT TOP CONTENT (Overview, Profile, etc) */}
      <div id="light-subnav-panel" className="bg-white border-b border-gray-200 px-4 md:px-6 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex space-x-6 text-xs text-slate-500 font-semibold h-11 items-end">
          {(activeView === 'withdrawal' ? fundingSubTabs : subTabs).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveSubTab(tab);
                if (activeView === 'withdrawal') {
                  if (tab !== 'Funding') {
                    setActiveView('dashboard');
                    setActiveSubTab('Overview');
                  }
                } else {
                  if (tab === 'Funding') {
                    setActiveView('withdrawal');
                  }
                }
              }}
              className={`pb-3 border-b-2 px-1 transition-all inline-block whitespace-nowrap cursor-pointer ${
                activeSubTab === tab 
                  ? 'border-black text-black font-extrabold' 
                  : 'border-transparent hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3. CORE DOUBLE-COLUMN DASHBOARD LAYOUT */}
      {activeView === 'withdrawal' ? (
        <WithdrawalView 
          userAccount={userAccount} 
          onBack={() => {
            setActiveView('dashboard');
            setActiveSubTab('Overview');
          }} 
          currentBalance={currentBalance}
          records={withdrawalRecords}
          onAddRecord={(newRecord) => {
            setWithdrawalRecords(prev => [newRecord, ...prev]);
          }}
          onWithdrawalExecuted={(amount, fee) => {
            setCurrentBalance(prev => Math.max(0, prev - amount));
          }}
          onViewExplorer={(record) => {
            setSelectedRecord(record);
            setActiveView('explorer');
          }}
        />
      ) : (
        <main id="dashboard-main-columns" className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* ==================== LEFT COLUMN: MULTI CARDS AND ESTIMATION ==================== */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* BOX 1: HIGH FIDELITY PROFILE DETAILS */}
            <div id="account-profile-header-card" className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 text-center md:text-left space-y-3 md:space-y-0 w-full md:w-auto">
                
                {/* Visual orange avatar mirror of original photo */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-orange-200 bg-[#e26722]/10 flex items-center justify-center p-0.5">
                  {/* Stylized vector ape avatar art in SVG style */}
                  <svg viewBox="0 0 100 100" className="w-full h-full rounded-full bg-gradient-to-br from-[#eb7734] to-[#c43c16]">
                    <circle cx="50" cy="50" r="45" fill="#e06322" />
                    <circle cx="50" cy="55" r="32" fill="#2d1c15" />
                    {/* Golden eye spectacles / structures */}
                    <circle cx="40" cy="45" r="10" fill="#f58e22" />
                    <circle cx="60" cy="45" r="10" fill="#f58e22" />
                    <circle cx="40" cy="45" r="4" fill="#000" />
                    <circle cx="60" cy="45" r="4" fill="#000" />
                    <path d="M 32 45 Q 50 50 68 45" stroke="#f58e22" strokeWidth="2" fill="none" />
                    {/* Jawline overlay */}
                    <ellipse cx="50" cy="74" rx="14" ry="10" fill="#f2ede8" opacity="0.15" />
                  </svg>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <span className="font-display font-extrabold text-[22px] text-slate-900 leading-none">****988</span>
                    <span className="bg-green-500/10 text-green-600 p-0.5 rounded-full flex items-center justify-center border border-green-500/20 shadow-xs" title="Identity Verified Level 2">
                      <ShieldCheck className="w-3.5 h-3.5 fill-green-500 text-white" />
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 justify-center md:justify-start">
                    <span className="font-mono">214875336776228864</span>
                    <button 
                      onClick={handleCopyUid} 
                      className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-black transition-colors relative"
                      title="Copy User ID Address"
                    >
                      {copiedUid ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                      <AnimatePresence>
                        {copiedUid && (
                          <motion.span 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0 }} 
                            className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap"
                          >
                            Copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-full border border-slate-200 transition-colors">
                  View profile
                </button>
              </div>
            </div>

            {/* BOX 2: ESTIMATED TOTAL VALUE & GRAPH ACCORDING TO SCREENSHOT */}
            <div id="estimated-portfolio-value-card" className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6">
              
              <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-[13px] font-sans font-semibold text-slate-500">
                    <span>Estimated total value</span>
                    <button 
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="text-slate-400 hover:text-slate-800 p-0.5 rounded transition-all"
                    >
                      {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-baseline space-x-1.5">
                    <span className="font-sans font-extrabold text-[42px] tracking-tight text-slate-950 leading-none">
                      {balanceVisible ? currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '•••••'}
                    </span>
                    <span className="text-slate-500 font-semibold text-[15px] flex items-center space-x-0.5">
                      <span>USD</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </span>
                  </div>

                  {/* Today's PnL formatted custom widget */}
                  <div className="flex items-center space-x-1 text-xs">
                    <span className="text-slate-400 border-b border-dashed border-slate-300 pb-0.5">Today's PnL</span>
                    <span className="text-red-500 font-bold px-1.5 py-0.5 rounded-md flex items-center space-x-0.5">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>-$6,336.37 (-2.67%)</span>
                    </span>
                  </div>
                </div>

                {/* Filters timeline button tabs */}
                <div className="flex bg-slate-100 p-1 rounded-full text-[10px] font-bold text-slate-500">
                  {(['1D', '1W', '1M', '6M', '1Y'] as const).map(tf => (
                    <button
                      key={tf}
                      onClick={() => setActiveTimeframe(tf)}
                      className={`px-3.5 py-1.5 rounded-full transition-all ${
                        activeTimeframe === tf 
                          ? 'bg-white text-slate-900 shadow-xs font-black' 
                          : 'hover:text-slate-900'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTION PILL BUTTONS */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                <button className="bg-[#00a223] hover:bg-[#008f1e] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center space-x-1 transition-colors shadow-xs cursor-pointer">
                  <span>Deposit</span>
                </button>
                <button 
                  onClick={() => {
                    setActiveSubTab('Funding');
                    setActiveView('withdrawal');
                  }}
                  className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-full border border-slate-200 flex items-center space-x-1 transition-all cursor-pointer"
                >
                  <span>Withdraw</span>
                </button>
                <button className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-full border border-slate-200 flex items-center space-x-1 transition-all">
                  <span>Transfer</span>
                </button>
                <button className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-full border border-slate-200 flex items-center space-x-1 transition-all">
                  <span>Earn</span>
                </button>
              </div>

              {/* CUSTOM SVG INTERACTIVE LINE CHART */}
              <div className="relative pt-4 border-t border-slate-100 pb-2">
                
                {/* Dotted threshold guidelines as seen in screenshot */}
                <div className="absolute left-0 right-0 top-[28%] border-t border-dashed border-slate-100 flex justify-between px-1 pointer-events-none">
                  <span className="text-[10px] font-mono text-slate-300 translate-y-[-100%]">$244,351.75 (High)</span>
                </div>
                <div className="absolute left-0 right-0 bottom-[18%] border-t border-dashed border-slate-100 flex justify-between px-1 pointer-events-none">
                  <span className="text-[10px] font-mono text-slate-300">$230,456.19 (Low)</span>
                </div>

                <div className="h-[150px] w-full relative">
                  <svg 
                    className="w-full h-full overflow-visible"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <defs>
                      {/* Gradient fill for area */}
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.14" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.00" />
                      </linearGradient>
                    </defs>

                    {/* Shaded Area */}
                    <polygon 
                      points={areaPointsString} 
                      fill="url(#chartGradient)" 
                    />

                    {/* Beautiful red smooth curve line */}
                    <polyline
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={pointsString}
                    />

                    {/* Interactive hover line and tooltips */}
                    {hoveredPoint && (
                      <>
                        <line 
                          x1={hoveredPoint.x} 
                          y1="0" 
                          x2={hoveredPoint.x} 
                          y2={svgHeight} 
                          stroke="#cbd5e1" 
                          strokeWidth="1" 
                          strokeDasharray="4,4" 
                        />
                        <circle 
                          cx={hoveredPoint.x} 
                          cy={hoveredPoint.y} 
                          r="5.5" 
                          fill="#ef4444" 
                          stroke="#fff" 
                          strokeWidth="2.5" 
                          className="shadow-md"
                        />
                      </>
                    )}
                  </svg>
                </div>

                {/* X-axis indicators */}
                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 font-sans px-1 pt-1.5 border-t border-slate-100">
                  <span>15:00</span>
                  <span>19:40</span>
                  <span>00:30</span>
                  <span>05:20</span>
                  <span>10:00</span>
                </div>

                {/* Floating Tooltip info details */}
                <AnimatePresence>
                  {hoveredPoint && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute bg-slate-900 text-white rounded-lg p-2.5 shadow-2xl text-[10px] space-y-0.5 leading-none pointer-events-none"
                      style={{ 
                        left: `${Math.min(85, Math.max(2, (hoveredPoint.x / 600) * 100))}%`, 
                        top: '15px' 
                      }}
                    >
                      <p className="text-slate-400 font-semibold">{hoveredPoint.label} Timestamp</p>
                      <p className="font-extrabold text-[#96ff00] text-sm">${hoveredPoint.val.toFixed(2)} USD</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer link center aligned */}
                <div className="text-center pt-5">
                  <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center space-x-1">
                    <span>View my assets</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* BOX 3: TODAY'S CRYPTO PRICES */}
            <div id="crypto-prices-watchlist-card" className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-3 sm:space-y-0 mb-4 pb-3 border-b border-slate-100">
                <h4 className="text-[16px] font-extrabold text-slate-900 font-sans">Today's crypto prices</h4>
                
                {/* Horizontal Category Switcher */}
                <div className="flex space-x-3 text-xs font-semibold text-slate-400 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
                  {(['Favorites', 'Top', 'Hot', 'Gainers', 'New'] as const).map(tabName => (
                    <button
                      key={tabName}
                      onClick={() => setCryptoTab(tabName)}
                      className={`whitespace-nowrap pb-1.5 border-b-2 transition-all cursor-pointer ${
                        cryptoTab === tabName 
                          ? 'border-black text-black font-extrabold' 
                          : 'border-transparent hover:text-slate-800'
                      }`}
                    >
                      {tabName}
                    </button>
                  ))}
                </div>
              </div>

              {/* WATCHLIST LISTS TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                      <th className="py-2.5">Token</th>
                      <th className="py-2.5">Price</th>
                      <th className="py-2.5 text-right">24h Change</th>
                      <th className="py-2.5 text-right hidden sm:table-cell">24h Volume</th>
                      <th className="py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cryptoAssets.map(asset => (
                      <tr key={asset.symbol} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="py-3">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-7 h-7 bg-slate-100 text-slate-900 rounded-full font-bold flex items-center justify-center text-[10px] group-hover:bg-white border group-hover:border-slate-200 transition-all">
                              {asset.symbol}
                            </div>
                            <div>
                              <div className="font-extrabold text-slate-900">{asset.symbol}</div>
                              <div className="text-[10px] text-slate-400 leading-none">{asset.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 font-semibold text-slate-900">
                          ${asset.price >= 1 
                            ? asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) 
                            : asset.price.toFixed(4)
                          }
                        </td>
                        <td className="py-3 text-right">
                          <span className={`font-bold inline-block px-1.5 py-0.5 rounded ${
                            asset.isUp 
                              ? 'text-green-600 bg-green-500/5' 
                              : 'text-red-500 bg-red-500/5'
                          }`}>
                            {asset.isUp ? '+' : ''}{asset.change}%
                          </span>
                        </td>
                        <td className="py-3 text-right text-slate-500 hidden sm:table-cell font-mono">
                          {asset.vol}
                        </td>
                        <td className="py-3 text-right">
                          <button className="bg-slate-900 hover:bg-black text-white font-bold text-[10px] px-3.5 py-1 rounded-full transition-colors">
                            Trade
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>

          {/* ==================== RIGHT COLUMN: PANELS AND ACCORDIONS ==================== */}
          <div className="space-y-6">
            
            {/* PANEL A: SECURE YOUR ACCOUNT (radial scorecard progress 3/5) */}
            <div id="account-security-scorecard" className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-1.5 pr-2">
                  <h4 className="text-[15px] font-extrabold text-slate-900 font-sans leading-tight">Secure your account</h4>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">
                    Set up 2 more security measures to better protect your account.
                  </p>
                  <button className="text-xs font-bold text-black group hover:underline flex items-center space-x-0.5 pt-1.5">
                    <span>Improve security</span>
                    <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Circular Segmented Progress Ring representation */}
                <div className="relative flex items-center justify-center w-[74px] h-[74px] shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Empty Back circle */}
                    <circle 
                      cx="37" 
                      cy="37" 
                      r="28" 
                      stroke="#f1f5f9" 
                      strokeWidth="5" 
                      fill="transparent" 
                    />
                    {/* Golden segment filled (60% equivalent for 3/5) */}
                    <circle 
                      cx="37" 
                      cy="37" 
                      r="28" 
                      stroke="#df891c" 
                      strokeWidth="5.5" 
                      fill="transparent" 
                      strokeDasharray="175.92" 
                      strokeDashoffset={175.92 * (1 - 3/5)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center font-sans">
                    <span className="text-lg font-black text-slate-900">3<span className="text-slate-400 font-normal text-xs">/5</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* PANEL B: UNLOCK VIP BENEFITS GOLD PANEL */}
            <AnimatePresence>
              {!vipModalClosed && (
                <motion.div 
                  id="unlock-vip-benefits-box"
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  className="bg-white border border-amber-200/60 rounded-2xl p-5 shadow-sm relative overflow-hidden bg-gradient-to-br from-[#fcfaee]/40 to-[#fff]"
                >
                  <button 
                    onClick={() => setVipModalClosed(true)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-4">
                    <button className="text-[14px] font-extrabold text-[#9c6a1e] tracking-tight font-sans inline-flex items-center space-x-1 hover:underline group">
                      <span>Unlock VIP benefits</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-stone-50/80 p-3 rounded-xl border border-stone-100 text-center space-y-1">
                        <Percent className="w-5 h-5 mx-auto text-[#df891c]" />
                        <p className="text-[9px] font-bold text-slate-800 leading-tight">Discounted fees</p>
                      </div>
                      <div className="bg-stone-50/80 p-3 rounded-xl border border-stone-100 text-center space-y-1">
                        <TrendingUp className="w-5 h-5 mx-auto text-[#df891c]" />
                        <p className="text-[9px] font-bold text-slate-800 leading-tight">Boosted yield</p>
                      </div>
                      <div className="bg-stone-50/80 p-3 rounded-xl border border-stone-100 text-center space-y-1">
                        <Star className="w-5 h-5 mx-auto text-[#df891c]" />
                        <p className="text-[9px] font-bold text-slate-800 leading-tight">Priority support</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* PANEL C: OKX SECURITY ASSISTANT BANNER */}
            <div id="security-assistant-card" className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start space-x-3.5">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 border border-slate-200">
                {/* Visual shield and envelopes graphic */}
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-800" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" opacity="0.1" />
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="11" r="2.5" />
                  <path d="M12 13.5v3" />
                </svg>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-extrabold text-slate-900 font-sans uppercase tracking-wider">OKX Security Assistant</h4>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  Protect your account and wallet against malicious apps and digital threats.
                </p>
                <button 
                  onClick={() => setShowChatAssistant(true)}
                  className="text-xs font-bold text-black border-b border-black pb-0.5 hover:opacity-80 transition-opacity inline-flex items-center space-x-0.5"
                >
                  <span>Try now</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* PANEL D: ANNOUNCEMENTS ACCORDION */}
            <div id="announcements-articles-list" className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h4 className="text-[15px] font-extrabold text-slate-900 font-sans">Announcements</h4>
                <a href="#" className="text-xs font-bold text-slate-400 hover:text-black hover:underline flex items-center space-x-0.5">
                  <span>More</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-3.5 divide-y divide-slate-100">
                <div className="space-y-1 pt-0">
                  <span className="text-[9px] font-mono text-slate-400 font-semibold block">05/26/2026</span>
                  <a href="#" className="text-xs font-extrabold text-slate-800 hover:text-slate-950 block hover:underline leading-snug">
                    OKX to delist MAJOR and J spot trading pairs
                  </a>
                </div>

                <div className="space-y-1 pt-3.5">
                  <span className="text-[9px] font-mono text-slate-400 font-semibold block">05/26/2026</span>
                  <a href="#" className="text-xs font-semibold text-slate-700 hover:text-slate-950 block hover:underline leading-snug">
                    OKX to list perpetual futures for AAOI, INFQ and CRWD equities
                  </a>
                </div>

                <div className="space-y-1 pt-3.5">
                  <span className="text-[9px] font-mono text-slate-400 font-semibold block">05/25/2026</span>
                  <a href="#" className="text-xs font-semibold text-slate-700 hover:text-slate-950 block hover:underline leading-snug">
                    OKX to list AVAXUSD, BCHUSD, TONUSD and ZECUSD Expiry Perps (X-Perp)
                  </a>
                </div>

                <div className="space-y-1 pt-3.5">
                  <span className="text-[9px] font-mono text-slate-400 font-semibold block">05/22/2026</span>
                  <a href="#" className="text-xs font-semibold text-slate-700 hover:text-slate-950 block hover:underline leading-snug">
                    OKX x Gensyn (AI) Spot Trade-to-Earn: Trade and Share 500,000 USDT
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
      )}

      {/* 4. COMPREHENSIVE PLATFORM FOOTER */}
      <footer id="dashboard-light-footer" className="bg-white border-t border-gray-200 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px]">&copy; 2026 OKX. Simulated Sandbox Safe ledger ledger protection active.</span>
          </div>
          <div className="flex space-x-4 font-semibold text-slate-500">
            <a href="#" className="hover:text-black transition-colors">Risk Disclamer</a>
            <a href="#" className="hover:text-black transition-colors">Privacy Note</a>
            <a href="#" className="hover:text-black transition-colors">API Agreement</a>
            <a href="#" className="hover:text-black transition-colors">Verification Reserves</a>
          </div>
        </div>
      </footer>

      {/* FLOATING GREEN CUSTOMER SERVICE BUTTON BOTTOM RIGHT */}
      <button 
        id="green-headset-helpline-trigger"
        onClick={() => setShowChatAssistant(!showChatAssistant)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        title="Open OKX Security Assistant"
      >
        <Headphones className="w-5 h-5" />
      </button>

      {/* FLOATING SUPPORT SECURITY CHAT ASSISTANT BOX */}
      <AnimatePresence>
        {showChatAssistant && (
          <motion.div 
            id="chat-assistant-dialog"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 right-6 z-50 bg-white border border-slate-200 rounded-2xl w-80 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#ef4444]/20 flex items-center justify-center border border-[#ef4444]/40">
                  <ShieldCheck className="w-4 h-4 text-[#ef4444]" />
                </div>
                <div>
                  <p className="text-xs font-extrabold leading-none">Security Suite</p>
                  <p className="text-[9px] text-green-400 mt-1 flex items-center space-x-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-ping"></span>
                    <span>Assistant Active</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowChatAssistant(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat list */}
            <div className="p-3.5 h-64 overflow-y-auto space-y-3 bg-slate-50 font-sans text-[11px] flex-grow">
              {chatHistory.map((h, i) => (
                <div key={i} className={`flex ${h.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    h.sender === 'user' 
                      ? 'bg-black text-white rounded-tr-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                  }`}>
                    {h.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <form onSubmit={supportSubmit} className="p-2 border-t border-slate-100 flex items-center space-x-1 bg-white">
              <input 
                type="text" 
                value={chatMessage}
                onChange={e => setChatMessage(e.target.value)}
                placeholder="Ask security, backup or logs..." 
                className="flex-grow scrollbar-none outline-none border-none text-[11px] font-sans text-slate-800 pl-2 py-1 bg-slate-50 rounded-lg hover:bg-slate-100 focus:bg-slate-100"
              />
              <button 
                type="submit" 
                className="bg-black text-white hover:bg-slate-800 rounded-lg p-1.5 cursor-pointer text-[10px] font-bold shrink-0"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
