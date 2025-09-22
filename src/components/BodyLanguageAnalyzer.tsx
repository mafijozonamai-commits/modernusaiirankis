import React, { useRef, useEffect, useState } from 'react';
import { Camera, Mic, MicOff, Video, VideoOff, Eye, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BodyLanguageAnalyzerProps {
  isActive: boolean;
  onToggle: () => void;
  onFeedback: (feedback: string) => void;
}

interface AnalysisResult {
  confidence: number;
  posture: 'puiki' | 'gera' | 'vidutiniška' | 'bloga';
  gestures: 'efektyvūs' | 'vidutiniški' | 'riboti' | 'trukdantys';
  eyeContact: 'nuolatinis' | 'geras' | 'nepakankamas' | 'vengiamas';
  energy: 'aukšta' | 'gera' | 'vidutiniška' | 'žema';
  suggestions: string[];
}

export const BodyLanguageAnalyzer: React.FC<BodyLanguageAnalyzerProps> = ({
  isActive,
  onToggle,
  onFeedback
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isActive]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setError('');
      startAnalysis();
    } catch (err) {
      setError('Nepavyko pasiekti kameros. Patikrinkite leidimusir bandykite dar kartą.');
      console.error('Kamera klaida:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsAnalyzing(false);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    
    // Imituojame kūno kalbos analizę kas 3 sekundes
    const analysisInterval = setInterval(() => {
      if (!isActive) {
        clearInterval(analysisInterval);
        return;
      }

      analyzeBodyLanguage();
    }, 3000);

    return () => clearInterval(analysisInterval);
  };

  const analyzeBodyLanguage = () => {
    // Imituojame tikroviškos AI analizės rezultatus
    const mockAnalysis: AnalysisResult = {
      confidence: Math.random() * 30 + 70, // 70-100%
      posture: ['puiki', 'gera', 'vidutiniška', 'bloga'][Math.floor(Math.random() * 4)] as any,
      gestures: ['efektyvūs', 'vidutiniški', 'riboti', 'trukdantys'][Math.floor(Math.random() * 4)] as any,
      eyeContact: ['nuolatinis', 'geras', 'nepakankamas', 'vengiamas'][Math.floor(Math.random() * 4)] as any,
      energy: ['aukšta', 'gera', 'vidutiniška', 'žema'][Math.floor(Math.random() * 4)] as any,
      suggestions: []
    };

    // Generuojame pasiūlymus pagal analizę
    if (mockAnalysis.posture === 'bloga' || mockAnalysis.posture === 'vidutiniška') {
      mockAnalysis.suggestions.push('Išlaikykite tiesią laikyseną, pečius atgal');
    }
    if (mockAnalysis.gestures === 'riboti' || mockAnalysis.gestures === 'trukdantys') {
      mockAnalysis.suggestions.push('Naudokite natūralius gestus argumentams stiprinti');
    }
    if (mockAnalysis.eyeContact === 'nepakankamas' || mockAnalysis.eyeContact === 'vengiamas') {
      mockAnalysis.suggestions.push('Palaikykite akių kontaktą su auditorija');
    }
    if (mockAnalysis.energy === 'žema' || mockAnalysis.energy === 'vidutiniška') {
      mockAnalysis.suggestions.push('Padidinkite energiją ir entuziazmą');
    }

    if (mockAnalysis.suggestions.length === 0) {
      mockAnalysis.suggestions.push('Puikus kūno kalbos valdymas! Tęskite šitaip.');
    }

    setAnalysis(mockAnalysis);
    
    // Siunčiame grįžtamąjį ryšį
    const feedback = `Kūno kalbos analizė: ${mockAnalysis.suggestions.join('. ')}`;
    onFeedback(feedback);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'puiki':
      case 'efektyvūs':
      case 'nuolatinis':
      case 'aukšta':
        return 'bg-green-500';
      case 'gera':
      case 'geras':
        return 'bg-green-400';
      case 'vidutiniška':
      case 'vidutiniški':
      case 'nepakankamas':
        return 'bg-yellow-500';
      case 'bloga':
      case 'riboti':
      case 'trukdantys':
      case 'vengiamas':
      case 'žema':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Kūno Kalbos Analizė
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center">
          <Button 
            onClick={onToggle}
            variant={isActive ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            {isActive ? (
              <>
                <VideoOff className="h-4 w-4" />
                Sustabdyti Kamerą
              </>
            ) : (
              <>
                <Video className="h-4 w-4" />
                Įjungti Kamerą
              </>
            )}
          </Button>
        </div>

        {isActive && (
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-64 object-cover"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full opacity-0"
              />
              {isAnalyzing && (
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-red-500 text-white animate-pulse">
                    ● ANALIZUOJA
                  </Badge>
                </div>
              )}
            </div>

            {analysis && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Kūno Kalbos Rodikliai</h4>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Laikysena:</span>
                    <Badge className={getStatusColor(analysis.posture)}>
                      {analysis.posture}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gestai:</span>
                    <Badge className={getStatusColor(analysis.gestures)}>
                      {analysis.gestures}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Akių kontaktas:</span>
                    <Badge className={getStatusColor(analysis.eyeContact)}>
                      {analysis.eyeContact}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Energija:</span>
                    <Badge className={getStatusColor(analysis.energy)}>
                      {analysis.energy}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Pasiūlymai</h4>
                  <div className="text-sm space-y-1">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};