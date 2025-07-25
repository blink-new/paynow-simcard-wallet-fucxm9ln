import { ArrowRight, CreditCard, Shield, Globe, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useTranslation } from '../hooks/useTranslation';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container-mobile relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Trust Badge */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1">
                <Shield className="h-3 w-3" />
                {t('trust.licensed')}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Globe className="h-3 w-3" />
                5 Languages
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gradient-accent text-white hover:opacity-90 transition-opacity"
                onClick={onGetStarted}
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Zap className="h-5 w-5" />
                {t('hero.ussd')}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="text-sm text-muted-foreground">
                {t('trust.partners')}
              </div>
              <div className="flex gap-4">
                {/* Telco Logos Placeholder */}
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-red-600">E</span>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-600">DU</span>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-red-600">V</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Demo */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Phone Mockup */}
            <div className="relative mx-auto w-80 h-[600px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="h-12 bg-primary flex items-center justify-between px-6 text-white text-sm">
                  <span>9:41</span>
                  <span className="font-medium">{t('app.name')}</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-white/60 rounded-sm" />
                    <div className="w-4 h-2 bg-white rounded-sm" />
                  </div>
                </div>

                {/* App Content */}
                <div className="p-6 space-y-6">
                  {/* Balance Card */}
                  <Card className="p-4 gradient-primary text-white">
                    <div className="space-y-2">
                      <p className="text-sm opacity-90">Available Balance</p>
                      <p className="text-2xl font-bold">AED 450.00</p>
                      <p className="text-xs opacity-75">Credit Score: 750/850</p>
                    </div>
                  </Card>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="h-16 flex-col gap-1 gradient-accent text-white">
                      <CreditCard className="h-5 w-5" />
                      <span className="text-xs">{t('button.generate_card')}</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col gap-1">
                      <Zap className="h-5 w-5" />
                      <span className="text-xs">{t('button.get_credit')}</span>
                    </Button>
                  </div>

                  {/* Recent Card */}
                  <Card className="p-4 border-dashed border-2 border-accent/30">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                        <CreditCard className="h-6 w-6 text-accent" />
                      </div>
                      <p className="text-sm font-medium">Generate Your First Card</p>
                      <p className="text-xs text-muted-foreground">Use your SIM credit instantly</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/20 rounded-full animate-pulse-glow" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/20 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}