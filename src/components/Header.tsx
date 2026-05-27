/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Globe, 
  Search, 
  ArrowRight, 
  QrCode, 
  Flame, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  Wallet, 
  Coins, 
  Award,
  BookOpen,
  Cpu
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'exchange' | 'wallet';
  setActiveTab: (tab: 'exchange' | 'wallet') => void;
  onSignUpClick: () => void;
  onLoginClick: () => void;
}

export default function Header({ activeTab, setActiveTab, onSignUpClick, onLoginClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = {
    buy: {
      title: 'Buy Crypto',
      badge: 'PROMO',
      links: [
        { name: 'Express buy', desc: 'Buy BTC, ETH, USDT with card or mobile wall', icon: Coins },
        { name: 'P2P trading', desc: 'Zero fee peer-to-peer crypto market', icon: ShieldCheck },
        { name: 'Third-party payment', desc: 'Buy crypto via Banxa, MoonPay, Simplex', icon: Layers }
      ]
    },
    discover: {
      title: 'Discover',
      links: [
        { name: 'Markets', desc: 'Real-time crypto prices, volumes, and data', icon: TrendingUp },
        { name: 'Copy Trading', desc: 'Copy top performing trades & earn profits', icon: Flame, highlight: true },
        { name: 'Crypto Converter', desc: 'Instant swap between 100+ assets with zero fees', icon: Layers },
        { name: 'Academy', desc: 'Free guides, articles, and video tutorials', icon: BookOpen }
      ]
    },
    trade: {
      title: 'Trade',
      links: [
        { name: 'Spot Trading', desc: 'Buy and sell 300+ crypto tokens instantly', icon: Coins },
        { name: 'Margin Trading', desc: 'Amplify profits with leveraged margin accounts', icon: Layers },
        { name: 'Futures & Options', desc: 'Sleek derivative products with up to 125x leverage', icon: Cpu },
        { name: 'Trading Bots', desc: 'Grid, DCA, and arbitrage automated execution', icon: Cpu }
      ]
    },
    grow: {
      title: 'Grow',
      links: [
        { name: 'Simple Earn', desc: 'Locked or flexible deposits with high yield APY', icon: Award },
        { name: 'On-chain Earn', desc: 'Participate in secure staking & DeFi directly', icon: Wallet },
        { name: 'Crypto Loans', desc: 'Borrow USDT using your crypto portfolio as collateral', icon: ShieldCheck }
      ]
    }
  };

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <header id="okx-header" className="sticky top-0 z-50 bg-[#000000] border-b border-dark-border backdrop-blur-md bg-opacity-95">
      {/* Top Bar for Switcher */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
        {/* Left Side: Logo & Exchange/Wallet Switcher */}
        <div className="flex items-center space-x-6">
          {/* Authentic OKX Logo Grid Icon + Lettering */}
          <a href="#" className="flex items-center space-x-2 mr-2">
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
              <div className="bg-white rounded-[1px] w-2.5 h-2.5"></div>
              <div className="bg-brand rounded-[1px] w-2.5 h-2.5"></div>
              <div className="bg-white rounded-[1px] w-2.5 h-2.5"></div>
              <div className="bg-white rounded-[1px] w-2.5 h-2.5"></div>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">OKX</span>
          </a>

          {/* Switcher Tabs - Dynamic and Sleek */}
          <div className="hidden md:flex items-center bg-[#101319] p-1 rounded-full text-xs font-semibold">
            <button
              id="switch-exchange-btn"
              onClick={() => setActiveTab('exchange')}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                activeTab === 'exchange'
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Exchange
            </button>
            <button
              id="switch-wallet-btn"
              onClick={() => setActiveTab('wallet')}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 flex items-center space-x-1 ${
                activeTab === 'wallet'
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Web3 Wallet</span>
              <span className="text-[9px] bg-brand text-black px-1 rounded-sm scale-90 font-mono">NEW</span>
            </button>
          </div>

          {/* Main Desktop Navigation Items */}
          <nav className="hidden xl:flex items-center space-x-1">
            {Object.entries(menuItems).map(([key, item]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  id={`nav-dropdown-${key}`}
                  className="px-3.5 py-4 text-[14px] font-medium text-gray-300 hover:text-white flex items-center space-x-1 transition-colors"
                >
                  <span>{item.title}</span>
                  {('badge' in item) && (
                    <span className="text-[10px] bg-brand text-black px-1.5 py-0.2 rounded-full font-bold ml-1">
                      {item.badge}
                    </span>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180 text-brand' : 'text-gray-500'}`} />
                </button>

                {/* Dropdown Menu Overlay */}
                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      id={`menu-${key}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-0 w-[420px] bg-[#0c0e12] border border-dark-border rounded-xl shadow-2xl p-4 grid gap-3 z-50 text-left"
                    >
                      <div className="text-xs uppercase font-mono tracking-wider text-gray-400 border-b border-dark-border pb-2 mb-1 flex justify-between items-center">
                        <span>{item.title} Solutions</span>
                        <span className="text-brand flex items-center space-x-1 cursor-pointer hover:underline text-[10px]">
                          <span>View All</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                      {item.links.map((link, idx) => {
                        const IconComponent = link.icon;
                        return (
                          <a
                            key={idx}
                            href="#"
                            className={`group flex items-start space-x-3.5 p-2 rounded-lg transition-all duration-200 ${
                              link.highlight 
                                ? 'bg-brand/5 border border-brand/10 hover:bg-brand/10' 
                                : 'hover:bg-white/5'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${link.highlight ? 'bg-brand text-black' : 'bg-[#181a20] text-gray-300 group-hover:text-brand transition-colors'}`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-1.5">
                                <span className="font-semibold text-[14px] text-white group-hover:text-brand transition-colors">
                                  {link.name}
                                </span>
                                {link.highlight && (
                                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] px-1 rounded">HOT</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed group-hover:text-gray-300">
                                {link.desc}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <a href="#" className="px-3.5 py-4 text-[14px] font-medium text-gray-300 hover:text-white transition-colors">
              Web3
            </a>
            <a href="#" className="px-3.5 py-4 text-[14px] font-medium text-gray-300 hover:text-white transition-colors">
              Institutional
            </a>
          </nav>
        </div>

        {/* Right Side: Tools, Log In, Sign Up, App Download */}
        <div className="flex items-center space-x-3.5">
          {/* Global Search and Language Button */}
          <div className="hidden lg:flex items-center space-x-1">
            <button id="search-toggle" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
              <Search className="w-4.5 h-4.5" />
            </button>
            <button id="lang-toggle" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors flex items-center space-x-1">
              <Globe className="w-4.5 h-4.5" />
              <span className="text-xs font-semibold">EN</span>
            </button>
          </div>

          {/* App download dropdown icon */}
          <div className="hidden md:block relative group">
            <button id="download-app-btn" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors flex items-center space-x-1">
              <QrCode className="w-4.5 h-4.5" />
              <span className="text-xs font-semibold">App</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-64 bg-[#0c0e12] border border-dark-border rounded-xl shadow-2xl p-4 hidden group-hover:block z-50 animate-fade-in text-center">
              <p className="text-xs font-semibold text-white mb-2">Scan code to download OKX App</p>
              <div className="bg-white p-2.5 rounded-lg w-32 h-32 mx-auto mb-2 flex items-center justify-center">
                {/* Simulated QR Code */}
                <div className="relative w-full h-full bg-cover bg-center flex flex-col justify-between p-1">
                  <div className="grid grid-cols-5 gap-1.5 w-full h-full opacity-90">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded-[1px] ${
                          (i % 3 === 0 || i % 7 === 0 || i < 5 || i > 20 || i % 5 === 0) 
                            ? i === 12 ? 'bg-brand' : 'bg-black' 
                            : 'bg-transparent'
                        }`}
                      ></div>
                    ))}
                  </div>
                  {/* OKX small badge in center of QR */}
                  <div className="absolute inset-0 m-auto w-7 h-7 bg-black border border-white rounded flex items-center justify-center">
                    <span className="font-display font-black text-[8px] text-white">OKX</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-400">Scan using iOS or Android to trade anytime</p>
            </div>
          </div>

          {/* Log in Button */}
          <button
            id="header-login-btn"
            onClick={onLoginClick}
            className="text-[14px] font-semibold text-white px-3.5 py-1.5 rounded-full hover:bg-white/5 transition-colors"
          >
            Log in
          </button>

          {/* Sign up Button - Neon Lime Green */}
          <button
            id="header-signup-btn"
            onClick={onSignUpClick}
            className="text-[14px] font-semibold bg-brand hover:bg-brand-hover text-black px-4 py-1.5 rounded-full transition-all hover:scale-[1.03] duration-200"
          >
            Sign up
          </button>

          {/* Hamburger Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden border-t border-dark-border bg-[#000000] px-4 py-6 overflow-y-auto max-h-[85vh]"
          >
            {/* Short Switcher for Exchange/Wallet on Mobile */}
            <div className="flex items-center bg-[#101319] p-1 rounded-full text-xs font-semibold mb-6">
              <button
                onClick={() => {
                  setActiveTab('exchange');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 rounded-full text-center transition-all ${
                  activeTab === 'exchange' ? 'bg-white text-black' : 'text-gray-400'
                }`}
              >
                Exchange
              </button>
              <button
                onClick={() => {
                  setActiveTab('wallet');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 rounded-full text-center transition-all ${
                  activeTab === 'wallet' ? 'bg-white text-black' : 'text-gray-400'
                }`}
              >
                Web3 Wallet
              </button>
            </div>

            {/* Links and Collapsible Sections */}
            <div className="space-y-4">
              {Object.entries(menuItems).map(([key, item]) => (
                <div key={key} className="border-b border-dark-border/40 pb-3">
                  <button
                    onClick={() => toggleDropdown(key)}
                    className="w-full flex justify-between items-center py-2 text-white font-semibold text-lg"
                  >
                    <span>{item.title}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180 text-brand' : 'text-gray-400'}`} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pl-2 space-y-3.5"
                      >
                        {item.links.map((link, idx) => (
                          <a key={idx} href="#" className="block py-1 hover:text-brand">
                            <div className="font-medium text-[14px] text-white flex items-center space-x-1">
                              <span>{link.name}</span>
                              {link.highlight && <span className="bg-brand text-black text-[8px] font-bold px-1 rounded">HOT</span>}
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{link.desc}</p>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <a href="#" className="block py-2 text-white font-semibold text-lg border-b border-dark-border/40 pb-3">
                Web3
              </a>
              <a href="#" className="block py-2 text-white font-semibold text-lg border-b border-dark-border/40 pb-3">
                Institutional
              </a>
            </div>

            {/* Log in & Sign Up Mobile CTA */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLoginClick();
                }}
                className="w-full py-3 rounded-full border border-gray-600 text-white font-semibold text-center hover:bg-white/5"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignUpClick();
                }}
                className="w-full py-3 rounded-full bg-brand text-black font-semibold text-center hover:bg-brand-hover"
              >
                Sign up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
