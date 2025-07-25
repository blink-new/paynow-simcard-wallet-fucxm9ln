import { Shield, Lock, Eye, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'UAE Central Bank Licensed',
      description: 'Fully regulated e-money license ensuring compliance with PSP guidelines',
      status: 'active'
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All transactions and data protected with bank-grade 256-bit encryption',
      status: 'active'
    },
    {
      icon: Clock,
      title: '24-Hour Auto-Expiry',
      description: 'Virtual cards automatically expire after 24 hours for maximum security',
      status: 'active'
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Advanced fraud detection with instant alerts for suspicious activity',
      status: 'active'
    },
    {
      icon: AlertTriangle,
      title: 'Transaction Limits',
      description: 'AML-compliant daily (AED 200) and monthly (AED 3,000) limits for safety',
      status: 'active'
    },
    {
      icon: CheckCircle,
      title: 'SIM-based KYC',
      description: 'Identity verification through your registered SIM card with telco partners',
      status: 'active'
    }
  ];

  return (
    <section id="security" className="py-20 lg:py-32">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">Security & Compliance</Badge>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
            Your Money is
            <span className="text-primary block">Safe & Secure</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with enterprise-grade security and full regulatory compliance. 
            Your financial safety is our top priority.
          </p>
        </div>

        {/* Security Score Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="gradient-primary text-white">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Security Score</h3>
                <p className="text-white/80">Industry-leading protection standards</p>
              </div>
              
              <div className="space-y-4">
                <div className="text-6xl font-bold">98%</div>
                <Progress value={98} className="h-3 bg-white/20" />
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold">Encryption</div>
                    <div className="text-white/80">256-bit</div>
                  </div>
                  <div>
                    <div className="font-semibold">Compliance</div>
                    <div className="text-white/80">UAE CB</div>
                  </div>
                  <div>
                    <div className="font-semibold">Uptime</div>
                    <div className="text-white/80">99.9%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 space-y-4">
                {/* Icon & Status */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Compliance Badges */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">Regulatory Compliance</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              PayNow SIMCard Wallet operates under full regulatory oversight, 
              ensuring your financial transactions meet the highest standards.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {/* UAE Central Bank */}
              <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">UAE Central Bank</div>
                  <div className="text-xs text-muted-foreground">Licensed PSP</div>
                </div>
              </div>

              {/* PCI DSS */}
              <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">PCI DSS</div>
                  <div className="text-xs text-muted-foreground">Level 1</div>
                </div>
              </div>

              {/* ISO 27001 */}
              <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm">
                <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">ISO 27001</div>
                  <div className="text-xs text-muted-foreground">Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}