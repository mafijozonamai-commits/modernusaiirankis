import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  Presentation, 
  Mic, 
  MicOff, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause,
  MessageSquare,
  Lightbulb,
  Eye
} from 'lucide-react';
import { VoiceInput } from './VoiceInput';
import { soundManager } from './SoundSystem';
import { translations } from '@/lib/translations';

interface Slide {
  id: string;
  content: string;
  type: 'text' | 'image';
  url?: string;
}

export const PresentationMode: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [useVoice, setUseVoice] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [aiNotes, setAiNotes] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newSlide: Slide = {
            id: `slide-${Date.now()}-${index}`,
            content: file.name,
            type: 'image',
            url: e.target?.result as string
          };
          setSlides(prev => [...prev, newSlide]);
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pptx')) {
        // For PDF and PPTX, we'll just show the filename for now
        // In a real implementation, you'd extract slides from these files
        const newSlide: Slide = {
          id: `slide-${Date.now()}-${index}`,
          content: `Slide from ${file.name}`,
          type: 'text'
        };
        setSlides(prev => [...prev, newSlide]);
      }
    });

    soundManager.success();
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    files.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newSlide: Slide = {
            id: `slide-${Date.now()}-${index}`,
            content: file.name,
            type: 'image',
            url: e.target?.result as string
          };
          setSlides(prev => [...prev, newSlide]);
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pptx')) {
        const newSlide: Slide = {
          id: `slide-${Date.now()}-${index}`,
          content: `Slide from ${file.name}`,
          type: 'text'
        };
        setSlides(prev => [...prev, newSlide]);
      }
    });

    soundManager.success();
  }, []);

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      soundManager.click();
    }
  };

  const previousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      soundManager.click();
    }
  };

  const startPresentation = () => {
    setIsPresenting(true);
    soundManager.roundStart();
    // Generate initial AI suggestions
    generateAISuggestions();
  };

  const endPresentation = () => {
    setIsPresenting(false);
    soundManager.roundEnd();
  };

  const generateAISuggestions = async () => {
    setIsLoading(true);
    // Mock AI suggestions - in real implementation, this would call your AI service
    setTimeout(() => {
      const mockSuggestions = [
        'Kalbėkite lėčiau ir aiškiau',
        'Daugiau akių kontakto su auditorija',
        'Naudokite daugiau pavyzdžių',
        'Padarykite pauzę tarp skyrių'
      ];
      setAiSuggestions(mockSuggestions);
      setIsLoading(false);
    }, 2000);
  };

  const handleVoiceTranscription = (text: string) => {
    setCurrentInput(prev => prev + ' ' + text);
    // Generate AI notes based on speech
    const note = `${new Date().toLocaleTimeString()}: ${text}`;
    setAiNotes(prev => [...prev, note]);
  };

  const handleTextSubmit = () => {
    if (!currentInput.trim()) return;
    
    const note = `${new Date().toLocaleTimeString()}: ${currentInput}`;
    setAiNotes(prev => [...prev, note]);
    setCurrentInput('');
    soundManager.success();
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-learning bg-clip-text text-transparent mb-2">
          {translations.presentation.title}
        </h2>
        <p className="text-muted-foreground">
          {translations.presentation.subtitle}
        </p>
      </div>

      {/* Upload Section */}
      {slides.length === 0 && (
        <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
          <CardContent 
            className="p-8 text-center cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">{translations.presentation.uploadSlides}</h3>
            <p className="text-muted-foreground mb-4">{translations.presentation.supportedFormats}</p>
            <p className="text-sm text-muted-foreground">{translations.presentation.dragDrop}</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.pptx,.jpg,.jpeg,.png,.webp"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </CardContent>
        </Card>
      )}

      {/* Presentation Interface */}
      {slides.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Slide View */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Presentation className="h-5 w-5 text-primary" />
                    <span className="font-medium">
                      {translations.presentation.currentSlide} {currentSlideIndex + 1} / {slides.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isPresenting ? (
                      <Button onClick={startPresentation} className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        {translations.presentation.startPresentation}
                      </Button>
                    ) : (
                      <Button onClick={endPresentation} variant="destructive" className="flex items-center gap-2">
                        <Pause className="h-4 w-4" />
                        Baigti
                      </Button>
                    )}
                  </div>
                </div>
                <Progress value={((currentSlideIndex + 1) / slides.length) * 100} className="w-full" />
              </CardHeader>
              <CardContent>
                {currentSlide && (
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                    {currentSlide.type === 'image' && currentSlide.url ? (
                      <img 
                        src={currentSlide.url} 
                        alt={currentSlide.content}
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-lg font-medium">{currentSlide.content}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Navigation Controls */}
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={previousSlide}
                    disabled={currentSlideIndex === 0}
                    variant="outline"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    {translations.presentation.previousSlide}
                  </Button>
                  
                  <Button 
                    onClick={nextSlide}
                    disabled={currentSlideIndex === slides.length - 1}
                    variant="outline"
                  >
                    {translations.presentation.nextSlide}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Input Section */}
            {isPresenting && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Jūsų komentarai
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={useVoice ? "default" : "outline"}
                        onClick={() => setUseVoice(!useVoice)}
                        size="sm"
                      >
                        {useVoice ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        {useVoice ? translations.presentation.voiceMode : translations.presentation.textMode}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {useVoice ? (
                    <VoiceInput 
                      onTranscription={handleVoiceTranscription}
                      language="lt-LT"
                    />
                  ) : (
                    <div className="space-y-3">
                      <Textarea
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        placeholder="Įveskite savo komentarus apie dabartinę skaidrę..."
                        rows={3}
                      />
                      <Button onClick={handleTextSubmit} disabled={!currentInput.trim()}>
                        Pridėti komentarą
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* AI Analysis Panel */}
          <div className="space-y-4">
            {/* AI Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  {translations.presentation.suggestions}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Analizuojama...</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="p-3 bg-accent/10 rounded-lg">
                        <p className="text-sm">{suggestion}</p>
                      </div>
                    ))}
                    {aiSuggestions.length === 0 && !isPresenting && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Pradėkite pristatymą, kad gautumėte AI pasiūlymus
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Notes */}
            {aiNotes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    {translations.presentation.aiNotes}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {aiNotes.map((note, index) => (
                      <div key={index} className="p-2 bg-muted/50 rounded text-sm">
                        {note}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};