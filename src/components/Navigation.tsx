import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Presentation, MessageSquare, GraduationCap, Settings, Volume2 } from "lucide-react";
import { SoundToggle } from "@/components/SoundSystem";
import GlassCard from "@/components/ui/glass-card";
import { translations } from "@/lib/translations";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Navigation Header with Sound Toggle */}
      <div className="flex items-center justify-between mb-6">
        <motion.div 
          className="flex items-center gap-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Echo Debate</span>
          </div>
        </motion.div>
        <SoundToggle />
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass-morphism shadow-card">
          {[
            { value: "presentation", icon: Presentation, label: translations.app.tabs.presentation, shortLabel: "Pr." },
            { value: "debates", icon: MessageSquare, label: translations.app.tabs.debates, shortLabel: "Deb." },
            { value: "professor", icon: GraduationCap, label: translations.app.tabs.professor, shortLabel: "Prof." },
            { value: "settings", icon: Settings, label: translations.app.tabs.settings, shortLabel: "Nust." }
          ].map((tab) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default Navigation;