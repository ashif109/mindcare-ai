import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  LineChart, 
  TrendingUp, 
  TrendingDown,
  Users,
  Brain,
  AlertTriangle,
  Clock,
  Activity,
  Heart,
  Calendar,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminAnalytics() {
  // Mock analytics data - todo: remove mock functionality
  const [analyticsData] = useState({
    overview: {
      totalStudents: 2847,
      activeUsers: 1923,
      dailyCheckIns: 756,
      avgMentalHealthScore: 74.2,
      criticalAlerts: 12,
      weeklyGrowth: 8.5
    },
    stressLevels: {
      low: 45,
      moderate: 32,
      high: 18,
      critical: 5
    },
    timeDistribution: {
      morning: 23,
      afternoon: 31,
      evening: 34,
      night: 12
    },
    demographics: {
      firstYear: 28,
      secondYear: 24,
      thirdYear: 22,
      fourthYear: 19,
      postGrad: 7
    },
    weeklyTrends: [
      { day: 'Mon', checkIns: 145, avgScore: 72 },
      { day: 'Tue', checkIns: 167, avgScore: 74 },
      { day: 'Wed', checkIns: 156, avgScore: 71 },
      { day: 'Thu', checkIns: 189, avgScore: 76 },
      { day: 'Fri', checkIns: 134, avgScore: 69 },
      { day: 'Sat', checkIns: 98, avgScore: 78 },
      { day: 'Sun', checkIns: 87, avgScore: 79 }
    ],
    peakStressHours: [
      { hour: '9 AM', level: 65 },
      { hour: '2 PM', level: 72 },
      { hour: '6 PM', level: 78 },
      { hour: '11 PM', level: 85 }
    ],
    interventionMetrics: {
      aiCopilotSessions: 1456,
      peerForumPosts: 234,
      emergencyContacts: 18,
      counselorBookings: 89,
      mindfulnessSessions: 2103
    }
  });

  const getStressColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const exportData = () => {
    console.log('Exporting analytics data...');
    // todo: remove mock functionality - implement actual export
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center space-x-2">
              <BarChart className="h-8 w-8 text-primary" />
              <span>Admin Analytics</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive insights into student mental health patterns, usage metrics, and intervention effectiveness.
            </p>
          </div>
          <Button onClick={exportData} data-testid="button-export-data">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{analyticsData.overview.totalStudents.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{analyticsData.overview.activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Active This Week</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <div>
                  <div className="text-2xl font-bold">{analyticsData.overview.avgMentalHealthScore}</div>
                  <div className="text-sm text-muted-foreground">Avg Mental Health Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-2xl font-bold">{analyticsData.overview.criticalAlerts}</div>
                  <div className="text-sm text-muted-foreground">Critical Alerts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="stress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="stress" data-testid="tab-stress">Stress Levels</TabsTrigger>
            <TabsTrigger value="usage" data-testid="tab-usage">Usage Patterns</TabsTrigger>
            <TabsTrigger value="demographics" data-testid="tab-demographics">Demographics</TabsTrigger>
            <TabsTrigger value="interventions" data-testid="tab-interventions">Interventions</TabsTrigger>
            <TabsTrigger value="trends" data-testid="tab-trends">Trends</TabsTrigger>
          </TabsList>

          {/* Stress Levels */}
          <TabsContent value="stress">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Stress Distribution</CardTitle>
                  <CardDescription>Percentage of students by stress level</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(analyticsData.stressLevels).map(([level, percentage]) => (
                    <div key={level} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStressColor(level)}`}></div>
                          <span className="font-medium capitalize">{level} Stress</span>
                        </div>
                        <span className="font-bold">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peak Stress Hours</CardTitle>
                  <CardDescription>Average stress levels throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.peakStressHours.map((hour, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-16 text-sm font-medium">{hour.hour}</div>
                        <div className="flex-1">
                          <Progress value={hour.level} className="h-3" />
                        </div>
                        <div className="w-12 text-sm text-right">{hour.level}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Usage Patterns */}
          <TabsContent value="usage">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Activity Distribution</CardTitle>
                  <CardDescription>When students are most active</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(analyticsData.timeDistribution).map(([time, percentage]) => (
                    <div key={time} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium capitalize">{time}</span>
                        <span className="font-bold">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Check-in Trends</CardTitle>
                  <CardDescription>Daily check-ins and average scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.weeklyTrends.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="font-medium w-12">{day.day}</div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Check-ins: </span>
                            <span className="font-medium">{day.checkIns}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Score: </span>
                            <span className="font-medium">{day.avgScore}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Demographics */}
          <TabsContent value="demographics">
            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
                <CardDescription>Distribution by academic year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(analyticsData.demographics).map(([year, percentage]) => (
                    <div key={year} className="text-center space-y-2">
                      <div className="text-2xl font-bold text-primary">{percentage}%</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {year.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interventions */}
          <TabsContent value="interventions">
            <Card>
              <CardHeader>
                <CardTitle>Intervention Effectiveness</CardTitle>
                <CardDescription>Usage of different support features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(analyticsData.interventionMetrics).map(([intervention, count]) => (
                    <div key={intervention} className="text-center space-y-2">
                      <div className="text-3xl font-bold text-primary">{count.toLocaleString()}</div>
                      <div className="text-sm font-medium">
                        {intervention.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-xs text-muted-foreground">This week</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends */}
          <TabsContent value="trends">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span>Positive Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weekly Active Users</span>
                    <Badge variant="secondary" className="text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8.5%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Mental Health Score</span>
                    <Badge variant="secondary" className="text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3.2%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mindfulness Sessions</span>
                    <Badge variant="secondary" className="text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.1%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Peer Support Engagement</span>
                    <Badge variant="secondary" className="text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15.7%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <span>Areas of Concern</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Late Night Usage</span>
                    <Badge variant="secondary" className="text-orange-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5.8%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Critical Stress Reports</span>
                    <Badge variant="secondary" className="text-red-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +7.2%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emergency Contacts</span>
                    <Badge variant="secondary" className="text-red-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3.1%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sleep Issues Reported</span>
                    <Badge variant="secondary" className="text-orange-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +4.9%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}