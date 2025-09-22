import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target, Brain, Zap, Award, Medal, Crown } from 'lucide-react';
import { translations } from '@/lib/translations';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  unlockedAt?: Date;
}

export interface BadgeSystemProps {
  achievements: Achievement[];
  onAchievementUnlock?: (achievement: Achievement) => void;
}

const tierColors = {
  bronze: 'bg-amber-100 border-amber-300 text-amber-800',
  silver: 'bg-gray-100 border-gray-300 text-gray-800',
  gold: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  platinum: 'bg-purple-100 border-purple-300 text-purple-800'
};

const tierGradients = {
  bronze: 'from-amber-500 to-amber-600',
  silver: 'from-gray-400 to-gray-500',
  gold: 'from-yellow-400 to-yellow-500',
  platinum: 'from-purple-500 to-purple-600'
};

export const BadgeSystem: React.FC<BadgeSystemProps> = ({ achievements, onAchievementUnlock }) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold">{translations.achievements.title}</h3>
          </div>
          <Badge variant="outline" className="font-bold">
            {unlockedCount}/{totalCount}
          </Badge>
        </div>
        
        <Progress value={(unlockedCount / totalCount) * 100} className="h-2 mb-2" />
        <p className="text-sm text-muted-foreground">
          {unlockedCount === totalCount 
            ? '🎉 Visi pasiekimai atrakinti!' 
            : `Liko ${totalCount - unlockedCount} pasiekimų`
          }
        </p>
      </Card>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id}
            className={`p-4 transition-all duration-300 hover:scale-105 ${
              achievement.unlocked 
                ? `${tierColors[achievement.tier]} shadow-lg` 
                : 'bg-muted/30 opacity-70'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`p-2 rounded-full ${
                achievement.unlocked 
                  ? `bg-gradient-to-br ${tierGradients[achievement.tier]} text-white` 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {achievement.icon}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-semibold text-sm truncate ${
                    achievement.unlocked ? '' : 'text-muted-foreground'
                  }`}>
                    {achievement.name}
                  </h4>
                  {achievement.unlocked && (
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${tierColors[achievement.tier]}`}
                    >
                      {achievement.tier}
                    </Badge>
                  )}
                </div>
                
                <p className={`text-xs mb-2 ${
                  achievement.unlocked ? '' : 'text-muted-foreground'
                }`}>
                  {achievement.description}
                </p>
                
                {/* Progress for locked achievements */}
                {!achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{translations.achievements.progress}</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-1"
                    />
                  </div>
                )}
                
                {/* Unlock date */}
                {achievement.unlocked && achievement.unlockedAt && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {translations.achievements.unlocked} {achievement.unlockedAt.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Default achievements for the debate coach
export const createDefaultAchievements = (): Achievement[] => [
  {
    id: 'first-debate',
    name: 'First Debate',
    description: 'Complete your first debate session',
    icon: <Target className="h-4 w-4" />,
    tier: 'bronze',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'strong-argument',
    name: 'Strong Argument',
    description: 'Create an argument with 80%+ strength score',
    icon: <Brain className="h-4 w-4" />,
    tier: 'silver',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'debate-marathon',
    name: 'Debate Marathon',
    description: 'Complete 5 debate sessions in one day',
    icon: <Zap className="h-4 w-4" />,
    tier: 'gold',
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'perfect-round',
    name: 'Perfect Round',
    description: 'Win a round with maximum points',
    icon: <Star className="h-4 w-4" />,
    tier: 'gold',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'topic-master',
    name: 'Topic Master',
    description: 'Debate on 10 different topics',
    icon: <Award className="h-4 w-4" />,
    tier: 'silver',
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'comeback-king',
    name: 'Comeback King',
    description: 'Recover from losing position to win the debate',
    icon: <Medal className="h-4 w-4" />,
    tier: 'platinum',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'speed-debater',
    name: 'Speed Debater',
    description: 'Make 3 arguments in under 2 minutes',
    icon: <Zap className="h-4 w-4" />,
    tier: 'bronze',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'grand-champion',
    name: 'Grand Champion',
    description: 'Win 25 debate sessions',
    icon: <Crown className="h-4 w-4" />,
    tier: 'platinum',
    unlocked: false,
    progress: 0,
    maxProgress: 25
  }
];