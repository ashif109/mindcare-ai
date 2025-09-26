import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Heart, 
  Activity, 
  Calendar, 
  MessageCircle, 
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Users,
  Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  // Mock data for dashboard - todo: remove mock functionality
  const [dashboardData, setDashboardData] = useState({
    mentalHealthScore: user?.mentalHealthScore || 75,
    todayMood: 'Good',
    streakDays: 7,
    weeklyProgress: 85,
    sleepHours: 7.5,
    studyHours: 6,
    badges: user?.badges || ['New Member', 'Mindful Day'],
    upcomingAppointments: 1,
    forumActivity: 3,
    recommendedActions: [
      'Complete your daily mood check-in',
      'Try the 5-minute breathing exercise',
      'Connect with peers in the forum'
    ]
  });

  const quickActions = [
    {
      title: 'AI Stress Detection',
      description: 'Check your current stress levels',
      icon: Brain,
      href: '/stress-detection',
      color: 'bg-blue-500'
    },
    {
      title: 'Mindfulness Room',
      description: 'Breathing exercises & meditation',
      icon: Heart,
      href: '/mindfulness',
      color: 'bg-green-500'
    },
    {
      title: 'AI Copilot',
      description: 'Chat with your mental health assistant',
      icon: MessageCircle,
      href: '/copilot',
      color: 'bg-purple-500'
    },
    {
      title: 'Peer Forum',
      description: 'Connect with fellow students',
      icon: Users,
      href: '/forum',
      color: 'bg-orange-500'
    },
    {
      title: 'Book Counselor',
      description: 'Schedule professional support',
      icon: Calendar,
      href: '/booking',
      color: 'bg-red-500'
    },
    {
      title: 'Resources',
      description: 'Study techniques & wellness tips',
      icon: BookOpen,
      href: '/resources',
      color: 'bg-indigo-500'
    }
  ];

  const moodOptions = ['Excellent', 'Good', 'Okay', 'Struggling', 'Difficult'];

  const handleMoodUpdate = (mood: string) => {
    setDashboardData(prev => ({ ...prev, todayMood: mood }));
    // todo: remove mock functionality - save to localStorage
    localStorage.setItem('todayMood', mood);
    console.log('Mood updated:', mood);
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('dashboard.title')} - Let's check in on your mental wellness journey.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mental Health Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>{t('dashboard.mentalScore')}</span>
                </CardTitle>
                <CardDescription>
                  Based on your recent activities and check-ins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-primary">
                    {dashboardData.mentalHealthScore}
                  </div>
                  <div className="flex-1">
                    <Progress value={dashboardData.mentalHealthScore} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>Needs attention</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </CardContent>
            </Card>

            {/* Daily Mood Check-in */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>{t('dashboard.moodToday')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Current mood:</span>
                    <Badge variant="secondary" data-testid="badge-current-mood">
                      {dashboardData.todayMood}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {moodOptions.map((mood) => (
                      <Button
                        key={mood}
                        variant={dashboardData.todayMood === mood ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleMoodUpdate(mood)}
                        data-testid={`button-mood-${mood.toLowerCase()}`}
                      >
                        {mood}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">{dashboardData.streakDays}</div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">{dashboardData.sleepHours}h</div>
                      <div className="text-sm text-muted-foreground">Sleep Last Night</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold">{dashboardData.studyHours}h</div>
                      <div className="text-sm text-muted-foreground">Study Time Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Jump into your wellness activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Link key={index} href={action.href}>
                        <Card className="hover-elevate cursor-pointer">
                          <CardContent className="pt-6">
                            <div className="flex items-start space-x-3">
                              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-sm">{action.title}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {action.description}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span>Your Badges</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {dashboardData.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <Award className="h-3 w-3" />
                      <span>{badge}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span>Recommended for You</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.recommendedActions.map((action, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="text-sm">{action}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Counselor Sessions</span>
                  </div>
                  <Badge variant="outline">{dashboardData.upcomingAppointments}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Forum Replies</span>
                  </div>
                  <Badge variant="outline">{dashboardData.forumActivity}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}