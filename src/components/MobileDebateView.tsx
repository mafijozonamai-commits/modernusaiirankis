import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Menu, 
  Timer, 
  Zap, 
  Trophy,
  Mic,
  MicOff,
  Volume2,
  Camera,
  Send,
  RotateCcw
} from 'lucide-react';

interface MobileDebateViewProps {
  children: React.ReactNode;
  currentStrength?: number;
  citationScore?: number;
  round?: number;
  maxRounds?: number;
  timeRemaining?: number;
  onTabChange?: (tab: string) => void;
  activeTab?: string;
  debateStarted?: boolean;
  onVoiceInput?: () => void;
  isListening?: boolean;
}

export const MobileDebateView: React.FC<MobileDebateViewProps> = ({
  children,
  currentStrength = 0,
  citationScore = 0,
  round = 1,
  maxRounds = 5,
  timeRemaining = 120,
  onTabChange,
  activeTab = "debate",
  debateStarted = false,
  onVoiceInput,
  isListening = false
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleVoiceInput = () => {
    onVoiceInput?.();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Quick Stats</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Card className="p-3">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Strength</p>
                            <p className="text-lg font-semibold">{currentStrength}%</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-3">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-accent" />
                          <div>
                            <p className="text-xs text-muted-foreground">Citations</p>
                            <p className="text-lg font-semibold">{citationScore}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Progress</h4>
                    <Card className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Round</span>
                        <span className="font-semibold">{round}/{maxRounds}</span>
                      </div>
                      <div className="w-full bg-secondary/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(round / maxRounds) * 100}%` }}
                        />
                      </div>
                    </Card>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <div>
              <h1 className="text-lg font-bold">Debate Coach</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Round {round}/{maxRounds}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Timer className="h-3 w-3" />
              {formatTime(timeRemaining)}
            </Badge>
            
            <Button
              variant={isListening ? "default" : "ghost"}
              size="sm"
              onClick={toggleVoiceInput}
              className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Performance Bar */}
      <div className="bg-card border-b border-border p-2 md:hidden">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div 
                className={`w-2 h-2 rounded-full ${
                  currentStrength >= 80 ? 'bg-green-500' :
                  currentStrength >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              />
              <span className="text-muted-foreground">Strength: {currentStrength}%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Citations: {citationScore}</span>
            </div>
          </div>
          
          <Badge variant="outline" className="text-xs">
            AI Responding...
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-20">
        {children}
      </div>

      {/* Mobile Bottom Tabs */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Button 
            variant={activeTab === "debate" ? "default" : "ghost"} 
            size="sm" 
            className="flex flex-col gap-1 h-auto py-2"
            onClick={() => onTabChange?.("debate")}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">Debate</span>
          </Button>
          <Button 
            variant={activeTab === "analytics" ? "default" : "ghost"} 
            size="sm" 
            className="flex flex-col gap-1 h-auto py-2"
            onClick={() => onTabChange?.("analytics")}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">Analytics</span>
          </Button>
          <Button 
            variant={activeTab === "achievements" ? "default" : "ghost"} 
            size="sm" 
            className="flex flex-col gap-1 h-auto py-2"
            onClick={() => onTabChange?.("achievements")}
          >
            <Trophy className="h-4 w-4" />
            <span className="text-xs">Badges</span>
          </Button>
          <Button 
            variant={activeTab === "practice" ? "default" : "ghost"} 
            size="sm" 
            className="flex flex-col gap-1 h-auto py-2"
            onClick={() => onTabChange?.("practice")}
          >
            <Settings className="h-4 w-4" />
            <span className="text-xs">Practice</span>
          </Button>
        </div>
      </div>
    </div>
  );
};