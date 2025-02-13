import { useNavigate, useParams } from 'react-router-dom';
import { Activity, ArrowLeft, Brain, CheckCircle2, HelpCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for the ADHD assessment results
const mockAssessmentData = {
  childName: 'Alex Smith',
  age: 8,
  assessmentDate: '2024-02-15',
  assessmentType: 'ADHD',
  overallScore: 75,
  previousScore: 68,
  improvement: true,
  status: 'Completed',
  provider: 'Dr. Sarah Wilson',
  nextSteps: 'Schedule follow-up appointment',
  domains: [
    {
      name: 'Attention',
      score: 72,
      previousScore: 65,
      improvement: true,
      details: 'Shows improvement in sustained attention tasks'
    },
    {
      name: 'Hyperactivity',
      score: 68,
      previousScore: 75,
      improvement: true,
      details: 'Decreased restlessness during structured activities'
    },
    {
      name: 'Impulsivity',
      score: 70,
      previousScore: 65,
      improvement: true,
      details: 'Better control in turn-taking situations'
    },
    {
      name: 'Executive Function',
      score: 65,
      previousScore: 60,
      improvement: true,
      details: 'Improved organization and planning skills'
    }
  ],
  timeline: [
    { date: '2023-08-15', score: 60 },
    { date: '2023-10-15', score: 65 },
    { date: '2023-12-15', score: 68 },
    { date: '2024-02-15', score: 75 }
  ],
  comorbidities: [
    { condition: 'Anxiety', percentage: 28 },
    { condition: 'Learning Difficulties', percentage: 15 },
    { condition: 'Sleep Issues', percentage: 12 }
  ],
  recommendations: [
    {
      category: 'Behavioral Strategies',
      items: [
        'Implement structured daily routines',
        'Use visual schedules and reminders',
        'Break tasks into smaller, manageable steps'
      ]
    },
    {
      category: 'Educational Support',
      items: [
        'Preferential seating near teacher',
        'Extended time for assignments',
        'Regular breaks during long tasks'
      ]
    },
    {
      category: 'Home Support',
      items: [
        'Establish consistent homework routine',
        'Create a quiet study space',
        'Use positive reinforcement system'
      ]
    }
  ]
};

export function ProfessionalAssessmentDetails() {
  const navigate = useNavigate();
  const { type } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ADHD Assessment Results</h1>
              <p className="mt-1 text-sm text-gray-500">
                Detailed analysis and recommendations for {mockAssessmentData.childName}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Overall Score</p>
                <p className="text-2xl font-semibold text-gray-900">{mockAssessmentData.overallScore}%</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{mockAssessmentData.overallScore - mockAssessmentData.previousScore}% improvement
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Brain className="h-8 w-8 text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Assessment Status</p>
                <p className="text-lg font-semibold text-gray-900">{mockAssessmentData.status}</p>
                <p className="text-sm text-gray-500">{mockAssessmentData.assessmentDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Next Steps</p>
                <p className="text-lg font-semibold text-gray-900">{mockAssessmentData.nextSteps}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HelpCircle className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Provider</p>
                <p className="text-lg font-semibold text-gray-900">{mockAssessmentData.provider}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Domain Scores */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Domain Analysis</h2>
                <div className="space-y-6">
                  {mockAssessmentData.domains.map((domain) => (
                    <div key={domain.name} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-900">{domain.name}</h3>
                        <span className="text-sm font-medium text-gray-500">
                          Score: {domain.score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-blue-600 rounded-full h-2"
                          style={{ width: `${domain.score}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className={domain.improvement ? 'text-green-600' : 'text-red-600'}>
                          ↑ from {domain.previousScore}%
                        </span>
                        <span className="text-gray-500">{domain.details}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-lg shadow mt-8">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Progress Timeline</h2>
                <div className="h-64 relative">
                  <div className="absolute inset-0">
                    {/* Grid lines */}
                    <div className="grid grid-cols-1 grid-rows-4 h-full">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="border-t border-gray-200" />
                      ))}
                    </div>

                    {/* Data points and line */}
                    <div className="absolute inset-0 flex items-end justify-between px-4">
                      {mockAssessmentData.timeline.map((point, index, array) => {
                        const nextPoint = array[index + 1];
                        return (
                          <div key={point.date} className="relative flex flex-col items-center" style={{ height: '100%' }}>
                            {/* Data point */}
                            <div
                              className="absolute bg-blue-600 w-3 h-3 rounded-full"
                              style={{ bottom: `${point.score}%` }}
                            />

                            {/* Line to next point */}
                            {nextPoint && (
                              <div
                                className="absolute bg-blue-400 h-0.5"
                                style={{
                                  bottom: `${point.score}%`,
                                  width: '100%',
                                  transform: `rotate(${Math.atan2(
                                    nextPoint.score - point.score,
                                    100
                                  )}rad)`,
                                  transformOrigin: 'left bottom'
                                }}
                              />
                            )}

                            {/* Date label */}
                            <span className="absolute bottom-0 transform -translate-y-6 text-sm text-gray-500">
                              {new Date(point.date).toLocaleDateString('en-US', {
                                month: 'short',
                                year: '2-digit'
                              })}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations and Comorbidities */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h2>
                <div className="space-y-6">
                  {mockAssessmentData.recommendations.map((rec) => (
                    <div key={rec.category}>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">{rec.category}</h3>
                      <ul className="space-y-2">
                        {rec.items.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Associated Conditions</h2>
                <div className="space-y-4">
                  {mockAssessmentData.comorbidities.map((condition) => (
                    <div key={condition.condition}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {condition.condition}
                        </span>
                        <span className="text-sm text-gray-500">
                          {condition.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 rounded-full h-2"
                          style={{ width: `${condition.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Need Support?</h2>
              <p className="text-sm text-gray-600 mb-4">
                Our team is here to help you understand the results and implement recommendations.
              </p>
              <Button
                className="w-full"
                onClick={() => navigate('/support')}
              >
                Contact Support Team
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
