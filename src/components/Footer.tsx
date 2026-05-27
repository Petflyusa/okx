/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Globe, 
  Coins, 
  ArrowRight,
  Twitter, 
  Youtube, 
  MessageSquare, 
  ChevronDown,
  Github,
  Award
} from 'lucide-react';

export default function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [langDropdown, setLangDropdown] = useState(false);
  const [currDropdown, setCurrDropdown] = useState(false);

  const footerLinks = {
    products: {
      title: 'Products',
      items: ['Buy Crypto', 'Options Market', 'Margin Options', 'Simple Earn Staking', 'OKB Token Launch', 'Copy Pro Trades']
    },
    services: {
      title: 'Services',
      items: ['API Integration Specs', 'Institutional Desks', 'Referral Rewards', 'VIP Broker Clubs', 'OKX Venture Funding', 'Global Campaigns']
    },
    support: {
      title: 'Support',
      items: ['Help Center 24/7', 'Submit Feedback Ticket', 'API Developers Docs', 'Status Network Check', 'Security Reserves Verification']
    },
    about: {
      title: 'About OKX',
      items: ['Career Opportunities', 'Press Releases', 'Privacy Regulations', 'Risk disclosures', 'Service Terms & Licenses']
    }
  };

  return (
    <footer id="okx-footer" className="bg-[#000000] text-gray-400 text-xs py-16 border-t border-dark-border relative z-10 antialiased font-sans">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Main Grid structure linking categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12 text-left">
          
          {/* Logo, Location selectors Column */}
          <div className="col-span-2 space-y-6">
            <a href="#" className="flex items-center space-x-2 w-fit">
              <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                <div className="bg-white rounded-[1px] w-2.5 h-2.5"></div>
                <div className="bg-[#96ff00] rounded-[1px] w-2.5 h-2.5"></div>
                <div className="bg-white rounded-[1px] w-2.5 h-2.5"></div>
                <div className="bg-white rounded-[1px] w-2.5 h-2.5"></div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">OKX</span>
            </a>

            <p className="text-gray-500 max-w-xs leading-relaxed text-[11px]">
              OKX is a world-leading cryptocurrency exchange and Web3 ecological gateway, providing professional security reserves and next-gen derivative indices.
            </p>

            {/* Language and Currency selectors */}
            <div className="flex space-x-3.5 relative">
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  id="footer-lang-btn"
                  onClick={() => {
                    setLangDropdown(!langDropdown);
                    setCurrDropdown(false);
                  }}
                  className="bg-[#101319] hover:bg-[#181d26] border border-dark-border text-white text-xs px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-brand" />
                  <span>{selectedLanguage}</span>
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                </button>
                {langDropdown && (
                  <div className="absolute left-0 bottom-full mb-1.5 w-28 bg-dark-card border border-dark-border rounded-lg p-1.5 shadow-xl space-y-1 z-50 text-left">
                    {['English', 'Español', 'Deutsch', 'Français'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setLangDropdown(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/5 rounded text-[11px] text-gray-300 hover:text-white"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency Selector */}
              <div className="relative">
                <button
                  id="footer-curr-btn"
                  onClick={() => {
                    setCurrDropdown(!currDropdown);
                    setLangDropdown(false);
                  }}
                  className="bg-[#101319] hover:bg-[#181d26] border border-dark-border text-white text-xs px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Coins className="w-3.5 h-3.5 text-brand" />
                  <span>{selectedCurrency}</span>
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                </button>
                {currDropdown && (
                  <div className="absolute left-0 bottom-full mb-1.5 w-28 bg-dark-card border border-dark-border rounded-lg p-1.5 shadow-xl space-y-1 z-50 text-left">
                    {['USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)'].map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setSelectedCurrency(curr.split(' ')[0]);
                          setCurrDropdown(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/5 rounded text-[11px] text-gray-300 hover:text-white"
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Dynamic Map loops linking resources */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] font-display block">
                {section.title}
              </span>
              <ul className="space-y-2.5 text-[11px]">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:text-brand transition-colors block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Separator */}
        <div className="border-t border-[#12161f] pt-8 mt-8"></div>

        {/* Compliance disclaimer - Must exact standard OKX disclaimer */}
        <div className="space-y-4 text-gray-550 text-[10px] text-slate-500 leading-relaxed text-left max-w-5xl">
          <p className="flex items-center text-rose-400 font-bold uppercase tracking-wide gap-1 text-[11px]">
            <Award className="w-4 h-4 text-brand" /> RISK WARNING DISCLOSURE
          </p>
          <p>
            Cryptocurrency investments, derivatives products, futures options, and spot swaps are highly speculative and involve substantial capital hazard. The value of virtual funds is subject to extreme market volatilities, leading to rapid total liquidations. Standard yields listed (including Simple Earn APY percentages) represent structural projections and do not constitute absolute guaranteed yields.
          </p>
          <p>
            Under no conditions shall OKX or our partners be liable for loss of capital. Please consult independent financial risk experts in your regional jurisdiction before registering or establishing security vault addresses. By interacting with this platform, you acknowledge the terms of services and liability limits.
          </p>
        </div>

        {/* Separator */}
        <div className="border-t border-[#12161f] pt-8 mt-8"></div>

        {/* Social media connections and final copy copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
          <div className="flex gap-4 items-center">
            <span>© 2026 OKX.com • All reserves verified.</span>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>

          {/* Social Icons grid */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-brand transition-colors p-1">
              <Twitter className="w-4.5 h-4.5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors p-1">
              <Youtube className="w-4.5 h-4.5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors p-1">
              <MessageSquare className="w-4.5 h-4.5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors p-1">
              <Github className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
