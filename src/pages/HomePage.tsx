import React from 'react'
import { HeroSection } from '../components/HeroSection'
import { FeaturesSection } from '../components/FeaturesSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { SecuritySection } from '../components/SecuritySection'

interface HomePageProps {
  onGetStarted: () => void
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  return (
    <main className="min-h-screen">
      <HeroSection onGetStarted={onGetStarted} />
      <FeaturesSection />
      <HowItWorksSection />
      <SecuritySection />
    </main>
  )
}