import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VoiceSystemProps {
  onTranscript: (text: string) => void;
  onSpeakText: (text: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}

export const VoiceSystem: React.FC<VoiceSystemProps> = ({
  onTranscript,
  onSpeakText,
  isListening,
  setIsListening
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [volume, setVolume] = useState([0.8]);
  const [rate, setRate] = useState([1.0]);
  const [pitch, setPitch] = useState([1.0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Patikriname Web Speech API palaikymą
    const supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setIsSupported(supported);

    if (supported) {
      initializeSpeechRecognition();
      initializeSpeechSynthesis();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'lt-LT'; // Lietuvių kalba
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('Balso atpažinimas pradėtas');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        
        if (result.isFinal) {
          finalTranscript += transcript;
          setConfidence(result[0].confidence * 100);
        } else {
          interimTranscript += transcript;
        }
      }

      const fullTranscript = finalTranscript || interimTranscript;
      setTranscript(fullTranscript);

      if (finalTranscript) {
        onTranscript(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Balso atpažinimo klaida:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log('Balso atpažinimas baigtas');
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  };

  const initializeSpeechSynthesis = () => {
    synthRef.current = window.speechSynthesis;
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (!synthRef.current || isSpeaking) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Wait for voices to load, then find Lithuanian voice
    const findAndSetVoice = () => {
      const voices = synthRef.current?.getVoices() || [];
      const lithuanianVoice = voices.find(voice => 
        voice.lang.startsWith('lt') || 
        voice.name.toLowerCase().includes('lithuanian') ||
        voice.name.toLowerCase().includes('lietuv')
      );
      
      if (lithuanianVoice) {
        utterance.voice = lithuanianVoice;
      } else {
        // Fallback to any available voice that might work with Lithuanian
        const fallbackVoice = voices.find(voice => 
          voice.lang.startsWith('en') || voice.default
        );
        if (fallbackVoice) {
          utterance.voice = fallbackVoice;
        }
      }
    };

    findAndSetVoice();

    utterance.volume = volume[0];
    utterance.rate = rate[0];
    utterance.pitch = pitch[0];
    utterance.lang = 'lt-LT';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    // Small delay to ensure voice is set
    setTimeout(() => {
      if (synthRef.current) {
        synthRef.current.speak(utterance);
      }
    }, 100);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    // Automatiškai kalbame gautą tekstą iš AI
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  if (!isSupported) {
    return (
      <Alert>
        <AlertDescription>
          Jūsų naršyklė nepalaiko balso funkcijų. Naudokite Chrome, Firefox ar Safari.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Balso Valdymas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Balso atpažinimas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Balso Atpažinimas</h4>
            <Badge variant={isListening ? "default" : "secondary"}>
              {isListening ? 'KLAUSOMA' : 'SUSTABDYTA'}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={isListening ? stopListening : startListening}
              variant={isListening ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isListening ? (
                <>
                  <MicOff className="h-4 w-4" />
                  Sustabdyti
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Pradėti Kalbėti
                </>
              )}
            </Button>
          </div>

          {transcript && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Atpažintas tekstas:</p>
              <p className="font-medium">{transcript}</p>
              {confidence > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Tikslumas: {Math.round(confidence)}%
                </p>
              )}
            </div>
          )}
        </div>

        {/* Balso sintezė */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Balso Sintezė</h4>
            <Badge variant={isSpeaking ? "default" : "secondary"}>
              {isSpeaking ? 'KALBA' : 'TYLA'}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={isSpeaking ? stopSpeaking : () => speakText('Sveiki! Aš esu jūsų debatų treneris.')}
              variant={isSpeaking ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isSpeaking ? (
                <>
                  <Pause className="h-4 w-4" />
                  Sustabdyti
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Testuoti Balsą
                </>
              )}
            </Button>
          </div>

          {/* Balso nustatymai */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Garsumas: {Math.round(volume[0] * 100)}%
              </label>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Greitis: {rate[0].toFixed(1)}x
              </label>
              <Slider
                value={rate}
                onValueChange={setRate}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tonas: {pitch[0].toFixed(1)}
              </label>
              <Slider
                value={pitch}
                onValueChange={setPitch}
                max={2}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Sparčiosios komandos */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Sparčiosios Komandos</h4>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => speakText('Pradėkime debatus!')}
            >
              "Pradėkime debatus!"
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => speakText('Puikus argumentas!')}
            >
              "Puikus argumentas!"
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => speakText('Pabandykite dar kartą.')}
            >
              "Pabandykite dar kartą"
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => speakText('Laikas baigėsi!')}
            >
              "Laikas baigėsi!"
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Išplečiame Window tipą Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}