import { useState, useEffect } from "react";
import { Clock, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DebateTimerProps {
  maxTime: number; // seconds
  onTimeUp: () => void;
  isActive: boolean;
}

const DebateTimer = ({ maxTime, onTimeUp, isActive }: DebateTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isActive, timeLeft, onTimeUp]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(maxTime);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const percentage = timeLeft / maxTime;
    if (percentage > 0.5) return "text-green-600";
    if (percentage > 0.25) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="shadow-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Response Time</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`text-xl font-mono font-bold ${getTimerColor()}`}>
              {formatTime(timeLeft)}
            </span>
            
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTimer}
                disabled={!isActive || timeLeft === 0}
                className="w-8 h-8 p-0"
              >
                {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={resetTimer}
                className="w-8 h-8 p-0"
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-2 w-full bg-muted rounded-full h-1">
          <div
            className={`h-1 rounded-full transition-all duration-1000 ${
              timeLeft / maxTime > 0.5 ? 'bg-green-500' :
              timeLeft / maxTime > 0.25 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${(timeLeft / maxTime) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DebateTimer;