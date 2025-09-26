import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Edit, 
  Save, 
  Award, 
  Activity, 
  Calendar,
  Bell,
  Shield,
  Brain,
  Heart,
  Target,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Computer Science student passionate about mental health awareness and peer support.',
    university: 'Indian Institute of Technology',
    year: 'Third Year',
    emergencyContact: {
      name: 'Sarah Johnson',
      phone: '+91 98765 43210',
      relationship: 'Mother'
    }
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    communityUpdates: true,
    crisisAlerts: true
  });

  // Mock progress data - todo: remove mock functionality
  const progressStats = {
    totalSessions: 47,
    currentStreak: 12,
    averageMood: 4.2,
    completedGoals: 8,
    totalGoals: 12,
    weeklyMoodData: [3.8, 4.1, 4.3, 3.9, 4.5, 4.2, 4.4],
    recentBadges: [
      { name: 'Mindful Week', icon: '🧘', earned: '2 days ago' },
      { name: 'Study Buddy', icon: '📚', earned: '1 week ago' },
      { name: 'Wellness Warrior', icon: '💪', earned: '2 weeks ago' }
    ]
  };

  const mentalHealthMetrics = [
    {
      label: 'Stress Level',
      value: 35,
      trend: 'down',
      color: 'bg-green-500'
    },
    {
      label: 'Sleep Quality',
      value: 78,
      trend: 'up',
      color: 'bg-blue-500'
    },
    {
      label: 'Focus Score',
      value: 82,
      trend: 'up',
      color: 'bg-purple-500'
    },
    {
      label: 'Social Connection',
      value: 67,
      trend: 'stable',
      color: 'bg-orange-500'
    }
  ];

  const handleSaveProfile = () => {
    // todo: remove mock functionality - save to backend
    console.log('Profile saved:', profileData);
    setIsEditing(false);
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    // todo: remove mock functionality - save to backend
    console.log('Preference updated:', key, value);
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center space-x-2">
            <User className="h-8 w-8 text-primary" />
            <span>{t('nav.profile')}</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your profile, track your mental wellness journey, and customize your MindCare experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{profileData.name}</CardTitle>
              <CardDescription>{profileData.university}</CardDescription>
              <Badge variant="secondary">{profileData.year}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {user?.mentalHealthScore || 75}
                </div>
                <div className="text-sm text-muted-foreground">Mental Health Score</div>
                <Progress value={user?.mentalHealthScore || 75} className="mt-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold">{progressStats.currentStreak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{progressStats.totalSessions}</div>
                  <div className="text-xs text-muted-foreground">Sessions</div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Recent Badges</h3>
                <div className="space-y-2">
                  {progressStats.recentBadges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-lg">{badge.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">{badge.earned}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
                <TabsTrigger value="wellness" data-testid="tab-wellness">Wellness</TabsTrigger>
                <TabsTrigger value="settings" data-testid="tab-settings">Settings</TabsTrigger>
                <TabsTrigger value="privacy" data-testid="tab-privacy">Privacy</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Personal Information</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        data-testid="button-edit-profile"
                      >
                        {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                        {isEditing ? 'Save' : 'Edit'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                          data-testid="input-profile-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          data-testid="input-profile-email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        rows={3}
                        data-testid="textarea-profile-bio"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="university">University</Label>
                        <Input
                          id="university"
                          value={profileData.university}
                          onChange={(e) => setProfileData(prev => ({ ...prev, university: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Academic Year</Label>
                        <Input
                          id="year"
                          value={profileData.year}
                          onChange={(e) => setProfileData(prev => ({ ...prev, year: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergency-name">Name</Label>
                          <Input
                            id="emergency-name"
                            value={profileData.emergencyContact.name}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                            }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency-phone">Phone</Label>
                          <Input
                            id="emergency-phone"
                            value={profileData.emergencyContact.phone}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                            }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency-relationship">Relationship</Label>
                          <Input
                            id="emergency-relationship"
                            value={profileData.emergencyContact.relationship}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
                            }))}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile} data-testid="button-save-profile">
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wellness Tab */}
              <TabsContent value="wellness">
                <div className="space-y-6">
                  {/* Mental Health Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Brain className="h-5 w-5" />
                        <span>Mental Health Metrics</span>
                      </CardTitle>
                      <CardDescription>Your wellness indicators over the past month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mentalHealthMetrics.map((metric, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{metric.label}</span>
                              <div className="flex items-center space-x-1">
                                <span className="text-sm font-bold">{metric.value}%</span>
                                <TrendingUp className={`h-3 w-3 ${
                                  metric.trend === 'up' ? 'text-green-500' : 
                                  metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                                }`} />
                              </div>
                            </div>
                            <Progress value={metric.value} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Goals Progress */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-5 w-5" />
                        <span>Goals Progress</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Completed Goals</span>
                          <span className="font-bold">
                            {progressStats.completedGoals} / {progressStats.totalGoals}
                          </span>
                        </div>
                        <Progress 
                          value={(progressStats.completedGoals / progressStats.totalGoals) * 100} 
                          className="h-2" 
                        />
                        <div className="text-sm text-muted-foreground">
                          You're doing great! Keep up the momentum.
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Activity Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="h-5 w-5" />
                        <span>Activity Summary</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">47</div>
                          <div className="text-sm text-muted-foreground">Total Sessions</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-500">12</div>
                          <div className="text-sm text-muted-foreground">Current Streak</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-500">4.2</div>
                          <div className="text-sm text-muted-foreground">Avg Mood</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-500">156</div>
                          <div className="text-sm text-muted-foreground">Minutes Meditated</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <span>Notification Preferences</span>
                    </CardTitle>
                    <CardDescription>
                      Choose what notifications you'd like to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(preferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">
                            {key === 'emailNotifications' && 'Email Notifications'}
                            {key === 'pushNotifications' && 'Push Notifications'}
                            {key === 'weeklyReports' && 'Weekly Progress Reports'}
                            {key === 'communityUpdates' && 'Community Updates'}
                            {key === 'crisisAlerts' && 'Crisis Support Alerts'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {key === 'emailNotifications' && 'Get notified via email about important updates'}
                            {key === 'pushNotifications' && 'Receive push notifications on your device'}
                            {key === 'weeklyReports' && 'Weekly summary of your mental health progress'}
                            {key === 'communityUpdates' && 'Updates from the peer support community'}
                            {key === 'crisisAlerts' && 'Important mental health crisis support information'}
                          </div>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => handlePreferenceChange(key, checked)}
                          data-testid={`switch-${key}`}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Privacy & Security</span>
                    </CardTitle>
                    <CardDescription>
                      Manage your data privacy and account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <div className="flex items-center space-x-2 text-green-700 dark:text-green-300 mb-2">
                          <Shield className="h-4 w-4" />
                          <span className="font-medium">Your Data is Secure</span>
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400">
                          All your mental health data is encrypted end-to-end and never shared without your explicit consent.
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-medium">Data Management</h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            Download My Data
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            Data Usage Report
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-red-600">
                            Delete Account
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-medium">Account Security</h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            Change Password
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            Two-Factor Authentication
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            Active Sessions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}