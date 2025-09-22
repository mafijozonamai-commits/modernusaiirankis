import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, Target, Clock } from "lucide-react";
import { translations } from "@/lib/translations";

interface AnalyticsData {
  totalDebates: number;
  winRate: number;
  averageResponseTime: number;
  strengthAreas: string[];
  improvementAreas: string[];
  currentStreak: number;
  topicMastery: { topic: string; score: number }[];
}

interface PerformanceAnalyticsProps {
  data: AnalyticsData;
}

const PerformanceAnalytics = ({ data }: PerformanceAnalyticsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Overall Performance */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5" />
            {translations.analytics.performance}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{data.totalDebates}</div>
              <div className="text-sm text-muted-foreground">{translations.analytics.totalDebates}</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{data.winRate}%</div>
              <div className="text-sm text-muted-foreground">{translations.analytics.winRate}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Debatų įgūdžiai</span>
              <span className={getScoreColor(data.winRate)}>{data.winRate}%</span>
            </div>
            <Progress value={data.winRate} className="h-2" />
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Vid. atsakymas: {data.averageResponseTime}s</span>
            <Badge variant="outline" className="ml-auto">
              <Award className="w-3 h-3 mr-1" />
              {data.currentStreak} streak
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Topic Mastery */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5" />
            Temų įvaldymas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.topicMastery.map((topic, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="truncate">{topic.topic}</span>
                <span className={getScoreColor(topic.score)}>{topic.score}%</span>
              </div>
              <Progress value={topic.score} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Strengths & Areas for Improvement */}
      <Card className="shadow-card md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Įgūdžių analizė</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-700 mb-2 flex items-center gap-1">
                <Award className="w-4 h-4" />
                {translations.analytics.strengthAreas}
              </h4>
              <div className="space-y-1">
                {data.strengthAreas.map((strength, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-orange-700 mb-2 flex items-center gap-1">
                <Target className="w-4 h-4" />
                {translations.analytics.improvementAreas}
              </h4>
              <div className="space-y-1">
                {data.improvementAreas.map((area, index) => (
                  <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAnalytics;