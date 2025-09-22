import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  MessageSquare, 
  Brain, 
  CheckCircle, 
  XCircle,
  Clock,
  Award,
  Star,
  Mic,
  Send
} from 'lucide-react';
import { VoiceInput } from './VoiceInput';
import { soundManager } from './SoundSystem';
import { translations } from '@/lib/translations';

interface Question {
  id: string;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  expectedPoints: string[];
}

interface Answer {
  questionId: string;
  answer: string;
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  timestamp: Date;
}

const predefinedTopics = [
  'Klimato kaita ir aplinkos apsauga',
  'Dirbtinis intelektas ir technologijos',
  'Socialinė nelygybė',
  'Švietimo sistemos reforma',
  'Sveikatos apsaugos politika',
  'Ekonomikos plėtra ir darbo rinka',
  'Demokratija ir pilietinė visuomenė',
  'Kultūros paveldas ir globalizacija'
];

export const ProfessorMode: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [useVoice, setUseVoice] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const mockQuestions: Question[] = [
    {
      id: '1',
      question: 'Kaip manote, kokios yra pagrindinės klimato kaitos pasekmės Lietuvoje ir kaip valstybė turėtų su jomis kovoti?',
      difficulty: 'medium',
      topic: 'Klimato kaita ir aplinkos apsauga',
      expectedPoints: ['Temperatūros kilimas', 'Ekstremali orai', 'Žemės ūkio poveikis', 'Atsinaujinanti energija', 'Anglies neutralumas']
    },
    {
      id: '2', 
      question: 'Ar dirbtinis intelektas kelia grėsmę darbo rinkai? Pagrįskite savo nuomonę konkrečiais argumentais.',
      difficulty: 'hard',
      topic: 'Dirbtinis intelektas ir technologijos',
      expectedPoints: ['Automatizacija', 'Nauji darbo vietos', 'Perkvalifikavimas', 'Ekonominis poveikis', 'Etikos klausimai']
    },
    {
      id: '3',
      question: 'Kokie yra pagrindiniai Lietuvos švietimo sistemos iššūkiai ir kaip juos spręsti?',
      difficulty: 'easy',
      topic: 'Švietimo sistemos reforma',
      expectedPoints: ['Mokytojų trūkumas', 'Infrastruktūra', 'Skaitmenizacija', 'Finansavimas', 'Kokybės užtikrinimas']
    }
  ];

  const generateQuestion = async (topic: string) => {
    setIsLoading(true);
    
    // Mock AI question generation
    setTimeout(() => {
      const topicQuestions = mockQuestions.filter(q => 
        topic === 'custom' ? true : q.topic === topic
      );
      
      const randomQuestion = topicQuestions[Math.floor(Math.random() * topicQuestions.length)];
      setCurrentQuestion(randomQuestion);
      setQuestionCount(prev => prev + 1);
      setIsLoading(false);
      soundManager.roundStart();
    }, 2000);
  };

  const startSession = () => {
    const topic = selectedTopic === 'custom' ? customTopic : selectedTopic;
    if (!topic) return;

    setSessionStarted(true);
    setQuestionCount(0);
    setAnswers([]);
    setSessionScore(0);
    generateQuestion(selectedTopic);
  };

  const endSession = () => {
    setSessionStarted(false);
    setCurrentQuestion(null);
    setShowFeedback(true);
    soundManager.roundEnd();
  };

  const submitAnswer = async () => {
    if (!currentAnswer.trim() || !currentQuestion) return;

    setIsLoading(true);

    // Mock AI evaluation
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60; // Score between 60-100
      const feedback = generateFeedback(score);
      
      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        answer: currentAnswer,
        score,
        feedback: feedback.general,
        strengths: feedback.strengths,
        improvements: feedback.improvements,
        timestamp: new Date()
      };

      setAnswers(prev => [...prev, newAnswer]);
      setSessionScore(prev => prev + score);
      setCurrentAnswer('');
      setIsLoading(false);
      
      if (score >= 80) {
        soundManager.success();
      } else if (score >= 70) {
        soundManager.achievement();
      } else {
        soundManager.click();
      }

      // Generate next question or end session
      if (questionCount >= 3) {
        endSession();
      } else {
        setTimeout(() => {
          generateQuestion(selectedTopic);
        }, 1000);
      }
    }, 3000);
  };

  const generateFeedback = (score: number) => {
    const strengths = ['Aiškus argumentavimas', 'Geri pavyzdžiai', 'Logiškas mąstymas'];
    const improvements = ['Daugiau konkrečių faktų', 'Platesnis požiūris', 'Struktūruotesnė išdėstymas'];

    return {
      general: score >= 80 
        ? 'Puikus atsakymas! Pademonstravote gilų temos supratimą.' 
        : score >= 70 
        ? 'Geras atsakymas, bet galėtumėte pateikti daugiau detalių.'
        : 'Atsakymas turi pagrindą, tačiau reikalingi patobulinimai.',
      strengths: strengths.slice(0, Math.min(3, Math.ceil(score / 30))),
      improvements: improvements.slice(0, Math.min(3, Math.ceil((100 - score) / 25)))
    };
  };

  const handleVoiceTranscription = (text: string) => {
    setCurrentAnswer(prev => prev + ' ' + text);
  };

  const averageScore = answers.length > 0 ? Math.round(sessionScore / answers.length) : 0;

  if (showFeedback) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-learning bg-clip-text text-transparent mb-2">
            {translations.professor.feedback}
          </h2>
          <p className="text-muted-foreground">Sesijos rezultatai</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Bendras vertinimas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{averageScore}/100</div>
              <Badge variant={averageScore >= 80 ? "default" : averageScore >= 70 ? "secondary" : "outline"}>
                {averageScore >= 80 ? "Puiku!" : averageScore >= 70 ? "Gerai" : "Reikia tobulėti"}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    {translations.professor.strengths}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {Array.from(new Set(answers.flatMap(a => a.strengths))).map((strength, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    {translations.professor.improvements}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {Array.from(new Set(answers.flatMap(a => a.improvements))).map((improvement, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-orange-500" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button onClick={() => {
                setShowFeedback(false);
                setSelectedTopic('');
                setCustomTopic('');
              }}>
                Pradėti naują sesiją
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!sessionStarted) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-learning bg-clip-text text-transparent mb-2">
            {translations.professor.title}
          </h2>
          <p className="text-muted-foreground">
            {translations.professor.subtitle}
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              {translations.professor.topic}
            </CardTitle>
            <CardDescription>
              {translations.professor.selectTopic}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Pasirinkite temą..." />
              </SelectTrigger>
              <SelectContent>
                {predefinedTopics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
                <SelectItem value="custom">{translations.professor.customTopic}</SelectItem>
              </SelectContent>
            </Select>

            {selectedTopic === 'custom' && (
              <Input
                placeholder="Įveskite savo temą..."
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
              />
            )}

            <Button 
              onClick={startSession}
              disabled={!selectedTopic || (selectedTopic === 'custom' && !customTopic.trim())}
              className="w-full"
            >
              {translations.professor.startSession}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Profesoriaus sesija</h2>
          <p className="text-muted-foreground">
            Klausimas {questionCount}/3 • Vidutinis įvertinimas: {averageScore}%
          </p>
        </div>
        <Button onClick={endSession} variant="outline">
          {translations.professor.endSession}
        </Button>
      </div>

      <Progress value={(questionCount / 3) * 100} className="w-full" />

      {/* Current Question */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            {translations.professor.question} {questionCount}
          </CardTitle>
          {currentQuestion && (
            <Badge variant="outline" className="w-fit">
              {currentQuestion.difficulty === 'easy' ? 'Lengvas' : 
               currentQuestion.difficulty === 'medium' ? 'Vidutinis' : 'Sunkus'}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Profesorius ruošia klausimą...</p>
            </div>
          ) : currentQuestion ? (
            <div className="space-y-4">
              <p className="text-lg font-medium">{currentQuestion.question}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant={useVoice ? "default" : "outline"}
                    onClick={() => setUseVoice(!useVoice)}
                    size="sm"
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    {useVoice ? 'Balso režimas' : 'Įjungti balsą'}
                  </Button>
                </div>

                {useVoice ? (
                  <VoiceInput 
                    onTranscription={handleVoiceTranscription}
                    language="lt-LT"
                  />
                ) : (
                  <Textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Įveskite savo atsakymą..."
                    rows={6}
                  />
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Simbolių: {currentAnswer.length}
                  </span>
                  <Button 
                    onClick={submitAnswer}
                    disabled={!currentAnswer.trim() || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Vertinama...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Pateikti atsakymą
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Previous Answers */}
      {answers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Ankstesni atsakymai</h3>
          {answers.map((answer, index) => (
            <Card key={answer.questionId}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Klausimas {index + 1}</CardTitle>
                  <Badge variant={answer.score >= 80 ? "default" : answer.score >= 70 ? "secondary" : "outline"}>
                    {answer.score}/100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{answer.feedback}</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-medium text-green-600 mb-1">Stipriosios pusės:</p>
                    <ul className="space-y-1">
                      {answer.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-orange-600 mb-1">Tobulintina:</p>
                    <ul className="space-y-1">
                      {answer.improvements.map((improvement, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Brain className="h-3 w-3 text-orange-600" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};