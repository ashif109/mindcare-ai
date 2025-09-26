import Dashboard from '../Dashboard';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';

export default function DashboardExample() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="bg-background text-foreground">
            <Dashboard />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}