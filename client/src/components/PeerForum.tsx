import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Plus, 
  Search,
  Users,
  TrendingUp,
  Clock,
  ThumbsUp
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface ForumPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  tags: string[];
  isLiked?: boolean;
}

interface Reply {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

export default function PeerForum() {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  // Mock forum data - todo: remove mock functionality
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: '1',
      author: {
        name: 'Sarah K.',
        verified: true
      },
      title: 'Dealing with exam anxiety - what works for you?',
      content: 'Hey everyone! I\'ve been struggling with severe anxiety before exams. My heart races, I can\'t focus, and I feel like I\'m going to fail even though I\'ve studied. Has anyone found effective techniques to manage this? I\'ve tried breathing exercises but looking for more strategies.',
      timestamp: '2 hours ago',
      likes: 24,
      replies: 8,
      tags: ['anxiety', 'exams', 'study-tips'],
      isLiked: false
    },
    {
      id: '2',
      author: {
        name: 'Alex M.',
        verified: false
      },
      title: 'Finding balance between social life and studies',
      content: 'I feel like I\'m missing out on friendships because I\'m always studying, but when I hang out with friends, I feel guilty about not studying. How do you all find the right balance?',
      timestamp: '5 hours ago',
      likes: 18,
      replies: 12,
      tags: ['balance', 'friendship', 'social'],
      isLiked: true
    },
    {
      id: '3',
      author: {
        name: 'Priya S.',
        verified: true
      },
      title: 'Late night study sessions affecting my sleep',
      content: 'I\'ve been pulling all-nighters to keep up with coursework, but now I can\'t fall asleep even when I\'m tired. Anyone else experienced this? How did you fix your sleep schedule?',
      timestamp: '1 day ago',
      likes: 31,
      replies: 15,
      tags: ['sleep', 'study-habits', 'health'],
      isLiked: false
    }
  ]);

  const mockReplies: Reply[] = [
    {
      id: '1',
      author: { name: 'Mike R.' },
      content: 'I totally understand! What helped me was creating a pre-exam routine. I do 10 minutes of meditation, review my main points briefly, and remind myself that I\'ve prepared well.',
      timestamp: '1 hour ago',
      likes: 5
    },
    {
      id: '2',
      author: { name: 'Jennifer L.' },
      content: 'Progressive muscle relaxation works wonders for me. Start from your toes and work your way up, tensing and relaxing each muscle group.',
      timestamp: '45 minutes ago',
      likes: 3
    }
  ];

  const popularTags = [
    'anxiety', 'depression', 'study-tips', 'stress', 'sleep', 
    'motivation', 'friendship', 'balance', 'self-care', 'mindfulness'
  ];

  const handleLikePost = (postId: string) => {
    setForumPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: {
        name: user?.name || 'Anonymous',
        verified: false
      },
      title: newPostTitle,
      content: newPostContent,
      timestamp: 'Just now',
      likes: 0,
      replies: 0,
      tags: ['discussion'],
      isLiked: false
    };

    setForumPosts(prev => [newPost, ...prev]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPost(false);
    
    // todo: remove mock functionality - save to localStorage
    console.log('New post created:', newPost);
  };

  const handleReply = () => {
    if (!replyContent.trim()) return;
    
    // Simulate reply creation
    console.log('Reply posted:', replyContent);
    setReplyContent('');
    
    // Update reply count
    setForumPosts(prev => prev.map(post => 
      post.id === selectedPost 
        ? { ...post, replies: post.replies + 1 }
        : post
    ));
  };

  const filteredPosts = forumPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center space-x-2">
            <Users className="h-8 w-8 text-primary" />
            <span>{t('forum.title')}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Connect with fellow students, share experiences, and support each other's mental health journey 
            in a safe, moderated environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Create */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-forum"
                />
              </div>
              <Button 
                onClick={() => setShowNewPost(!showNewPost)}
                data-testid="button-new-post"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>

            {/* New Post Form */}
            {showNewPost && (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                  <CardDescription>
                    Share your thoughts, questions, or experiences with the community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Post title..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    data-testid="input-post-title"
                  />
                  <Textarea
                    placeholder={t('forum.post')}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={4}
                    data-testid="textarea-post-content"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowNewPost(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreatePost}
                      data-testid="button-submit-post"
                    >
                      Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Forum Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover-elevate cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{post.author.name}</span>
                          {post.author.verified && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                          <p className="text-muted-foreground">{post.content}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-6 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLikePost(post.id)}
                            className={post.isLiked ? 'text-red-500' : ''}
                            data-testid={`button-like-post-${post.id}`}
                          >
                            <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                            {post.likes}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedPost(post.id)}
                            data-testid={`button-reply-post-${post.id}`}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.replies}
                          </Button>
                          
                          <Button variant="ghost" size="sm">
                            <Share className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                        
                        {/* Replies Section */}
                        {selectedPost === post.id && (
                          <div className="mt-4 space-y-4">
                            <Separator />
                            
                            {/* Sample Replies */}
                            <div className="space-y-3">
                              {mockReplies.map((reply) => (
                                <div key={reply.id} className="flex items-start space-x-3 pl-4 border-l-2 border-muted">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="text-xs">
                                      {reply.author.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="text-sm font-medium">{reply.author.name}</span>
                                      <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{reply.content}</p>
                                    <div className="flex items-center mt-2">
                                      <Button variant="ghost" size="sm" className="text-xs h-6">
                                        <ThumbsUp className="h-3 w-3 mr-1" />
                                        {reply.likes}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Reply Form */}
                            <div className="flex space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>
                                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-2">
                                <Textarea
                                  placeholder="Write a supportive reply..."
                                  value={replyContent}
                                  onChange={(e) => setReplyContent(e.target.value)}
                                  rows={2}
                                  data-testid="textarea-reply"
                                />
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedPost(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={handleReply}
                                    data-testid="button-submit-reply"
                                  >
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Active Members</span>
                  </div>
                  <span className="font-medium">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Posts Today</span>
                  </div>
                  <span className="font-medium">43</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Response Rate</span>
                  </div>
                  <span className="font-medium">94%</span>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="cursor-pointer hover-elevate"
                      onClick={() => setSearchQuery(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Community Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Be kind and supportive</div>
                <div>• Respect others' experiences</div>
                <div>• No medical advice</div>
                <div>• Report concerning content</div>
                <div>• Maintain confidentiality</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}