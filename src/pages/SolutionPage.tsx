import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { CreditCard, Smartphone, Shield, Users, Globe, Zap } from 'lucide-react'

export const SolutionPage: React.FC = () => {
  const { t } = useTranslation()

  const solutions = [
    {
      icon: CreditCard,
      title: 'Virtual Card Generation',
      description: 'Generate instant virtual Visa/MasterCard using your SIM credit or telco microloans. Valid for 24 hours for maximum security.',
      features: ['Instant generation', '24-hour expiry', 'Visa/MasterCard support', 'Multiple funding sources']
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Platform',
      description: 'Access financial services through our mobile app or USSD codes. No smartphone? No problem - use *123# from any phone.',
      features: ['Mobile app', 'USSD access', 'Offline capability', 'SMS notifications']
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'UAE Central Bank compliant with e-money licensing. SIM-based KYC and AML-lite transaction limits ensure security.',
      features: ['UAE Central Bank licensed', 'SIM KYC verification', 'AML compliance', 'Secure transactions']
    },
    {
      icon: Users,
      title: 'Financial Inclusion',
      description: 'Designed for unbanked UAE residents earning under AED 5000/month. Access digital payments without a bank account.',
      features: ['No bank account required', 'Low-income friendly', 'Simple onboarding', 'Inclusive design']
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Full support for Arabic, English, Urdu, Hindi, and Tagalog with RTL layout support for Arabic and Urdu.',
      features: ['5 languages supported', 'RTL layout', 'Cultural sensitivity', 'Native speakers']
    },
    {
      icon: Zap,
      title: 'Instant Credit Options',
      description: 'Airtime SplitPay, WorkPay Advance, and microloans based on your telco usage patterns and credit scoring.',
      features: ['Buy now, pay later', 'Salary advances', 'Telco credit scoring', 'Instant approval']
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('solutionHeroTitle') || 'Complete Fintech Solution'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              {t('solutionHeroSubtitle') || 'Empowering the unbanked with instant virtual cards, mobile payments, and financial inclusion through telecom integration.'}
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('ourSolutions') || 'Our Solutions'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('solutionsDescription') || 'Comprehensive fintech-telecom solutions designed for financial inclusion in the UAE.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <solution.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 ml-4">{solution.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('technicalArchitecture') || 'Technical Architecture'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('architectureDescription') || 'Built on secure, scalable infrastructure with telco integration and regulatory compliance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-4">
                <div className="text-3xl font-bold text-primary mb-2">API</div>
                <div className="text-sm text-gray-600">Telco Integration</div>
              </div>
              <h4 className="font-semibold text-gray-900">Etisalat, DU, Virgin</h4>
              <p className="text-sm text-gray-600">Direct API integration with major UAE telecom operators</p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-4">
                <div className="text-3xl font-bold text-primary mb-2">KYC</div>
                <div className="text-sm text-gray-600">SIM Verification</div>
              </div>
              <h4 className="font-semibold text-gray-900">Identity Verification</h4>
              <p className="text-sm text-gray-600">SIM-based KYC with OTP verification for secure onboarding</p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-4">
                <div className="text-3xl font-bold text-primary mb-2">PSP</div>
                <div className="text-sm text-gray-600">Payment Processing</div>
              </div>
              <h4 className="font-semibold text-gray-900">Licensed PSP</h4>
              <p className="text-sm text-gray-600">UAE Central Bank licensed payment service provider</p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-4">
                <div className="text-3xl font-bold text-primary mb-2">AI</div>
                <div className="text-sm text-gray-600">Credit Scoring</div>
              </div>
              <h4 className="font-semibold text-gray-900">Smart Analytics</h4>
              <p className="text-sm text-gray-600">AI-powered credit scoring based on telco usage patterns</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('readyToStart') || 'Ready to Get Started?'}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t('joinThousands') || 'Join thousands of UAE residents who have gained access to digital payments through PayNow SIMCard Wallet.'}
          </p>
          <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
            {t('getStarted') || 'Get Started Now'}
          </button>
        </div>
      </section>
    </div>
  )
}