import React, { useState } from 'react'
import { User, Phone, Globe, Shield, Settings, Bell, HelpCircle, LogOut } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { blink } from '../blink/client'
import type { User as UserType } from '../types/database'

interface UserProfileProps {
  userProfile: UserType | null
  onUpdate: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ userProfile, onUpdate }) => {
  const { t, language, setLanguage } = useTranslation()
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    phoneNumber: userProfile?.phoneNumber || '',
    simOperator: userProfile?.simOperator || 'etisalat',
    languagePreference: userProfile?.languagePreference || language
  })

  const handleSave = async () => {
    if (!userProfile) return

    try {
      await blink.db.users.update(userProfile.id, {
        phoneNumber: formData.phoneNumber,
        simOperator: formData.simOperator,
        languagePreference: formData.languagePreference
      })
      
      setLanguage(formData.languagePreference)
      setEditing(false)
      onUpdate()
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleLogout = () => {
    blink.auth.logout()
  }

  const createSupportTicket = async () => {
    try {
      const user = await blink.auth.me()
      await blink.db.supportTickets.create({
        id: `ticket_${Date.now()}`,
        userId: user.id,
        subject: 'General Support Request',
        message: 'I need help with my PayNow account.',
        status: 'open',
        priority: 'medium'
      })
      alert(t('supportTicketCreated'))
    } catch (error) {
      console.error('Error creating support ticket:', error)
    }
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('profile')}</h2>
            <p className="text-gray-600">{t('manageAccountSettings')}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('phoneNumber')}
              </label>
              {editing ? (
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{userProfile.phoneNumber}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('simOperator')}
              </label>
              {editing ? (
                <select
                  value={formData.simOperator}
                  onChange={(e) => setFormData(prev => ({ ...prev, simOperator: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="etisalat">Etisalat</option>
                  <option value="du">DU</option>
                  <option value="virgin">Virgin Mobile</option>
                </select>
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="capitalize">{userProfile.simOperator}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('language')}
              </label>
              {editing ? (
                <select
                  value={formData.languagePreference}
                  onChange={(e) => setFormData(prev => ({ ...prev, languagePreference: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                  <option value="ur">اردو</option>
                  <option value="hi">हिंदी</option>
                  <option value="tl">Tagalog</option>
                </select>
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span>{t('currentLanguage')}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('kycStatus')}
              </label>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Shield className={`h-4 w-4 ${
                  userProfile.kycStatus === 'verified' ? 'text-green-500' :
                  userProfile.kycStatus === 'pending' ? 'text-yellow-500' : 'text-red-500'
                }`} />
                <span className={`capitalize font-medium ${
                  userProfile.kycStatus === 'verified' ? 'text-green-600' :
                  userProfile.kycStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {t(userProfile.kycStatus)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {t('saveChanges')}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('cancel')}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t('editProfile')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Account Limits */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('accountLimits')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{t('dailyLimit')}</span>
              <span className="font-semibold">AED {userProfile.dailyLimit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: '60%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{t('used')}: AED 120</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{t('monthlyLimit')}</span>
              <span className="font-semibold">AED {userProfile.monthlyLimit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: '25%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{t('used')}: AED 750</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            {t('increaseLimitsMessage')}
          </p>
        </div>
      </div>

      {/* Settings & Support */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('settingsSupport')}</h3>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="font-medium">{t('notifications')}</span>
            </div>
            <span className="text-sm text-gray-500">{t('manage')}</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-500" />
              <span className="font-medium">{t('security')}</span>
            </div>
            <span className="text-sm text-gray-500">{t('configure')}</span>
          </button>

          <button 
            onClick={createSupportTicket}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <HelpCircle className="h-5 w-5 text-gray-500" />
              <span className="font-medium">{t('support')}</span>
            </div>
            <span className="text-sm text-gray-500">{t('getHelp')}</span>
          </button>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-red-600"
          >
            <div className="flex items-center space-x-3">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">{t('signOut')}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-3">{t('accountInformation')}</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>{t('accountCreated')}:</span>
            <span>{new Date(userProfile.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('lastUpdated')}:</span>
            <span>{new Date(userProfile.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('accountId')}:</span>
            <span className="font-mono">{userProfile.id.slice(0, 8)}...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile