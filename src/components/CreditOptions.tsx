import React, { useState, useEffect, useCallback } from 'react'
import { Zap, Briefcase, CreditCard, Clock, TrendingUp, Shield } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { blink } from '../blink/client'
import type { CreditOption } from '../types/database'

interface CreditOptionsProps {
  userId: string
}

const CreditOptions: React.FC<CreditOptionsProps> = ({ userId }) => {
  const { t } = useTranslation()
  const [creditOptions, setCreditOptions] = useState<CreditOption[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const loadCreditOptions = useCallback(async () => {
    try {
      const options = await blink.db.creditOptions.list({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })
      setCreditOptions(options)
    } catch (error) {
      console.error('Error loading credit options:', error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    loadCreditOptions()
  }, [loadCreditOptions])

  const createCreditOption = async (type: 'airtime_splitpay' | 'workpay_advance' | 'microloan', amount: number) => {
    try {
      const newOption = await blink.db.creditOptions.create({
        id: `credit_${Date.now()}`,
        userId,
        optionType: type,
        amount,
        interestRate: type === 'microloan' ? 5.0 : 0.0,
        repaymentPeriod: type === 'workpay_advance' ? 30 : 7,
        status: 'available'
      })
      setCreditOptions(prev => [newOption, ...prev])
    } catch (error) {
      console.error('Error creating credit option:', error)
    }
  }

  const creditTypes = [
    {
      id: 'airtime_splitpay' as const,
      title: t('airtimeSplitPay'),
      description: t('buyNowPayLaterAirtime'),
      icon: Zap,
      color: 'bg-blue-500',
      maxAmount: 500,
      interestRate: 0,
      repaymentDays: 7,
      features: [
        t('noInterestFees'),
        t('automaticDeduction'),
        t('instantApproval')
      ]
    },
    {
      id: 'workpay_advance' as const,
      title: t('workPayAdvance'),
      description: t('salaryAdvanceEmployers'),
      icon: Briefcase,
      color: 'bg-green-500',
      maxAmount: 1000,
      interestRate: 0,
      repaymentDays: 30,
      features: [
        t('employerPartnership'),
        t('payrollDeduction'),
        t('higherLimits')
      ]
    },
    {
      id: 'microloan' as const,
      title: t('microLoan'),
      description: t('instantMicroCredit'),
      icon: CreditCard,
      color: 'bg-purple-500',
      maxAmount: 2000,
      interestRate: 5.0,
      repaymentDays: 30,
      features: [
        t('flexibleRepayment'),
        t('creditScoreBased'),
        t('competitiveRates')
      ]
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Credit Score Overview */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{t('creditScore')}</h2>
            <p className="text-white/80">{t('basedOnTelcoUsage')}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">750</p>
            <p className="text-white/80 text-sm">{t('excellent')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm">{t('improvedThisMonth')}</span>
        </div>
      </div>

      {/* Available Credit Options */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('availableCreditOptions')}</h3>
        
        <div className="grid gap-6">
          {creditTypes.map((type) => {
            const Icon = type.icon
            const hasActiveOption = creditOptions.some(
              option => option.optionType === type.id && option.status === 'available'
            )
            
            return (
              <div
                key={type.id}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedOption === type.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${type.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{type.title}</h4>
                      {hasActiveOption && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {t('active')}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('maxAmount')}</p>
                        <p className="font-semibold">AED {type.maxAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('interestRate')}</p>
                        <p className="font-semibold">{type.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('repaymentPeriod')}</p>
                        <p className="font-semibold">{type.repaymentDays} {t('days')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('approval')}</p>
                        <p className="font-semibold text-green-600">{t('instant')}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">{t('features')}:</p>
                      <ul className="space-y-1">
                        {type.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <Shield className="h-3 w-3 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedOption(selectedOption === type.id ? null : type.id)}
                        className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        {selectedOption === type.id ? t('hideDetails') : t('viewDetails')}
                      </button>
                      
                      <button
                        onClick={() => createCreditOption(type.id, Math.min(type.maxAmount, 200))}
                        disabled={hasActiveOption}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {hasActiveOption ? t('alreadyActive') : t('apply')}
                      </button>
                    </div>
                    
                    {selectedOption === type.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-semibold mb-2">{t('howItWorks')}</h5>
                        <div className="space-y-2 text-sm text-gray-600">
                          {type.id === 'airtime_splitpay' && (
                            <>
                              <p>• {t('useAirtimeCredit')}</p>
                              <p>• {t('automaticRepayment')}</p>
                              <p>• {t('noHiddenFees')}</p>
                            </>
                          )}
                          {type.id === 'workpay_advance' && (
                            <>
                              <p>• {t('employerVerification')}</p>
                              <p>• {t('salaryDeduction')}</p>
                              <p>• {t('higherCreditLimits')}</p>
                            </>
                          )}
                          {type.id === 'microloan' && (
                            <>
                              <p>• {t('creditAssessment')}</p>
                              <p>• {t('flexibleTerms')}</p>
                              <p>• {t('buildCreditHistory')}</p>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Active Credit Options */}
      {creditOptions.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{t('yourCreditOptions')}</h3>
          
          <div className="space-y-4">
            {creditOptions.map((option) => (
              <div key={option.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold capitalize">
                      {option.optionType.replace('_', ' ')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('created')} {new Date(option.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold">AED {option.amount}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    option.status === 'available' ? 'text-green-600 bg-green-50' :
                    option.status === 'used' ? 'text-blue-600 bg-blue-50' :
                    'text-gray-600 bg-gray-50'
                  }`}>
                    {t(option.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Credit Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <TrendingUp className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">{t('improveCreditScore')}</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• {t('regularAirtimeRecharge')}</li>
              <li>• {t('timelyRepayments')}</li>
              <li>• {t('maintainActiveUsage')}</li>
              <li>• {t('verifyEmployment')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditOptions