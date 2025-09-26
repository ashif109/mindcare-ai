import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Heart, 
  Volume2, 
  VolumeX,
  Timer,
  Waves,
  Wind,
  TreePine
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MindfulnessRoom() {
  const { t } = useLanguage();
  
  // Breathing Exercise State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCycle, setBreathingCycle] = useState(0);
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Meditation Timer State
  const [meditationTime, setMeditationTime] = useState(5); // minutes
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isMeditating, setIsMeditating] = useState(false);
  const meditationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Audio State
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [selectedAmbience, setSelectedAmbience] = useState('ocean');
  
  const ambienceOptions = [
    { id: 'ocean', name: 'Ocean Waves', icon: Waves, color: 'bg-blue-500' },
    { id: 'rain', name: 'Gentle Rain', icon: Wind, color: 'bg-gray-500' },
    { id: 'forest', name: 'Forest Sounds', icon: TreePine, color: 'bg-green-500' }
  ];

  // Breathing Exercise Logic
  const startBreathingExercise = () => {
    setIsBreathing(true);
    setBreathingCycle(0);
    setBreathingPhase('inhale');
    
    // 4-4-6 breathing pattern (inhale 4s, hold 4s, exhale 6s)
    let currentPhase: 'inhale' | 'hold' | 'exhale' = 'inhale';
    let phaseTime = 0;
    
    breathingIntervalRef.current = setInterval(() => {
      phaseTime += 1;
      
      if (currentPhase === 'inhale' && phaseTime >= 4) {
        currentPhase = 'hold';
        phaseTime = 0;
        setBreathingPhase('hold');
      } else if (currentPhase === 'hold' && phaseTime >= 4) {
        currentPhase = 'exhale';
        phaseTime = 0;
        setBreathingPhase('exhale');
      } else if (currentPhase === 'exhale' && phaseTime >= 6) {
        currentPhase = 'inhale';
        phaseTime = 0;
        setBreathingPhase('inhale');
        setBreathingCycle(prev => prev + 1);
      }
    }, 1000);
  };

  const stopBreathingExercise = () => {
    setIsBreathing(false);
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
    }
  };

  // Meditation Timer Logic
  const startMeditation = () => {
    setTimeRemaining(meditationTime * 60); // Convert to seconds
    setIsMeditating(true);
    
    meditationIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsMeditating(false);
          // Play completion sound (simulated)
          console.log('Meditation complete!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopMeditation = () => {
    setIsMeditating(false);
    setTimeRemaining(0);
    if (meditationIntervalRef.current) {
      clearInterval(meditationIntervalRef.current);
    }
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (breathingIntervalRef.current) clearInterval(breathingIntervalRef.current);
      if (meditationIntervalRef.current) clearInterval(meditationIntervalRef.current);
    };
  }, []);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe Out...';
    }
  };

  const getBreathingCircleSize = () => {
    switch (breathingPhase) {
      case 'inhale': return 'w-32 h-32';
      case 'hold': return 'w-32 h-32';
      case 'exhale': return 'w-20 h-20';
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span>{t('mindfulness.title')}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your center with guided breathing exercises, meditation timers, and calming ambient sounds. 
            Create your personal sanctuary for mental wellness.
          </p>
        </div>

        <Tabs defaultValue="breathing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="breathing" data-testid="tab-breathing">Breathing</TabsTrigger>
            <TabsTrigger value="meditation" data-testid="tab-meditation">Meditation</TabsTrigger>
            <TabsTrigger value="ambience" data-testid="tab-ambience">Ambience</TabsTrigger>
          </TabsList>

          {/* Breathing Exercise */}
          <TabsContent value="breathing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>{t('mindfulness.breathe')}</CardTitle>
                  <CardDescription>
                    Follow the 4-4-6 breathing pattern: Inhale for 4 seconds, hold for 4, exhale for 6
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center space-y-6">
                  {/* Breathing Circle Animation */}
                  <div className="relative flex items-center justify-center">
                    <div 
                      className={`${getBreathingCircleSize()} bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 ease-in-out flex items-center justify-center`}
                    >
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Breathing Instruction */}
                  <div className="text-center">
                    <div className="text-2xl font-semibold mb-2">
                      {isBreathing ? getBreathingInstruction() : 'Ready to Begin'}
                    </div>
                    {isBreathing && (
                      <div className="text-sm text-muted-foreground">
                        Cycle {breathingCycle + 1}
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex space-x-4">
                    <Button
                      onClick={isBreathing ? stopBreathingExercise : startBreathingExercise}
                      size="lg"
                      data-testid="button-breathing-control"
                    >
                      {isBreathing ? (
                        <>
                          <Pause className="h-5 w-5 mr-2" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5 mr-2" />
                          Start Breathing
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        stopBreathingExercise();
                        setBreathingCycle(0);
                      }}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Breathing Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Session Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {breathingCycle}
                    </div>
                    <div className="text-sm text-muted-foreground">Completed Cycles</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Current Phase</span>
                      <span className="font-medium capitalize">{breathingPhase}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Benefits</span>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>• Reduces stress and anxiety</div>
                        <div>• Improves focus and concentration</div>
                        <div>• Activates relaxation response</div>
                        <div>• Lowers blood pressure</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Meditation Timer */}
          <TabsContent value="meditation">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Timer className="h-5 w-5" />
                    <span>Meditation Timer</span>
                  </CardTitle>
                  <CardDescription>
                    Set your meditation duration and find your inner peace
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!isMeditating ? (
                    <>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary mb-2">
                            {meditationTime}
                          </div>
                          <div className="text-sm text-muted-foreground">Minutes</div>
                        </div>
                        
                        <Slider
                          value={[meditationTime]}
                          onValueChange={(value) => setMeditationTime(value[0])}
                          max={60}
                          min={1}
                          step={1}
                          className="w-full"
                          data-testid="slider-meditation-time"
                        />
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 min</span>
                          <span>60 min</span>
                        </div>
                      </div>

                      <Button
                        onClick={startMeditation}
                        size="lg"
                        className="w-full"
                        data-testid="button-start-meditation"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        {t('mindfulness.meditate')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-center space-y-4">
                        <div className="text-5xl font-bold text-primary">
                          {formatTime(timeRemaining)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Time Remaining
                        </div>
                        
                        <Progress 
                          value={((meditationTime * 60 - timeRemaining) / (meditationTime * 60)) * 100} 
                          className="h-2"
                        />
                      </div>

                      <Button
                        onClick={stopMeditation}
                        variant="destructive"
                        size="lg"
                        className="w-full"
                        data-testid="button-stop-meditation"
                      >
                        <Pause className="h-5 w-5 mr-2" />
                        End Session
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Meditation Guidance */}
              <Card>
                <CardHeader>
                  <CardTitle>Meditation Guide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="font-medium">Getting Started:</div>
                    <div className="space-y-2 text-muted-foreground">
                      <div>1. Find a comfortable seated position</div>
                      <div>2. Close your eyes or soften your gaze</div>
                      <div>3. Focus on your natural breath</div>
                      <div>4. When your mind wanders, gently return to your breath</div>
                      <div>5. Be kind and patient with yourself</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="font-medium">Meditation Benefits:</div>
                    <div className="space-y-1 text-muted-foreground">
                      <div>• Reduces stress and anxiety</div>
                      <div>• Improves emotional regulation</div>
                      <div>• Enhances self-awareness</div>
                      <div>• Increases focus and attention</div>
                      <div>• Promotes better sleep</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ambient Sounds */}
          <TabsContent value="ambience">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ambient Sounds</CardTitle>
                  <CardDescription>
                    Choose calming background sounds to enhance your practice
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Sound Selection */}
                  <div className="grid grid-cols-1 gap-3">
                    {ambienceOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <Button
                          key={option.id}
                          variant={selectedAmbience === option.id ? "default" : "outline"}
                          className="justify-start h-auto p-4"
                          onClick={() => setSelectedAmbience(option.id)}
                          data-testid={`button-ambience-${option.id}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-medium">{option.name}</span>
                          </div>
                        </Button>
                      );
                    })}
                  </div>

                  {/* Volume Control */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Volume</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMuted(!isMuted)}
                        data-testid="button-toggle-mute"
                      >
                        {isMuted || volume[0] === 0 ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    <Slider
                      value={isMuted ? [0] : volume}
                      onValueChange={(value) => {
                        setVolume(value);
                        setIsMuted(value[0] === 0);
                      }}
                      max={100}
                      step={1}
                      className="w-full"
                      data-testid="slider-volume"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Sound Visualization */}
              <Card>
                <CardHeader>
                  <CardTitle>Now Playing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      {(() => {
                        const selectedOption = ambienceOptions.find(opt => opt.id === selectedAmbience);
                        const Icon = selectedOption?.icon || Waves;
                        return <Icon className="h-12 w-12 text-primary" />;
                      })()}
                    </div>
                    <div className="font-semibold">
                      {ambienceOptions.find(opt => opt.id === selectedAmbience)?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Volume: {isMuted ? 0 : volume[0]}%
                    </div>
                  </div>

                  {/* Audio Visualization (Simulated) */}
                  <div className="flex items-end justify-center space-x-1 h-16">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-primary/30 w-2 rounded-t animate-pulse"
                        style={{
                          height: `${Math.random() * 60 + 10}%`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: `${1 + Math.random()}s`
                        }}
                      />
                    ))}
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