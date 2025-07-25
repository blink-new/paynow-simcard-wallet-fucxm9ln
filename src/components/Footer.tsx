import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <Smartphone className="h-5 w-5" />
              </div>
              <span className="font-medium text-lg">{t('app.name') || 'PayNow SIMCard Wallet'}</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              {t('footer.description') || 'Empowering the unbanked community in the UAE with instant access to digital payments through their mobile SIM cards.'}
            </p>
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-red-600">E</span>
              </div>
              <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-600">DU</span>
              </div>
              <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-red-600">V</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.quickLinks') || 'Quick Links'}</h3>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block text-white/80 hover:text-white transition-colors">
                {t('nav.home') || 'Home'}
              </Link>
              <Link to="/solution" className="block text-white/80 hover:text-white transition-colors">
                {t('nav.solution') || 'Solution'}
              </Link>
              <Link to="/about" className="block text-white/80 hover:text-white transition-colors">
                {t('nav.about') || 'About Us'}
              </Link>
              <Link to="/help" className="block text-white/80 hover:text-white transition-colors">
                {t('nav.help') || 'Help Center'}
              </Link>
              <Link to="/contact" className="block text-white/80 hover:text-white transition-colors">
                {t('nav.contact') || 'Contact Us'}
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.support') || 'Support'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp: +971 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4" />
                <span>Call: 800-PAYNOW</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4" />
                <span>support@paynow.ae</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4" />
                <span>Dubai, UAE</span>
              </div>
            </div>
          </div>

          {/* USSD Access */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.ussdAccess') || 'USSD Access'}</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>{t('footer.noSmartphone') || 'No smartphone? Use USSD codes:'}</p>
              <div className="space-y-1 font-mono">
                <div>*123# - {t('footer.mainMenu') || 'Main Menu'}</div>
                <div>*123*1# - {t('footer.balance') || 'Balance'}</div>
                <div>*123*2# - {t('footer.generateCard') || 'Generate Card'}</div>
                <div>*123*3# - {t('footer.supportUssd') || 'Support'}</div>
              </div>
              <p className="text-xs">{t('footer.availableLanguages') || 'Available in 5 languages'}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-white/60">
            {t('footer.copyright') || '© 2024 PayNow SIMCard Wallet. Licensed by UAE Central Bank.'}
          </div>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">
              {t('footer.privacy') || 'Privacy Policy'}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t('footer.terms') || 'Terms of Service'}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t('footer.aml') || 'AML Policy'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}