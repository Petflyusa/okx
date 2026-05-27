/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Check, 
  Copy, 
  ExternalLink, 
  X, 
  AlertTriangle, 
  HelpCircle, 
  Download,
  FileText,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

export interface WithdrawalRecord {
  time: string;
  referenceNo: string;
  address: string;
  network: string;
  txId: string;
  crypto: string;
  amount: number;
  fee: number;
  status: 'Sent' | 'Processing' | 'Failed';
}

interface WithdrawalViewProps {
  userAccount: string;
  onBack: () => void;
  currentBalance: number;
  records: WithdrawalRecord[];
  onAddRecord: (newRecord: WithdrawalRecord) => void;
  onWithdrawalExecuted: (amount: number, fee: number) => void;
  onViewExplorer: (record: WithdrawalRecord) => void;
}

export default function WithdrawalView({ 
  userAccount, 
  onBack, 
  currentBalance, 
  records,
  onAddRecord,
  onWithdrawalExecuted,
  onViewExplorer
}: WithdrawalViewProps) {
  // Navigation inside withdrawal
  const [activeHistoryTab, setActiveHistoryTab] = useState<'USDT' | 'All'>('USDT');
  
  // Withdrawal Form States
  const [selectedCrypto, setSelectedCrypto] = useState('USDT');
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);
  const [destinationTab, setDestinationTab] = useState<'onchain' | 'okx'>('onchain');
  const [network, setNetwork] = useState('Tron (TRC20)');
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  
  // Verification security popup
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [googleCode, setGoogleCode] = useState('');
  const [securityError, setSecurityError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);

  // Success screen state
  const [lastExecutedAmount, setLastExecutedAmount] = useState<number>(0);

  // Address book simulation
  const savedAddresses = [
    { label: 'Binance Cold Vault 1', address: 'TDVshdVrSJ9vmtZi4vopbkw2gvPD5xHXUg', network: 'Tron (TRC20)' },
    { label: 'Personal Ledger Nano X', address: 'TKK794NfvLzD8R6p6D8qB9zC77N9V7a3yN', network: 'Tron (TRC20)' },
    { label: 'Metamask Core Wallet', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', network: 'Ethereum (ERC20)' }
  ];
  const [showAddressBook, setShowAddressBook] = useState(false);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    showToast(`Copied ${label} successfully`);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectSuggestedAddress = (addrInfo: typeof savedAddresses[0]) => {
    setAddress(addrInfo.address);
    setNetwork(addrInfo.network);
    setShowAddressBook(false);
    setAddressError('');
  };

  const handleContinue = () => {
    let valid = true;
    
    // Address validation
    if (!address.trim()) {
      setAddressError('Address is required');
      valid = false;
    } else if (address.length < 26) {
      setAddressError('Invalid address structure for Tron (TRC20). Typically starts with "T" and is 34 characters.');
      valid = false;
    } else {
      setAddressError('');
    }

    // Amount validation
    const amtNum = parseFloat(amount);
    if (!amount) {
      setAmountError('Amount is required');
      valid = false;
    } else if (isNaN(amtNum) || amtNum <= 2) {
      setAmountError('Minimum withdrawal amount is 2 USDT');
      valid = false;
    } else if (amtNum > currentBalance) {
      setAmountError(`Insufficient balance. High-threshold safety limit: $${currentBalance.toLocaleString()}`);
      valid = false;
    } else {
      setAmountError('');
    }

    if (valid) {
      setShowSecurityModal(true);
    }
  };

  const handleVerifyRequest = (e: FormEvent) => {
    e.preventDefault();
    setSecurityError('');

    if (!emailCode || emailCode.length < 4) {
      setSecurityError('Please enter a valid 6-digit email security code.');
      return;
    }
    if (!googleCode || googleCode.length < 6) {
      setSecurityError('Please enter your 6-digit Google Authenticator code.');
      return;
    }

    setIsVerifying(true);

    // Simulate cryptographic clearance process
    setTimeout(() => {
      setIsVerifying(false);
      const feeVal = 1.5;
      const amountVal = parseFloat(amount);

      // Execute balance deduction
      onWithdrawalExecuted(amountVal, feeVal);
      setLastExecutedAmount(amountVal);

      // Save into logs
      const newRecord: WithdrawalRecord = {
        time: new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: '2-digit', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        referenceNo: Math.floor(400000000 + Math.random() * 9999999).toString(),
        address: address,
        network: network,
        txId: Math.random().toString(16).substr(2, 6) + '......' + Math.random().toString(16).substr(2, 6),
        crypto: selectedCrypto,
        amount: amountVal,
        fee: feeVal,
        status: 'Processing'
      };

      onAddRecord(newRecord);
      setShowSecurityModal(false);
      setWithdrawalSuccess(true);
      
      // Reset form fields
      setAddress('');
      setAmount('');
    }, 1500);
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-slate-800 pb-16 font-sans">
      
      {/* Toast Notification pop */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white font-semibold text-xs py-3 px-6 rounded-full shadow-2xl z-50 flex items-center space-x-2 border border-slate-800"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        
        {/* Title and Top Header bar */}
        <div className="flex items-center space-x-3 mb-6">
          <button 
            onClick={onBack} 
            className="p-1 px-3 py-1.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50 text-xs font-semibold flex items-center space-x-1 text-slate-600 cursor-pointer shadow-xs"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight font-sans mb-8">Withdrawal</h1>

        {/* Withdrawal Successful Visual Card */}
        <AnimatePresence>
          {withdrawalSuccess && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between"
            >
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-emerald-900 text-base">Withdrawal Order Placed Successfully</h3>
                  <p className="text-emerald-700 text-xs mt-0.5">
                    Your request to withdraw <span className="font-bold">{lastExecutedAmount.toLocaleString()} USDT</span> is currently pending blockchain processing.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setWithdrawalSuccess(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-full transition-colors"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* main Columns grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ================= LEFT SIDE: FORM SECTIONS ================= */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-8 relative">
            
            {/* STEP 1: SELECT CRYPTO */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-emerald-500 flex items-center justify-center text-emerald-600 text-xs font-black">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-extrabold text-slate-950 text-sm tracking-tight text-slate-900">Select crypto</h3>
              </div>

              {/* USDT Selection Dropdown Trigger */}
              <div className="relative">
                <button 
                  onClick={() => setShowCryptoDropdown(!showCryptoDropdown)}
                  className="w-full flex items-center justify-between bg-slate-50 border border-gray-100 rounded-xl px-4 py-3.5 text-left hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#26a17b] flex items-center justify-center text-white text-[9px] font-black shadow-xs shrink-0">
                      ₮
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm">USDT</span>
                      <span className="text-[10px] text-slate-500 ml-2 font-semibold">Tether</span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {showCryptoDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto">
                    <button 
                      onClick={() => { setSelectedCrypto('USDT'); setShowCryptoDropdown(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between border-b border-slate-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-[#26a17b] flex items-center justify-center text-white text-[9px] font-black">₮</div>
                        <span className="font-bold text-xs text-slate-900">USDT</span>
                      </div>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    </button>
                    <button 
                      disabled
                      className="w-full text-left px-4 py-3 opacity-50 flex items-center justify-between border-b border-slate-50 cursor-not-allowed"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-[#f3ba2f] flex items-center justify-center text-white text-xs font-black">₿</div>
                        <span className="font-bold text-xs text-slate-500">BTC (No balance)</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 2: SET DESTINATION */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center text-white text-xs font-black">
                  2
                </div>
                <h3 className="font-extrabold text-slate-950 text-sm tracking-tight text-slate-900">Set destination</h3>
              </div>

              {/* tabs: On-chain / OKX Internal */}
              <div className="flex border-b border-slate-100 text-xs font-bold text-slate-400">
                <button 
                  onClick={() => setDestinationTab('onchain')}
                  className={`pb-2.5 px-4 pr-6 border-b-2 transition-all cursor-pointer ${destinationTab === 'onchain' ? 'border-slate-950 text-slate-950 font-black' : 'border-transparent hover:text-slate-600'}`}
                >
                  On-chain addresses
                </button>
                <button 
                  onClick={() => setDestinationTab('okx')}
                  className={`pb-2.5 px-4 pr-6 border-b-2 transition-all cursor-pointer ${destinationTab === 'okx' ? 'border-slate-950 text-slate-950 font-black' : 'border-transparent hover:text-slate-600'}`}
                >
                  OKX users
                </button>
              </div>

              {destinationTab === 'onchain' ? (
                <div className="space-y-5">
                  
                  {/* Network Selection Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-400">Network</label>
                    <div className="relative">
                      <button 
                        onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                        className="w-full flex items-center justify-between bg-slate-50 border border-gray-100 rounded-xl px-4 py-3 text-left hover:border-slate-200 transition-all cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-[#eb3d28]/10 text-[#eb3d28] flex items-center justify-center text-[8px] font-black border border-red-200">
                            TRX
                          </div>
                          <span className="text-xs font-bold text-slate-800">{network}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-bold">Fee 1.5 USDT</span>
                          <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 shrink-0" onClick={(e) => { e.stopPropagation(); setNetwork('(Select Network)'); }} />
                        </div>
                      </button>

                      {showNetworkDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-30 overflow-hidden">
                          <button 
                            onClick={() => { setNetwork('Tron (TRC20)'); setShowNetworkDropdown(false); }}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold border-b border-light"
                          >
                            <span className="text-slate-800">Tron (TRC20) <span className="text-[10px] text-slate-400 ml-2">(Estimated time: ~2 mins)</span></span>
                            <span className="text-slate-500 font-bold font-mono">1.5 USDT</span>
                          </button>
                          <button 
                            onClick={() => { setNetwork('Ethereum (ERC20)'); setShowNetworkDropdown(false); }}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold"
                          >
                            <span className="text-slate-800">Ethereum (ERC20) <span className="text-[10px] text-slate-400 ml-2">(Estimated time: ~5 mins)</span></span>
                            <span className="text-slate-500 font-bold font-mono">15.0 USDT</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address Field (with Suggestion trigger) */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-semibold text-slate-400">Address</label>
                      <button 
                        onClick={() => setShowAddressBook(!showAddressBook)}
                        className="text-slate-800 hover:text-black font-extrabold flex items-center space-x-0.5 cursor-pointer"
                      >
                        <span>Manage address book &gt;</span>
                      </button>
                    </div>

                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="Enter address or select from address book"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value); setAddressError(''); }}
                        className={`w-full bg-slate-50 border ${addressError ? 'border-red-400 focus:ring-red-500' : 'border-gray-100 focus:border-slate-300'} rounded-xl px-4 py-3.5 text-xs text-slate-900 outline-none font-semibold focus:bg-white focus:ring-1 focus:ring-slate-300 transition-all pr-10`}
                      />
                      <button 
                        onClick={() => setShowAddressBook(!showAddressBook)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-200/50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {addressError && (
                      <p className="text-red-500 font-bold text-[11px] flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{addressError}</span>
                      </p>
                    )}

                    {/* Quick address selection suggestions */}
                    {showAddressBook && (
                      <div className="border border-slate-100 rounded-xl bg-slate-50/50 p-3 mt-1 space-y-2 animate-in fade-in duration-100">
                        <p className="text-[10px] font-bold text-slate-400">SELECT FROM WALLET ADDRESSES</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {savedAddresses.map((sa, idx) => (
                            <button
                              key={idx}
                              onClick={() => selectSuggestedAddress(sa)}
                              className="text-left bg-white p-2.5 border border-slate-100 rounded-lg hover:border-slate-300 transition-colors shadow-2xs group flex flex-col space-y-0.5 text-xs"
                            >
                              <div className="flex justify-between items-center w-full">
                                <span className="font-black text-slate-800">{sa.label}</span>
                                <span className="text-[9px] bg-slate-100 text-slate-500 px-1 py-0.2 rounded font-mono">{sa.network}</span>
                              </div>
                              <span className="font-mono text-[10px] text-slate-400 truncate w-full">{sa.address}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-medium text-slate-500 leading-relaxed">
                  OKX Internal Withdrawals are secure, commission-free transfers to other security cleared OKX user panels directly inside our centralized network.
                </div>
              )}
            </div>

            {/* STEP 3: SET WITHDRAWAL AMOUNT */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center text-white text-xs font-black">
                  3
                </div>
                <h3 className="font-extrabold text-slate-950 text-sm tracking-tight text-slate-900">Set withdrawal amount</h3>
              </div>

              <div className="space-y-3">
                
                {/* Available balance indicator */}
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400">Amount</span>
                  <span className="text-slate-500 font-semibold">
                    Available: <span className="font-extrabold text-slate-800">{currentBalance.toLocaleString()} USDT</span>
                  </span>
                </div>

                {/* Amount input box */}
                <div className="relative">
                  <input 
                    type="number"
                    placeholder="Min 2 USDT"
                    value={amount}
                    onChange={(e) => { setAmount(e.target.value); setAmountError(''); }}
                    className={`w-full bg-slate-50 border ${amountError ? 'border-red-400 focus:ring-red-500' : 'border-gray-100 focus:border-slate-300'} rounded-xl px-4 py-3.5 text-xs text-slate-900 outline-none font-semibold focus:bg-white focus:ring-1 focus:ring-slate-300 transition-all pr-20`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-950">USDT</span>
                    <button 
                      onClick={() => { setAmount(Math.max(0, currentBalance - 1.5).toFixed(2)); setAmountError(''); }}
                      className="bg-slate-100 hover:bg-slate-200 text-[10px] font-black tracking-wider px-2 py-1 rounded text-slate-800 cursor-pointer"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                {amountError && (
                  <p className="text-red-500 font-bold text-[11px] flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{amountError}</span>
                  </p>
                )}

                <div className="bg-slate-50 rounded-xl p-3 text-[10px] font-semibold text-slate-400 flex flex-col space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal Amount:</span>
                    <span className="text-slate-800 font-extrabold">{amount ? parseFloat(amount).toLocaleString() : '0.00'} USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Fee:</span>
                    <span className="text-slate-800 font-extrabold">1.50 USDT</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200/60 pt-1 mt-1 text-slate-500">
                    <span>You receive (Estimated):</span>
                    <span className="text-slate-900 font-black text-xs">
                      {amount && parseFloat(amount) > 1.5 ? (parseFloat(amount) - 1.5).toLocaleString() : '0.00'} USDT
                    </span>
                  </div>
                </div>

                {/* Continue Withdrawal Button */}
                <button 
                  onClick={handleContinue}
                  className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black text-xs py-4 rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 text-center"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Submit withdrawal clearance</span>
                </button>

              </div>
            </div>

          </div>

          {/* ================= RIGHT SIDE: FAQ & LIMIT INFO ================= */}
          <div className="space-y-6">
            
            {/* FAQ CARD */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h4 className="font-extrabold text-slate-900 text-sm tracking-tight mb-4">FAQ</h4>
              <div className="space-y-4 text-xs font-bold text-slate-700">
                <div className="pb-3 border-b border-slate-50">
                  <p className="hover:text-black transition-colors cursor-pointer">How do I make a withdrawal?</p>
                </div>
                <div className="pb-3 border-b border-slate-50">
                  <p className="hover:text-black transition-colors cursor-pointer">Why have I still not received my withdrawal?</p>
                </div>
                <div className="pb-3 border-b border-slate-50">
                  <p className="hover:text-black transition-colors cursor-pointer">How do I select the correct network for my crypto withdrawals and deposits?</p>
                </div>
                <div className="pb-1">
                  <p className="hover:text-black transition-colors cursor-pointer">Do I need to pay fees for deposit and withdrawal?</p>
                </div>
              </div>
            </div>

            {/* LIMITS INFO CARD */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase">24h available limit</span>
              <div className="text-slate-800 text-xs font-bold">
                <span className="text-sm font-black text-slate-950">10,015,223.13</span> / 10,015,223.13 USDT
              </div>
            </div>

          </div>

        </div>

        {/* ================= BOTTOM WORKFLOWS: RECORDS TABLE ================= */}
        <div id="withdrawal-records-container" className="mt-12 bg-white border border-slate-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-100 mb-6 gap-4">
            <div className="flex space-x-4 border-b border-slate-100 md:border-b-0 w-full md:w-auto text-xs font-bold text-slate-400">
              <button 
                onClick={() => setActiveHistoryTab('USDT')}
                className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${activeHistoryTab === 'USDT' ? 'border-black text-black font-extrabold' : 'border-transparent hover:text-slate-600'}`}
              >
                USDT withdrawals
              </button>
              <button 
                onClick={() => setActiveHistoryTab('All')}
                className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${activeHistoryTab === 'All' ? 'border-black text-black font-extrabold' : 'border-transparent hover:text-slate-600'}`}
              >
                All withdrawals
              </button>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button className="flex items-center space-x-1 hover:bg-slate-50 border border-slate-250 text-slate-600 rounded-md p-1.5 px-3 text-[11px] font-bold transition-all shadow-2xs">
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-1 hover:bg-slate-50 border border-slate-255 text-slate-600 rounded-md p-1.5 px-3 text-[11px] font-bold transition-all shadow-2xs">
                <FileText className="w-3.5 h-3.5" />
                <span>View history</span>
              </button>
            </div>
          </div>

          {/* TABLE LOGS */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 font-semibold border-collapse">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 text-[11px]">
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Reference no.</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Crypto</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4 text-right">Fee</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {records.map((rec, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {rec.time}
                    </td>
                    <td className="py-4 px-4 text-slate-700">
                      {rec.referenceNo}
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1.5 font-mono text-[11px] text-slate-800">
                          <span className="truncate max-w-[200px] inline-block">{rec.address}</span>
                          <button 
                            onClick={() => copyToClipboard(rec.address, 'withdrawal address')}
                            className="p-0.5 hover:bg-slate-200/60 rounded text-slate-400 hover:text-slate-800 transition-colors shrink-0"
                            title="Copy Address"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="inline-block text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-bold">
                          {rec.network}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1 font-mono text-[11px] text-slate-500">
                        <span>{rec.txId}</span>
                        {rec.status === 'Sent' && (
                          <button 
                            onClick={() => copyToClipboard(rec.txId, 'TX ID')}
                            className="p-0.5 hover:bg-slate-200/60 rounded text-slate-400 hover:text-slate-800 transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        )}
                        <ExternalLink 
                          onClick={() => onViewExplorer(rec)}
                          className="w-3 h-3 text-slate-300 shrink-0 select-none hover:text-amber-500 hover:scale-110 active:scale-95 transition-all cursor-pointer" 
                          title="View on TRON Explorer"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800">
                      {rec.crypto}
                    </td>
                    <td className="py-4 px-4 font-extrabold text-slate-900 font-mono">
                      {rec.amount}
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-slate-500">
                      {rec.fee}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide ${
                        rec.status === 'Sent' 
                          ? 'bg-green-150 text-green-700' 
                          : rec.status === 'Processing' 
                          ? 'bg-amber-100/80 text-amber-700 animate-pulse' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* ================= SECURITY VALIDATION OTP POPUP MODAL ================= */}
      <AnimatePresence>
        {showSecurityModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md shadow-2xl relative overflow-hidden font-sans"
            >
              <button 
                onClick={() => setShowSecurityModal(false)}
                className="absolute right-4 top-4 p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 pb-4">
                <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-white mx-auto mb-3 shadow-xs">
                  <Lock className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-black tracking-tight text-slate-950">Security Verification</h3>
                <p className="text-slate-400 text-xs mt-1">Please authorize your asset clearance details securely.</p>
              </div>

              <form onSubmit={handleVerifyRequest} className="space-y-4">
                
                {/* Email OTP Field */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-500">Email verification code</label>
                    <button 
                      type="button" 
                      onClick={() => showToast('Security code dispatched to lisaisaacmed@gmail.com')}
                      className="text-amber-500 hover:text-amber-600 font-extrabold cursor-pointer"
                    >
                      Send code
                    </button>
                  </div>
                  <input 
                    type="password"
                    placeholder="Enter 6-digit email security code"
                    maxLength={6}
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none font-bold text-slate-800 focus:bg-white focus:border-slate-350 transition-all font-mono text-center tracking-widest"
                  />
                  <span className="block text-[10px] text-slate-400 text-right">Sent to lisaisaacmed@gmail.com</span>
                </div>

                {/* Authenticator Field */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-500">Google Authenticator code</label>
                  <input 
                    type="text"
                    placeholder="Enter 6-digit authenticator code"
                    maxLength={6}
                    value={googleCode}
                    onChange={(e) => setGoogleCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none font-bold text-slate-800 focus:bg-white focus:border-slate-350 transition-all font-mono text-center tracking-widest"
                  />
                </div>

                {securityError && (
                  <p className="text-red-500 text-center font-bold text-xs flex items-center justify-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{securityError}</span>
                  </p>
                )}

                {/* Submit Verification Button */}
                <button 
                  type="submit"
                  disabled={isVerifying}
                  className="w-full bg-slate-950 hover:bg-slate-900 disabled:bg-slate-300 text-white font-black text-xs py-3.5 rounded-xl cursor-pointer hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  {isVerifying ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Clearing ledger authorization...</span>
                    </>
                  ) : (
                    <span>Confirm secure withdraw</span>
                  )}
                </button>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
