import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TrendingUp, AlertTriangle, CheckCircle, Brain } from 'lucide-react';

interface ArgumentStrengthMeterProps {
  argument: string;
  onStrengthChange?: (strength: number, feedback: string[]) => void;
}

interface AnalysisResult {
  score: number;
  feedback: string[];
  strengths: string[];
  improvements: string[];
}

export const ArgumentStrengthMeter: React.FC<ArgumentStrengthMeterProps> = ({
  argument,
  onStrengthChange
}) => {
  const [analysis, setAnalysis] = useState<AnalysisResult>({
    score: 0,
    feedback: [],
    strengths: [],
    improvements: []
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeArgument = (text: string): AnalysisResult => {
    let score = 0;
    const feedback: string[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Length analysis
    if (text.length > 50) {
      score += 20;
      strengths.push('Good argument length');
    } else if (text.length > 0) {
      improvements.push('Try to elaborate more on your point');
    }

    // Evidence keywords
    const evidenceWords = ['study', 'research', 'data', 'statistics', 'evidence', 'according to', 'shows that'];
    const hasEvidence = evidenceWords.some(word => text.toLowerCase().includes(word));
    if (hasEvidence) {
      score += 25;
      strengths.push('Uses evidence or research');
    } else {
      improvements.push('Consider adding evidence or examples');
    }

    // Logical connectors
    const logicalWords = ['because', 'therefore', 'since', 'as a result', 'consequently', 'furthermore', 'moreover'];
    const hasLogic = logicalWords.some(word => text.toLowerCase().includes(word));
    if (hasLogic) {
      score += 20;
      strengths.push('Shows logical reasoning');
    } else {
      improvements.push('Use logical connectors to strengthen reasoning');
    }

    // Question words (shows consideration of counterarguments)
    const questionWords = ['why', 'how', 'what if', 'consider', 'however', 'although', 'while'];
    const hasConsideration = questionWords.some(word => text.toLowerCase().includes(word));
    if (hasConsideration) {
      score += 15;
      strengths.push('Considers different perspectives');
    }

    // Clear structure
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length >= 2) {
      score += 10;
      strengths.push('Well-structured argument');
    } else {
      improvements.push('Try breaking your argument into multiple points');
    }

    // Strong conclusion words
    const conclusionWords = ['in conclusion', 'therefore', 'ultimately', 'as a result', 'this shows'];
    const hasConclusion = conclusionWords.some(word => text.toLowerCase().includes(word));
    if (hasConclusion) {
      score += 10;
      strengths.push('Strong conclusion');
    }

    // Generate overall feedback
    if (score >= 80) {
      feedback.push('Excellent argument! Strong evidence and reasoning.');
    } else if (score >= 60) {
      feedback.push('Good argument with room for improvement.');
    } else if (score >= 40) {
      feedback.push('Developing argument. Focus on evidence and structure.');
    } else {
      feedback.push('Keep building! Add more details and reasoning.');
    }

    return {
      score: Math.min(score, 100),
      feedback,
      strengths,
      improvements
    };
  };

  useEffect(() => {
    if (argument.trim().length === 0) {
      setAnalysis({ score: 0, feedback: [], strengths: [], improvements: [] });
      return;
    }

    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      const result = analyzeArgument(argument);
      setAnalysis(result);
      setIsAnalyzing(false);
      onStrengthChange?.(result.score, result.feedback);
    }, 300);

    return () => clearTimeout(timer);
  }, [argument, onStrengthChange]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-200';
    if (score >= 60) return 'bg-yellow-100 border-yellow-200';
    if (score >= 40) return 'bg-orange-100 border-orange-200';
    return 'bg-red-100 border-red-200';
  };

  if (argument.trim().length === 0) {
    return (
      <Card className="p-4 bg-muted/30">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Brain className="h-4 w-4" />
          <span className="text-sm">Start typing to see argument analysis...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-4 border-2 transition-all duration-300 ${getScoreBackground(analysis.score)}`}>
      <div className="space-y-3">
        {/* Score Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Argument Strength</span>
          </div>
          <Badge variant="outline" className={`${getScoreColor(analysis.score)} font-bold`}>
            {isAnalyzing ? '...' : `${analysis.score}%`}
          </Badge>
        </div>

        {/* Progress Bar */}
        <Progress 
          value={analysis.score} 
          className="h-2"
        />

        {/* Feedback */}
        {analysis.feedback.length > 0 && (
          <div className="text-sm text-muted-foreground">
            {analysis.feedback[0]}
          </div>
        )}

        {/* Strengths and Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {analysis.strengths.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-green-700 font-medium">
                <CheckCircle className="h-3 w-3" />
                Strengths
              </div>
              {analysis.strengths.slice(0, 2).map((strength, index) => (
                <div key={index} className="text-green-600 ml-4">• {strength}</div>
              ))}
            </div>
          )}

          {analysis.improvements.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-orange-700 font-medium">
                <AlertTriangle className="h-3 w-3" />
                Improve
              </div>
              {analysis.improvements.slice(0, 2).map((improvement, index) => (
                <div key={index} className="text-orange-600 ml-4">• {improvement}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};