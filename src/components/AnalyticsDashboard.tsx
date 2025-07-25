import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Calendar, BarChart3, PieChart, Activity } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { blink } from '../blink/client'

interface AnalyticsData {
  totalSpent: number
  totalTransactions: number
  averageTransaction: number
  monthlyGrowth: number
  categoryBreakdown: { category: string; amount: number; percentage: number }[]
  weeklySpending: { day: string; amount: number }[]
  cardUsage: { cardType: string; count: number }[]
}

const AnalyticsDashboard: React.FC = () => {
  const { t } = useTranslation()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalSpent: 1250.50,
    totalTransactions: 28,
    averageTransaction: 44.66,
    monthlyGrowth: 12.5,
    categoryBreakdown: [
      { category: 'Shopping', amount: 450, percentage: 36 },
      { category: 'Food & Dining', amount: 320, percentage: 26 },
      { category: 'Transportation', amount: 280, percentage: 22 },
      { category: 'Entertainment', amount: 200, percentage: 16 }
    ],
    weeklySpending: [
      { day: 'Mon', amount: 85 },
      { day: 'Tue', amount: 120 },
      { day: 'Wed', amount: 95 },
      { day: 'Thu', amount: 160 },
      { day: 'Fri', amount: 200 },
      { day: 'Sat', amount: 180 },
      { day: 'Sun', amount: 140 }
    ],
    cardUsage: [
      { cardType: 'SIM Credit', count: 15 },
      { cardType: 'Microloan', count: 8 },
      { cardType: 'Salary Advance', count: 5 }
    ]
  })
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month')

  const StatCard: React.FC<{
    title: string
    value: string
    change?: number
    icon: React.ReactNode
    color: string
  }> = ({ title, value, change, icon, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {change >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span>{Math.abs(change)}% from last {selectedPeriod}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  )

  const maxWeeklyAmount = Math.max(...analyticsData.weeklySpending.map(d => d.amount))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('analytics')}</h2>
          <p className="text-gray-600">{t('spendingInsights')}</p>
        </div>
        <div className="flex items-center space-x-2">
          {(['week', 'month', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t(period)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('totalSpent')}
          value={`AED ${analyticsData.totalSpent.toFixed(2)}`}
          change={analyticsData.monthlyGrowth}
          icon={<DollarSign className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <StatCard
          title={t('totalTransactions')}
          value={analyticsData.totalTransactions.toString()}
          change={8.2}
          icon={<Activity className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <StatCard
          title={t('averageTransaction')}
          value={`AED ${analyticsData.averageTransaction.toFixed(2)}`}
          change={-2.1}
          icon={<BarChart3 className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
        <StatCard
          title={t('activeCards')}
          value="3"
          icon={<CreditCard className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Spending Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{t('weeklySpending')}</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.weeklySpending.map((day) => (
              <div key={day.day} className="flex items-center space-x-3">
                <div className="w-12 text-sm font-medium text-gray-600">
                  {day.day}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(day.amount / maxWeeklyAmount) * 100}%` }}
                  />
                </div>
                <div className="w-16 text-sm font-semibold text-gray-900 text-right">
                  AED {day.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{t('spendingByCategory')}</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.categoryBreakdown.map((category, index) => {
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500']
              return (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                    <span className="text-sm font-medium text-gray-700">
                      {category.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      AED {category.amount}
                    </div>
                    <div className="text-xs text-gray-500">
                      {category.percentage}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Card Usage Analysis */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{t('cardUsageAnalysis')}</h3>
          <CreditCard className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analyticsData.cardUsage.map((usage, index) => {
            const colors = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-purple-100 text-purple-800']
            const total = analyticsData.cardUsage.reduce((sum, u) => sum + u.count, 0)
            const percentage = ((usage.count / total) * 100).toFixed(1)
            
            return (
              <div key={usage.cardType} className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${colors[index]} mb-3`}>
                  {usage.cardType}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {usage.count}
                </div>
                <div className="text-sm text-gray-600">
                  {percentage}% of total cards
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
        <div className="flex items-start space-x-4">
          <div className="bg-primary/20 p-3 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('smartInsights')}</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• {t('spendingIncreased')} 12.5% {t('thisMonth')}</p>
              <p>• {t('mostActiveDay')} Friday ({t('avgSpending')} AED 200)</p>
              <p>• {t('topCategory')} Shopping (36% {t('ofTotalSpending')})</p>
              <p>• {t('creditScoreImproved')} +25 {t('points')} {t('thisMonth')}</p>
            </div>
            <div className="mt-4">
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                {t('viewDetailedReport')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard