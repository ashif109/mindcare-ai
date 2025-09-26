import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Search, 
  Play, 
  Clock, 
  Users,
  Star,
  Download,
  ExternalLink,
  Filter,
  Brain,
  Heart,
  Target
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'exercise' | 'guide';
  category: 'study' | 'stress' | 'mindfulness' | 'time-management' | 'self-care';
  duration: string;
  rating: number;
  downloads: number;
  author: string;
  tags: string[];
  isPremium?: boolean;
}

export default function ResourceLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Mock resource data - todo: remove mock functionality
  const resources: Resource[] = [
    {
      id: '1',
      title: 'The Pomodoro Technique: Complete Guide',
      description: 'Master the most effective time management technique for students. Learn how to break work into focused intervals with strategic breaks.',
      type: 'guide',
      category: 'time-management',
      duration: '15 min read',
      rating: 4.8,
      downloads: 2847,
      author: 'Dr. Sarah Chen',
      tags: ['productivity', 'focus', 'study-techniques']
    },
    {
      id: '2',
      title: 'Managing Test Anxiety',
      description: 'Evidence-based strategies to reduce anxiety before and during exams. Includes breathing exercises and cognitive techniques.',
      type: 'article',
      category: 'stress',
      duration: '10 min read',
      rating: 4.9,
      downloads: 3921,
      author: 'Prof. Michael Rodriguez',
      tags: ['anxiety', 'exams', 'coping-strategies']
    },
    {
      id: '3',
      title: 'Progressive Muscle Relaxation',
      description: 'A guided audio session to help you release physical tension and mental stress through systematic muscle relaxation.',
      type: 'exercise',
      category: 'mindfulness',
      duration: '20 min audio',
      rating: 4.7,
      downloads: 1563,
      author: 'MindCare Team',
      tags: ['relaxation', 'stress-relief', 'body-awareness']
    },
    {
      id: '4',
      title: 'Active Learning Strategies for Better Retention',
      description: 'Transform passive studying into active learning with proven techniques that improve memory and understanding.',
      type: 'video',
      category: 'study',
      duration: '25 min watch',
      rating: 4.6,
      downloads: 2134,
      author: 'Dr. Emily Watson',
      tags: ['memory', 'learning', 'study-methods']
    },
    {
      id: '5',
      title: 'Building Healthy Sleep Habits',
      description: 'Create a sleep routine that supports your mental health and academic performance. Includes sleep hygiene checklist.',
      type: 'guide',
      category: 'self-care',
      duration: '12 min read',
      rating: 4.5,
      downloads: 1876,
      author: 'Sleep Research Institute',
      tags: ['sleep', 'health', 'routine']
    },
    {
      id: '6',
      title: 'Mindful Study Breaks',
      description: 'Quick mindfulness exercises you can do between study sessions to refresh your mind and maintain focus.',
      type: 'exercise',
      category: 'mindfulness',
      duration: '5-10 min',
      rating: 4.8,
      downloads: 2456,
      author: 'Mindfulness Institute',
      tags: ['mindfulness', 'breaks', 'focus'],
      isPremium: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen },
    { id: 'study', name: 'Study Techniques', icon: Brain },
    { id: 'stress', name: 'Stress Management', icon: Heart },
    { id: 'mindfulness', name: 'Mindfulness', icon: Target },
    { id: 'time-management', name: 'Time Management', icon: Clock },
    { id: 'self-care', name: 'Self Care', icon: Heart }
  ];

  const resourceTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'article', name: 'Articles' },
    { id: 'video', name: 'Videos' },
    { id: 'exercise', name: 'Exercises' },
    { id: 'guide', name: 'Guides' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'exercise': return <Target className="h-4 w-4" />;
      case 'guide': return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-500';
      case 'exercise': return 'bg-green-500';
      case 'guide': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleResourceAccess = (resource: Resource) => {
    console.log('Accessing resource:', resource.title);
    // todo: remove mock functionality - implement actual resource access
    if (resource.isPremium) {
      console.log('Premium resource access');
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span>Resource Library</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover evidence-based resources for mental wellness, study techniques, stress management, 
            and personal development curated by mental health professionals.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources, techniques, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-resources"
              />
            </div>
            <Button variant="outline" className="lg:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex items-center space-x-2"
                    data-testid={`tab-category-${category.id}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          {/* Type Filter */}
          <div className="flex space-x-2 overflow-x-auto">
            {resourceTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.id)}
                data-testid={`button-type-${type.id}`}
              >
                {type.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredResources.length} of {resources.length} resources
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Sort by:</span>
            <Button variant="ghost" size="sm" className="h-auto p-1">
              Most Popular
            </Button>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover-elevate cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-10 h-10 ${getTypeColor(resource.type)} rounded-lg flex items-center justify-center`}>
                    {getTypeIcon(resource.type)}
                  </div>
                  {resource.isPremium && (
                    <Badge variant="secondary" className="text-xs">
                      Premium
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                <CardDescription className="text-sm">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    <span>{resource.rating}</span>
                  </div>
                </div>

                {/* Author */}
                <div className="text-xs text-muted-foreground">
                  by {resource.author}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {resource.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{resource.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Download className="h-3 w-3" />
                    <span>{resource.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>Popular</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleResourceAccess(resource)}
                    data-testid={`button-access-resource-${resource.id}`}
                  >
                    {resource.type === 'video' ? 'Watch' : 
                     resource.type === 'exercise' ? 'Start' : 'Read'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center space-x-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Resources */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Featured This Week</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                    <Brain className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Study Techniques Masterclass</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete guide to evidence-based study methods that actually work
                    </p>
                    <Button size="sm">
                      Start Learning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Mental Health First Aid</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Essential skills for supporting yourself and others in crisis
                    </p>
                    <Button size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}