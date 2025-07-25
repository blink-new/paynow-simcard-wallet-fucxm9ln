import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, Building } from 'lucide-react'

export const ContactUsPage: React.FC = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      category: 'general'
    })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: [
        'PayNow SIMCard Wallet',
        'Dubai International Financial Centre',
        'Level 15, Gate Building',
        'Dubai, UAE'
      ]
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: [
        'Support: 800-PAYNOW (729669)',
        'WhatsApp: +971 50 123 4567',
        'Business: +971 4 123 4567'
      ]
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [
        'support@paynow.ae',
        'partnerships@paynow.ae',
        'media@paynow.ae'
      ]
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Support: 24/7 Available',
        'Office: Sun-Thu 9AM-6PM',
        'Emergency: Always Available'
      ]
    }
  ]

  const departments = [
    {
      icon: Users,
      title: 'Customer Support',
      description: 'Get help with your account, transactions, or technical issues.',
      contact: 'support@paynow.ae',
      phone: '800-PAYNOW'
    },
    {
      icon: Building,
      title: 'Business Partnerships',
      description: 'Explore partnership opportunities with employers, merchants, or telcos.',
      contact: 'partnerships@paynow.ae',
      phone: '+971 4 123 4567'
    },
    {
      icon: MessageCircle,
      title: 'Media & Press',
      description: 'Media inquiries, press releases, and interview requests.',
      contact: 'media@paynow.ae',
      phone: '+971 4 123 4568'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('contactUsTitle') || 'Contact Us'}
          </h1>
          <p className="text-xl text-white/90">
            {t('contactUsSubtitle') || 'We\'re here to help. Reach out to us anytime and we\'ll get back to you as soon as possible.'}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('sendMessage') || 'Send us a Message'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('fullName') || 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('enterName') || 'Enter your full name'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('emailAddress') || 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('enterEmail') || 'Enter your email'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('phoneNumber') || 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('category') || 'Category'}
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="general">{t('generalInquiry') || 'General Inquiry'}</option>
                      <option value="support">{t('technicalSupport') || 'Technical Support'}</option>
                      <option value="partnership">{t('partnership') || 'Partnership'}</option>
                      <option value="media">{t('mediaPress') || 'Media & Press'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('subject') || 'Subject'} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t('enterSubject') || 'Enter message subject'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('message') || 'Message'} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder={t('enterMessage') || 'Enter your message...'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {t('sendMessage') || 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('getInTouch') || 'Get in Touch'}
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-xl mr-4 flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-accent rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">
                  {t('needImmediateHelp') || 'Need Immediate Help?'}
                </h3>
                <p className="text-white/90 mb-6">
                  {t('urgentSupport') || 'For urgent support, contact us directly via WhatsApp or phone.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                    {t('whatsappNow') || 'WhatsApp Now'}
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                    {t('callNow') || 'Call Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('contactDepartments') || 'Contact Departments'}
            </h2>
            <p className="text-xl text-gray-600">
              {t('departmentsDescription') || 'Reach out to the right department for faster assistance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="bg-primary/10 p-4 rounded-xl inline-block mb-6">
                  <dept.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{dept.title}</h3>
                <p className="text-gray-600 mb-6">{dept.description}</p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <strong>Email:</strong> {dept.contact}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Phone:</strong> {dept.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('visitOurOffice') || 'Visit Our Office'}
            </h2>
            <p className="text-xl text-gray-600">
              {t('officeDescription') || 'Located in the heart of Dubai\'s financial district.'}
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {t('mapPlaceholder') || 'Interactive map would be displayed here'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Dubai International Financial Centre, Level 15, Gate Building
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}