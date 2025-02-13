import { useNavigate, useLocation } from 'react-router-dom';
import { Activity, Brain, HeartPulse, BookOpen, Sparkles, Stethoscope, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const assessments = [
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => {
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
            )
          })}
        </div>
      </div>
    </div>
  );
}