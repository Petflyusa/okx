/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Bell, 
  TrendingUp, 
  Coins, 
  MessageSquare,
  Award,
  Zap
} from 'lucide-react';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TickerSection from './components/TickerSection';
import FeaturesSection from './components/FeaturesSection';
import SecuritySection from './components/SecuritySection';
import AcademySection from './components/AcademySection';
import DownloadSection from './components/DownloadSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { CryptoAsset } from './types';
import DashboardView from './components/DashboardView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'exchange' | 'wallet'>('exchange');
  
  // Auth state
  const [userAccount, setUserAccount] = useState<string | null>(null);
  const [vipLevel, setVipLevel] = useState<string | null>(null);
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [checkedTerms, setCheckedTerms] = useState(true);
  
  const [toastNotification, setToastNotification] = useState<string | null>(
    'SUI Super Staking active: Earn up to 14.8% APY inside Simple Earn pools now.'
  );

  const handleSignUpClick = () => {
    setAuthEmail('');
    setAuthPassword('');
    setAuthModal('signup');
  };

  const handleLoginClick = () => {
    setAuthEmail('petflyusa@hotmail.com');
    setAuthPassword('Jz10191019');
    setAuthModal('login');
  };

  const handleAuthSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!authEmail) return;

    setUserAccount(authEmail);
    // Assign a mock VIP level based on email length/type
    const isVip = authEmail.includes('vip') || authEmail.length > 15;
    setVipLevel(isVip ? 'VIP Tier 3 (Pro)' : 'VIP Tier 1 (Classic)');
    setAuthModal(null);
    
    // Trigger success toast
    setToastNotification(`Welcome back, ${authEmail}! Fully authenticated with advanced portfolio protections active.`);
  };

  const handleFastRegistration = (email: string) => {
    setAuthEmail(email);
    setAuthPassword('');
    setAuthModal('signup');
  };

  const handleTradeSelectedAsset = (asset: CryptoAsset) => {
    // When click trade on any ticker row, we can scroll nicely to the calculator inside HeroSection
    // and tell the user they can trade it!
    const heroCalc = document.getElementById('hero-section');
    if (heroCalc) {
      heroCalc.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update toast notice to inform they can use the fast-swap calculator for their chosen asset
    setToastNotification(`Ready to swap ${asset.symbol}/USDT. Live rate loaded is $${asset.price.toLocaleString()} USD.`);
  };

  if (userAccount) {
    return (
      <DashboardView 
        userAccount={userAccount} 
        onLogout={() => {
          setUserAccount(null);
          setVipLevel(null);
          setToastNotification('Secured sign out executed. Your simulated browser session is clean.');
        }} 
      />
    );
  }

  return (
    <div id="full-viewport-app" className="bg-[#000000] text-white min-h-screen flex flex-col justify-between selection:bg-brand selection:text-black">
      
      {/* Dynamic Toast Notice Bar */}
      <AnimatePresence>
        {toastNotification && (
          <motion.div
            id="global-toast-bar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#12161f] border-b border-dark-border text-xs py-3 px-4 text-center text-white relative flex items-center justify-center space-x-2"
          >
            <Bell className="w-4 h-4 text-brand animate-bounce" />
            <span className="font-medium">{toastNotification}</span>
            <span className="text-gray-500 hidden md:inline">|</span>
            <button
              onClick={() => {
                const url = "https://www.okx.com/";
                setToastNotification(`Direct details found on ${url}`);
              }}
              className="text-brand font-bold hover:underline flex items-center space-x-0.5"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              id="close-toast-btn"
              onClick={() => setToastNotification(null)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Premium Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSignUpClick={handleSignUpClick}
        onLoginClick={handleLoginClick}
      />

      {/* Main Body Layout content */}
      <main className="flex-grow">
        
        {/* Render Switcher info notice if Wallet tab is selected */}
        <AnimatePresence mode="wait">
          {activeTab === 'wallet' && (
            <motion.div
              id="wallet-active-banner"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-brand/10 border-b border-brand/20 py-4 px-6 text-center text-brand"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                  </span>
                  <span className="font-bold">OKX WEB3 WALLET ACCESS MODE:</span>
                  <span className="text-white hidden lg:inline">Non-custodial cryptographic assets, NFTs markets, and custom DApp connections are active below.</span>
                </div>
                <button 
                  onClick={() => setActiveTab('exchange')}
                  className="bg-brand text-black font-extrabold px-3 py-1 rounded-full text-[10px]"
                >
                  Return to Exchange
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <HeroSection onSignUpSubmit={handleFastRegistration} />

        {/* Live Marketplace tickers */}
        <TickerSection onTradeClick={handleTradeSelectedAsset} />

        {/* Bento Grid layout features (Wallet, APY stake, orderbook, copy trades) */}
        <FeaturesSection />

        {/* Security / Proof of reserves audits */}
        <SecuritySection />

        {/* Academy Section search */}
        <AcademySection />

        {/* Mobile companion app promoter */}
        <DownloadSection />

        {/* Structured accordions FAQ */}
        <FAQSection />

      </main>

      {/* Comprehensive multi column risk disclosures footer */}
      <Footer />

      {/* LIGHT AUTHENTICATION OVERLAY MODALS */}
      <AnimatePresence>
        {authModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/85 px-4">
            <motion.div
              id="auth-modal-dialog"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0c0e12] border border-dark-border w-full max-w-md rounded-2xl p-6 sm:p-8 relative text-left"
            >
              {/* Reset modal */}
              <button
                id="modal-close-btn"
                onClick={() => setAuthModal(null)}
                className="absolute top-5 right-5 p-1 rounded-full bg-[#161a23] border border-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                
                {/* Logo and Titles */}
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center space-x-2 justify-center sm:justify-start">
                    <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                      <div className="bg-white rounded-[1px] w-2 h-2"></div>
                      <div className="bg-brand rounded-[1px] w-2 h-2"></div>
                      <div className="bg-white rounded-[1px] w-2 h-2"></div>
                      <div className="bg-white rounded-[1px] w-2 h-2"></div>
                    </div>
                    <span className="font-display font-bold text-lg text-white">OKX Secure portal</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mt-3">
                    {authModal === 'signup' ? 'Create Your Account' : 'Log in to OKX'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {authModal === 'signup' 
                      ? 'Register with phone or email to claim up to $50 in Mystery Boxes!' 
                      : 'Enter credentials to load portfolio balances and ledger allocations.'
                    }
                  </p>
                </div>

                {/* Form elements */}
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500">Email Address / Phone Number</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        id="auth-modal-email-input"
                        type="email"
                        required
                        placeholder="e.g., wallet@okx.com"
                        className="w-full bg-[#101319] hover:bg-[#151922] focus:bg-[#151922] text-white border border-dark-border focus:border-brand rounded-xl pl-10 pr-4 py-3 text-xs outline-none transition-all"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500">Secure Cryptographic Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        id="auth-modal-password-input"
                        type="password"
                        required
                        placeholder="••••••••••••"
                        className="w-full bg-[#101319] hover:bg-[#151922] focus:bg-[#151922] text-white border border-dark-border focus:border-brand rounded-xl pl-10 pr-4 py-3 text-xs outline-none transition-all"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                      />
                    </div>
                    {authModal === 'login' && (
                      <div className="flex justify-end pt-1">
                        <a href="#" className="text-[10px] text-brand hover:underline">Forgot password?</a>
                      </div>
                    )}
                  </div>

                  {/* Terms and conditions checking for Signup */}
                  {authModal === 'signup' && (
                    <div className="flex items-start space-x-2 pt-1 font-sans">
                      <input
                        id="terms-checkbox"
                        type="checkbox"
                        className="mt-1 accent-brand rounded outline-none"
                        checked={checkedTerms}
                        onChange={(e) => setCheckedTerms(e.target.checked)}
                      />
                      <label htmlFor="terms-checkbox" className="text-[10px] text-gray-400 select-none">
                        I certify that I accept OKX's legal <a href="#" className="text-brand hover:underline">Terms of Service</a>, risk disclaimers, privacy manuals, and certify that I am at least 18 years old.
                      </label>
                    </div>
                  )}

                  <button
                    id="auth-modal-submit-btn"
                    type="submit"
                    disabled={authModal === 'signup' && !checkedTerms}
                    className="w-full bg-brand hover:bg-brand-hover disabled:opacity-50 text-black font-semibold rounded-xl py-3.5 mt-2 transition-all duration-200 flex items-center justify-center space-x-1 font-sans text-xs cursor-pointer"
                  >
                    <span>{authModal === 'signup' ? 'Create Account Secured' : 'Authenticate & Unlock Ledger'}</span>
                    <ArrowRight className="w-3.5 h-3.5 fill-black ml-0.5" />
                  </button>
                </form>

                {/* Bottom switcher for LogIn / Registers */}
                <div className="pt-4 border-t border-dark-border/40 text-center text-[11px] text-gray-500">
                  {authModal === 'signup' ? (
                    <span>Already integrated? <button onClick={() => setAuthModal('login')} className="text-brand font-bold hover:underline">Log in now</button></span>
                  ) : (
                    <span>New to OKX safety? <button onClick={() => setAuthModal('signup')} className="text-brand font-bold hover:underline">Register free wallet</button></span>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FIXED VISUAL USER DETAILS CARD BOTTOM LEFT IF SIGNED IN */}
      <AnimatePresence>
        {userAccount && (
          <motion.div
            id="user-vip-status-box"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-6 left-6 z-40 bg-[#12161f] border border-brand/20 p-4 rounded-xl shadow-2xl flex items-center space-x-3.5 text-xs text-left"
          >
            <div className="w-9 h-9 bg-brand/10 border border-brand/20 text-brand rounded-full flex items-center justify-center font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-brand" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-white truncate max-w-[130px] block">{userAccount}</span>
                <span className="bg-brand text-black font-mono font-bold text-[8px] px-1 rounded-sm scale-90">LIVE</span>
              </div>
              <span className="text-[10px] text-gray-400 block font-mono font-normal">
                {vipLevel}
              </span>
            </div>
            
            <button
              id="user-signout-btn"
              onClick={() => {
                setUserAccount(null);
                setVipLevel(null);
                setToastNotification('Secured sign out executed. Your simulated browser session is clean.');
              }}
              className="p-1 text-gray-500 hover:text-white transition-colors text-[10px] font-mono border-l border-dark-border/60 pl-2.5 font-bold"
            >
              LOGOUT
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
