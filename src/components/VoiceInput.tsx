import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Square, Play } from 'lucide-react';
import { soundManager } from './SoundSystem';

interface VoiceInputProps {
  onTranscription?: (text: string) => void;
  onStartListening?: () => void;
  onStopListening?: () => void;
  disabled?: boolean;
  language?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscription,
  onStartListening,
  onStopListening,
  disabled = false,
  language = 'lt-LT'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        onStartListening?.();
        soundManager.click();
      };

      recognition.onend = () => {
        setIsListening(false);
        onStopListening?.();
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;

          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            setConfidence(confidence);
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = finalTranscript + interimTranscript;
        setTranscript(fullTranscript);

        if (finalTranscript) {
          onTranscription?.(finalTranscript);
          soundManager.success();
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        soundManager.error();
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, [language, onTranscription, onStartListening, onStopListening]);

  const toggleListening = () => {
    if (!isSupported || disabled) return;

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      recognitionRef.current?.start();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return (
      <Card className="p-4 bg-muted/30">
        <p className="text-sm text-muted-foreground text-center">
          Voice input not supported in this browser
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {/* Voice Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={isListening ? "destructive" : "default"}
            onClick={toggleListening}
            disabled={disabled}
            className="flex items-center gap-2"
          >
            {isListening ? (
              <>
                <Square className="h-4 w-4" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="h-4 w-4" />
                Voice Input
              </>
            )}
          </Button>

          {transcript && (
            <Button
              variant="outline"
              onClick={() => speakText(transcript)}
              className="flex items-center gap-2"
            >
              <Volume2 className="h-4 w-4" />
              Replay
            </Button>
          )}
        </div>

        {isListening && (
          <Badge variant="secondary" className="animate-pulse">
            Listening...
          </Badge>
        )}
      </div>

      {/* Transcript Display */}
      {transcript && (
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Transcript:</span>
              {confidence > 0 && (
                <Badge variant="outline" className="text-xs">
                  Confidence: {Math.round(confidence * 100)}%
                </Badge>
              )}
            </div>
            <p className="text-sm bg-muted/50 p-3 rounded-md">
              {transcript}
            </p>
          </div>
        </Card>
      )}

      {/* Voice Input Tips */}
      <Card className="p-3 bg-blue-50 border-blue-200">
        <div className="text-xs text-blue-800 space-y-1">
          <p className="font-medium">💡 Voice Input Tips:</p>
          <ul className="space-y-1 ml-3">
            <li>• Speak clearly and at a normal pace</li>
            <li>• Use punctuation words: "comma", "period"</li>
            <li>• Say "new paragraph" to add line breaks</li>
            <li>• Hold the button and speak your argument</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};