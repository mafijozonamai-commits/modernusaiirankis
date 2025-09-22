import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Send, Bot, Brain, Clock, BarChart3, Zap, Settings, Camera, Mic, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import debateClassroomBg from "@/assets/debate-classroom-bg.jpg";
import aiOpponentAvatar from "@/assets/ai-opponent-avatar.jpg";

// Import all components
import CameraCapture from "./CameraCapture";
import DebateTimer from "./DebateTimer";
import PerformanceAnalytics from "./PerformanceAnalytics";
import { VoiceSystem } from "./VoiceSystem";
import { BodyLanguageAnalyzer } from "./BodyLanguageAnalyzer";
import { openRouterService, AIPersonality, AI_PERSONALITIES, DebateContext } from "@/lib/openrouter";

interface DebateMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  feedback?: string;
  score?: number;
}

const debateTopics = [
  { topic: "Ar mokyklose turėtų būti draudžiami telefonai?", difficulty: "beginner" },
  { topic: "Ar moksleiviams turėtų būti leista rinktis dalykus laisvai?", difficulty: "intermediate" },
  { topic: "Ar namų darbai turėtų būti panaikinti?", difficulty: "beginner" },
  { topic: "Ar mokyklos uniforma turėtų būti privaloma?", difficulty: "intermediate" },
  { topic: "Ar mokyklose turėtų būti dėstoma programavimos?", difficulty: "advanced" },
  { topic: "Ar dirbtinis intelektas keičia švietimo sistemos ateitis?", difficulty: "advanced" },
  { topic: "Ar socialiniai tinklai daro neigiamą poveikį jaunimui?", difficulty: "intermediate" }
];

