import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Target, Clock, CheckCircle, XCircle, Zap, BookOpen } from 'lucide-react';
import { soundManager } from './SoundSystem';
import { translations } from '@/lib/translations';

interface PracticeExercise {
  id: string;
  type: 'fallacy' | 'quick-response' | 'evidence-analysis' | 'counter-argument';
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeLimit?: number; // in seconds
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  explanation: string;
  points: number;
}

interface PracticeModeProps {
  onComplete?: (score: number, exercisesCompleted: number) => void;
}

const PRACTICE_EXERCISES: PracticeExercise[] = [
  {
    id: 'fallacy-1',
    type: 'fallacy',
    title: 'Nustatykite klaidą',
    description: 'Aptikite loginius klaidingumus argumentuose',
    difficulty: 'beginner',
    timeLimit: 30,
    question: '"Visi perka naują išmanųjį telefoną, todėl jis turbūt yra geriausias."',
    options: [
      'Ad Hominem',
      'Bandwagon klaidingumas',
      'Straw Man',
      'Klaidinga dilema'
    ],
    correctAnswer: 1,
    explanation: 'Tai yra Bandwagon klaidingumas - argumentavimas, kad kažkas yra tiesa ar gerai, nes daugelis žmonių tuo tiki ar taip daro.',
    points: 10
  },
  {
    id: 'quick-response-1',
    type: 'quick-response',
    title: 'Greitas kontrargumentas',
    description: 'Sukurkite greitą atsakymą į priešingą nuomonę',
    difficulty: 'intermediate',
    timeLimit: 45,
    question: 'Priešingo argumento: "Namų darbai turėtų būti uždrausti, nes sukelia stresą ir atima šeimos laiką."',
    explanation: 'Geri kontrargumentai galėtų sutelkti dėmesį į: mokymosi stiprinimą, laiko valdymo įgūdžius, akademinį pasiruošimą arba subalansuoto požiūrio sprendimus.',
    points: 15
  },
  {
    id: 'evidence-1',
    type: 'evidence-analysis',
    title: 'Įrodymų vertinimas',
    description: 'Įvertinkite įrodymų stiprumą',
    difficulty: 'intermediate',
    timeLimit: 60,
    question: 'Įvertinkite šį įrodymą: "50 vidurinės mokyklos mokinių tyrimas parodė, kad 80% renkasi nuotolinį mokymąsi."',
    options: [
      'Labai stiprus - didelė imtis, aiškūs rezultatai',
      'Vidutiniškai stiprus - geras procentas, ribota imtis',
      'Silpnas - maža imtis, galimas šališkumas',
      'Neteisingas - nepakanka informacijos'
    ],
    correctAnswer: 2,
    explanation: 'Šis įrodymas yra silpnas dėl mažos imties dydžio (50 mokinių) ir galimo atrankos šališkumo. Stipresnis tyrimas reikalautų didesnės, įvairesnės imties.',
    points: 15
  },
  {
    id: 'fallacy-2',
    type: 'fallacy',
    title: 'Pažangus klaidingumo aptikimas',
    description: 'Nustatykite subtilias logines klaidas',
    difficulty: 'advanced',
    timeLimit: 45,
    question: '"Mano oponentas pasisako už atsinaujinančią energiją, bet jis vairuoja benzininį automobilį, todėl jo argumentas neteisingas."',
    options: [
      'Tu Quoque (Tu irgi)',
      'Ad Hominem',
      'Straw Man',
      'Kreipimasis į autoritetą'
    ],
    correctAnswer: 0,
    explanation: 'Tai yra Tu Quoque klaidingumas - argumento atmetimas nurodant veidmainystę, o ne nagrinėjant argumento turinį.',
    points: 20
  },
  {
    id: 'counter-argument-1',
    type: 'counter-argument',
    title: 'Sukurkite kontrargumentą',
    description: 'Konstruokite loginius priešingus argumentus',
    difficulty: 'advanced',
    timeLimit: 90,
    question: 'Pradinis argumentas: "Socialiniai tinklai turėtų būti reguliuojami, nes skleidžia dezinformaciją ir kenkia psichikos sveikatai."',
    explanation: 'Stiprūs kontrargumentai galėtų paliesti: žodžio laisvės principus, platformų savireguliaciją, naudotojų švietimą, vyriausybės perdėto įsitraukimo rūpesčius ar poveikį inovacijoms.',
    points: 25
  }
];

