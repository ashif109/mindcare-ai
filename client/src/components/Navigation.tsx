import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Phone,
  ChevronDown,
  Globe,
  Brain,
  Heart,
  Users,
  BookOpen,
  MessageCircle,
  User
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Heart },
    { path: '/dashboard', label: t('nav.dashboard'), icon: Brain },
    { path: '/features', label: t('nav.features'), icon: BookOpen },
    { path: '/forum', label: t('nav.forum'), icon: Users },
    { path: '/copilot', label: t('nav.copilot'), icon: MessageCircle },
    { path: '/resources', label: t('nav.resources'), icon: BookOpen },
    { path: '/contact', label: t('nav.contact'), icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      {/* Privacy Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
        {t('privacy.banner')}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MindCare</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={location === item.path ? "secondary" : "ghost"}
                    className="flex items-center space-x-2"
                    data-testid={`nav-${item.path.slice(1) || 'home'}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Emergency SOS Button */}
            <Link href="/emergency">
              <Button 
                variant="destructive" 
                size="sm"
                data-testid="button-emergency-sos"
              >
                <Phone className="h-4 w-4 mr-1" />
                {t('nav.quickHelp')}
              </Button>
            </Link>

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-language-toggle">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>
                  हिंदी
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user?.name}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" data-testid="link-profile">
                      {t('nav.profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} data-testid="button-logout">
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button data-testid="button-login">
                  {t('nav.login')}
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={location === item.path ? "secondary" : "ghost"}
                      className="w-full justify-start flex items-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}