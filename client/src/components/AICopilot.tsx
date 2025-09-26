import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Lightbulb,
  Heart,
  Brain,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'suggestion' | 'exercise' | 'motivation';
}

export default function AICopilot() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI Mental Health Assistant. I\'m here to provide support, stress-relief tips, and help you maintain a healthy study-life balance. How are you feeling today?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'motivation'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Mock AI responses - todo: remove mock functionality
  const aiResponses = {
    stress: [
      "I understand you're feeling stressed. Let's try a quick breathing exercise: Breathe in for 4 counts, hold for 4, and exhale for 6. This activates your parasympathetic nervous system.",
      "Stress is your body's way of preparing for challenges. Try the 5-4-3-2-1 grounding technique: Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste."
    ],
    study: [
      "For better study sessions, try the Pomodoro Technique: 25 minutes focused study, 5-minute break. This helps maintain concentration and prevents burnout.",
      "Create a study schedule that includes breaks. Your brain consolidates information better with regular rest periods. Aim for 45-90 minute focused sessions."
    ],
    anxiety: [
      "Anxiety can feel overwhelming, but you're stronger than you know. Try progressive muscle relaxation: tense and release each muscle group from your toes to your head.",
      "When anxiety strikes, remember: this feeling is temporary. Practice the STOP technique - Stop, Take a breath, Observe your thoughts, Proceed mindfully."
    ],
    motivation: [
      "Every small step forward is progress. Celebrate your efforts, not just outcomes. You're building resilience with each challenge you face.",
      "Remember why you started this journey. Your education is an investment in your future self. Take it one day at a time."
    ],
    sleep: [
      "Good sleep is crucial for mental health. Try a wind-down routine: dim lights 1 hour before bed, avoid screens, and practice gentle stretching.",
      "If you're having trouble sleeping, keep a consistent schedule. Go to bed and wake up at the same time, even on weekends."
    ],
    default: [
      "I'm here to support you. Can you tell me more about what you're experiencing? Are you feeling stressed, anxious, or need study tips?",
      "Your mental health journey is unique. I'm here to provide personalized guidance. What specific area would you like to focus on today?"
    ]
  };

  const quickSuggestions = [
    { text: "I'm feeling stressed about exams", type: "stress" },
    { text: "How can I study more effectively?", type: "study" },
    { text: "I'm having trouble sleeping", type: "sleep" },
    { text: "I need motivation", type: "motivation" },
    { text: "I'm feeling anxious", type: "anxiety" }
  ];

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('stress') || message.includes('exam') || message.includes('pressure')) {
      return aiResponses.stress[Math.floor(Math.random() * aiResponses.stress.length)];
    }
    if (message.includes('study') || message.includes('focus') || message.includes('concentration')) {
      return aiResponses.study[Math.floor(Math.random() * aiResponses.study.length)];
    }
    if (message.includes('anxiety') || message.includes('anxious') || message.includes('worried')) {
      return aiResponses.anxiety[Math.floor(Math.random() * aiResponses.anxiety.length)];
    }
    if (message.includes('motivation') || message.includes('motivated') || message.includes('give up')) {
      return aiResponses.motivation[Math.floor(Math.random() * aiResponses.motivation.length)];
    }
    if (message.includes('sleep') || message.includes('tired') || message.includes('insomnia')) {
      return aiResponses.sleep[Math.floor(Math.random() * aiResponses.sleep.length)];
    }
    
    return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        sender: 'ai',
        timestamp: new Date(),
        type: 'suggestion'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'suggestion': return <Lightbulb className="h-4 w-4" />;
      case 'exercise': return <Heart className="h-4 w-4" />;
      case 'motivation': return <Sparkles className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center space-x-2">
            <MessageCircle className="h-8 w-8 text-primary" />
            <span>{t('copilot.title')}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized mental health support, stress-relief techniques, and study-life balance tips 
            from your AI wellness companion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-primary" />
                <span>AI Mental Health Assistant</span>
                <Badge variant="secondary" className="ml-auto">Online</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {message.sender === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className={`flex-1 max-w-xs md:max-w-md ${
                        message.sender === 'user' ? 'text-right' : ''
                      }`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {message.sender === 'ai' && message.type && (
                            <div className="flex items-center space-x-1 mb-2 text-xs opacity-70">
                              {getMessageIcon(message.type)}
                              <span className="capitalize">{message.type}</span>
                            </div>
                          )}
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t p-4">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(inputMessage);
                  }}
                  className="flex space-x-2"
                >
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={t('copilot.placeholder')}
                    className="flex-1"
                    data-testid="input-chat-message"
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    disabled={!inputMessage.trim() || isTyping}
                    data-testid="button-send-message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Quick Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-3"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  data-testid={`button-suggestion-${index}`}
                >
                  <div className="text-xs">{suggestion.text}</div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Features Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Brain className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-semibold mb-1">Evidence-Based</h3>
              <p className="text-sm text-muted-foreground">
                Trained on cognitive behavioral therapy and mindfulness techniques
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Heart className="h-8 w-8 mx-auto text-red-500 mb-2" />
              <h3 className="font-semibold mb-1">Personalized</h3>
              <p className="text-sm text-muted-foreground">
                Adapts to your unique mental health needs and preferences
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Sparkles className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <h3 className="font-semibold mb-1">24/7 Available</h3>
              <p className="text-sm text-muted-foreground">
                Get support whenever you need it, day or night
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}