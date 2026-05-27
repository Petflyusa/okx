/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq1');

  const faqs: FAQItem[] = [
    {
      id: 'faq1',
      question: 'How do I buy Bitcoin or other crypto on OKX?',
      answer: 'Buying crypto on OKX is fast and frictionless. You can purchase instantly via wire transfers, credit/debit cards, or Google Play/Apple Pay from the "Express Buy" widget in the Hero Section. Alternatively, trade assets via our Peer-to-Peer (P2P) desks with zero broker-level fees.'
    },
    {
      id: 'faq2',
      question: 'Is my digital crypto portfolio protected on OKX?',
      answer: 'Yes. OKX keeps more than 95% of digital investor assets in off-grid, air-gapped cold storage vaults, utilizing high-level multi-signature authentication protocols. In addition, we publishes clean 1:1 ratio Proof of Reserves audited monthly on-chain.'
    },
    {
      id: 'faq3',
      question: 'What is the structural difference between OKX Exchange and OKX Web3 Wallet?',
      answer: 'The OKX Exchange is a centralized trading hub that stores your coins on our highly secure internal ledger, allowing high-leverage trades and fast grid order books. The OKX Web3 Wallet is a non-custodial gateway where you own 100% of your private keys and seed phrases, unlocking DApps across 80+ networks directly.'
    },
    {
      id: 'faq4',
      question: 'Are there hidden deposit or withdraw fees?',
      answer: 'OKX features extremely low, transparent market maker and taker fees starting at just 0.08% to 0.1%. Deposits have zero exchange fee overheads, and cryptocurrency withdrawal fees correspond directly to standard network gas fees with no added surcharges.'
    }
  ];

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="bg-[#0b0e12] text-white py-16 border-b border-dark-border">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex p-2 bg-brand/15 text-brand rounded-full border border-brand/20">
            <HelpCircle className="w-5 h-5 animate-pulse" />
          </div>
          <h2 className="font-display font-medium text-2xl sm:text-3xl tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
            Everything you need to know about registers, reserve assets, trade rules, and custodial configurations.
          </p>
        </div>

        {/* FAQs list */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-dark-card border border-dark-border/65 hover:border-dark-border rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => handleToggle(faq.id)}
                  className="w-full flex justify-between items-center p-5 text-left text-sm sm:text-base font-bold text-white transition-colors hover:text-brand"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-brand' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-350 text-gray-400 text-xs sm:text-sm leading-relaxed border-t border-dark-border/40 text-left">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Help Center footer card */}
        <div className="mt-10 bg-[#12161f] border border-dark-border p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
          <div className="space-y-1">
            <span className="text-white font-bold text-sm block font-sans">Still have unanswered queries?</span>
            <p className="text-xs text-gray-400">Our customer desk is active 24/7 to support deposit allocations and security queries.</p>
          </div>
          <button className="w-full sm:w-auto bg-white text-black hover:bg-slate-200 font-semibold text-xs px-5 py-2.5 rounded-full transition-all hover:scale-[1.01] flex items-center justify-center space-x-1 flex-shrink-0 cursor-pointer">
            <span>Access Customer Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
