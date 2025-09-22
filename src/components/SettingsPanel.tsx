import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Globe, 
  Moon, 
  Sun,
  Mic,
  Brain,
  Download,
  Upload,
  Trash2,
  Shield,
  Bell
} from 'lucide-react';
import { soundManager } from './SoundSystem';
import { translations } from '@/lib/translations';

interface SettingsData {
  // Audio Settings
  soundEnabled: boolean;
  voiceEnabled: boolean;
  volume: number;
  voiceSpeed: number;

  // Language & Accessibility
  language: string;
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  
  // AI Behavior
  aiDifficulty: 'beginner' | 'intermediate' | 'advanced';
  aiPersonality: 'formal' | 'friendly' | 'encouraging' | 'challenging';
  feedbackDetail: 'basic' | 'detailed' | 'comprehensive';
  
  // Privacy & Data
  dataCollection: boolean;
  personalizedLearning: boolean;
  sessionRecording: boolean;
  
  // Notifications
  practiceReminders: boolean;
  achievementNotifications: boolean;
}

const defaultSettings: SettingsData = {
  soundEnabled: true,
  voiceEnabled: true,
  volume: 70,
  voiceSpeed: 1,
  language: 'lt',
  theme: 'system',
  fontSize: 'medium',
  aiDifficulty: 'intermediate',
  aiPersonality: 'encouraging',
  feedbackDetail: 'detailed',
  dataCollection: true,
  personalizedLearning: true,
  sessionRecording: false,
  practiceReminders: true,
  achievementNotifications: true
};

