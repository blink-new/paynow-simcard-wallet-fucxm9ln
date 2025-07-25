import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Smartphone, Shield, Users, LogIn, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';

interface HeaderProps {
  onGetStarted?: () => void;
}

export function Header({ onGetStarted }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    { name: t('nav.home') || 'Home', href: '/' },
    { name: t('nav.solution') || 'Solution', href: '/solution' },
    { name: t('nav.about') || 'About Us', href: '/about' },
    { name: t('nav.help') || 'Help Center', href: '/help' },
    { name: t('nav.contact') || 'Contact Us', href: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-mobile flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <span className="font-medium text-lg">{t('app.name')}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-accent'
                  : 'text-gray-600 hover:text-accent'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <LanguageSelector />
          
          {/* Login/Register Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onGetStarted}
              className="text-gray-600 hover:text-accent"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button 
              size="sm"
              onClick={onGetStarted}
              className="bg-accent hover:bg-accent/90"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </Button>
          </div>
          
          {/* Trust Indicators - Desktop */}
          <div className="hidden xl:flex items-center gap-4 text-xs text-muted-foreground ml-4 pl-4 border-l">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>{t('trust.licensed')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{t('trust.users')}</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container-mobile py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-accent'
                    : 'text-gray-600 hover:text-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Login/Register */}
            <div className="pt-3 border-t space-y-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  onGetStarted?.();
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start text-gray-600 hover:text-accent"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button 
                size="sm"
                onClick={() => {
                  onGetStarted?.();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-accent hover:bg-accent/90"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Register
              </Button>
            </div>
            
            {/* Mobile Trust Indicators */}
            <div className="pt-3 border-t space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>{t('trust.licensed')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{t('trust.users')}</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}