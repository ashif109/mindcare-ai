import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  Mic, 
  Upload, 
  Brain, 
  AlertCircle, 
  CheckCircle,
  BarChart3,
  RefreshCw
} from 'lucide-react';

export default function AIStressDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('camera');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock analysis results - todo: remove mock functionality
  const mockAnalysisResults = {
    emotion: 'Calm',
    stressLevel: 25,
    confidence: 92,
    recommendations: [
      'Your stress levels appear normal',
      'Consider maintaining your current routine',
      'Try the 5-minute breathing exercise to stay centered'
    ],
    facialIndicators: {
      eyeStrain: 15,
      facialTension: 20,
      overallMood: 'Positive'
    },
    voiceIndicators: {
      toneStress: 30,
      speechRate: 'Normal',
      emotionalTone: 'Neutral'
    }
  };

  const startCameraAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate camera access and analysis
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Simulate AI analysis delay
      setTimeout(() => {
        setResults(mockAnalysisResults);
        setIsAnalyzing(false);
        
        // Stop camera
        stream.getTracks().forEach(track => track.stop());
      }, 3000);
      
    } catch (error) {
      console.error('Camera access denied:', error);
      setIsAnalyzing(false);
      // Simulate analysis anyway for demo
      setTimeout(() => {
        setResults(mockAnalysisResults);
      }, 1000);
    }
  };

  const startVoiceAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Simulate voice analysis
      setTimeout(() => {
        setResults({
          ...mockAnalysisResults,
          emotion: 'Focused',
          stressLevel: 35
        });
        setIsAnalyzing(false);
        
        // Stop microphone
        stream.getTracks().forEach(track => track.stop());
      }, 4000);
      
    } catch (error) {
      console.error('Microphone access denied:', error);
      setIsAnalyzing(false);
      // Simulate analysis anyway for demo
      setTimeout(() => {
        setResults({
          ...mockAnalysisResults,
          emotion: 'Focused',
          stressLevel: 35
        });
      }, 1000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      
      // Simulate file analysis
      setTimeout(() => {
        setResults({
          ...mockAnalysisResults,
          emotion: 'Neutral',
          stressLevel: 40
        });
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  const getStressLevelColor = (level: number) => {
    if (level < 30) return 'text-green-500';
    if (level < 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStressLevelBg = (level: number) => {
    if (level < 30) return 'bg-green-500';
    if (level < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span>AI Stress & Emotion Detection</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use advanced AI to analyze your facial expressions, voice patterns, and emotional state 
            to provide personalized mental health insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Analysis Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Analysis Method</CardTitle>
                <CardDescription>
                  Select how you'd like to assess your current mental state
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="camera" data-testid="tab-camera">Camera</TabsTrigger>
                    <TabsTrigger value="voice" data-testid="tab-voice">Voice</TabsTrigger>
                    <TabsTrigger value="upload" data-testid="tab-upload">Upload</TabsTrigger>
                  </TabsList>

                  <TabsContent value="camera" className="space-y-4">
                    <div className="text-center">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        className="w-full max-w-md mx-auto rounded-lg bg-muted"
                        style={{ display: isAnalyzing ? 'block' : 'none' }}
                      />
                      {!isAnalyzing && (
                        <div className="w-full max-w-md mx-auto h-48 bg-muted rounded-lg flex items-center justify-center">
                          <Camera className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <Button 
                      onClick={startCameraAnalysis} 
                      disabled={isAnalyzing}
                      className="w-full"
                      data-testid="button-start-camera"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing Facial Expressions...
                        </>
                      ) : (
                        <>
                          <Camera className="h-4 w-4 mr-2" />
                          Start Camera Analysis
                        </>
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="voice" className="space-y-4">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Mic className={`h-12 w-12 ${isAnalyzing ? 'text-red-500 animate-pulse' : 'text-primary'}`} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {isAnalyzing ? 'Listening and analyzing your voice...' : 'Click to start voice analysis'}
                      </p>
                    </div>
                    <Button 
                      onClick={startVoiceAnalysis} 
                      disabled={isAnalyzing}
                      className="w-full"
                      data-testid="button-start-voice"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing Voice Patterns...
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          Start Voice Analysis
                        </>
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4">
                    <div 
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload a photo for analysis
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        data-testid="input-file-upload"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                All analysis is processed locally. Your images and voice data are never stored or sent to external servers.
              </AlertDescription>
            </Alert>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results ? (
              <>
                {/* Overall Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Analysis Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{results.emotion}</div>
                      <div className="text-sm text-muted-foreground">Detected Emotion</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Stress Level</span>
                        <span className={`text-sm font-bold ${getStressLevelColor(results.stressLevel)}`}>
                          {results.stressLevel}%
                        </span>
                      </div>
                      <Progress 
                        value={results.stressLevel} 
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Confidence</span>
                        <span className="text-sm font-bold text-green-500">
                          {results.confidence}%
                        </span>
                      </div>
                      <Progress 
                        value={results.confidence} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Metrics */}
                {activeTab === 'camera' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Facial Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Eye Strain</span>
                        <span className="text-sm font-medium">{results.facialIndicators.eyeStrain}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Facial Tension</span>
                        <span className="text-sm font-medium">{results.facialIndicators.facialTension}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Overall Mood</span>
                        <span className="text-sm font-medium">{results.facialIndicators.overallMood}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'voice' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Voice Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Tone Stress</span>
                        <span className="text-sm font-medium">{results.voiceIndicators.toneStress}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Speech Rate</span>
                        <span className="text-sm font-medium">{results.voiceIndicators.speechRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Emotional Tone</span>
                        <span className="text-sm font-medium">{results.voiceIndicators.emotionalTone}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {results.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => setResults(null)} 
                  variant="outline" 
                  className="w-full"
                  data-testid="button-new-analysis"
                >
                  Start New Analysis
                </Button>
              </>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Select an analysis method to get started with AI-powered stress and emotion detection.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}