export const PracticeMode: React.FC<PracticeModeProps> = ({ onComplete }) => {
  const [currentExercise, setCurrentExercise] = useState<PracticeExercise | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userResponse, setUserResponse] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(0);
  const [exercisePool, setExercisePool] = useState<PracticeExercise[]>([]);

  useEffect(() => {
    // Shuffle exercises for variety
    const shuffled = [...PRACTICE_EXERCISES].sort(() => Math.random() - 0.5);
    setExercisePool(shuffled);
    setCurrentExercise(shuffled[0]);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleTimeUp();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startExercise = () => {
    if (!currentExercise) return;
    
    setTimeLeft(currentExercise.timeLimit || 60);
    setIsActive(true);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setUserResponse('');
    soundManager.roundStart();
  };

  const handleTimeUp = () => {
    setIsActive(false);
    setShowExplanation(true);
    soundManager.timeWarning();
  };

  const submitAnswer = () => {
    if (!currentExercise) return;

    setIsActive(false);
    setShowExplanation(true);

    let isCorrect = false;
    let earnedPoints = 0;

    if (currentExercise.type === 'fallacy' || currentExercise.type === 'evidence-analysis') {
      isCorrect = selectedAnswer === currentExercise.correctAnswer;
    } else {
      // For open-ended questions, give points based on response length and effort
      isCorrect = userResponse.trim().length > 20;
    }

    if (isCorrect) {
      earnedPoints = currentExercise.points;
      setScore(prev => prev + earnedPoints);
      soundManager.success();
    } else {
      soundManager.error();
    }
  };

  const nextExercise = () => {
    const nextIndex = exerciseIndex + 1;
    setCompletedExercises(prev => prev + 1);

    if (nextIndex >= exercisePool.length) {
      // Practice session complete
      onComplete?.(score, completedExercises + 1);
      return;
    }

    setExerciseIndex(nextIndex);
    setCurrentExercise(exercisePool[nextIndex]);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setUserResponse('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return translations.debate.difficulty.beginner;
      case 'intermediate': return translations.debate.difficulty.intermediate;
      case 'advanced': return translations.debate.difficulty.advanced;
      default: return difficulty;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fallacy': return <Brain className="h-4 w-4" />;
      case 'quick-response': return <Zap className="h-4 w-4" />;
      case 'evidence-analysis': return <BookOpen className="h-4 w-4" />;
      case 'counter-argument': return <Target className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  if (!currentExercise) {
    return (
      <Card className="p-6 text-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p>{translations.common.loading}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {getTypeIcon(currentExercise.type)}
            <div>
              <h2 className="font-bold">{currentExercise.title}</h2>
              <p className="text-sm text-muted-foreground">{currentExercise.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getDifficultyColor(currentExercise.difficulty)}>
              {getDifficultyText(currentExercise.difficulty)}
            </Badge>
            <Badge variant="outline">
              {currentExercise.points} pts
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{translations.analytics.progress}: {exerciseIndex + 1}/{exercisePool.length}</span>
            <span>Taškai: {score}</span>
          </div>
          <Progress value={((exerciseIndex + 1) / exercisePool.length) * 100} />
        </div>
      </Card>

      {/* Timer */}
      {isActive && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            <span className="font-bold text-yellow-800">
              Liko laiko: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </Card>
      )}

      {/* Exercise Content */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-lg font-medium mb-4">{currentExercise.question}</p>
          </div>

          {/* Multiple Choice Options */}
          {currentExercise.options && !showExplanation && (
            <div className="space-y-2">
              {currentExercise.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => setSelectedAnswer(index)}
                  disabled={!isActive}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          )}

          {/* Text Response */}
          {(currentExercise.type === 'quick-response' || currentExercise.type === 'counter-argument') && !showExplanation && (
            <Textarea
              placeholder="Įveskite savo atsakymą čia..."
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              disabled={!isActive}
              className="min-h-[120px]"
            />
          )}

          {/* Action Buttons */}
          {!isActive && !showExplanation && (
            <Button onClick={startExercise} className="w-full">
              Pradėti pratybą
            </Button>
          )}

          {isActive && !showExplanation && (
            <Button 
              onClick={submitAnswer} 
              className="w-full"
              disabled={
                (currentExercise.options && selectedAnswer === null) ||
                (!currentExercise.options && userResponse.trim().length === 0)
              }
            >
              {translations.debate.submit}
            </Button>
          )}

          {/* Explanation */}
          {showExplanation && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {currentExercise.options && selectedAnswer === currentExercise.correctAnswer ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Correct! +{currentExercise.points} points</span>
                    </>
                  ) : currentExercise.options && selectedAnswer !== currentExercise.correctAnswer ? (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-800">Incorrect</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Response submitted! +{currentExercise.points} points</span>
                    </>
                  )}
                </div>
                
                <div className="text-sm">
                  <p className="font-medium mb-2">Paaiškinimas:</p>
                  <p className="text-muted-foreground">{currentExercise.explanation}</p>
                </div>

                <Button onClick={nextExercise} className="w-full">
                  {exerciseIndex + 1 >= exercisePool.length ? 'Užbaigti pratybą' : 'Kita pratybą'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};