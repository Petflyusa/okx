/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, ReactNode, createElement } from 'react';

export type Language = 'EN' | 'ZH';

export interface TranslationMap {
  [key: string]: {
    EN: string;
    ZH: string;
  };
}

export const translations: TranslationMap = {
  // Global & General
  learnMore: {
    EN: 'Learn More',
    ZH: '了解更多'
  },
  wallet: {
    EN: 'Wallet',
    ZH: 'Web3 錢包'
  },
  exchange: {
    EN: 'Exchange',
    ZH: '交易平台'
  },
  web3Wallet: {
    EN: 'Web3 Wallet',
    ZH: 'Web3 錢包'
  },
  login: {
    EN: 'Log in',
    ZH: '登入'
  },
  signup: {
    EN: 'Sign up',
    ZH: '註冊'
  },
  institutional: {
    EN: 'Institutional',
    ZH: '機構服務'
  },
  promoActive: {
    EN: 'SUI Super Staking active: Earn up to 14.8% APY inside Simple Earn pools now.',
    ZH: 'SUI 超級質押已啟動：立即在簡單賺幣產品中賺取高達 14.8% 的年化收益率。'
  },

  // Header Dropdowns
  buyTitle: {
    EN: 'Buy Crypto',
    ZH: '購買加密貨幣'
  },
  buyProDesc: {
    EN: 'Buy BTC, ETH, USDT with card or mobile wallet',
    ZH: '使用信用卡或行動錢包輕鬆購買 BTC、ETH、USDT'
  },
  p2pTitle: {
    EN: 'P2P trading',
    ZH: 'C2C 買幣'
  },
  p2pDesc: {
    EN: 'Zero fee peer-to-peer crypto market',
    ZH: '零手續費的點對點加密貨幣市場'
  },
  thirdPartyTitle: {
    EN: 'Third-party payment',
    ZH: '第三方支付'
  },
  thirdPartyDesc: {
    EN: 'Buy crypto via Banxa, MoonPay, Simplex',
    ZH: '透過 Banxa、MoonPay、Simplex 等購買加密貨幣'
  },
  discoverTitle: {
    EN: 'Discover',
    ZH: '發現'
  },
  marketsTitle: {
    EN: 'Markets',
    ZH: '市場'
  },
  marketsDesc: {
    EN: 'Real-time crypto prices, volumes, and data',
    ZH: '即時加密貨幣價格、交易量及市場數據'
  },
  copyTradingTitle: {
    EN: 'Copy Trading',
    ZH: '跟單交易'
  },
  copyTradingDesc: {
    EN: 'Copy top performing trades & earn profits',
    ZH: '複製頂尖交易員的操盤，輕鬆獲取收益'
  },
  converterTitle: {
    EN: 'Crypto Converter',
    ZH: '閃兌'
  },
  converterDesc: {
    EN: 'Instant swap between 100+ assets with zero fees',
    ZH: '在 100 多種資產之間進行零手續費即時兌換'
  },
  academyTitle: {
    EN: 'Academy',
    ZH: '新手學院'
  },
  academyDesc: {
    EN: 'Free guides, articles, and video tutorials',
    ZH: '免費指南、文章和影片教學'
  },
  tradeTitle: {
    EN: 'Trade',
    ZH: '交易'
  },
  spotTitle: {
    EN: 'Spot Trading',
    ZH: '現貨交易'
  },
  spotDesc: {
    EN: 'Buy and sell 300+ crypto tokens instantly',
    ZH: '即時買賣超過 300 種加密貨幣代幣'
  },
  marginTitle: {
    EN: 'Margin Trading',
    ZH: '槓桿交易'
  },
  marginDesc: {
    EN: 'Amplify profits with leveraged margin accounts',
    ZH: '利用槓桿帳戶放大收益'
  },
  futuresTitle: {
    EN: 'Futures & Options',
    ZH: '合約與期權'
  },
  futuresDesc: {
    EN: 'Sleek derivative products with up to 125x leverage',
    ZH: '高達 125 倍槓桿的流暢衍生品交易'
  },
  botsTitle: {
    EN: 'Trading Bots',
    ZH: '交易機器人'
  },
  botsDesc: {
    EN: 'Grid, DCA, and arbitrage automated execution',
    ZH: '網格、DCA（定投）和套利的自動執行機器人'
  },
  growTitle: {
    EN: 'Grow',
    ZH: '金融'
  },
  earnTitle: {
    EN: 'Simple Earn',
    ZH: '簡單賺幣'
  },
  earnDesc: {
    EN: 'Locked or flexible deposits with high yield APY',
    ZH: '高年化收益的定期或活期存款'
  },
  onchainTitle: {
    EN: 'On-chain Earn',
    ZH: '鏈上賺幣'
  },
  onchainDesc: {
    EN: 'Participate in secure staking & DeFi directly',
    ZH: '直接參與安全的鏈上質押與 DeFi'
  },
  loansTitle: {
    EN: 'Crypto Loans',
    ZH: '加密借貸'
  },
  loansDesc: {
    EN: 'Borrow USDT using your crypto portfolio as collateral',
    ZH: '使用您的加密投資組合做為質押借入 USDT'
  },

  // Hero Section
  mclarenPartner: {
    EN: 'McLaren F1 Premium Global Co-Partner',
    ZH: '麥拉倫 F1 車隊全球一級合作夥伴'
  },
  heroHeading: {
    EN: 'Faster, better, stronger than your average exchange',
    ZH: '更快、更好、更強的全球頂尖加密貨幣交易平台'
  },
  heroSubheading: {
    EN: 'Buy, sell, and earn crypto securely. Access non-custodial Web3 tools, NFTs, yield pools, and expert-grade trading with the world’s most trusted reserve ratio exchange.',
    ZH: '安全買賣、賺取及儲存加密貨幣。提供非託管 Web3 錢包、聯名 NFT、高收益池以及專業級合約交易，擁有全球領先的 100% 準備金比率證明。'
  },
  heroEmailPlaceholder: {
    EN: 'Enter email or phone number to register',
    ZH: '輸入電子郵件或手機號碼以開始註冊'
  },
  heroSignUpBtn: {
    EN: 'Sign up to claim $50 Box',
    ZH: '立即註冊領取 $50 盲盒'
  },
  expressBuyTitle: {
    EN: 'Express Exchange Buy',
    ZH: '極速閃兌/買幣'
  },
  cryptoCalculator: {
    EN: 'Crypto Calculator',
    ZH: '加密貨幣換算器'
  },
  payLabel: {
    EN: 'Pay',
    ZH: '支付金額'
  },
  receiveLabel: {
    EN: 'Receive',
    ZH: '預期獲得'
  },
  estimatedRate: {
    EN: 'Estimated Rate:',
    ZH: '預估匯率：'
  },
  tradeNowBtn: {
    EN: 'Trade / Buy Crypto Instantly',
    ZH: '立即即時購買/交易加密貨幣'
  },
  swapSuccessTitle: {
    EN: 'Swap Order Accepted!',
    ZH: '閃兌訂單已受理！'
  },
  swapSuccessDesc: {
    EN: 'Your cryptographic order to swap asset is secured in our Sandbox. Register to execute live withdrawals.',
    ZH: '您的加密貨幣閃兌訂單已在沙盒系統中得到保障。立即完成註冊即可執行即時提現。'
  },

  // Ticker Section
  marketTrends: {
    EN: 'Market Trends',
    ZH: '今日行情'
  },
  trendingCoins: {
    EN: 'Trending Coins',
    ZH: '熱門幣種'
  },
  highVolume: {
    EN: 'High Volume',
    ZH: '高交易量'
  },
  topGainers: {
    EN: 'Top Gainers',
    ZH: '領漲板塊'
  },
  newListings: {
    EN: 'New Listings',
    ZH: '最新上線'
  },
  assetHeader: {
    EN: 'Asset',
    ZH: '幣種'
  },
  priceHeader: {
    EN: 'Last Price',
    ZH: '最新價格'
  },
  changeHeader: {
    EN: '24h Change',
    ZH: '24小時漲跌'
  },
  highLowHeader: {
    EN: 'High / Low (24h)',
    ZH: '24小時最高/最低'
  },
  volumeHeader: {
    EN: 'Volume (24h)',
    ZH: '24小時交易量'
  },
  actionHeader: {
    EN: 'Action',
    ZH: '交易操作'
  },
  tradeBtn: {
    EN: 'Trade',
    ZH: '交易'
  },

  // Features Section
  oneAppInfinitePower: {
    EN: 'One App. Infinite Cryptographic Power.',
    ZH: '一App在手。掌握無盡加密資產。'
  },
  exploreProTools: {
    EN: 'Explore professional-grade tools designed to maximize your digital performance.',
    ZH: '探索為最大化您的數字收益而設計的專業級交易工具。'
  },
  web3TabTitle: {
    EN: 'Web3 Gateway',
    ZH: 'Web3 門戶'
  },
  earnTabTitle: {
    EN: 'Simple Earn Pools',
    ZH: '簡單賺幣池'
  },
  orderbookTabTitle: {
    EN: 'Pro Trading Engine',
    ZH: '專業交易引擎'
  },
  copyTraderTabTitle: {
    EN: 'Social Copy Trading',
    ZH: '跟單社群'
  },
  connectedToDeFi: {
    EN: 'Connected to DeFi ecosystem',
    ZH: '已與鏈上世界和 DeFi 生態無縫對接'
  },
  ownYourKeys: {
    EN: 'Your gateway to Web3. Own your keys, explore DApps, NFTs, and multi-chain solutions across 80+ networks.',
    ZH: '您的 Web3 入口。掌握自主金鑰，探索超過 80 個網路的 DApp、NFT 和多鏈生態。'
  },
  createWeb3Wallet: {
    EN: 'Create Web3 Wallet',
    ZH: '創建 Web3 錢包'
  },
  stakingYields: {
    EN: 'Staking yields auto-accruing',
    ZH: '質押收益每日定時自動派發'
  },
  growYourHoldings: {
    EN: 'Put your idle cryptos to work. Claim high APY yields with our flexible or locked-stake staking plans securely.',
    ZH: '讓您的閒置加密資產動起來。參與活期或定期質押計劃，安全領取豐厚高年化收益。'
  },
  startStaking: {
    EN: 'Start Earning Staking Now',
    ZH: '立即開啟簡單賺幣'
  },
  proOrderbook: {
    EN: 'Pro-grade orderbooks and execution API',
    ZH: '專業級訂單簿與高頻交易 API'
  },
  experienceZeroSlippage: {
    EN: 'Experience deep liquid orderbooks with less than 0.05% slippages under our institutional high-speed matching cores.',
    ZH: '體驗在機構級高速配對引擎保證下、滑點低於 0.05% 的極致深流动性。'
  },
  openTerminal: {
    EN: 'Open Pro Trading Terminal',
    ZH: '開啟專業交易終端'
  },
  earnPassiveIncome: {
    EN: 'Earn passive income with top traders',
    ZH: '追隨明星交易員，共享財富密碼'
  },
  replicateStrategies: {
    EN: 'Replicate real-time trades opened by certified experts. Earn margins together with transparent statistics analytics.',
    ZH: '即時跟隨認證交易專家的專業策略。隨時享受透明的收益數據統計分析。'
  },
  findTraders: {
    EN: 'Find Verified Copy Traders',
    ZH: '尋找優質交易員'
  },

  // Security Section
  safetyFirstTitle: {
    EN: 'SAFETY & VERIFICATION FIRST',
    ZH: '安全與驗證是我們的首要原則'
  },
  securityHeader: {
    EN: 'Institutional-grade vault safety with monthly audited Proof of Reserves',
    ZH: '機構級金庫安全認證，每月發佈默克爾樹準備金證明'
  },
  securityDesc: {
    EN: 'At OKX, user safety is our highest priority. We store more than 95% of our digital vault holdings in cold storage. Plus, we publish monthly self-audited Proof of Reserves so anyone can query our on-chain ledger liabilities.',
    ZH: '在 OKX，用戶的安全是我們的重中之重。我們將超過 95% 的數字資產安全存儲於離線冷存儲中。此外，我們每月公開發布儲備金證明（PoR），人人均可隨時在鏈上核對我們的資產與負債。'
  },
  proofOfReserves: {
    EN: 'Proof of Reserves (PoR)',
    ZH: '準備金證明 (PoR)'
  },
  custodyRatio: {
    EN: 'Custody Reserve Ratio',
    ZH: '1:1 平均準備金比率'
  },
  fullyBacked: {
    EN: 'All investor funds are backed 1:1 on actual on-chain ledgers with zero leverage reuse.',
    ZH: '所有用戶資金在鏈上賬本均提供 1:1 真實儲備，絕無任何二次抵押或槓桿複用。'
  },
  merklePath: {
    EN: 'Merkle Path Integrity hash:',
    ZH: '默克爾樹哈希根路徑：'
  },
  verifyOnchainBtn: {
    EN: 'Verify On-chain Reserves Ledger',
    ZH: '驗證鏈上儲備金賬本'
  },
  proofCopied: {
    EN: 'Reserve verification hash copied to clipboard!',
    ZH: '準備金驗證哈希已複製到剪貼簿！'
  },

  // Academy Section
  academyHeading: {
    EN: 'Unlock complex crypto mechanics easily. Find expert trading strategies or beginner manuals authored by OKX analysts.',
    ZH: '解構複雜的加密世界。探索由 OKX 資深分析師撰寫的專業交易策略和新手入門手冊。'
  },
  academySearchPlaceholder: {
    EN: 'Search crypto, trading strategies, Web3...',
    ZH: '搜尋加密知識、交易策略、Web3 技術...'
  },
  allGuides: {
    EN: 'All Guides',
    ZH: '全部文章'
  },
  beginners: {
    EN: 'Beginners',
    ZH: '新手入門'
  },
  tradingPro: {
    EN: 'Trading Pro',
    ZH: '交易進階'
  },
  web3Guides: {
    EN: 'Web3 Guides',
    ZH: 'Web3 指南'
  },
  marketInsights: {
    EN: 'Market Insights',
    ZH: '市場洞察'
  },
  readTime: {
    EN: 'min read',
    ZH: '分鐘閱讀'
  },

  // Download Section
  mobileCompanion: {
    EN: 'OKX Mobile Companion',
    ZH: 'OKX 手機應用程式'
  },
  downloadAppHeader: {
    EN: 'Trade and manage keys on the go, anywhere',
    ZH: '隨時隨地，輕鬆交易與管理您的密鑰'
  },
  downloadAppDesc: {
    EN: 'Download the official OKX application to buy, trade, stake, and use non-custodial Web3 vaults right from your smartphone. Highly rated, fast biometric verification, on-chain widgets, and localized notifications.',
    ZH: '下載官方 OKX 手機 App，直接在手機上購買、交易、質押並使用非託管型 Web3 金庫。極速生物特徵識別、主螢幕小部件與本地化即時通知。'
  },
  scanToDownload: {
    EN: 'Scan to load dynamic app download link',
    ZH: '掃描二維碼獲取動態下載連結'
  },

  // FAQ Section
  faqHeader: {
    EN: 'Frequently Asked Questions',
    ZH: '常見問題解答'
  },

  // Footer Section
  riskWarning: {
    EN: 'Risk Caution Disclaimer:',
    ZH: '安全與風險警示：'
  },
  riskDisclaimerText: {
    EN: 'Under no conditions shall OKX or our partners be liable for loss of capital. Please consult independent financial risk experts in your regional jurisdiction before registering or establishing security vault addresses. By interacting with this platform, you acknowledge the terms of services and liability limits.',
    ZH: '在任何情況下，OKX 或我們的合作夥伴均不對您的任何資本損失承擔責任。在註冊或建立安全金庫地址之前，請務必諮詢您所在地區的獨立財務風險專家。與此平台之任何互動即代表您完全知曉並接受本網服務條款和法律免責範圍。'
  },

  // Dashboard / Login Views
  portfolioSecurityHeader: {
    EN: 'OKX Shield Vault Secure ledger protection activated.',
    ZH: 'OKX 盾牌金庫 安全賬本保護已啟動。'
  },
  totalBalanceLabel: {
    EN: 'Total Portfolio Valuations (USD)',
    ZH: '總資產估值 (USD)'
  },
  availableBalanceLabel: {
    EN: 'Wallet Available Ledger Balance',
    ZH: '可用儲蓄余額'
  },
  withdrawingLabel: {
    EN: 'In-Transit Escrows Withdrawals',
    ZH: '在途提現託管金額'
  },
  activeStakingLabel: {
    EN: 'Active Wealth Staking APY Earns',
    ZH: '進行中简单賺幣收益'
  },
  withdrawActionBtn: {
    EN: 'Withdraw Funds',
    ZH: '提現資產'
  },
  depositActionBtn: {
    EN: 'Deposit Funds',
    ZH: '充值資產'
  },
  swapActionBtn: {
    EN: 'Secure Swap Exchange',
    ZH: '安全閃兌交易'
  },
  viewExplorerBtn: {
    EN: 'Tron Blockchain Explorer',
    ZH: '波場區塊鏈瀏覽器'
  },
  securityAssistantHeader: {
    EN: 'OKX Security Shield Assistant',
    ZH: 'OKX 安全防護助手'
  },
  securityAssistantIntro: {
    EN: 'Hello! I am your OKX Security Assistant. How can I protect your digital assets today?',
    ZH: '您好！我是您的 OKX 安全防護助手。今天有什麼可以幫您保障數字資產安全的？'
  },
  statusHeader: {
    EN: 'Status',
    ZH: '狀態'
  },
  processingStatus: {
    EN: 'Processing',
    ZH: '處理中'
  },
  sentStatus: {
    EN: 'Sent',
    ZH: '已發送'
  },
  successStatus: {
    EN: 'Success',
    ZH: '成功'
  },
  failedStatus: {
    EN: 'Failed',
    ZH: '失敗'
  },
  withdrawalLogsHeader: {
    EN: 'Secure TRC20 Ledger Outflow Logs (Instant Sync)',
    ZH: 'TRC20 賬本資產提取記錄（即時同步）'
  },
  addressHeader: {
    EN: 'Recipient Vault Address',
    ZH: '接收方金庫地址'
  },
  refHeader: {
    EN: 'Reference ID',
    ZH: '參考編號'
  },
  timeLabel: {
    EN: 'Sync Time',
    ZH: '同步時間'
  },
  amountLabel: {
    EN: 'Amount',
    ZH: '提現數量'
  },
  onchainWithdrawTab: {
    EN: 'On-chain TRC20 Outflow',
    ZH: '鏈上 TRC20 提現'
  },
  internalWithdrawTab: {
    EN: 'OKX Internal Ledger Transfer',
    ZH: 'OKX 內部賬本轉賬'
  },
  submitWithdrawBtn: {
    EN: 'Authenticate and Execute Outflow',
    ZH: '安全認證並執行資金提取'
  },
  welcomeBack: {
    EN: 'Welcome Back,',
    ZH: '歡迎回來，'
  },
  logoutBtn: {
    EN: 'SECURE LOGOUT',
    ZH: '安全登出'
  }
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}>({
  language: 'EN',
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key;
  };

  return createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
