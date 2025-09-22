import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Target, BookOpen, Gavel, Globe } from 'lucide-react';

export interface DebateFormat {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  rounds: number;
  rules: string[];
  timePerRound: number; // seconds
  features: string[];
}

export const DEBATE_FORMATS: DebateFormat[] = [
  {
    id: 'casual',
    name: 'Casual Discussion',
    description: 'Relaxed format for learning basic argumentation',
    icon: <Users className="h-5 w-5" />,
    difficulty: 'beginner',
    duration: 10,
    rounds: 3,
    timePerRound: 120,
    rules: [
      'Present your argument clearly',
      'Listen to counterarguments',
      'Respond respectfully',
      'Focus on learning'
    ],
    features: ['Friendly AI coach', 'Helpful feedback', 'No time pressure']
  },
  {
    id: 'structured',
    name: 'Structured Debate',
    description: 'Traditional format with clear opening, arguments, and closing',
    icon: <Target className="h-5 w-5" />,
    difficulty: 'intermediate',
    duration: 15,
    rounds: 5,
    timePerRound: 90,
    rules: [
      'Opening statement (60s)',
      'Main arguments (90s each)',
      'Rebuttal round (60s)',
      'Closing statement (60s)'
    ],
    features: ['Timed rounds', 'Structured flow', 'Scoring system']
  },
  {
    id: 'oxford',
    name: 'Oxford-Style',
    description: 'Formal academic debate with strict timing and procedures',
    icon: <BookOpen className="h-5 w-5" />,
    difficulty: 'advanced',
    duration: 20,
    rounds: 6,
    timePerRound: 180,
    rules: [
      'Proposition opening (3 min)',
      'Opposition opening (3 min)',
      'Proposition arguments (3 min)',
      'Opposition arguments (3 min)',
      'Rebuttals (2 min each)',
      'Closing statements (2 min each)'
    ],
    features: ['Formal procedures', 'Academic rigor', 'Judge evaluation']
  },
  {
    id: 'parliamentary',
    name: 'Parliamentary',
    description: 'Government vs Opposition with Points of Information',
    icon: <Gavel className="h-5 w-5" />,
    difficulty: 'advanced',
    duration: 25,
    rounds: 8,
    timePerRound: 120,
    rules: [
      'Government case (7 min)',
      'Opposition case (8 min)',
      'Government member speech (8 min)',
      'Opposition member speech (8 min)',
      'Opposition rebuttal (4 min)',
      'Government rebuttal (5 min)'
    ],
    features: ['Points of Information', 'Team dynamics', 'Complex structure']
  },
  {
    id: 'lincoln-douglas',
    name: 'Lincoln-Douglas',
    description: 'Value-based philosophical debate focusing on ethics',
    icon: <Globe className="h-5 w-5" />,
    difficulty: 'intermediate',
    duration: 18,
    rounds: 6,
    timePerRound: 150,
    rules: [
      'Affirmative constructive (6 min)',
      'Negative cross-examination (3 min)',
      'Negative constructive (7 min)',
      'Affirmative cross-examination (3 min)',
      'Affirmative rebuttal (4 min)',
      'Negative rebuttal (6 min)',
      'Affirmative final (3 min)'
    ],
    features: ['Value framework', 'Cross-examination', 'Philosophical focus']
  },
  {
    id: 'speed',
    name: 'Speed Round',
    description: 'Quick-fire arguments with rapid responses',
    icon: <Clock className="h-5 w-5" />,
    difficulty: 'intermediate',
    duration: 8,
    rounds: 6,
    timePerRound: 45,
    rules: [
      'Each argument limited to 45 seconds',
      'Immediate responses required',
      'No preparation time',
      'Focus on quick thinking'
    ],
    features: ['Rapid responses', 'Quick thinking', 'High energy']
  }
];

interface DebateFormatSelectorProps {
  selectedFormat?: DebateFormat;
  onFormatSelect: (format: DebateFormat) => void;
  className?: string;
}

export const DebateFormatSelector: React.FC<DebateFormatSelectorProps> = ({
  selectedFormat,
  onFormatSelect,
  className = ''
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Gavel className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Choose Debate Format</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {DEBATE_FORMATS.map((format) => (
          <Card
            key={format.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedFormat?.id === format.id
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onFormatSelect(format)}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {format.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{format.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format.description}
                    </p>
                  </div>
                </div>
                <Badge className={getDifficultyColor(format.difficulty)}>
                  {format.difficulty}
                </Badge>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {format.duration}min
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {format.rounds} rounds
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {format.timePerRound}s per round
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {format.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Rules Preview */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Format Rules:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {format.rules.slice(0, 3).map((rule, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-primary">•</span>
                      {rule}
                    </li>
                  ))}
                  {format.rules.length > 3 && (
                    <li className="text-primary font-medium">
                      +{format.rules.length - 3} more rules...
                    </li>
                  )}
                </ul>
              </div>

              {/* Select Button */}
              <Button
                variant={selectedFormat?.id === format.id ? "default" : "outline"}
                className="w-full"
                size="sm"
              >
                {selectedFormat?.id === format.id ? 'Selected' : 'Select Format'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Format Details */}
      {selectedFormat && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-primary/20 text-primary">
                {selectedFormat.icon}
              </div>
              <h3 className="font-semibold">Selected: {selectedFormat.name}</h3>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Complete Rule Set:</h4>
              <ul className="text-sm space-y-1">
                {selectedFormat.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary font-bold text-xs mt-0.5">
                      {index + 1}.
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-sm bg-white/50 rounded-lg p-3">
              <div>
                <div className="font-bold text-primary">{selectedFormat.duration}</div>
                <div className="text-muted-foreground">Minutes</div>
              </div>
              <div>
                <div className="font-bold text-primary">{selectedFormat.rounds}</div>
                <div className="text-muted-foreground">Rounds</div>
              </div>
              <div>
                <div className="font-bold text-primary">{selectedFormat.timePerRound}s</div>
                <div className="text-muted-foreground">Per Round</div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};