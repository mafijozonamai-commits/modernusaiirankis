import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Send, Bot } from "lucide-react";
import debateClassroomBg from "@/assets/debate-classroom-bg.jpg";
import aiOpponentAvatar from "@/assets/ai-opponent-avatar.jpg";
import CameraCapture from "./CameraCapture";

interface DebateMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const debateTopics = [
  "Ar mokyklose turėtų būti draudžiami telefonai?",
  "Ar moksleiviams turėtų būti leista rinktis dalykus laisvai?",
  "Ar namų darbai turėtų būti panaikinti?",
  "Ar mokyklos uniforma turėtų būti privaloma?",
  "Ar mokyklose turėtų būti dėstoma programavimo?"
];

const DebateInterface = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [round, setRound] = useState(0);
  const [debateStarted, setDebateStarted] = useState(false);

  const startDebate = async () => {
    if (!selectedTopic || !userAvatar) return;
    
    setDebateStarted(true);
    setRound(1);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: DebateMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        content: selectedTopic.includes('telefonai') 
          ? "Telefonai mokyklose trukdo mokymosi procesui ir mažina mokinių dėmesį. Tyrimai rodo, kad mokyklos be telefonų turi geresnius akademinius rezultatus."
          : "Šis klausimas reikalauja rimto svarstymo, nes paveiks visų mokinių mokymosi kokybę ir ateities perspektyvas.",
        timestamp: new Date()
      };
      setMessages([aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const sendResponse = async () => {
    if (!currentResponse.trim()) return;

    const userMessage: DebateMessage = {
      id: Date.now().toString(),
      sender: 'user', 
      content: currentResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentResponse("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Jūsų argumentas turi pagrindą, tačiau nepamirškite, kad technologijos gali būti ir mokymosi priemonė, jei naudojamos tinkamai.",
        "Įdomus požiūris! Vis dėlto statistika rodo kitą vaizdą - mokyklos su griežtesnėmis taisyklėmis dažnai pasiekia geresnius rezultatus.",
        "Sutinku, kad yra išimčių, bet bendros tendencijos vis tiek rodo aiškų poveikį mokymosi aplinkai ir disciplinai.",
        "Puikus argumentas! Galbūt kompromisinis sprendimas būtų geriausia išeitis - ribota ir kontroliuojama technologijų integracija.",
        "Jūsų pozicija gerai pagrįsta. Ačiū už konstruktyvų debatą! Mokėjote išdėstyti savo argumentus aiškiai ir logiškai."
      ];

      const aiMessage: DebateMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: responses[Math.min(round, responses.length - 1)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setRound(prev => prev + 1);
      setIsLoading(false);
    }, 1200);
  };

  const restartDebate = () => {
    setDebateStarted(false);
    setMessages([]);
    setRound(0);
    setCurrentResponse("");
    setSelectedTopic("");
  };

  if (!debateStarted) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <CameraCapture 
            onImageCapture={setUserAvatar}
            captured={!!userAvatar}
          />
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Choose Debate Topic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a debate topic..." />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {debateTopics.map((topic, index) => (
                    <SelectItem key={index} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {userAvatar && (
                <div className="p-2 border rounded-lg">
                  <img 
                    src={userAvatar} 
                    alt="Your avatar" 
                    className="w-16 h-16 rounded-full object-cover mx-auto shadow-avatar"
                  />
                  <p className="text-sm text-center mt-2 text-muted-foreground">Your Avatar</p>
                </div>
              )}

              <Button 
                onClick={startDebate}
                disabled={!selectedTopic || !userAvatar}
                className="w-full bg-gradient-primary hover:bg-gradient-learning transition-smooth"
              >
                Start Debate
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Background Layer */}
      <div 
        className="relative min-h-[500px] rounded-xl overflow-hidden bg-gradient-background"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${debateClassroomBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Avatar Layer */}
        <div className="absolute inset-0 flex items-end justify-between p-8">
          <div className="flex flex-col items-center space-y-2">
            <img 
              src={userAvatar} 
              alt="Student" 
              className="w-32 h-32 rounded-full object-cover shadow-avatar border-4 border-white"
            />
            <Badge variant="secondary" className="bg-white/90">You</Badge>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <img 
              src={aiOpponentAvatar} 
              alt="AI Opponent" 
              className="w-32 h-32 rounded-full object-cover shadow-avatar border-4 border-white"
            />
            <Badge variant="secondary" className="bg-white/90 flex items-center gap-1">
              <Bot className="w-3 h-3" />
              AI Opponent
            </Badge>
          </div>
        </div>

        {/* Topic Overlay */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <Card className="bg-white/95 shadow-card">
            <CardContent className="p-4">
              <p className="font-semibold text-center">{selectedTopic}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="outline">Round {round}/5</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Debate Discussion</CardTitle>
            <Button 
              variant="outline" 
              onClick={restartDebate}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Restart
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-60 overflow-y-auto space-y-3 p-4 bg-muted/30 rounded-lg">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-gradient-primary text-primary-foreground' 
                      : 'bg-card border shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border shadow-sm p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {round <= 5 && (
            <div className="space-y-3">
              <Textarea
                value={currentResponse}
                onChange={(e) => setCurrentResponse(e.target.value)}
                placeholder="Type your argument or response here..."
                className="min-h-[80px] resize-none"
                disabled={isLoading}
              />
              <Button 
                onClick={sendResponse}
                disabled={!currentResponse.trim() || isLoading}
                className="w-full bg-gradient-primary hover:bg-gradient-learning transition-smooth"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Response
              </Button>
            </div>
          )}

          {round > 5 && (
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                Great debate! You've completed all 5 rounds. Click restart to try another topic.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DebateInterface;