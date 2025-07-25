import { Smartphone, CreditCard, ShoppingCart, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useTranslation } from '../hooks/useTranslation';

export function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    {
      step: '01',
      icon: Smartphone,
      title: 'Verify Your SIM',
      description: 'Simple OTP verification using your existing mobile number. No documents needed.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      step: '02',
      icon: CreditCard,
      title: 'Generate Virtual Card',
      description: 'Create instant Visa/MasterCard using your SIM credit or get a microloan.',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      step: '03',
      icon: ShoppingCart,
      title: 'Shop & Pay Online',
      description: 'Use your virtual card for online shopping, travel booking, or bill payments.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      step: '04',
      icon: CheckCircle,
      title: 'Auto-Secure Expiry',
      description: 'Card expires after 24 hours for maximum security. Generate new ones anytime.',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">How It Works</Badge>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
            Get Started in
            <span className="text-accent block">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From SIM verification to online shopping in under 2 minutes. 
            No bank account, no paperwork, no hassle.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-accent/50 to-transparent z-0" />
              )}
              
              <Card className="relative z-10 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center space-y-4">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white text-sm font-bold mb-2">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* USSD Alternative */}
        <div className="bg-primary/5 rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">No Smartphone? No Problem!</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access all features using simple USSD codes. Just dial <strong>*123#</strong> from your mobile 
            and follow the multilingual menu in Arabic, English, Urdu, Hindi, or Tagalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="outline" size="lg" className="font-mono">
              *123# → Generate Card
            </Button>
            <Button variant="outline" size="lg" className="font-mono">
              *123*1# → Check Balance
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}