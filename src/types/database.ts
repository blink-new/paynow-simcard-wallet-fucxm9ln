export interface User {
  id: string
  phoneNumber: string
  simOperator: 'etisalat' | 'du' | 'virgin'
  languagePreference: string
  kycStatus: 'pending' | 'verified' | 'rejected'
  creditScore: number
  dailyLimit: number
  monthlyLimit: number
  createdAt: string
  updatedAt: string
  userId: string
}

export interface VirtualCard {
  id: string
  userId: string
  cardNumber: string
  cvv: string
  expiryDate: string
  cardType: 'visa' | 'mastercard'
  amount: number
  status: 'active' | 'expired' | 'used'
  fundingSource: 'sim_credit' | 'microloan' | 'salary_advance'
  expiresAt: string
  createdAt: string
}

export interface Transaction {
  id: string
  userId: string
  cardId?: string
  amount: number
  currency: string
  merchantName?: string
  transactionType: 'purchase' | 'refund' | 'fee'
  status: 'pending' | 'completed' | 'failed'
  description?: string
  createdAt: string
}

export interface CreditOption {
  id: string
  userId: string
  optionType: 'airtime_splitpay' | 'workpay_advance' | 'microloan'
  amount: number
  interestRate: number
  repaymentPeriod?: number
  status: 'available' | 'used' | 'repaid'
  createdAt: string
}

export interface SupportTicket {
  id: string
  userId: string
  subject: string
  message: string
  status: 'open' | 'in_progress' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
}