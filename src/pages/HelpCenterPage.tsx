import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { Search, ChevronDown, ChevronRight, MessageCircle, Phone, Mail, Clock } from 'lucide-react'

export const HelpCenterPage: React.FC = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqCategories = [
    {
      title: 'Getting Started',
      faqs: [
        {
          question: 'How do I create a PayNow SIMCard Wallet account?',
          answer: 'Simply download our app or dial *123# from your mobile phone. You\'ll need your UAE mobile number for SIM-based verification. The process takes less than 2 minutes.'
        },
        {
          question: 'What documents do I need to sign up?',
          answer: 'You only need a valid UAE mobile number with an active SIM card from Etisalat, DU, or Virgin Mobile. No traditional documents required - we use SIM KYC for verification.'
        },
        {
          question: 'Can I use PayNow without a smartphone?',
          answer: 'Yes! You can access all core features using USSD codes by dialing *123# from any mobile phone. Our system works on both smartphones and basic phones.'
        }
      ]
    },
    {
      title: 'Virtual Cards',
      faqs: [
        {
          question: 'How do I generate a virtual card?',
          answer: 'Open the app, select "Generate Card", choose your funding source (SIM credit, microloan, or salary advance), enter the amount, and your virtual Visa/MasterCard will be ready instantly.'
        },
        {
          question: 'Why do cards expire after 24 hours?',
          answer: 'This is a security feature to protect your funds. Disposable cards reduce fraud risk and ensure your money is safe. You can generate new cards anytime you need them.'
        },
        {
          question: 'Where can I use my virtual card?',
          answer: 'Your virtual card works anywhere Visa/MasterCard is accepted online - shopping websites, travel booking, bill payments, subscriptions, and more.'
        }
      ]
    },
    {
      title: 'Payments & Credit',
      faqs: [
        {
          question: 'What is Airtime SplitPay?',
          answer: 'Airtime SplitPay lets you buy now and pay later using your mobile credit. Make purchases today and pay back over time through your mobile recharge.'
        },
        {
          question: 'How does WorkPay Advance work?',
          answer: 'If your employer is a partner, you can get salary advances directly to your PayNow wallet. The amount is automatically deducted from your next salary.'
        },
        {
          question: 'What are the transaction limits?',
          answer: 'Daily limit: AED 200, Monthly limit: AED 3,000. These limits comply with UAE Central Bank regulations for e-money services.'
        }
      ]
    },
    {
      title: 'Security & Safety',
      faqs: [
        {
          question: 'Is PayNow SIMCard Wallet safe?',
          answer: 'Yes, we are licensed by the UAE Central Bank and follow strict security protocols. Your data is encrypted, and we use SIM-based authentication for maximum security.'
        },
        {
          question: 'What if I lose my phone?',
          answer: 'Contact our support immediately. We can freeze your account and help you regain access with your SIM card and OTP verification.'
        },
        {
          question: 'How is my credit score calculated?',
          answer: 'We use your mobile usage patterns, recharge history, and payment behavior to create a telco-based credit score. This helps us offer you better credit options.'
        }
      ]
    }
  ]

  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      description: 'Chat with us on WhatsApp',
      contact: '+971 50 123 4567',
      hours: '24/7 Available'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call our support hotline',
      contact: '800-PAYNOW (729669)',
      hours: '8 AM - 10 PM Daily'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email',
      contact: 'support@paynow.ae',
      hours: 'Response within 4 hours'
    }
  ]

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('helpCenterTitle') || 'Help Center'}
          </h1>
          <p className="text-xl mb-8 text-white/90">
            {t('helpCenterSubtitle') || 'Find answers to your questions and get the support you need.'}
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder') || 'Search for help...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t('frequentlyAsked') || 'Frequently Asked Questions'}
          </h2>

          <div className="space-y-8">
            {(searchQuery ? filteredFaqs : faqCategories).map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex
                    const isExpanded = expandedFaq === globalIndex
                    
                    return (
                      <div key={faqIndex}>
                        <button
                          onClick={() => setExpandedFaq(isExpanded ? null : globalIndex)}
                          className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                        >
                          <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {searchQuery && filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t('noResultsFound') || 'No results found for your search. Try different keywords or contact our support team.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('needMoreHelp') || 'Need More Help?'}
            </h2>
            <p className="text-xl text-gray-600">
              {t('supportDescription') || 'Our multilingual support team is here to help you in Arabic, English, Urdu, Hindi, and Tagalog.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="bg-primary/10 p-4 rounded-xl inline-block mb-6">
                  <channel.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-semibold text-gray-900 mb-1">{channel.contact}</p>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {channel.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              {t('stillNeedHelp') || 'Still Need Help?'}
            </h2>
            <p className="text-white/90 mb-6">
              {t('contactTeam') || 'Our support team is available 24/7 to assist you with any questions or issues.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                {t('startChat') || 'Start Live Chat'}
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                {t('callSupport') || 'Call Support'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}