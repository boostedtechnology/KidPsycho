import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, MessageCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockPatient = {
  id: 'alex-smith',
  name: 'Alex Smith',
  age: 8,
  dateOfBirth: '2016-03-15',
  parent: 'Sarah Smith',
  assessments: [
    {
      id: 1,
      type: 'ADHD Assessment',
      date: '2024-02-10',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Behavioral Assessment',
      date: '2024-01-15',
      status: 'In Progress'
    }
  ],
  appointments: [
    {
      id: 1,
      date: '2024-02-20',
      time: '10:00 AM',
      type: 'Follow-up Session'
    }
  ]
};

export function PatientProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100">
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
              <h1 className="text-2xl font-bold text-gray-900">{mockPatient.name}</h1>
              <p className="mt-1 text-sm text-gray-500">Patient Profile</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Patient Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="mt-1 text-sm text-gray-900">{mockPatient.age} years old</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                <dd className="mt-1 text-sm text-gray-900">{mockPatient.dateOfBirth}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Parent/Guardian</dt>
                <dd className="mt-1 text-sm text-gray-900">{mockPatient.parent}</dd>
              </div>
            </dl>
          </div>

          {/* Recent Assessments */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Assessments</h2>
            <div className="space-y-4">
              {mockPatient.assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/assessment/${assessment.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{assessment.type}</h3>
                      <p className="text-sm text-gray-500">{assessment.date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      assessment.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {assessment.status}
                    </span>
                  </div>
                </div>
              ))}
              <Button
                className="w-full mt-4"
                onClick={() => navigate('/assessment/new')}
              >
                New Assessment
              </Button>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {mockPatient.appointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{appointment.type}</h3>
                      <p className="text-sm text-gray-500">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                className="w-full mt-4"
                onClick={() => navigate('/schedule')}
              >
                Schedule Appointment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}