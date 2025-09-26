import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import DashboardPage from "@/pages/DashboardPage";
import AIStressDetection from "@/components/AIStressDetection";
import AICopilot from "@/components/AICopilot";
import MindfulnessRoom from "@/components/MindfulnessRoom";
import PeerForum from "@/components/PeerForum";
import EmergencySOS from "@/components/EmergencySOS";
import ResourceLibrary from "@/components/ResourceLibrary";
import ProfilePage from "@/components/ProfilePage";
import AdminAnalytics from "@/components/AdminAnalytics";
import CounselorBooking from "@/components/CounselorBooking";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/stress-detection" component={AIStressDetection} />
      <Route path="/copilot" component={AICopilot} />
      <Route path="/mindfulness" component={MindfulnessRoom} />
      <Route path="/forum" component={PeerForum} />
      <Route path="/emergency" component={EmergencySOS} />
      <Route path="/resources" component={ResourceLibrary} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/admin" component={AdminAnalytics} />
      <Route path="/booking" component={CounselorBooking} />
      <Route path="/features" component={() => <div className="pt-24 p-8 text-center"><h1 className="text-2xl font-bold">Features Coming Soon</h1></div>} />
      <Route path="/contact" component={() => <div className="pt-24 p-8 text-center"><h1 className="text-2xl font-bold">Contact Us</h1></div>} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <div className="min-h-screen bg-background text-foreground">
                <Navigation />
                <Router />
              </div>
              <Toaster />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
