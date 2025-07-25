import React, { useState } from 'react'
import { Search, Filter, Download, CreditCard, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import type { Transaction } from '../types/database'

interface TransactionHistoryProps {
  transactions: Transaction[]
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')
  const [filterType, setFilterType] = useState<'all' | 'purchase' | 'refund' | 'fee'>('all')

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchantName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus
    const matchesType = filterType === 'all' || transaction.transactionType === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ArrowUpRight className="h-5 w-5 text-red-500" />
      case 'refund':
        return <ArrowDownLeft className="h-5 w-5 text-green-500" />
      case 'fee':
        return <CreditCard className="h-5 w-5 text-gray-500" />
      default:
        return <CreditCard className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50'
      case 'failed':
        return 'text-red-600 bg-red-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('transactionHistory')}</h2>
            <p className="text-gray-600">{t('viewAllTransactions')}</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Download className="h-4 w-4" />
            <span>{t('export')}</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchTransactions')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">{t('allStatuses')}</option>
              <option value="completed">{t('completed')}</option>
              <option value="pending">{t('pending')}</option>
              <option value="failed">{t('failed')}</option>
            </select>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">{t('allTypes')}</option>
              <option value="purchase">{t('purchase')}</option>
              <option value="refund">{t('refund')}</option>
              <option value="fee">{t('fee')}</option>
            </select>
          </div>
        </div>

        {/* Transaction List */}
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('noTransactionsFound')}</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'all' || filterType !== 'all'
                ? t('tryAdjustingFilters')
                : t('noTransactionsYet')
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {getTransactionIcon(transaction.transactionType)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {transaction.description || transaction.merchantName || t('transaction')}
                    </h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>{formatDate(transaction.createdAt)}</span>
                      <span>•</span>
                      <span className="capitalize">{t(transaction.transactionType)}</span>
                      {transaction.merchantName && (
                        <>
                          <span>•</span>
                          <span>{transaction.merchantName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-bold text-lg ${
                    transaction.transactionType === 'refund' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.transactionType === 'refund' ? '+' : '-'}AED {transaction.amount}
                  </p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {t(transaction.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {filteredTransactions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {filteredTransactions.filter(t => t.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">{t('completedTransactions')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  AED {filteredTransactions
                    .filter(t => t.status === 'completed' && t.transactionType === 'purchase')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">{t('totalSpent')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  AED {filteredTransactions
                    .filter(t => t.status === 'completed' && t.transactionType === 'refund')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">{t('totalRefunds')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionHistory