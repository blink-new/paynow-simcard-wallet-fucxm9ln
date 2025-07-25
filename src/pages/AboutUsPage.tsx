import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { Link } from 'react-router-dom'
import { Target, Users, Globe, Award, ArrowRight } from 'lucide-react'

export const AboutUsPage: React.FC = () => {
  const { t } = useTranslation()

  const values = [
    {
      icon: Target,
      title: 'Financial Inclusion',
      description: 'We believe everyone deserves access to digital financial services, regardless of their banking status or income level.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Our platform is designed by and for the diverse communities that make up the UAE\'s workforce.'
    },
    {
      icon: Globe,
      title: 'Cultural Sensitivity',
      description: 'We embrace the multicultural nature of the UAE with multilingual support and culturally aware design.'
    },
    {
      icon: Award,
      title: 'Trust & Security',
      description: 'We maintain the highest standards of security and regulatory compliance to protect our users.'
    }
  ]

  const team = [
    {
      name: 'Ahmed Al-Rashid',
      role: 'CEO & Co-Founder',
      background: 'Former Emirates NBD executive with 15+ years in UAE banking and fintech innovation.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Priya Sharma',
      role: 'CTO & Co-Founder',
      background: 'Ex-Careem technology leader specializing in mobile payments and telecom integration.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Omar Hassan',
      role: 'Head of Partnerships',
      background: 'Former Etisalat business development director with deep telco industry relationships.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Maria Santos',
      role: 'Head of Product',
      background: 'UX expert focused on inclusive design for diverse, multilingual user communities.',
      image: '/api/placeholder/150/150'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('aboutUsTitle') || 'About PayNow SIMCard Wallet'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              {t('aboutUsSubtitle') || 'Bridging the financial divide in the UAE through innovative fintech-telecom solutions.'}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('ourMission') || 'Our Mission'}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('missionDescription') || 'PayNow SIMCard Wallet was founded with a simple yet powerful mission: to provide financial access to the 2.3 million unbanked residents in the UAE who earn less than AED 5,000 per month.'}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {t('missionDetails') || 'We recognized that traditional banking excludes many hardworking individuals - domestic helpers, construction workers, delivery drivers, and students - who contribute significantly to the UAE economy but lack access to digital payment services.'}
              </p>
              <div className="bg-accent/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('ourVision') || 'Our Vision'}
                </h3>
                <p className="text-gray-700">
                  {t('visionDescription') || 'A UAE where every resident, regardless of income or banking status, has access to secure, convenient digital financial services through their mobile phone.'}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('impactNumbers') || 'Our Impact'}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2.3M</div>
                  <div className="text-sm text-gray-600">Unbanked residents targeted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5</div>
                  <div className="text-sm text-gray-600">Languages supported</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-gray-600">Major telco partners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Service availability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('ourValues') || 'Our Values'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('valuesDescription') || 'The principles that guide everything we do at PayNow SIMCard Wallet.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="bg-primary/10 p-4 rounded-xl inline-block mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('ourTeam') || 'Our Team'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('teamDescription') || 'Meet the diverse team of fintech, telecom, and community experts building the future of financial inclusion.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-accent font-semibold mb-4">{member.role}</p>
                <p className="text-sm text-gray-600">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('getInTouch') || 'Get in Touch'}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t('contactDescription') || 'Have questions about our mission or want to learn more about our impact? We\'d love to hear from you.'}
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            {t('contactUs') || 'Contact Us'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}