import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Star,
  MapPin,
  Phone,
  Video,
  MessageCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Counselor {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  rating: number;
  experience: string;
  avatar?: string;
  availability: string[];
  sessionTypes: ('online' | 'in-person' | 'phone')[];
  bio: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function CounselorBooking() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<'online' | 'in-person' | 'phone'>('online');
  const [step, setStep] = useState<'counselors' | 'schedule' | 'details' | 'confirmation'>('counselors');
  
  const [bookingDetails, setBookingDetails] = useState({
    reason: '',
    urgency: 'normal',
    previousCounseling: false,
    additionalNotes: ''
  });

  // Mock counselor data - todo: remove mock functionality
  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      title: 'Licensed Clinical Psychologist',
      specialization: ['Anxiety', 'Depression', 'Academic Stress'],
      rating: 4.9,
      experience: '8 years',
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      sessionTypes: ['online', 'in-person'],
      bio: 'Specialized in cognitive behavioral therapy for students. Experienced in treating academic anxiety and adjustment disorders.'
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      title: 'Counseling Psychologist',
      specialization: ['Stress Management', 'Life Transitions', 'Mindfulness'],
      rating: 4.8,
      experience: '12 years',
      availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      sessionTypes: ['online', 'phone'],
      bio: 'Focuses on mindfulness-based interventions and stress reduction techniques for college students.'
    },
    {
      id: '3',
      name: 'Dr. Emily Watson',
      title: 'Student Counselor',
      specialization: ['Relationship Issues', 'Self-Esteem', 'Career Anxiety'],
      rating: 4.7,
      experience: '6 years',
      availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      sessionTypes: ['online', 'in-person', 'phone'],
      bio: 'Specializes in helping students navigate personal relationships and career-related stress.'
    }
  ];

  // Mock time slots - todo: remove mock functionality
  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: false },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: true }
  ];

  const selectedCounselorData = counselors.find(c => c.id === selectedCounselor);

  const handleBookingSubmit = () => {
    // todo: remove mock functionality - send to backend
    const booking = {
      counselor: selectedCounselorData,
      date: selectedDate,
      time: selectedTimeSlot,
      sessionType,
      details: bookingDetails,
      user: user
    };
    
    console.log('Booking submitted:', booking);
    localStorage.setItem('counselor_booking', JSON.stringify(booking));
    setStep('confirmation');
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'online': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center space-x-2">
            <CalendarIcon className="h-8 w-8 text-primary" />
            <span>Book Counseling Session</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with professional mental health counselors who understand student challenges. 
            Choose from online, phone, or in-person sessions.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {['counselors', 'schedule', 'details', 'confirmation'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === stepName ? 'bg-primary text-primary-foreground' :
                  ['counselors', 'schedule', 'details', 'confirmation'].indexOf(step) > index ? 'bg-green-500 text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-8 h-1 mx-2 ${
                    ['counselors', 'schedule', 'details', 'confirmation'].indexOf(step) > index ? 'bg-green-500' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Choose Counselor */}
        {step === 'counselors' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Counselor</CardTitle>
                <CardDescription>
                  Select a mental health professional who matches your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6">
                  {counselors.map((counselor) => (
                    <Card 
                      key={counselor.id} 
                      className={`cursor-pointer hover-elevate ${
                        selectedCounselor === counselor.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedCounselor(counselor.id)}
                      data-testid={`card-counselor-${counselor.id}`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={counselor.avatar} />
                            <AvatarFallback>
                              {counselor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="font-semibold text-lg">{counselor.name}</h3>
                              <p className="text-muted-foreground">{counselor.title}</p>
                              <div className="flex items-center space-x-1 mt-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{counselor.rating}</span>
                                <span className="text-sm text-muted-foreground">• {counselor.experience} experience</span>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground">{counselor.bio}</p>

                            <div className="space-y-2">
                              <div>
                                <span className="text-sm font-medium">Specializations:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {counselor.specialization.map((spec, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {spec}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <span className="text-sm font-medium">Available:</span>
                                <span className="text-sm text-muted-foreground ml-2">
                                  {counselor.availability.join(', ')}
                                </span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">Session types:</span>
                                {counselor.sessionTypes.map((type, index) => (
                                  <div key={index} className="flex items-center space-x-1">
                                    {getSessionTypeIcon(type)}
                                    <span className="text-xs capitalize">{type}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button 
                onClick={() => setStep('schedule')} 
                disabled={!selectedCounselor}
                data-testid="button-next-to-schedule"
              >
                Next: Choose Date & Time
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Schedule */}
        {step === 'schedule' && selectedCounselorData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose your preferred appointment date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session Type</CardTitle>
                  <CardDescription>How would you like to meet?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedCounselorData.sessionTypes.map((type) => (
                      <Button
                        key={type}
                        variant={sessionType === type ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setSessionType(type)}
                        data-testid={`button-session-type-${type}`}
                      >
                        {getSessionTypeIcon(type)}
                        <span className="ml-2 capitalize">{type}</span>
                        {type === 'online' && <span className="ml-auto text-xs">Recommended</span>}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Times</CardTitle>
                  <CardDescription>
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Select a date first'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                        size="sm"
                        disabled={!slot.available}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        data-testid={`button-time-slot-${slot.time.replace(/\s/g, '-')}`}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 flex justify-between">
              <Button variant="outline" onClick={() => setStep('counselors')}>
                Back
              </Button>
              <Button 
                onClick={() => setStep('details')} 
                disabled={!selectedDate || !selectedTimeSlot}
                data-testid="button-next-to-details"
              >
                Next: Booking Details
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Booking Details */}
        {step === 'details' && (
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>
                Help your counselor prepare for your session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for seeking counseling</Label>
                <Textarea
                  id="reason"
                  placeholder="e.g., Academic stress, anxiety, relationship issues..."
                  value={bookingDetails.reason}
                  onChange={(e) => setBookingDetails(prev => ({ ...prev, reason: e.target.value }))}
                  data-testid="textarea-booking-reason"
                />
              </div>

              <div className="space-y-2">
                <Label>How urgent is your need for support?</Label>
                <div className="space-y-2">
                  {[
                    { value: 'normal', label: 'Normal - Can wait a few days', color: 'text-green-600' },
                    { value: 'moderate', label: 'Moderate - Would like support this week', color: 'text-yellow-600' },
                    { value: 'urgent', label: 'Urgent - Need support soon', color: 'text-red-600' }
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={bookingDetails.urgency === option.value ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setBookingDetails(prev => ({ ...prev, urgency: option.value }))}
                      data-testid={`button-urgency-${option.value}`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${option.color.replace('text-', 'bg-')}`} />
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-notes">Additional notes (optional)</Label>
                <Textarea
                  id="additional-notes"
                  placeholder="Any other information that might be helpful..."
                  value={bookingDetails.additionalNotes}
                  onChange={(e) => setBookingDetails(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  data-testid="textarea-additional-notes"
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep('schedule')}>
                  Back
                </Button>
                <Button 
                  onClick={handleBookingSubmit}
                  disabled={!bookingDetails.reason.trim()}
                  data-testid="button-submit-booking"
                >
                  Book Session
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 'confirmation' && selectedCounselorData && (
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
              <CardDescription>
                Your counseling session has been successfully scheduled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold mb-4">Session Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Counselor</div>
                    <div className="font-medium">{selectedCounselorData.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Date & Time</div>
                    <div className="font-medium">
                      {selectedDate?.toLocaleDateString()} at {selectedTimeSlot}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Session Type</div>
                    <div className="font-medium capitalize flex items-center">
                      {getSessionTypeIcon(sessionType)}
                      <span className="ml-1">{sessionType}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Session ID</div>
                    <div className="font-medium">MC-{Date.now().toString().slice(-6)}</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                      What to expect:
                    </div>
                    <div className="text-blue-700 dark:text-blue-300 space-y-1">
                      <div>• You'll receive a confirmation email with session details</div>
                      <div>• For online sessions, the meeting link will be sent 30 minutes before</div>
                      <div>• Please arrive 5 minutes early to ensure a prompt start</div>
                      <div>• You can reschedule up to 24 hours before your appointment</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" onClick={() => console.log('Add to calendar')}>
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setStep('counselors')}>
                  Book Another Session
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}