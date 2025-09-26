import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  mentalHealthScore: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for existing user session
    const savedUser = localStorage.getItem('mindcare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call with localStorage check
    const existingUsers = JSON.parse(localStorage.getItem('mindcare_users') || '[]');
    const foundUser = existingUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userProfile = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        mentalHealthScore: foundUser.mentalHealthScore || 75,
        badges: foundUser.badges || ['New Member']
      };
      setUser(userProfile);
      localStorage.setItem('mindcare_user', JSON.stringify(userProfile));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call with localStorage
    const existingUsers = JSON.parse(localStorage.getItem('mindcare_users') || '[]');
    
    // Check if email already exists
    if (existingUsers.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      mentalHealthScore: 80,
      badges: ['New Member'],
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('mindcare_users', JSON.stringify(updatedUsers));

    const userProfile = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      mentalHealthScore: newUser.mentalHealthScore,
      badges: newUser.badges
    };
    
    setUser(userProfile);
    localStorage.setItem('mindcare_user', JSON.stringify(userProfile));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mindcare_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};