export const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('echo-debate-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const updateSetting = <K extends keyof SettingsData>(
    key: K, 
    value: SettingsData[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);

    // Apply some settings immediately
    if (key === 'soundEnabled') {
      soundManager.setEnabled(value as boolean);
    }
    if (key === 'volume') {
      // Update volume immediately for preview
      soundManager.setEnabled(settings.soundEnabled);
    }
  };

  const saveSettings = () => {
    localStorage.setItem('echo-debate-settings', JSON.stringify(settings));
    setHasUnsavedChanges(false);
    soundManager.success();
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    setHasUnsavedChanges(true);
    soundManager.click();
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'echo-debate-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    soundManager.success();
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setSettings({ ...defaultSettings, ...imported });
        setHasUnsavedChanges(true);
        soundManager.success();
      } catch (error) {
        console.error('Error importing settings:', error);
        soundManager.error();
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-learning bg-clip-text text-transparent">
            {translations.common.settings}
          </h2>
          <p className="text-muted-foreground">
            Pritaikykite Echo Debate pagal savo poreikius
          </p>
        </div>
        
        {hasUnsavedChanges && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-orange-600 border-orange-600">
              Neišsaugoti pakeitimai
            </Badge>
            <Button onClick={saveSettings} size="sm">
              Išsaugoti
            </Button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Audio & Voice Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Garso nustatymai
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-enabled">Garso efektai</Label>
              <Switch
                id="sound-enabled"
                checked={settings.soundEnabled}
                onCheckedChange={(value) => updateSetting('soundEnabled', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="voice-enabled">Balso funkcijos</Label>
              <Switch
                id="voice-enabled"
                checked={settings.voiceEnabled}
                onCheckedChange={(value) => updateSetting('voiceEnabled', value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Garso lygis: {settings.volume}%</Label>
              <Slider
                value={[settings.volume]}
                onValueChange={(value) => updateSetting('volume', value[0])}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Balso greitis: {settings.voiceSpeed}x</Label>
              <Slider
                value={[settings.voiceSpeed]}
                onValueChange={(value) => updateSetting('voiceSpeed', value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Language & Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Kalba ir ekranas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Kalba</Label>
              <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lt">Lietuvių</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tema</Label>
              <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Šviesi</SelectItem>
                  <SelectItem value="dark">Tamsi</SelectItem>
                  <SelectItem value="system">Sistemos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Šrifto dydis</Label>
              <Select value={settings.fontSize} onValueChange={(value) => updateSetting('fontSize', value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Mažas</SelectItem>
                  <SelectItem value="medium">Vidutinis</SelectItem>
                  <SelectItem value="large">Didelis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* AI Behavior */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI elgesys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Sunkumo lygis</Label>
              <Select value={settings.aiDifficulty} onValueChange={(value) => updateSetting('aiDifficulty', value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Pradedantieji</SelectItem>
                  <SelectItem value="intermediate">Vidutinis</SelectItem>
                  <SelectItem value="advanced">Pažengę</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>AI asmenybė</Label>
              <Select value={settings.aiPersonality} onValueChange={(value) => updateSetting('aiPersonality', value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formali</SelectItem>
                  <SelectItem value="friendly">Draugiška</SelectItem>
                  <SelectItem value="encouraging">Skatinanti</SelectItem>
                  <SelectItem value="challenging">Iššūkius kelianti</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Grįžtamojo ryšio detalumas</Label>
              <Select value={settings.feedbackDetail} onValueChange={(value) => updateSetting('feedbackDetail', value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Pagrindiniai</SelectItem>
                  <SelectItem value="detailed">Išsamūs</SelectItem>
                  <SelectItem value="comprehensive">Visapusiškai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privatumas ir duomenys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="data-collection">Duomenų rinkimas</Label>
                <p className="text-xs text-muted-foreground">
                  Leisti rinkti anoniminius naudojimo duomenis
                </p>
              </div>
              <Switch
                id="data-collection"
                checked={settings.dataCollection}
                onCheckedChange={(value) => updateSetting('dataCollection', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="personalized-learning">Personalizuotas mokymasis</Label>
                <p className="text-xs text-muted-foreground">
                  AI prisitaikys prie jūsų mokymosi stiliaus
                </p>
              </div>
              <Switch
                id="personalized-learning"
                checked={settings.personalizedLearning}
                onCheckedChange={(value) => updateSetting('personalizedLearning', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="session-recording">Sesijų įrašymas</Label>
                <p className="text-xs text-muted-foreground">
                  Išsaugoti sesijas vėlesnei analizei
                </p>
              </div>
              <Switch
                id="session-recording"
                checked={settings.sessionRecording}
                onCheckedChange={(value) => updateSetting('sessionRecording', value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Pranešimai
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="practice-reminders">Praktikos priminimai</Label>
              <p className="text-xs text-muted-foreground">
                Gauti priminimus reguliariai praktikuotis
              </p>
            </div>
            <Switch
              id="practice-reminders"
              checked={settings.practiceReminders}
              onCheckedChange={(value) => updateSetting('practiceReminders', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="achievement-notifications">Pasiekimų pranešimai</Label>
              <p className="text-xs text-muted-foreground">
                Gauti pranešimus apie naujus pasiekimus
              </p>
            </div>
            <Switch
              id="achievement-notifications"
              checked={settings.achievementNotifications}
              onCheckedChange={(value) => updateSetting('achievementNotifications', value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Duomenų valdymas</CardTitle>
          <CardDescription>
            Eksportuokite, importuokite arba iš naujo nustatykite savo nustatymus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={exportSettings} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Eksportuoti nustatymus
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <label htmlFor="import-settings" className="cursor-pointer">
                <Upload className="h-4 w-4" />
                Importuoti nustatymus
                <input
                  id="import-settings"
                  type="file"
                  accept=".json"
                  onChange={importSettings}
                  className="hidden"
                />
              </label>
            </Button>
            
            <Button onClick={resetSettings} variant="outline" className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-4 w-4" />
              Atkurti nustatymus
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes */}
      {hasUnsavedChanges && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium">Turite neišsaugotų pakeitimų</p>
              <p className="text-sm text-muted-foreground">
                Nepamirškite išsaugoti savo nustatymų pakeitimų
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={resetSettings} variant="outline" size="sm">
                Atšaukti
              </Button>
              <Button onClick={saveSettings} size="sm">
                Išsaugoti pakeitimus
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};