const ImprovedDebateInterface = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedPersonality, setSelectedPersonality] = useState<AIPersonality>(AI_PERSONALITIES[0]);
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [round, setRound] = useState(0);
  const [debateStarted, setDebateStarted] = useState(false);
  const [userPosition, setUserPosition] = useState<'pro' | 'con'>('pro');
  const [responseTime, setResponseTime] = useState(0);
  const [activeTab, setActiveTab] = useState("setup");
  
  // Advanced features state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'error'>('connected');
  
  const { toast } = useToast();

  // Analytics data
  const [analytics] = useState({
    totalDebates: 12,
    winRate: 78,
    averageResponseTime: 45,
    strengthAreas: ["Loginė struktūra", "Įrodymų naudojimas", "Aiškus išreiškimas"],
    improvementAreas: ["Kontrargumentai", "Laiko valdymas"],
    currentStreak: 5,
    topicMastery: [
      { topic: "Mokyklos technologijos", score: 85 },
      { topic: "Švietimo politika", score: 72 },
      { topic: "Moksleivių teisės", score: 68 }
    ]
  });

  const handleTimeUp = () => {
    if (debateStarted && round <= 5) {
      toast({
        title: "Laikas baigėsi!",
        description: "Pereikite prie kito argumento",
        variant: "default"
      });
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setVoiceTranscript(text);
    setCurrentResponse(prev => prev + " " + text);
  };

  const handleSpeakText = (text: string) => {
    // This will be handled by the VoiceSystem component
    console.log("Speaking:", text);
  };

  const startDebate = async () => {
    if (!selectedTopic) {
      toast({
        title: "Pasirinkite temą",
        description: "Prašome pasirinkti debatų temą",
        variant: "destructive"
      });
      return;
    }
    
    setDebateStarted(true);
    setRound(1);
    setIsLoading(true);
    setResponseTime(Date.now());
    setConnectionStatus('connecting');
    setActiveTab("debate");
    
    // Show premium AI notification
    toast({
      title: "🚀 Premium AI Activated",
      description: "Using Claude Opus for intelligent debate responses",
      duration: 3000,
    });

    try {
      const context: DebateContext = {
        topic: selectedTopic,
        position: userPosition === 'pro' ? 'con' : 'pro',
        round: 1,
        previousArguments: [],
        userPosition
      };

      const aiResponse = await openRouterService.generateOpeningStatement(
        selectedTopic,
        context.position,
        selectedPersonality
      );

      const aiMessage: DebateMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages([aiMessage]);
      setConnectionStatus('connected');
      
      // Speak the AI response
      handleSpeakText(aiResponse);
      
      toast({
        title: "Debatai pradėti!",
        description: `Jūs ginsite ${userPosition === 'pro' ? 'už' : 'prieš'} poziciją`,
      });
    } catch (error) {
      setConnectionStatus('error');
      toast({
        title: "Klaida",
        description: "Nepavyko pradėti debatų. Bandykite dar kartą.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendResponse = async () => {
    if (!currentResponse.trim()) return;

    const responseEndTime = Date.now();
    const timeTaken = Math.round((responseEndTime - responseTime) / 1000);

    const userMessage: DebateMessage = {
      id: Date.now().toString(),
      sender: 'user', 
      content: currentResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentResponse("");
    setVoiceTranscript("");
    setIsLoading(true);
    setConnectionStatus('connecting');

    try {
      const context: DebateContext = {
        topic: selectedTopic,
        position: userPosition === 'pro' ? 'con' : 'pro',
        round,
        previousArguments: messages.map(m => m.content),
        userPosition
      };

      const [aiResponse, feedback, strengthAnalysis] = await Promise.all([
        openRouterService.generateDebateResponse(context, currentResponse, selectedPersonality),
        openRouterService.generateFeedback(currentResponse, selectedTopic, round),
        openRouterService.analyzeArgumentStrength(currentResponse, selectedTopic, userPosition)
      ]);

      const aiMessage: DebateMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      const updatedUserMessage = { 
        ...userMessage, 
        feedback: `${feedback} | Stiprumas: ${strengthAnalysis.score}/100 - ${strengthAnalysis.analysis}`, 
        score: strengthAnalysis.score 
      };
      
      setMessages(prev => [
        ...prev.slice(0, -1),
        updatedUserMessage,
        aiMessage
      ]);
      
      setRound(prev => prev + 1);
      setResponseTime(Date.now());
      setConnectionStatus('connected');
      
      // Speak the AI response
      handleSpeakText(aiResponse);

    } catch (error) {
      setConnectionStatus('error');
      toast({
        title: "Klaida",
        description: "Nepavyko gauti AI atsakymo. Bandykite dar kartą.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetDebate = () => {
    setDebateStarted(false);
    setMessages([]);
    setRound(0);
    setCurrentResponse("");
    setVoiceTranscript("");
    setActiveTab("setup");
    setConnectionStatus('connected');
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="container mx-auto max-w-7xl space-y-6">
        
        {/* Header with Connection Status */}
        <Card className="shadow-card glass-morphism border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-primary shadow-button">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-learning bg-clip-text text-transparent">
                    Skaitmeninis Debatų Treneris
                  </h1>
                  <p className="text-muted-foreground text-lg">Tobulinkite savo argumentavimo įgūdžius su AI pagalba</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge 
                  variant={connectionStatus === 'connected' ? 'default' : connectionStatus === 'connecting' ? 'secondary' : 'destructive'}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full shadow-button transition-all duration-300 ${
                    connectionStatus === 'connected' ? 'bg-gradient-primary text-white' :
                    connectionStatus === 'connecting' ? 'bg-gradient-to-r from-warning to-warning/80 text-white' :
                    'bg-gradient-to-r from-destructive to-destructive/80 text-white'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full pulse-ring ${
                    connectionStatus === 'connected' ? 'bg-white' : 
                    connectionStatus === 'connecting' ? 'bg-white' : 'bg-white'
                  }`} />
                  {connectionStatus === 'connected' ? 'Claude Opus Ready' : 
                   connectionStatus === 'connecting' ? 'Generating...' : 'Connection Error'}
                </Badge>
                {connectionStatus === 'connected' && (
                  <Badge className="bg-gradient-to-r from-accent to-accent/80 text-white px-4 py-2 rounded-full shadow-button floating-animation">
                    ✨ Premium AI
                  </Badge>
                )}
                {debateStarted && (
                  <Badge variant="outline" className="px-4 py-2 rounded-full border-2 border-primary text-primary font-semibold">
                    Round {round}/5
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          {/* Main Debate Area */}
          <div className="xl:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 p-2 bg-gradient-card rounded-2xl shadow-card">
                <TabsTrigger 
                  value="setup" 
                  disabled={debateStarted}
                  className="rounded-xl px-6 py-3 font-medium transition-all duration-300 data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-button"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Nustatymai
                </TabsTrigger>
                <TabsTrigger 
                  value="debate"
                  className="rounded-xl px-6 py-3 font-medium transition-all duration-300 data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-button"
                >
                  <Bot className="h-5 w-5 mr-2" />
                  Debatai
                </TabsTrigger>
                <TabsTrigger 
                  value="analysis"
                  className="rounded-xl px-6 py-3 font-medium transition-all duration-300 data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-button"
                >
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Analizė
                </TabsTrigger>
                <TabsTrigger 
                  value="camera"
                  className="rounded-xl px-6 py-3 font-medium transition-all duration-300 data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-button"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Kamera
                </TabsTrigger>
              </TabsList>

              {/* Setup Tab */}
              <TabsContent value="setup" className="space-y-6 mt-6">
                <Card className="shadow-card glass-morphism border-0 overflow-hidden">
                  <div className="h-2 bg-gradient-primary"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold bg-gradient-learning bg-clip-text text-transparent">
                      Debatų Nustatymai
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8 p-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-base font-semibold text-foreground">Pasirinkite temą</label>
                        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                          <SelectTrigger className="h-14 px-4 rounded-xl border-2 border-border bg-gradient-card shadow-input transition-all duration-300 hover:border-primary focus:border-primary focus:shadow-glow">
                            <SelectValue placeholder="Pasirinkite debatų temą..." />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-0 shadow-card glass-morphism">
                            {debateTopics.map((topic, index) => (
                              <SelectItem key={index} value={topic.topic} className="rounded-lg m-1 transition-colors duration-200">
                                <div className="flex items-center justify-between w-full">
                                  <span className="font-medium">{topic.topic}</span>
                                  <Badge 
                                    variant={topic.difficulty === 'beginner' ? 'secondary' : 
                                            topic.difficulty === 'intermediate' ? 'default' : 'destructive'}
                                    className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold ${
                                      topic.difficulty === 'beginner' ? 'bg-gradient-to-r from-secondary to-secondary/80' :
                                      topic.difficulty === 'intermediate' ? 'bg-gradient-primary' : 
                                      'bg-gradient-to-r from-destructive to-destructive/80'
                                    } text-white`}
                                  >
                                    {topic.difficulty === 'beginner' ? 'Pradedantis' :
                                     topic.difficulty === 'intermediate' ? 'Vidutinis' : 'Pažengęs'}
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-base font-semibold text-foreground">AI Asmenybė</label>
                        <Select 
                          value={selectedPersonality.name} 
                          onValueChange={(value) => {
                            const personality = AI_PERSONALITIES.find(p => p.name === value);
                            if (personality) setSelectedPersonality(personality);
                          }}
                        >
                          <SelectTrigger className="h-14 px-4 rounded-xl border-2 border-border bg-gradient-card shadow-input transition-all duration-300 hover:border-primary focus:border-primary focus:shadow-glow">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-0 shadow-card glass-morphism">
                            {AI_PERSONALITIES.map((personality) => (
                              <SelectItem key={personality.name} value={personality.name} className="rounded-lg m-1 transition-colors duration-200">
                                <div className="py-2">
                                  <div className="font-semibold text-base">{personality.name}</div>
                                  <div className="text-sm text-muted-foreground mt-1">{personality.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-base font-semibold text-foreground">Jūsų pozicija</label>
                      <div className="flex gap-4">
                        <Button
                          variant={userPosition === 'pro' ? 'default' : 'outline'}
                          onClick={() => setUserPosition('pro')}
                          className={`flex-1 h-14 rounded-xl font-semibold text-base transition-all duration-300 ${
                            userPosition === 'pro' 
                              ? 'bg-gradient-primary text-white shadow-button hover:shadow-glow' 
                              : 'border-2 border-border bg-gradient-card hover:border-primary hover:bg-gradient-glow'
                          }`}
                        >
                          ✅ UŽ temą
                        </Button>
                        <Button
                          variant={userPosition === 'con' ? 'default' : 'outline'}
                          onClick={() => setUserPosition('con')}
                          className={`flex-1 h-14 rounded-xl font-semibold text-base transition-all duration-300 ${
                            userPosition === 'con' 
                              ? 'bg-gradient-primary text-white shadow-button hover:shadow-glow' 
                              : 'border-2 border-border bg-gradient-card hover:border-primary hover:bg-gradient-glow'
                          }`}
                        >
                          ❌ PRIEŠ temą
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center pt-6">
                      <Button 
                        onClick={startDebate}
                        disabled={!selectedTopic || isLoading}
                        className="px-12 py-4 text-lg font-bold bg-gradient-primary hover:bg-gradient-primary/90 text-white rounded-2xl shadow-button hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:shadow-none"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="mr-3 h-6 w-6 animate-spin" />
                            Kraunama...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-3 h-6 w-6" />
                            Pradėti Debatus
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Debate Tab */}
              <TabsContent value="debate">
                <div className="space-y-4">
                  {/* Visual Debate Area */}
                  <div 
                    className="relative min-h-[400px] rounded-xl overflow-hidden bg-gradient-background"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${debateClassroomBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Timer */}
                    <div className="absolute top-4 right-4 w-64">
                      <DebateTimer 
                        maxTime={120} 
                        onTimeUp={handleTimeUp}
                        isActive={debateStarted && !isLoading && round <= 5}
                      />
                    </div>

                    {/* Avatars */}
                    <div className="absolute inset-0 flex items-end justify-between p-8">
                      <div className="flex flex-col items-center space-y-2">
                        {userAvatar ? (
                          <img 
                            src={userAvatar} 
                            alt="Studentas" 
                            className="w-32 h-32 rounded-full object-cover shadow-avatar border-4 border-white"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-muted border-4 border-white shadow-avatar flex items-center justify-center">
                            <Camera className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <Badge variant="secondary" className="bg-white/90">
                          Jūs ({userPosition === 'pro' ? 'UŽ' : 'PRIEŠ'})
                        </Badge>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-2">
                        <img 
                          src={aiOpponentAvatar} 
                          alt="AI Oponentas" 
                          className="w-32 h-32 rounded-full object-cover shadow-avatar border-4 border-white"
                        />
                        <Badge variant="secondary" className="bg-white/90 flex items-center gap-1">
                          <Bot className="w-3 h-3" />
                          {selectedPersonality.name}
                        </Badge>
                      </div>
                    </div>

                    {/* Topic Overlay */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                      <Card className="bg-white/95 shadow-card">
                        <CardContent className="p-4">
                          <p className="font-semibold text-center mb-2">{selectedTopic}</p>
                          <div className="flex items-center justify-center gap-3">
                            {debateStarted && <Badge variant="outline">Raundas {round}/5</Badge>}
                            <Badge variant={selectedPersonality.difficulty === 'beginner' ? 'secondary' : 
                                          selectedPersonality.difficulty === 'intermediate' ? 'default' : 'destructive'}>
                              {selectedPersonality.difficulty === 'beginner' ? 'Pradedantis' :
                               selectedPersonality.difficulty === 'intermediate' ? 'Vidutinis' : 'Pažengęs'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <Card className="shadow-card">
                    <CardContent className="p-4">
                      <div className="space-y-4 max-h-60 overflow-y-auto">
                        {messages.length === 0 ? (
                          <p className="text-muted-foreground text-center py-8">
                            {debateStarted ? "Laukiama jūsų argumento..." : "Pradėkite debatus pasirinkę temą ir paspausdami 'Pradėti Debatus'"}
                          </p>
                        ) : (
                          messages.map((message) => (
                            <div 
                              key={message.id} 
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                                  message.sender === 'user' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-muted'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                {message.feedback && (
                                  <div className="mt-2 text-xs opacity-80">
                                    <strong>Grįžtamasis ryšys:</strong> {message.feedback}
                                  </div>
                                )}
                                {message.score && (
                                  <div className="mt-1">
                                    <Badge variant="secondary" className="text-xs">
                                      Įvertinimas: {message.score}/100
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Input Area */}
                  {debateStarted && (
                    <Card className="shadow-card">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Įveskite savo argumentą..."
                            value={currentResponse}
                            onChange={(e) => setCurrentResponse(e.target.value)}
                            className="min-h-[100px] resize-none"
                            disabled={isLoading || round > 5}
                          />
                          
                          {voiceTranscript && (
                            <Alert>
                              <Mic className="h-4 w-4" />
                              <AlertDescription>
                                Balso įrašas: "{voiceTranscript}"
                              </AlertDescription>
                            </Alert>
                          )}
                          
                          <div className="flex gap-2 justify-between items-center">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentResponse("")}
                              >
                                Išvalyti
                              </Button>
                              <Button
                                variant="outline" 
                                size="sm"
                                onClick={resetDebate}
                              >
                                Pradėti iš naujo
                              </Button>
                            </div>
                            
                            <Button 
                              onClick={sendResponse}
                              disabled={!currentResponse.trim() || isLoading || round > 5}
                              className="px-6"
                            >
                              {isLoading ? (
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Send className="mr-2 h-4 w-4" />
                              )}
                              Siųsti Argumentą
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Analysis Tab */}
              <TabsContent value="analysis">
                <PerformanceAnalytics data={analytics} />
              </TabsContent>

              {/* Camera Tab */}
              <TabsContent value="camera" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5" />
                        Kameros Įrašymas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CameraCapture 
                        onImageCapture={setUserAvatar}
                        captured={!!userAvatar}
                      />
                    </CardContent>
                  </Card>

                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>Kūno Kalbos Analizė</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BodyLanguageAnalyzer 
                        isActive={isCameraActive}
                        onToggle={() => setIsCameraActive(!isCameraActive)}
                        onFeedback={(feedback) => {
                          toast({
                            title: "Kūno kalbos analizė",
                            description: feedback,
                          });
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Side Panel */}
          <div className="xl:col-span-1 space-y-4">
            {/* Voice System */}
            <VoiceSystem
              onTranscript={handleVoiceTranscript}
              onSpeakText={handleSpeakText}
              isListening={isVoiceListening}
              setIsListening={setIsVoiceListening}
            />
            
            {/* Connection Status Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-sm">Sistemos Būsena</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>AI Jungtis:</span>
                  <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'}>
                    {connectionStatus === 'connected' ? 'Veikia' : 'Klaida'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Balso sistema:</span>
                  <Badge variant="secondary">
                    {isVoiceListening ? 'Klausoma' : 'Laukia'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Kamera:</span>
                  <Badge variant="secondary">
                    {isCameraActive ? 'Įjungta' : 'Išjungta'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovedDebateInterface;