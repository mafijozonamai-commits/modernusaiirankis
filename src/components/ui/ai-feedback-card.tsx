import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Star, TrendingUp, Target, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackScore {
  category: string;
  score: number;
  maxScore: number;
  improvement?: string;
}

interface AIFeedbackCardProps {
  overallScore: number;
  scores: FeedbackScore[];
  insights: string[];
  strengths: string[];
  improvements: string[];
  className?: string;
}

const getScoreColor = (score: number, maxScore: number) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'text-secondary';
  if (percentage >= 60) return 'text-warning';
  return 'text-destructive';
};

const getScoreBg = (score: number, maxScore: number) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'bg-secondary/10 border-secondary/20';
  if (percentage >= 60) return 'bg-warning/10 border-warning/20';
  return 'bg-destructive/10 border-destructive/20';
};

export const AIFeedbackCard: React.FC<AIFeedbackCardProps> = ({
  overallScore,
  scores,
  insights,
  strengths,
  improvements,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="glass-morphism border-primary/20 shadow-floating">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-gradient-primary">
              <Target className="h-5 w-5" />
              AI Vertinimas
            </CardTitle>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Badge 
                className={cn(
                  "px-4 py-2 rounded-full font-bold text-lg",
                  getScoreBg(overallScore, 100)
                )}
              >
                <Star className="h-4 w-4 mr-1" />
                {overallScore}/100
              </Badge>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Breakdown */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-semibold text-foreground">Išsami analizė</h4>
            <div className="grid gap-3">
              {scores.map((score, index) => (
                <motion.div
                  key={score.category}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 glass-morphism rounded-lg"
                >
                  <span className="font-medium">{score.category}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn("font-bold", getScoreColor(score.score, score.maxScore))}>
                      {score.score}/{score.maxScore}
                    </span>
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(score.score / score.maxScore) * 100}%` }}
                        transition={{ delay: 0.6 + (0.1 * index), duration: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights */}
          {insights.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                AI Įžvalgos
              </h4>
              <div className="space-y-2">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (0.1 * index) }}
                    className="p-3 bg-accent/10 rounded-lg border border-accent/20"
                  >
                    <p className="text-sm text-foreground">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Strengths and Improvements */}
          <div className="grid md:grid-cols-2 gap-4">
            {strengths.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-2"
              >
                <h5 className="font-medium text-secondary flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Stiprybės
                </h5>
                <div className="space-y-1">
                  {strengths.map((strength, index) => (
                    <Badge key={index} variant="secondary" className="mr-1 mb-1">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {improvements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-2"
              >
                <h5 className="font-medium text-warning flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Tobulinimo sritys
                </h5>
                <div className="space-y-1">
                  {improvements.map((improvement, index) => (
                    <Badge key={index} variant="outline" className="mr-1 mb-1 border-warning/50 text-warning">
                      {improvement}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIFeedbackCard;