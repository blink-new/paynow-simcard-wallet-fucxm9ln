import { CreditCard, Shield, Globe, Zap, Clock, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useTranslation } from '../hooks/useTranslation';

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: CreditCard,
      title: t('features.instant.title'),
      description: t('features.instant.desc'),
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.desc'),
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Globe,
      title: t('features.multilingual.title'),
      description: t('features.multilingual.desc'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Zap,
      title: 'Airtime SplitPay',
      description: 'Buy now, pay later using your airtime credit with flexible repayment options',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Clock,
      title: 'USSD Access',
      description: 'No smartphone? No problem. Access all features via simple USSD codes',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Users,
      title: 'WorkPay Advance',
      description: 'Get salary advances through partner employers with automatic deduction',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
            Everything You Need for
            <span className="text-accent block">Digital Payments</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed specifically for the unbanked community in the UAE. 
            Simple, secure, and accessible to everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Shield className="h-4 w-4" />
            <span>Regulated by UAE Central Bank • Trusted by 50,000+ users</span>
          </div>
        </div>
      </div>
    </section>
  );
}