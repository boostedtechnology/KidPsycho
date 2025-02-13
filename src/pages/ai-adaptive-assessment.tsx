import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Brain, Heart, Star, Sparkles, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

// Types for our assessment components
interface AssessmentQuestion {
  id: string;
  type: 'emotion' | 'pattern' | 'memory';
  difficulty: number;
  content: any;
}

// Mock emotion recognition game data
const emotionQuestions = [
  {
    id: 'emotion-1',
    type: 'emotion',
    difficulty: 1,
    content: {
      scenario: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      question: "How do you think this child is feeling?",
      options: [
        { value: 'happy', label: 'Happy', emoji: '😊' },
        { value: 'sad', label: 'Sad', emoji: '😢' },
        { value: 'excited', label: 'Excited', emoji: '🤗' },
        { value: 'worried', label: 'Worried', emoji: '😟' }
      ],
      correct: 'happy'
    }
  }
];

// Mock pattern recognition game data
const patternQuestions = [
  {
    id: 'pattern-1',
    type: 'pattern',
    difficulty: 1,
    content: {
      sequence: ['🔵', '🔴', '🔵', '🔴', '❓'],
      options: ['🔵', '🔴', '⭐', '💜'],
      correct: '🔵'
    }
  }
];

// Mock memory game data
const memoryQuestions = [
  {
    id: 'memory-1',
    type: 'memory',
    difficulty: 1,
    content: {
      images: [
        '🐶', '🐱', '🐰', '🐨',
        '🐶', '🐱', '🐰', '🐨'
      ],
      size: 4
    }
  }
];

export function AIAdaptiveAssessment() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameState, setGameState] = useState({
    currentGame: 'emotion',
    difficulty: 1,
    progress: 0
  });

  // Memory game state
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardClick = (index: number) => {
    if (isProcessing || flippedCards.includes(index) || matchedPairs.includes(index)) {
      return;
    }

    if (flippedCards.length === 0) {
      setFlippedCards([index]);
    } else if (flippedCards.length === 1) {
      setIsProcessing(true);
      setFlippedCards([...flippedCards, index]);

      const firstCard = memoryQuestions[0].content.images[flippedCards[0]];
      const secondCard = memoryQuestions[0].content.images[index];

      if (firstCard === secondCard) {
        setMatchedPairs([...matchedPairs, flippedCards[0], index]);
        setScore(score + 10);
        setFlippedCards([]);
        setIsProcessing(false);

        if (matchedPairs.length + 2 === memoryQuestions[0].content.images.length) {
          celebrate();
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              progress: prev.progress + 1
            }));
          }, 1500);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  const celebrate = () => {
    setShowCelebration(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const renderEmotionGame = () => {
    const question = emotionQuestions[0];
    return (
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Emotion Recognition</h2>
        <div className="space-y-6">
          <img
            src={question.content.scenario}
            alt="Emotion scenario"
            className="w-full h-64 object-cover rounded-lg"
          />
          <p className="text-lg text-gray-700">{question.content.question}</p>
          <div className="grid grid-cols-2 gap-4">
            {question.content.options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  if (option.value === question.content.correct) {
                    setScore(score + 10);
                    celebrate();
                  }
                  setGameState(prev => ({
                    ...prev,
                    currentGame: 'pattern',
                    progress: prev.progress + 1
                  }));
                }}
                className="p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="text-4xl mb-2">{option.emoji}</div>
                <div className="text-gray-900 font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPatternGame = () => {
    const question = patternQuestions[0];
    return (
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pattern Recognition</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4 text-4xl mb-8">
            {question.content.sequence.map((item, index) => (
              <div
                key={index}
                className={`w-16 h-16 flex items-center justify-center rounded-lg ${
                  item === '❓' ? 'bg-gray-100 border-2 border-dashed border-gray-300' : ''
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {question.content.options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  if (option === question.content.correct) {
                    setScore(score + 10);
                    celebrate();
                  }
                  setGameState(prev => ({
                    ...prev,
                    currentGame: 'memory',
                    progress: prev.progress + 1
                  }));
                }}
                className="p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-4xl"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMemoryGame = () => {
    const question = memoryQuestions[0];
    
    return (
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Memory Match</h2>
        <div className="grid grid-cols-4 gap-4">
          {question.content.images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`w-24 h-24 rounded-lg flex items-center justify-center text-4xl ${
                flippedCards.includes(index) || matchedPairs.includes(index)
                  ? 'bg-white border-2 border-blue-500'
                  : 'bg-blue-500'
              } transition-all transform hover:scale-105`}
            >
              {flippedCards.includes(index) || matchedPairs.includes(index) ? image : '❓'}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderCompletionScreen = () => (
    <div className="bg-white rounded-lg p-8 shadow-lg text-center">
      <Award className="h-24 w-24 mx-auto mb-6 text-yellow-400" />
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Amazing Job!</h2>
      <p className="text-xl text-gray-600 mb-8">
        You've completed all the activities with a score of {score} points!
      </p>
      <div className="space-y-4">
        <Button
          onClick={() => navigate('/assessment/new/type')}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          Try Another Assessment
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="w-full"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="mr-4"
                onClick={() => navigate('/assessment/new/type')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Interactive Assessment</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Let's learn and have fun together!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-indigo-100 rounded-full">
                <span className="text-indigo-600 font-medium">Score: {score}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-600">{gameState.progress}/3</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${(gameState.progress / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Game Area */}
        <div className="relative">
          {gameState.progress < 3 ? (
            <>
              {gameState.currentGame === 'emotion' && renderEmotionGame()}
              {gameState.currentGame === 'pattern' && renderPatternGame()}
              {gameState.currentGame === 'memory' && renderMemoryGame()}
            </>
          ) : (
            renderCompletionScreen()
          )}

          {/* Celebration Overlay */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <div className="text-center text-white">
                <Award className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-2xl font-bold mb-2">Great Job!</h3>
                <p>You're doing amazing!</p>
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        {gameState.progress < 3 && (
          <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-gray-600">
              <Sparkles className="h-5 w-5 mr-2 text-indigo-500" />
              <p className="text-sm">
                Complete each activity to unlock the next challenge. Have fun!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}