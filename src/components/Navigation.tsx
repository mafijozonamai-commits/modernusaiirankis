import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Presentation, MessageSquare, GraduationCap, Settings, Volume2 } from "lucide-react";
import { SoundToggle } from "@/components/SoundSystem";
import { translations } from "@/lib/translations";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {

  return (
    <div className="w-full">
      {/* Main Navigation Header with Sound Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Echo Debate</span>
          </div>
        </div>
        <SoundToggle />
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card shadow-card">
          <TabsTrigger 
            value="presentation" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
          >
            <Presentation className="w-4 h-4" />
            <span className="hidden sm:inline">{translations.app.tabs.presentation}</span>
            <span className="sm:hidden">Pr.</span>
          </TabsTrigger>
          <TabsTrigger 
            value="debates"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">{translations.app.tabs.debates}</span>
            <span className="sm:hidden">Deb.</span>
          </TabsTrigger>
          <TabsTrigger 
            value="professor"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">{translations.app.tabs.professor}</span>
            <span className="sm:hidden">Prof.</span>
          </TabsTrigger>
          <TabsTrigger 
            value="settings"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">{translations.app.tabs.settings}</span>
            <span className="sm:hidden">Nust.</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Navigation;