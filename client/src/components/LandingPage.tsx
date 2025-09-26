import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import heroImage from '@assets/stock_images/students_studying_to_612bb6c4.jpg';
import { 
  Brain, 
  Heart, 
  Users, 
  Shield, 
  Zap, 
  Star,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

export default function LandingPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'AI Stress Detection',
      description: 'Advanced emotion recognition through facial analysis and voice patterns to understand your mental state.',
    },
    {
      icon: Heart,
      title: 'Personalized Wellness',
      description: 'Custom mental health insights and recommendations tailored to your unique needs and patterns.',
    },
    {
      icon: Users,
      title: 'Peer Support Community',
      description: 'Connect with fellow students in a safe, moderated environment for mutual support and understanding.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'End-to-end encryption ensures your mental health data remains completely private and secure.',
    },
    {
      icon: Zap,
      title: 'Instant AI Support',
      description: 'Get immediate mental health guidance with our AI copilot trained on evidence-based techniques.',
    },
    {
      icon: Star,
      title: 'Progress Tracking',
      description: 'Monitor your mental wellness journey with detailed analytics and mood tracking.',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Computer Science Student',
      content: 'MindCare helped me manage exam stress better than anything else. The AI insights are incredibly accurate.',
      rating: 5,
    },
    {
      name: 'Raj Patel',
      role: 'Engineering Student',
      content: 'The peer support forum made me realize I\'m not alone. Amazing platform for student mental health.',
      rating: 5,
    },
    {
      name: 'Sneha Gupta',
      role: 'Medical Student',
      content: 'Privacy-first approach gave me confidence to seek help. The meditation tools are excellent.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
        <div className="absolute inset-0 gradient-hero opacity-30"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-32 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block mb-2">Your Mental Health,</span>
            <span className="block bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
              Our Priority
            </span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-in-delayed">
            Empowering students with AI-driven mental health support, peer community, and personalized wellness insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-delayed">
            <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button 
                size="lg" 
                className="flex items-center space-x-3 text-lg px-8 py-4 gradient-button hover-gentle focus-indicator shadow-xl" 
                data-testid="button-cta-main"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-6 w-6" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="flex items-center space-x-3 text-lg px-8 py-4 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 focus-indicator shadow-xl"
            >
              <Play className="h-6 w-6" />
              <span>Watch Demo</span>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center animate-fade-in-delayed">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-white">50,000+</div>
              <div className="text-white/80 text-lg">Students Supported</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-white">95%</div>
              <div className="text-white/80 text-lg">Report Improvement</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-white">24/7</div>
              <div className="text-white/80 text-lg">AI Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to maintain and improve your mental wellness throughout your academic journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover-elevate cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Trusted by Students Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50,000+</div>
              <div className="text-lg text-muted-foreground">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-lg text-muted-foreground">Improvement Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-lg text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from students who transformed their mental health journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Mental Health?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have already improved their mental wellness with MindCare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="flex items-center space-x-2">
                <span>Get Started Free</span>
                <CheckCircle className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}