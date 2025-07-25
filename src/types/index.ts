export interface User {
  id: string;
  phoneNumber: string;
  simProvider: 'etisalat' | 'du' | 'virgin';
  balance: number;
  creditScore: number;
  preferredLanguage: 'en' | 'ar' | 'ur' | 'tl' | 'hi';
  isVerified: boolean;
  createdAt: Date;
}

export interface VirtualCard {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
  currency: 'AED';
  status: 'active' | 'expired' | 'used';
  createdAt: Date;
  expiresAt: Date;
  source: 'sim_credit' | 'microloan' | 'salary_advance';
}

export interface Transaction {
  id: string;
  cardId: string;
  amount: number;
  currency: 'AED';
  merchant: string;
  status: 'pending' | 'completed' | 'failed';
  type: 'purchase' | 'refund';
  createdAt: Date;
}

export interface CreditOption {
  id: string;
  type: 'airtime_splitpay' | 'workpay_advance' | 'microloan';
  amount: number;
  interestRate: number;
  repaymentPeriod: number;
  eligibility: boolean;
  description: Record<string, string>;
}

export interface Language {
  code: 'en' | 'ar' | 'ur' | 'tl' | 'hi';
  name: string;
  nativeName: string;
  rtl: boolean;
}

export interface Translations {
  [key: string]: {
    en: string;
    ar: string;
    ur: string;
    tl: string;
    hi: string;
  };
}