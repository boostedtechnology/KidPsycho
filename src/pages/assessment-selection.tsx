import { useNavigate, useLocation } from 'react-router-dom';
import { Activity, Brain, HeartPulse, BookOpen, Sparkles, Stethoscope, ArrowLeft, Notebook as Robot, Gamepad } from 'lucide-react';
import { Button } from '@/components/ui/button';

const assessments = [
  {
    id: 'ai-adaptive',
    title: 'AI-Powered Interactive Assessment',
    description: 'Engaging, child-friendly assessment that adapts in real-time using advanced AI technology',
    icon: Robot,
    color: 'indigo',
    features: [
      'Interactive games and activities',
      'Real-time difficulty adjustment',
      'Visual and audio guidance',
      'Child-friendly interface'
    ]
  },
  {
    id: 'adhd',
    title: 'ADHD Assessment',
    description: 'Comprehensive ADHD screening with behavioral and attention metrics',
    icon: Activity,
    color: 'blue'
  },
  {
    id: 'autism',
    title: 'Autism Spectrum Assessment',
    description: 'Detailed evaluation for Autism Spectrum Disorder (ASD)',
    icon: Brain,
    color: 'purple'
  },
  {
    id: 'developmental',
    title: 'Developmental Assessment',
    description: 'General developmental milestones and progress tracking',
    icon: HeartPulse,
    color: 'pink'
  },
  {
    id: 'learning',
    title: 'Learning Disability Assessment',
    description: 'Evaluation of specific learning challenges and needs',
    icon: BookOpen,
    color: 'green'
  },
  {
    id: 'behavioral',
    title: 'Behavioral Assessment',
    description: 'Analysis of behavioral patterns and concerns',
    icon: Sparkles,
    color: 'yellow'
  },
  {
    id: 'medical',
    title: 'Medical Assessment',
    description: 'General health and medical history evaluation',
    icon: Stethoscope,
    color: 'red'
  }
];

const colorClasses = {
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100',
  blue: 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100',
  purple: 'bg-purple-50 border-purple-200 text-purple-600 hover:bg-purple-100',
  pink: 'bg-pink-50 border-pink-200 text-pink-600 hover:bg-pink-100',
  green: 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100',
  yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600 hover:bg-yellow-100',
  red: 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
};

export function AssessmentSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const childId = new URLSearchParams(location.search).get('childId');

  if (!childId) {
    navigate('/assessment/new');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => navigate('/assessment/new')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Select an Assessment Type</h1>
            <p className="mt-2 text-lg text-gray-600">
              Choose the most appropriate assessment type for your child's needs
            </p>
          </div>
        </div>

        {/* Featured AI Assessment */}
        <div className="mb-8">
          <div className="p-6 rounded-xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Robot className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-bold text-gray-900">AI-Powered Interactive Assessment</h3>
                  <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-600 rounded-full">New</span>
                </div>
                <p className="mt-2 text-gray-600">
                  An engaging, child-friendly assessment that adapts in real-time using advanced AI technology. 
                  Your child interacts directly with fun activities while our AI personalizes the experience.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Gamepad className="h-5 w-5 text-indigo-500" />
                    <span className="text-sm text-gray-600">Interactive games and activities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-indigo-500" />
                    <span className="text-sm text-gray-600">Adaptive difficulty levels</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HeartPulse className="h-5 w-5 text-indigo-500" />
                    <span className="text-sm text-gray-600">Child-friendly interface</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    <span className="text-sm text-gray-600">Real-time personalization</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    onClick={() => navigate(`/assessment/ai-adaptive?childId=${childId}`)}
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Start Interactive Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.slice(1).map((assessment) => {
            const Icon = assessment.icon;
            return (
              <button
                key={assessment.id}
                onClick={() => navigate(`/assessment/${assessment.id}?childId=${childId}`)}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  colorClasses[assessment.color]
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{assessment.title}</h3>
                    <p className="text-sm opacity-90">{assessment.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}