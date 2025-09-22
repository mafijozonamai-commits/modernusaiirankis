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
    <div className="min-h-screen bg-gradient-background overflow-x-hidden">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="orb-effect w-72 h-72 -top-36 -left-36 animate-float" style={{animationDelay: '0s'}}></div>
        <div className="orb-effect w-48 h-48 top-1/3 -right-24 animate-float" style={{animationDelay: '3s'}}></div>
        <div className="orb-effect w-60 h-60 bottom-1/3 left-1/5 animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Header with back navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button asChild variant="outline" size="sm" className="glass-morphism shadow-card morph-button">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {translations.nav.backToHome}
            </Link>
          </Button>
        </div>

        {/* Main Header */}
        <div className="text-center mb-12 animate-slideInUp">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-gradient">
            {translations.app.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            {translations.app.subtitle}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold shadow-floating">
              {translations.landing.beta}
            </div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-glow border-0">
              {translations.landing.aiIntegration}
            </div>
            {viewport.isStandalone && (
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-semibold shadow-floating">
                {translations.landing.mobileApp}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Content Container */}
        <div className="mt-8 animate-slideInUp" style={{animationDelay: '0.4s'}}>
          {activeTab === "presentation" && (
            <div className="glass-morphism rounded-2xl p-6 shadow-floating">
              <PresentationMode />
            </div>
          )}

          {activeTab === "debates" && (
            <div className="glass-morphism rounded-2xl p-6 shadow-floating">
              <ImprovedDebateInterface />
            </div>
          )}

          {activeTab === "professor" && (
            <div className="glass-morphism rounded-2xl p-6 shadow-floating">
              <ProfessorMode />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="glass-morphism rounded-2xl p-6 shadow-floating">
              <SettingsPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;