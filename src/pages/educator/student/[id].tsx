import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, ClipboardList, User, BookOpen, Clock, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockStudents = {
  1: {
    id: 1,
    name: 'Alex Smith',
    grade: '3rd Grade',
    age: 8,
    description: 'Alex is an enthusiastic learner who shows particular interest in science and mathematics. He demonstrates strong problem-solving skills but occasionally needs support with reading comprehension.',
    lastObservation: '2 days ago',
    status: 'On Track',
    recentProgress: 'Showing improvement in reading comprehension',
    subjects: ['Reading', 'Mathematics'],
    supportNeeds: 'Additional time for assignments',
    image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    observations: [
      {
        id: 1,
        date: '2024-02-15',
        type: 'Classroom Behavior',
        notes: 'Demonstrated improved focus during morning reading sessions. Participated actively in group discussions.',
        observer: 'Ms. Johnson'
      },
      {
        id: 2,
        date: '2024-02-10',
        type: 'Academic Progress',
        notes: 'Completed math assignment with 90% accuracy. Shows strong understanding of multiplication concepts.',
        observer: 'Mr. Davis'
      }
    ]
  },
  2: {
    id: 2,
    name: 'Emma Johnson',
    grade: '2nd Grade',
    age: 7,
    description: 'Emma is a creative and engaged student who excels in artistic activities. She shows strong communication skills and helps her peers, though sometimes needs support with mathematical concepts.',
    lastObservation: '8 days ago',
    status: 'Needs Observation',
    recentProgress: 'Consistent performance in all subjects',
    subjects: ['Science', 'Writing'],
    supportNeeds: 'Visual learning aids',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    observations: [
      {
        id: 1,
        date: '2024-02-07',
        type: 'Group Work',
        notes: 'Excellent leadership in science group project. Helped organize team and present findings.',
        observer: 'Ms. Johnson'
      },
      {
        id: 2,
        date: '2024-02-01',
        type: 'Writing Assessment',
        notes: 'Wrote a creative story with strong character development. Grammar and punctuation are improving.',
        observer: 'Mr. Wilson'
      }
    ]
  },
};

const getObservationStatus = (lastObservationDate: string) => {
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // one week in milliseconds
  const lastObservation = new Date(lastObservationDate);
  const now = new Date();
  const timeDiff = now.getTime() - lastObservation.getTime();
  
  return timeDiff > oneWeek ? 'Needs Observation' : 'On Track';
};

export function StudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const student = mockStudents[Number(id)];

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Student not found</h2>
          <Button
            onClick={() => navigate('/educator')}
            className="mt-4"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4"
              onClick={() => navigate('/educator')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <p className="mt-1 text-sm text-gray-500">Student Profile</p>
            </div>
            <Button
              onClick={() => navigate(`/observations/new?student=${student.id}`)}
              className="ml-4 flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Observation
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Student Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
                  <div className="mt-1 flex items-center">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">{student.age} years old</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <BookOpen className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">{student.grade}</span>
                  </div>
                  <p className="mt-4 text-gray-600">{student.description}</p>
                </div>
              </div>
            </div>

            {/* Recent Observations */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Recent Observations</h3>
                <Button
                  onClick={() => navigate(`/observations/new?student=${student.id}`)}
                  variant="outline"
                  className="flex items-center"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Observation
                </Button>
              </div>
              <div className="space-y-6">
                {student.observations.map((observation) => (
                  <div key={observation.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-500">{observation.date}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-500">{observation.observer}</span>
                    </div>
                    <h4 className="text-base font-medium text-gray-900 mt-2">{observation.type}</h4>
                    <p className="mt-2 text-gray-600">{observation.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Focus Subjects</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {student.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Support Needs</h4>
                  <p className="mt-1 text-sm text-gray-900">{student.supportNeeds}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Recent Progress</h4>
                  <p className="mt-1 text-sm text-gray-900">{student.recentProgress}</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Current Status</h4>
                  <span className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    getObservationStatus(student.lastObservation) === 'Needs Observation'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {getObservationStatus(student.lastObservation)}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Last Observation</h4>
                  <p className="mt-1 text-sm text-gray-900">{student.lastObservation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}