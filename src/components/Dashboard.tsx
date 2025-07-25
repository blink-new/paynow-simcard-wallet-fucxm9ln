import React, { useState, useEffect, useCallback } from 'react'
import { CreditCard, Plus, History, Settings, HelpCircle, Smartphone, Zap, Shield, Globe, ArrowLeft, BarChart3 } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { blink } from '../blink/client'
import type { User, VirtualCard, Transaction } from '../types/database'
import CardGenerator from './CardGenerator'
import TransactionHistory from './TransactionHistory'
import CreditOptions from './CreditOptions'
import UserProfile from './UserProfile'
import AnalyticsDashboard from './AnalyticsDashboard'
import NotificationCenter from './NotificationCenter'
import LiveChatSupport from './LiveChatSupport'

interface DashboardProps {
  user: any;
  onBackToLanding: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user: propUser, onBackToLanding }) => {
  const { t, language } = useTranslation()
  const [user, setUser] = useState<any>(propUser)
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [activeCards, setActiveCards] = useState<VirtualCard[]>([])
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)

  const loadUserData = useCallback(async (userId: string) => {
    try {
      // Load user profile
      const profiles = await blink.db.users.list({
        where: { userId },
        limit: 1
      })
      
      if (profiles.length === 0) {
        // Create new user profile
        const newProfile = await blink.db.users.create({
          id: `user_${Date.now()}`,
          phoneNumber: user?.email || '+971501234567',
          simOperator: 'etisalat',
          languagePreference: language,
          kycStatus: 'verified',
          creditScore: 750,
          dailyLimit: 200,
          monthlyLimit: 3000,
          userId
        })
        setUserProfile(newProfile)
      } else {
        setUserProfile(profiles[0])
      }

      // Load active cards
      const cards = await blink.db.virtualCards.list({
        where: { userId, status: 'active' },
        orderBy: { createdAt: 'desc' },
        limit: 5
      })
      setActiveCards(cards)

      // Load recent transactions
      const transactions = await blink.db.transactions.list({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        limit: 10
      })
      setRecentTransactions(transactions)
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }, [user?.email, language])

  useEffect(() => {
    if (user?.id) {
      loadUserData(user.id)
      setLoading(false)
    }
  }, [user?.id, loadUserData])

  const generateDemoCard = async () => {
    if (!user || !userProfile) return

    try {
      const newCard = await blink.db.virtualCards.create({
        id: `card_${Date.now()}`,
        userId: user.id,
        cardNumber: `4532 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
        cvv: Math.floor(100 + Math.random() * 900).toString(),
        expiryDate: '12/25',
        cardType: 'visa',
        amount: 100,
        status: 'active',
        fundingSource: 'sim_credit',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      })

      setActiveCards(prev => [newCard, ...prev])

      // Create transaction record
      await blink.db.transactions.create({
        id: `txn_${Date.now()}`,
        userId: user.id,
        cardId: newCard.id,
        amount: 100,
        currency: 'AED',
        transactionType: 'purchase',
        status: 'completed',
        description: 'Virtual card generated from SIM credit'
      })

      await loadUserData(user.id)
    } catch (error) {
      console.error('Error generating card:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('welcome')}</h2>
          <p className="text-gray-600 mb-6">{t('signInRequired')}</p>
          <button
            onClick={() => blink.auth.login()}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {t('signIn')}
          </button>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cards':
        return <CardGenerator onCardGenerated={() => loadUserData(user.id)} />
      case 'history':
        return <TransactionHistory transactions={recentTransactions} />
      case 'credit':
        return <CreditOptions userId={user.id} />
      case 'analytics':
        return <AnalyticsDashboard />
      case 'profile':
        return <UserProfile userProfile={userProfile} onUpdate={() => loadUserData(user.id)} />
      default:
        return (
          <div className="space-y-6">
            {/* Balance Overview */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm">{t('availableBalance')}</p>
                  <p className="text-3xl font-bold">AED {userProfile?.dailyLimit || 200}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm">{t('creditScore')}</p>
                  <p className="text-xl font-semibold">{userProfile?.creditScore || 750}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">{t('secureByTelco')}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={generateDemoCard}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Plus className="h-5 w-5 text-accent" />
                  </div>
                  <span className="font-medium">{t('generateCard')}</span>
                </div>
                <p className="text-sm text-gray-600">{t('instantVirtualCard')}</p>
              </button>

              <button
                onClick={() => setActiveTab('credit')}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{t('creditOptions')}</span>
                </div>
                <p className="text-sm text-gray-600">{t('airtimeSplitPay')}</p>
              </button>
            </div>

            {/* Active Cards */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{t('activeCards')}</h3>
                <button
                  onClick={() => setActiveTab('cards')}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {t('viewAll')}
                </button>
              </div>
              
              {activeCards.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">{t('noActiveCards')}</p>
                  <button
                    onClick={generateDemoCard}
                    className="mt-3 text-primary font-medium hover:underline"
                  >
                    {t('generateFirstCard')}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeCards.slice(0, 2).map((card) => (
                    <div key={card.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">**** **** **** {card.cardNumber.slice(-4)}</p>
                          <p className="text-sm text-gray-600">{t('expires')} {card.expiryDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">AED {card.amount}</p>
                        <p className="text-sm text-green-600">{t('active')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{t('recentTransactions')}</h3>
                <button
                  onClick={() => setActiveTab('history')}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {t('viewAll')}
                </button>
              </div>
              
              {recentTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">{t('noTransactions')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{transaction.description || t('transaction')}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">AED {transaction.amount}</p>
                        <p className={`text-sm ${
                          transaction.status === 'completed' ? 'text-green-600' :
                          transaction.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {t(transaction.status)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBackToLanding}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Back to Landing"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="bg-primary p-2 rounded-lg">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PayNow</h1>
                <p className="text-sm text-gray-600">{t('welcome')} {user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="h-4 w-4" />
                <span>{userProfile?.simOperator?.toUpperCase() || 'ETISALAT'}</span>
              </div>
              <NotificationCenter />
              <button
                onClick={() => blink.auth.logout()}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                {t('signOut')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: t('dashboard'), icon: Smartphone },
              { id: 'cards', label: t('cards'), icon: CreditCard },
              { id: 'history', label: t('history'), icon: History },
              { id: 'credit', label: t('credit'), icon: Zap },
              { id: 'analytics', label: t('analytics'), icon: BarChart3 },
              { id: 'profile', label: t('profile'), icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>

      {/* Live Chat Support */}
      <LiveChatSupport />
    </div>
  )
}

export { Dashboard }