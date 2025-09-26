import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  AlertTriangle, 
  Heart, 
  MapPin, 
  Clock,
  MessageCircle,
  Users,
  Shield,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EmergencySOS() {
  const { t } = useLanguage();
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const emergencyContacts = [
    {
      name: 'National Emergency Services',
      number: '112',
      description: 'Police, Fire, Medical Emergency',
      available: '24/7',
      color: 'bg-red-500'
    },
    {
      name: 'Mental Health Helpline',
      number: '1800-599-0019',
      description: 'iCALL - Psychological Support',
      available: '24/7',
      color: 'bg-blue-500'
    },
    {
      name: 'Suicide Prevention',
      number: '9152987821',
      description: 'AASRA - Crisis Intervention',
      available: '24/7',
      color: 'bg-purple-500'
    },
    {
      name: 'Student Helpline',
      number: '1800-180-1104',
      description: 'UGC Student Support',
      available: '9 AM - 6 PM',
      color: 'bg-green-500'
    }
  ];

  const quickActions = [
    {
      title: 'Talk to Crisis Counselor',
      description: 'Connect with a trained mental health professional immediately',
      icon: MessageCircle,
      action: 'call',
      urgent: true
    },
    {
      title: 'Find Nearest Hospital',
      description: 'Locate emergency medical facilities in your area',
      icon: MapPin,
      action: 'location',
      urgent: true
    },
    {
      title: 'Contact Emergency Contact',
      description: 'Reach out to your designated emergency person',
      icon: Users,
      action: 'contact',
      urgent: false
    },
    {
      title: 'Safety Planning',
      description: 'Access your personalized safety plan and coping strategies',
      icon: Shield,
      action: 'plan',
      urgent: false
    }
  ];

  const crisisResources = [
    {
      name: 'iCALL',
      website: 'http://icallhelpline.org',
      description: 'Psychosocial Helpline by TISS',
      services: ['Crisis counseling', 'Emotional support', 'Information & referrals']
    },
    {
      name: 'AASRA',
      website: 'http://www.aasra.info',
      description: 'Suicide Prevention NGO',
      services: ['24/7 helpline', 'Email support', 'Face-to-face counseling']
    },
    {
      name: 'Vandrevala Foundation',
      website: 'http://www.vandrevalafoundation.com',
      description: 'Mental Health Support',
      services: ['Crisis intervention', 'Ongoing support', 'Referral services']
    }
  ];

  const copingStrategies = [
    'Take slow, deep breaths - in for 4 counts, out for 6 counts',
    'Ground yourself: name 5 things you see, 4 you hear, 3 you touch',
    'Call someone you trust and tell them how you\'re feeling',
    'Remove yourself from immediate triggers or stressors',
    'Remember: this feeling is temporary and will pass',
    'Use positive self-talk: "I am safe, I can get through this"'
  ];

  const handleEmergencyCall = (number: string) => {
    setIsEmergencyActive(true);
    // Simulate emergency call
    console.log('Emergency call initiated:', number);
    // In a real app, this would trigger actual phone call
    setTimeout(() => {
      setIsEmergencyActive(false);
    }, 3000);
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action triggered:', action);
    // todo: remove mock functionality - implement actual actions
    switch (action) {
      case 'call':
        handleEmergencyCall('1800-599-0019');
        break;
      case 'location':
        // Open maps app or browser
        window.open('https://maps.google.com/search/hospital+near+me', '_blank');
        break;
      case 'contact':
        // Access emergency contacts
        break;
      case 'plan':
        // Navigate to safety plan
        break;
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center space-x-2">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <span>{t('emergency.title')}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            If you're experiencing a mental health crisis or emergency, help is available 24/7. 
            You are not alone, and it's okay to ask for help.
          </p>
        </div>

        {/* Emergency Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>If you are in immediate danger or having thoughts of self-harm, please call emergency services (112) right away.</strong>
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-red-500" />
                  <span>Emergency Helplines</span>
                </CardTitle>
                <CardDescription>
                  Professional crisis support available 24/7
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${contact.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{contact.name}</h3>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{contact.available}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{contact.description}</p>
                        <Button
                          size="sm"
                          onClick={() => handleEmergencyCall(contact.number)}
                          disabled={isEmergencyActive}
                          className="w-full"
                          data-testid={`button-call-${contact.number.replace(/\D/g, '')}`}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call {contact.number}
                        </Button>
                      </div>
                    </div>
                    {index < emergencyContacts.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Immediate resources and support options
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant={action.urgent ? "default" : "outline"}
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                      onClick={() => handleQuickAction(action.action)}
                      data-testid={`button-quick-action-${action.action}`}
                    >
                      <Icon className={`h-6 w-6 ${action.urgent ? 'text-white' : 'text-primary'}`} />
                      <div className="text-center">
                        <div className="font-medium text-sm">{action.title}</div>
                        <div className={`text-xs ${action.urgent ? 'text-white/80' : 'text-muted-foreground'}`}>
                          {action.description}
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Immediate Coping Strategies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-green-500" />
                  <span>Immediate Coping Strategies</span>
                </CardTitle>
                <CardDescription>
                  Things you can do right now to help yourself feel safer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {copingStrategies.map((strategy, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm">{strategy}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Crisis Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Crisis Resources</CardTitle>
                <CardDescription>
                  Organizations providing mental health crisis support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {crisisResources.map((resource, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{resource.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(resource.website, '_blank')}
                        data-testid={`button-resource-${resource.name.toLowerCase()}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {resource.services.map((service, serviceIndex) => (
                        <span
                          key={serviceIndex}
                          className="text-xs bg-muted px-2 py-1 rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    {index < crisisResources.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Safety Note */}
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Your Safety Matters:</strong> If you're in immediate physical danger, 
                call 112 (emergency services). For mental health crises, the helplines above 
                are staffed by trained professionals who understand what you're going through.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Warning Signs */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>When to Seek Emergency Help</CardTitle>
            <CardDescription>
              These signs indicate you should reach out for immediate support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-red-600">Immediate Danger Signs:</h3>
                <div className="space-y-1 text-sm">
                  <div>• Thoughts of harming yourself or others</div>
                  <div>• Detailed suicide plan</div>
                  <div>• Severe agitation or panic</div>
                  <div>• Complete hopelessness</div>
                  <div>• Psychotic symptoms (hallucinations, delusions)</div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-orange-600">Seek Support Soon:</h3>
                <div className="space-y-1 text-sm">
                  <div>• Persistent feelings of emptiness</div>
                  <div>• Inability to function daily</div>
                  <div>• Severe anxiety or panic attacks</div>
                  <div>• Substance abuse escalation</div>
                  <div>• Social isolation for extended periods</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}