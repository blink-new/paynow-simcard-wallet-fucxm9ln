import React, { useState } from 'react'
import { CreditCard, Smartphone, Zap, Briefcase, Shield, Clock } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { blink } from '../blink/client'

interface CardGeneratorProps {
  onCardGenerated: () => void
}

const CardGenerator: React.FC<CardGeneratorProps> = ({ onCardGenerated }) => {
  const { t } = useTranslation()
  const [selectedSource, setSelectedSource] = useState<'sim_credit' | 'microloan' | 'salary_advance'>('sim_credit')
  const [amount, setAmount] = useState(100)
  const [loading, setLoading] = useState(false)

  const fundingSources = [
    {
      id: 'sim_credit' as const,
      title: t('simCredit'),
      description: t('useYourSIMBalance'),
      icon: Smartphone,
      color: 'bg-blue-500',
      available: 250
    },
    {
      id: 'microloan' as const,
      title: t('microLoan'),
      description: t('instantMicroCredit'),
      icon: Zap,
      color: 'bg-green-500',
      available: 500
    },
    {
      id: 'salary_advance' as const,
      title: t('salaryAdvance'),
      description: t('workPayAdvance'),
      icon: Briefcase,
      color: 'bg-purple-500',
      available: 1000
    }
  ]

  const generateCard = async () => {
    setLoading(true)
    try {
      const user = await blink.auth.me()
      
      const newCard = await blink.db.virtualCards.create({
        id: `card_${Date.now()}`,
        userId: user.id,
        cardNumber: `4532 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
        cvv: Math.floor(100 + Math.random() * 900).toString(),
        expiryDate: '12/25',
        cardType: Math.random() > 0.5 ? 'visa' : 'mastercard',
        amount,
        status: 'active',
        fundingSource: selectedSource,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      })

      // Create transaction record
      await blink.db.transactions.create({
        id: `txn_${Date.now()}`,
        userId: user.id,
        cardId: newCard.id,
        amount,
        currency: 'AED',
        transactionType: 'purchase',
        status: 'completed',
        description: `Virtual card generated from ${selectedSource.replace('_', ' ')}`
      })

      onCardGenerated()
    } catch (error) {
      console.error('Error generating card:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('generateVirtualCard')}</h2>
        <p className="text-gray-600 mb-6">{t('createInstantCard')}</p>

        {/* Funding Source Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{t('selectFundingSource')}</h3>
          <div className="grid gap-4">
            {fundingSources.map((source) => {
              const Icon = source.icon
              return (
                <button
                  key={source.id}
                  onClick={() => setSelectedSource(source.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedSource === source.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${source.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{source.title}</h4>
                      <p className="text-sm text-gray-600">{source.description}</p>
                      <p className="text-sm font-medium text-green-600 mt-1">
                        {t('available')}: AED {source.available}
                      </p>
                    </div>
                    {selectedSource === source.id && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Amount Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{t('selectAmount')}</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[50, 100, 200].map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className={`p-3 rounded-lg border-2 font-medium transition-all ${
                  amount === preset
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                AED {preset}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">{t('customAmount')}:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="10"
              max="1000"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter amount"
            />
            <span className="text-sm text-gray-600">AED</span>
          </div>
        </div>

        {/* Card Preview */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{t('cardPreview')}</h3>
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white max-w-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-white/80 text-sm">{t('virtualCard')}</p>
                <p className="text-lg font-semibold">PayNow</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-xs">{t('expires')}</p>
                <p className="text-sm">12/25</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xl font-mono tracking-wider">**** **** **** ****</p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/80 text-xs">{t('amount')}</p>
                <p className="text-lg font-bold">AED {amount}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <Clock className="h-4 w-4" />
                <span className="text-xs">{t('24hExpiry')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateCard}
          disabled={loading || amount < 10 || amount > 1000}
          className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>{t('generating')}</span>
            </div>
          ) : (
            t('generateCard')
          )}
        </button>

        {/* Security Notice */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">{t('securityNotice')}</p>
              <p className="text-sm text-yellow-700 mt-1">{t('cardExpiresIn24Hours')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardGenerator