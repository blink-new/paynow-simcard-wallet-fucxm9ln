import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createClient } from '@blinkdotnew/sdk'
import { LanguageProvider } from './components/LanguageProvider'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { SolutionPage } from './pages/SolutionPage'
import { AboutUsPage } from './pages/AboutUsPage'
import { HelpCenterPage } from './pages/HelpCenterPage'
import { ContactUsPage } from './pages/ContactUsPage'
import { Dashboard } from './components/Dashboard'

const blink = createClient({
  projectId: 'paynow-simcard-wallet-fucxm9ln',
  authRequired: true
})

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    // Simple loading simulation for now
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleGetStarted = () => {
    // For now, just show a mock dashboard
    // In production, this would trigger actual authentication
    setShowDashboard(true)
    setUser({ 
      id: 'demo-user', 
      email: 'demo@paynow.ae', 
      name: 'Demo User',
      phone: '+971501234567'
    })
  }

  const handleBackToLanding = () => {
    setShowDashboard(false)
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PayNow SIMCard Wallet...</p>
        </div>
      </div>
    )
  }

  if (showDashboard && user) {
    return (
      <LanguageProvider>
        <Dashboard user={user} onBackToLanding={handleBackToLanding} />
      </LanguageProvider>
    )
  }

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header onGetStarted={handleGetStarted} />
          
          <Routes>
            <Route 
              path="/" 
              element={<HomePage onGetStarted={handleGetStarted} />} 
            />
            <Route path="/solution" element={<SolutionPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App