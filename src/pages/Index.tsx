import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import ImprovedDebateInterface from "@/components/ImprovedDebateInterface";
import { PracticeMode } from "@/components/PracticeMode";
import PerformanceAnalytics from "@/components/PerformanceAnalytics";
import { BadgeSystem } from "@/components/BadgeSystem";
import { PresentationMode } from "@/components/PresentationMode";
import { ProfessorMode } from "@/components/ProfessorMode";
import { SettingsPanel } from "@/components/SettingsPanel";
import { MobileDebateView } from "@/components/MobileDebateView";
import { useMobileViewport } from "@/hooks/use-mobile-viewport";
import { useMobileGestures } from "@/hooks/use-mobile-gestures";
import { translations } from "@/lib/translations";

const Index = () => {
  const [activeTab, setActiveTab] = useState("presentation");
  const viewport = useMobileViewport();
  const { gestureState } = useMobileGestures();
  
  // Mock data for demonstration
  const analyticsData = {
    totalDebates: 0,
    winRate: 0,
    averageResponseTime: 0,
    strengthAreas: [],
    improvementAreas: [],
    debateHistory: [],
    scoreHistory: [],
    currentStreak: 0,
    topicMastery: []
  };

  const achievements = [
    {
      id: '1',
      name: 'Pirmieji žingsniai',
      title: 'Pirmieji žingsniai',
      description: 'Užbaikite savo pirmuosius debatus',
      icon: 'trophy',
      tier: 'bronze' as const,
      unlocked: false,
      unlockedAt: undefined,
      progress: 0,
      maxProgress: 1
    }
  ];

  // Handle gesture navigation on mobile
  useEffect(() => {
    if (viewport.isMobile) {
      if (gestureState.isSwipeLeft) {
        const tabs = ["presentation", "debates", "professor", "settings"];
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
          setActiveTab(tabs[currentIndex + 1]);
        }
      } else if (gestureState.isSwipeRight) {
        const tabs = ["presentation", "debates", "professor", "settings"];
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex > 0) {
          setActiveTab(tabs[currentIndex - 1]);
        }
      }
    }
  }, [gestureState, activeTab, viewport.isMobile]);

  // Mobile view
  if (viewport.isMobile) {
    return (
      <MobileDebateView
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentStrength={75}
        citationScore={3}
        round={2}
        maxRounds={5}
        timeRemaining={135}
      >
        {activeTab === "presentation" && <PresentationMode />}
        {activeTab === "debates" && <ImprovedDebateInterface />}
        {activeTab === "professor" && <ProfessorMode />}
        {activeTab === "settings" && <SettingsPanel />}
      </MobileDebateView>
    );
  }

  // Desktop view
  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header with back navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {translations.nav.backToHome}
            </Link>
          </Button>
        </div>

        {/* Main Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-learning bg-clip-text text-transparent mb-2">
            {translations.app.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {translations.app.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium">
              {translations.landing.beta}
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
              {translations.landing.aiIntegration}
            </div>
            {viewport.isStandalone && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-700 text-sm font-medium">
                {translations.landing.mobileApp}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "presentation" && (
          <div className="mt-6">
            <PresentationMode />
          </div>
        )}

        {activeTab === "debates" && (
          <div className="mt-6">
            <ImprovedDebateInterface />
          </div>
        )}

        {activeTab === "professor" && (
          <div className="mt-6">
            <ProfessorMode />
          </div>
        )}

        {activeTab === "settings" && (
          <div className="mt-6">
            <SettingsPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;