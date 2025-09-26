import Navigation from '../Navigation';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';

export default function NavigationExample() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="bg-background text-foreground">
            <Navigation />
            <div className="pt-32 p-8">
              <h1 className="text-2xl font-bold">Navigation Component Demo</h1>
              <p className="text-muted-foreground">This shows the navigation with theme toggle, language toggle, and emergency SOS button.</p>
            </div>
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}