import { Translations, Language } from '../types';

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', rtl: false },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', rtl: false },
];

export const translations: Translations = {
  // Navigation & Common
  'app.name': {
    en: 'PayNow SIMCard Wallet',
    ar: 'محفظة باي ناو للشريحة',
    ur: 'پے ناؤ سم کارڈ والیٹ',
    hi: 'पेनाउ सिमकार्ड वॉलेट',
    tl: 'PayNow SIMCard Wallet'
  },
  'nav.home': {
    en: 'Home',
    ar: 'الرئيسية',
    ur: 'ہوم',
    hi: 'होम',
    tl: 'Home'
  },
  'nav.solution': {
    en: 'Solution',
    ar: 'الحل',
    ur: 'حل',
    hi: 'समाधान',
    tl: 'Solusyon'
  },
  'nav.about': {
    en: 'About Us',
    ar: 'من نحن',
    ur: 'ہمارے بارے میں',
    hi: 'हमारे बारे में',
    tl: 'Tungkol Sa Amin'
  },
  'nav.help': {
    en: 'Help Center',
    ar: 'مركز المساعدة',
    ur: 'ہیلپ سینٹر',
    hi: 'सहायता केंद्र',
    tl: 'Help Center'
  },
  'nav.contact': {
    en: 'Contact Us',
    ar: 'اتصل بنا',
    ur: 'رابطہ کریں',
    hi: 'संपर्क करें',
    tl: 'Makipag-ugnayan'
  },
  'nav.dashboard': {
    en: 'Dashboard',
    ar: 'لوحة التحكم',
    ur: 'ڈیش بورڈ',
    hi: 'डैशबोर्ड',
    tl: 'Dashboard'
  },
  'nav.cards': {
    en: 'Cards',
    ar: 'البطاقات',
    ur: 'کارڈز',
    hi: 'कार्ड',
    tl: 'Cards'
  },
  'nav.support': {
    en: 'Support',
    ar: 'الدعم',
    ur: 'سپورٹ',
    hi: 'सहायता',
    tl: 'Suporta'
  },

  // Hero Section
  'hero.title': {
    en: 'Your SIM is Your Bank',
    ar: 'شريحتك هي بنكك',
    ur: 'آپ کا سم آپ کا بینک ہے',
    hi: 'आपका सिम आपका बैंक है',
    tl: 'Ang Inyong SIM ay Inyong Bank'
  },
  'hero.subtitle': {
    en: 'Generate instant virtual debit cards using your mobile credit. Shop online, book travel, pay bills - no bank account needed.',
    ar: 'أنشئ بطاقات خصم افتراضية فورية باستخدام رصيد هاتفك المحمول. تسوق عبر الإنترنت، احجز السفر، ادفع الفواتير - لا حاجة لحساب مصرفي.',
    ur: 'اپنے موبائل کریڈٹ استعمال کرتے ہوئے فوری ورچوئل ڈیبٹ کارڈز بنائیں۔ آن لائن خریداری کریں، سفر بک کریں، بل ادا کریں - بینک اکاؤنٹ کی ضرورت نہیں۔',
    hi: 'अपने मोबाइल क्रेडिट का उपयोग करके तुरंत वर्चुअल डेबिट कार्ड बनाएं। ऑनलाइन खरीदारी करें, यात्रा बुक करें, बिल भुगतान करें - बैंक खाते की जरूरत नहीं।',
    tl: 'Gumawa ng instant virtual debit cards gamit ang inyong mobile credit. Mag-shopping online, mag-book ng travel, magbayad ng bills - walang kailangang bank account.'
  },
  'hero.cta': {
    en: 'Get Started Now',
    ar: 'ابدأ الآن',
    ur: 'ابھی شروع کریں',
    hi: 'अभी शुरू करें',
    tl: 'Simulan Ngayon'
  },
  'hero.ussd': {
    en: 'Or dial *123# for USSD access',
    ar: 'أو اطلب *123# للوصول عبر USSD',
    ur: 'یا USSD رسائی کے لیے *123# ڈائل کریں',
    hi: 'या USSD एक्सेस के लिए *123# डायल करें',
    tl: 'O mag-dial ng *123# para sa USSD access'
  },

  // Features
  'features.instant.title': {
    en: 'Instant Virtual Cards',
    ar: 'بطاقات افتراضية فورية',
    ur: 'فوری ورچوئل کارڈز',
    hi: 'तुरंत वर्चुअल कार्ड',
    tl: 'Instant Virtual Cards'
  },
  'features.instant.desc': {
    en: 'Generate Visa/MasterCard in seconds using your SIM credit',
    ar: 'أنشئ بطاقة فيزا/ماستركارد في ثوانٍ باستخدام رصيد الشريحة',
    ur: 'اپنے سم کریڈٹ استعمال کرتے ہوئے سیکنڈوں میں ویزا/ماسٹرکارڈ بنائیں',
    hi: 'अपने सिम क्रेडिट का उपयोग करके सेकंड में वीज़ा/मास्टरकार्ड बनाएं',
    tl: 'Gumawa ng Visa/MasterCard sa loob ng ilang segundo gamit ang SIM credit'
  },
  'features.secure.title': {
    en: '24-Hour Security',
    ar: 'أمان على مدار 24 ساعة',
    ur: '24 گھنٹے کی سیکیورٹی',
    hi: '24 घंटे की सुरक्षा',
    tl: '24-Oras na Security'
  },
  'features.secure.desc': {
    en: 'Cards auto-expire after 24 hours for maximum security',
    ar: 'تنتهي صلاحية البطاقات تلقائياً بعد 24 ساعة لأقصى أمان',
    ur: 'زیادہ سے زیادہ سیکیورٹی کے لیے کارڈز 24 گھنٹے بعد خودکار طور پر ختم ہو جاتے ہیں',
    hi: 'अधिकतम सुरक्षा के लिए कार्ड 24 घंटे बाद स्वचालित रूप से समाप्त हो जाते हैं',
    tl: 'Ang mga cards ay automatic na mag-expire pagkatapos ng 24 oras para sa maximum security'
  },
  'features.multilingual.title': {
    en: 'Multilingual Support',
    ar: 'دعم متعدد اللغات',
    ur: 'کثیر لسانی سپورٹ',
    hi: 'बहुभाषी सहायता',
    tl: 'Multilingual Support'
  },
  'features.multilingual.desc': {
    en: 'Available in Arabic, English, Urdu, Hindi & Tagalog',
    ar: 'متوفر بالعربية والإنجليزية والأردية والهندية والتاغالوغ',
    ur: 'عربی، انگریزی، اردو، ہندی اور تاگالوگ میں دستیاب',
    hi: 'अरबी, अंग्रेजी, उर्दू, हिंदी और तागालोग में उपलब्ध',
    tl: 'Available sa Arabic, English, Urdu, Hindi at Tagalog'
  },

  // Trust Indicators
  'trust.licensed': {
    en: 'UAE Central Bank Licensed',
    ar: 'مرخص من البنك المركزي الإماراتي',
    ur: 'یو اے ای سنٹرل بینک لائسنس یافتہ',
    hi: 'यूएई सेंट्रल बैंक लाइसेंस प्राप्त',
    tl: 'UAE Central Bank Licensed'
  },
  'trust.partners': {
    en: 'Trusted by Etisalat, DU & Virgin',
    ar: 'موثوق من قبل اتصالات ودو وفيرجن',
    ur: 'ایٹسلات، ڈو اور ورجن کا بھروسہ',
    hi: 'एतिसलात, डीयू और वर्जिन द्वारा विश्वसनीय',
    tl: 'Pinagkakatiwalaan ng Etisalat, DU at Virgin'
  },
  'trust.users': {
    en: '50,000+ Active Users',
    ar: '50,000+ مستخدم نشط',
    ur: '50,000+ فعال صارفین',
    hi: '50,000+ सक्रिय उपयोगकर्ता',
    tl: '50,000+ Active Users'
  },

  // Buttons & Actions
  'button.generate_card': {
    en: 'Generate Card',
    ar: 'إنشاء بطاقة',
    ur: 'کارڈ بنائیں',
    hi: 'कार्ड बनाएं',
    tl: 'Gumawa ng Card'
  },
  'button.view_balance': {
    en: 'View Balance',
    ar: 'عرض الرصيد',
    ur: 'بیلنس دیکھیں',
    hi: 'बैलेंस देखें',
    tl: 'Tingnan ang Balance'
  },
  'button.get_credit': {
    en: 'Get Credit',
    ar: 'احصل على ائتمان',
    ur: 'کریڈٹ حاصل کریں',
    hi: 'क्रेडिट प्राप्त करें',
    tl: 'Kumuha ng Credit'
  },

  // Footer
  'footer.description': {
    en: 'Empowering the unbanked community in the UAE with instant access to digital payments through their mobile SIM cards.',
    ar: 'تمكين المجتمع غير المصرفي في دولة الإمارات العربية المتحدة من الوصول الفوري إلى المدفوعات الرقمية من خلال بطاقات SIM المحمولة.',
    ur: 'یو اے ای میں غیر بینکنگ کمیونٹی کو ان کے موبائل سم کارڈز کے ذریعے ڈیجیٹل پیمنٹس تک فوری رسائی فراہم کرنا۔',
    hi: 'यूएई में अनबैंक्ड समुदाय को उनके मोबाइल सिम कार्ड के माध्यम से डिजिटल भुगतान तक तत्काल पहुंच प्रदान करना।',
    tl: 'Pagbibigay ng kapangyarihan sa unbanked na komunidad sa UAE na may instant na access sa digital payments sa pamamagitan ng kanilang mobile SIM cards.'
  },
  'footer.quickLinks': {
    en: 'Quick Links',
    ar: 'روابط سريعة',
    ur: 'فوری لنکس',
    hi: 'त्वरित लिंक',
    tl: 'Mabilis na Links'
  },
  'footer.support': {
    en: 'Support',
    ar: 'الدعم',
    ur: 'سپورٹ',
    hi: 'सहायता',
    tl: 'Suporta'
  },
  'footer.ussdAccess': {
    en: 'USSD Access',
    ar: 'الوصول عبر USSD',
    ur: 'USSD رسائی',
    hi: 'USSD एक्सेस',
    tl: 'USSD Access'
  },
  'footer.noSmartphone': {
    en: 'No smartphone? Use USSD codes:',
    ar: 'لا تملك هاتف ذكي؟ استخدم رموز USSD:',
    ur: 'سمارٹ فون نہیں؟ USSD کوڈز استعمال کریں:',
    hi: 'स्मार्टफोन नहीं है? USSD कोड का उपयोग करें:',
    tl: 'Walang smartphone? Gamitin ang USSD codes:'
  },
  'footer.mainMenu': {
    en: 'Main Menu',
    ar: 'القائمة الرئيسية',
    ur: 'مین مینو',
    hi: 'मुख्य मेनू',
    tl: 'Main Menu'
  },
  'footer.balance': {
    en: 'Balance',
    ar: 'الرصيد',
    ur: 'بیلنس',
    hi: 'बैलेंस',
    tl: 'Balance'
  },
  'footer.generateCard': {
    en: 'Generate Card',
    ar: 'إنشاء بطاقة',
    ur: 'کارڈ بنائیں',
    hi: 'कार्ड बनाएं',
    tl: 'Gumawa ng Card'
  },
  'footer.supportUssd': {
    en: 'Support',
    ar: 'الدعم',
    ur: 'سپورٹ',
    hi: 'सहायता',
    tl: 'Suporta'
  },
  'footer.availableLanguages': {
    en: 'Available in 5 languages',
    ar: 'متوفر بـ 5 لغات',
    ur: '5 زبانوں میں دستیاب',
    hi: '5 भाषाओं में उपलब्ध',
    tl: 'Available sa 5 wika'
  },
  'footer.copyright': {
    en: '© 2024 PayNow SIMCard Wallet. Licensed by UAE Central Bank.',
    ar: '© 2024 محفظة باي ناو للشريحة. مرخصة من البنك المركزي الإماراتي.',
    ur: '© 2024 پے ناؤ سم کارڈ والیٹ۔ یو اے ای سنٹرل بینک سے لائسنس یافتہ۔',
    hi: '© 2024 पेनाउ सिमकार्ड वॉलेट। यूएई सेंट्रल बैंक द्वारा लाइसेंस प्राप्त।',
    tl: '© 2024 PayNow SIMCard Wallet. Licensed ng UAE Central Bank.'
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    ar: 'سياسة الخصوصية',
    ur: 'پرائیویسی پالیسی',
    hi: 'गोपनीयता नीति',
    tl: 'Privacy Policy'
  },
  'footer.terms': {
    en: 'Terms of Service',
    ar: 'شروط الخدمة',
    ur: 'سروس کی شرائط',
    hi: 'सेवा की शर्तें',
    tl: 'Terms of Service'
  },
  'footer.aml': {
    en: 'AML Policy',
    ar: 'سياسة مكافحة غسل الأموال',
    ur: 'AML پالیسی',
    hi: 'AML नीति',
    tl: 'AML Policy'
  },

  // Common Actions
  'getStarted': {
    en: 'Get Started',
    ar: 'ابدأ الآن',
    ur: 'شروع کریں',
    hi: 'शुरू करें',
    tl: 'Simulan'
  },
  'login': {
    en: 'Login',
    ar: 'تسجيل الدخول',
    ur: 'لاگ ان',
    hi: 'लॉगिन',
    tl: 'Mag-login'
  },
  'register': {
    en: 'Register',
    ar: 'التسجيل',
    ur: 'رجسٹر',
    hi: 'पंजीकरण',
    tl: 'Mag-rehistro'
  }
};