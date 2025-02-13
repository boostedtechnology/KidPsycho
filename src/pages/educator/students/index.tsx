import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockStudents = [
  {
    id: 1,
    name: 'Alex Smith',
    grade: '3rd Grade',
    lastObservation: '2 days ago',
    status: 'Needs Review',
    recentProgress: 'Showing improvement in reading comprehension',
    subjects: ['Reading', 'Mathematics'],
    supportNeeds: 'Additional time for assignments'
  },
  {
    id: 2,
    name: 'Emma Johnson',
    grade: '2nd Grade',
    lastObservation: '1 week ago',
    status: 'On Track',
    recentProgress: 'Consistent performance in all subjects',
    subjects: ['Science', 'Writing'],
    supportNeeds: 'Visual learning aids'
  },
  {
    id: 3,
    name: 'Michael Chen',
    grade: '3rd Grade',
    lastObservation: '3 days ago',
    status: 'Needs Review',
    recentProgress: 'Struggling with math concepts',
    subjects: ['Mathematics', 'Reading'],
    supportNeeds: 'One-on-one math tutoring'
  },
  {
    id: 4,
    name: 'Sofia Rodriguez',
    grade: '2nd Grade',
    lastObservation: '5 days ago',
    status: 'On Track',
    recentProgress: 'Excellent participation in group activities',
    subjects: ['Social Studies', 'Art'],
    supportNeeds: 'None currently'
  },
  {
    id: 5,
    name: 'William Taylor',
    grade: '3rd Grade',
    lastObservation: '1 week ago',
    status: 'Needs Review',
    recentProgress: 'Improved social interactions',
    subjects: ['Reading', 'Social Studies'],
    supportNeeds: 'Social skills support'
  },
  {
    id: 6,
    name: 'Olivia Brown',
    grade: '2nd Grade',
    lastObservation: '4 days ago',
    status: 'On Track',
    recentProgress: 'Strong performance in mathematics',
    subjects: ['Mathematics', 'Science'],
    supportNeeds: 'Advanced materials needed'
  }
];

export function StudentList() {
  const navigate = useNavigate();

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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Students</h1>
              <p className="mt-1 text-sm text-gray-500">
                View and manage all student records
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search students..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white shadow rounded-lg">
          <ul className="divide-y divide-gray-200">
            {mockStudents.map((student) => (
              <li key={student.id} className="px-6 py-5 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-lg">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm text-gray-500">
                            {student.grade}
                          </p>
                          <span className="text-sm text-gray-500">•</span>
                          <p className="text-sm text-gray-500">
                            Last Observation: {student.lastObservation}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Recent Progress:</span> {student.recentProgress}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Support Needs:</span> {student.supportNeeds}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Focus Subjects:</span> {student.subjects.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      student.status === 'Needs Review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {student.status}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/student/${student.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}