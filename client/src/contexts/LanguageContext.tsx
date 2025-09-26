import { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.features': 'Features',
    'nav.forum': 'Forum',
    'nav.copilot': 'AI Copilot',
    'nav.resources': 'Resources',
    'nav.contact': 'Contact',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.quickHelp': 'Quick Help',
    'hero.title': 'Your Mental Wellness Companion',
    'hero.subtitle': 'AI-powered support for student mental health with personalized insights and community support',
    'hero.cta': 'Start Your MindCare Journey',
    'dashboard.title': 'Your Wellness Dashboard',
    'dashboard.mentalScore': 'Mental Health Score',
    'dashboard.moodToday': 'How are you feeling today?',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'privacy.banner': 'Your data is encrypted & private',
    'copilot.title': 'AI Mental Health Assistant',
    'copilot.placeholder': 'How can I help you today?',
    'mindfulness.title': 'Mindfulness Room',
    'mindfulness.breathe': 'Breathing Exercise',
    'mindfulness.meditate': 'Start Meditation',
    'forum.title': 'Peer Support Forum',
    'forum.post': 'Share your thoughts...',
    'emergency.title': 'Emergency Support',
    'emergency.helpline': 'Crisis Helpline: 112',
  },
  hi: {
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.features': 'सुविधाएं',
    'nav.forum': 'फोरम',
    'nav.copilot': 'AI सहायक',
    'nav.resources': 'संसाधन',
    'nav.contact': 'संपर्क',
    'nav.profile': 'प्रोफाइल',
    'nav.login': 'लॉगिन',
    'nav.logout': 'लॉगआउट',
    'nav.quickHelp': 'तुरंत सहायता',
    'hero.title': 'आपका मानसिक स्वास्थ्य साथी',
    'hero.subtitle': 'छात्र मानसिक स्वास्थ्य के लिए AI-संचालित सहायता',
    'hero.cta': 'अपनी MindCare यात्रा शुरू करें',
    'dashboard.title': 'आपका स्वास्थ्य डैशबोर्ड',
    'dashboard.mentalScore': 'मानसिक स्वास्थ्य स्कोर',
    'dashboard.moodToday': 'आज आप कैसा महसूस कर रहे हैं?',
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.name': 'पूरा नाम',
    'privacy.banner': 'आपका डेटा एन्क्रिप्टेड और निजी है',
    'copilot.title': 'AI मानसिक स्वास्थ्य सहायक',
    'copilot.placeholder': 'आज मैं आपकी कैसे मदद कर सकता हूं?',
    'mindfulness.title': 'माइंडफुलनेस रूम',
    'mindfulness.breathe': 'सांस लेने का व्यायाम',
    'mindfulness.meditate': 'ध्यान शुरू करें',
    'forum.title': 'साथी सहायता फोरम',
    'forum.post': 'अपने विचार साझा करें...',
    'emergency.title': 'आपातकालीन सहायता',
    'emergency.helpline': 'संकट हेल्पलाइन: 112',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};