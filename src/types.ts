/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  sparkline: number[];
  category: 'hot' | 'new' | 'gainers' | 'volume';
}

export interface CopyTrader {
  id: string;
  name: string;
  avatar: string;
  roi: number; // e.g. 182.4 for 182.4%
  winRate: number; // e.g. 96.5 for 96.5%
  copiers: number;
  maxCopiers: number;
  days: number;
  recentAssets: string[];
}

export interface LearnArticle {
  id: string;
  title: string;
  category: 'Beginners' | 'Trading Pro' | 'Web3 Guides' | 'Market Insights';
  readTime: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
