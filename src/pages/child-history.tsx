import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Activity, Brain, Calendar, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data - in a real app, this would come from your database
const mockChildData = {
  'alex-smith': {
    name: 'Alex Smith',
    age: 8,
    dateOfBirth: '2016-02-15',
    assessments: [
      {
        id: 1,
        type: 'ADHD Screening',
        date: '2024-02-15',
        status: 'Completed',
        score: 75,
        trend: 'improving',
        provider: 'Dr. Sarah Wilson'
      },
      {
        id: 2,
        type: 'Behavioral Assessment',
        date: '2024-02-01',
        status: 'Completed',
        score: 82,
        trend: 'stable',
        provider: 'Dr. Michael Chen'
      },
      {
        id: 3,
        type: 'Development Screening',
        date: '2023-12-15',
        status: 'Completed',
        score: 70,
        trend: 'improving',
        provider: 'Dr. Emily Thompson'
      }
    ],
    appointments: [
      {
        id: 1,
        type: 'Follow-up Consultation',
        date: '2024-02-25',
        time: '10:00 AM',
        provider: 'Dr. Sarah Wilson',
        status: 'Scheduled'
      },
      {
        id: 2,
        type: 'Regular Check-up',
        date: '2024-03-15',
        time: '2:30 PM',
        provider: 'Dr. Michael Chen',
        status: 'Scheduled'
      }
    ]
  },
  'emma-smith': {
    name: 'Emma Smith',
    age: 6,
    dateOfBirth: '2018-05-20',
    assessments: [
      {
        id: 4,
        type: 'Developmental Assessment',
        date: '2024-02-10',
        status: 'Completed',
        score: 88,
        trend: 'improving',
        provider: 'Dr. Lisa Anderson'
      }
    ],
    appointments: []
  }
};

export function ChildHistory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const child = id ? mockChildData[id as keyof typeof mockChildData] : null;

  if (!child) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Child Not Found</h1>
          <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{child.name}</h1>
              <p className="mt-1 text-sm text-gray-500">
                {child.age} years old • Born {new Date(child.dateOfBirth).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Activity className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Total Assessments</p>
                <p className="text-2xl font-semibold text-gray-900">{child.assessments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Latest Score</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {child.assessments[0]?.score || 'N/A'}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Next Appointment</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {child.appointments[0]?.date || 'None'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Assessment History */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Assessment History</h2>
                <Button
                  onClick={() => navigate(`/assessment/new?childId=${id}`)}
                  className="flex items-center"
                >
                  Start New Assessment
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {child.assessments.map((assessment) => (
                  <div
                    key={assessment.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{assessment.type}</h3>
                        <p className="text-sm text-gray-500">
                          {assessment.date} • {assessment.provider}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <span className="text-lg font-semibold text-gray-900">{assessment.score}%</span>
                          {assessment.trend === 'improving' && (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <span className={`text-sm ${
                          assessment.trend === 'improving' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {assessment.trend === 'improving' ? 'Improving' : 'Stable'}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/assessment/${assessment.id}/details`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                <Button
                  onClick={() => navigate('/schedule')}
                  variant="outline"
                >
                  Schedule Appointment
                </Button>
              </div>
            </div>
            <div className="p-6">
              {child.appointments.length > 0 ? (
                <div className="space-y-4">
                  {child.appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.type}</h3>
                        <p className="text-sm text-gray-500">
                          {appointment.date} at {appointment.time} • {appointment.provider}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/appointment/${appointment.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No upcoming appointments scheduled
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}