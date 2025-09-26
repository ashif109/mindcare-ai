import AICopilot from '../AICopilot';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function AICopilotExample() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="bg-background text-foreground">
          <AICopilot />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}