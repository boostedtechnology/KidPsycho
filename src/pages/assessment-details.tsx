import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Brain, Activity, TrendingUp, AlertCircle, CheckCircle2, HelpCircle, BookOpen, Play, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

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
      details: 'Shows improvement in sustained attention tasks',
      history: [
        { date: '2023-09', score: 60 },
        { date: '2023-10', score: 63 },
        { date: '2023-11', score: 67 },
        { date: '2023-12', score: 69 },
        { date: '2024-01', score: 70 },
        { date: '2024-02', score: 72 }
      ],
      recommendations: [
        'Use timer-based activities',
        'Break tasks into smaller segments',
        'Implement regular breaks'
      ],
      resources: [
        { title: 'Attention Strategies Guide', type: 'PDF', link: '#' },
        { title: 'Focus Training Video', type: 'Video', link: '#' },
        { title: 'Interactive Attention Tools', type: 'Interactive', link: '#' }
      ]
    },
    {
      name: 'Hyperactivity',
      score: 68,
      previousScore: 75,
      improvement: true,
      details: 'Decreased restlessness during structured activities',
      history: [
        { date: '2023-09', score: 55 },
        { date: '2023-10', score: 58 },
        { date: '2023-11', score: 62 },
        { date: '2023-12', score: 64 },
        { date: '2024-01', score: 66 },
        { date: '2024-02', score: 68 }
      ],
      recommendations: [
        'Regular physical activity',
        'Structured movement breaks',
        'Calming techniques practice'
      ],
      resources: [
        { title: 'Movement Strategy Guide', type: 'PDF', link: '#' },
        { title: 'Calming Exercises Video', type: 'Video', link: '#' },
        { title: 'Activity Planning Tools', type: 'Interactive', link: '#' }
      ]
    },
    {
      name: 'Impulsivity',
      score: 70,
      previousScore: 65,
      improvement: true,
      details: 'Better control in turn-taking situations',
      history: [
        { date: '2023-09', score: 58 },
        { date: '2023-10', score: 60 },
        { date: '2023-11', score: 63 },
        { date: '2023-12', score: 65 },
        { date: '2024-01', score: 68 },
        { date: '2024-02', score: 70 }
      ],
      recommendations: [
        'Practice waiting techniques',
        'Use visual timers',
        'Reward self-control moments'
      ],
      resources: [
        { title: 'Impulse Control Guide', type: 'PDF', link: '#' },
        { title: 'Self-regulation Video', type: 'Video', link: '#' },
        { title: 'Behavior Tracking Tools', type: 'Interactive', link: '#' }
      ]
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
  ]
};

function getDomainIcon(domainName: string) {
  switch (domainName.toLowerCase()) {
    case 'attention':
      return Brain;
    case 'hyperactivity':
      return Activity;
    case 'impulsivity':
      return AlertCircle;
    default:
      return HelpCircle;
  }
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AssessmentDetails() {
  const navigate = useNavigate();
  const { type } = useParams();

  // Prepare data for the comparison chart
  const comparisonData = mockAssessmentData.domains.map(domain => ({
    name: domain.name,
    score: domain.score,
    average: domain.previousScore
  }));

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
              <h1 className="text-2xl font-bold text-gray-900">Assessment Results</h1>
              <p className="mt-1 text-sm text-gray-500">
                {mockAssessmentData.assessmentType} Assessment for {mockAssessmentData.childName}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {mockAssessmentData.domains.map((domain) => (
            <div key={domain.name} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{domain.name}</h3>
                  <p className="text-sm text-gray-500">{domain.details}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-gray-900">{domain.score}%</p>
                  <p className={`text-sm ${domain.improvement ? 'text-green-600' : 'text-red-600'}`}>
                    {domain.improvement ? '↑' : '↓'} from {domain.previousScore}%
                  </p>
                </div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={domain.history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* Domain Comparison Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Domain Comparison</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar name="Current Score" dataKey="score" fill="#3b82f6" />
                <Bar name="Previous Score" dataKey="average" fill="#94a3b8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Recommendations */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Recommendations</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockAssessmentData.domains.map((domain) => {
              const Icon = getDomainIcon(domain.name);
              return (
                <div 
                  key={domain.name} 
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-900">{domain.name}</h3>
                  </div>
                  <ul className="space-y-3 mb-4">
                    {domain.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{rec}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Resources</h4>
                    <div className="space-y-2">
                      {domain.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.link}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md p-2 transition-colors"
                        >
                          {resource.type === 'PDF' ? (
                            <BookOpen className="h-4 w-4 mr-2" />
                          ) : resource.type === 'Video' ? (
                            <Play className="h-4 w-4 mr-2" />
                          ) : (
                            <Target className="h-4 w-4 mr-2" />
                          )}
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Associated Conditions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Associated Conditions</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
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

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/schedule')}
          >
            Schedule Follow-up
          </Button>
          <Button
            onClick={() => navigate('/find-specialists')}
          >
            Find Specialists
          </Button>
        </div>
      </main>
    </div>
  );
}