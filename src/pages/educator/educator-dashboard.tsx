import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ClipboardList, Users2, Search, Activity, Bell, PlusCircle, BookOpen, Brain, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoleSwitcher } from '@/components/role-switcher';

const mockEducator = {
  name: 'Sarah Wilson',
  role: 'Lead Educator',
  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
};

const mockStudents = [
  {
    id: 1,
    name: 'Alex Smith',
    grade: '3rd Grade',
    age: 8,
    lastObservation: '2 days ago',
    status: 'On Track',
    recentProgress: 'Showing improvement in reading comprehension',
    subjects: ['Reading', 'Mathematics'],
    supportNeeds: 'Additional time for assignments',
    image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 2,
    name: 'Emma Johnson',
    grade: '2nd Grade',
    age: 7,
    lastObservation: '8 days ago',
    status: 'Needs Observation',
    recentProgress: 'Consistent performance in all subjects',
    subjects: ['Science', 'Writing'],
    supportNeeds: 'Visual learning aids',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 3,
    name: 'Michael Chen',
    grade: '3rd Grade',
    age: 8,
    lastObservation: '10 days ago',
    status: 'Needs Observation',
    recentProgress: 'Struggling with math concepts',
    subjects: ['Mathematics', 'Reading'],
    supportNeeds: 'One-on-one math tutoring',
    image: 'https://images.unsplash.com/photo-1545696968-1a5245650b36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 4,
    name: 'Sofia Rodriguez',
    grade: '2nd Grade',
    age: 7,
    lastObservation: '5 days ago',
    status: 'On Track',
    recentProgress: 'Excellent participation in group activities',
    subjects: ['Social Studies', 'Art'],
    supportNeeds: 'None currently',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 5,
    name: 'William Taylor',
    grade: '3rd Grade',
    age: 8,
    lastObservation: '9 days ago',
    status: 'Needs Observation',
    recentProgress: 'Improved social interactions',
    subjects: ['Reading', 'Social Studies'],
    supportNeeds: 'Social skills support',
    image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 6,
    name: 'Olivia Brown',
    grade: '2nd Grade',
    age: 7,
    lastObservation: '4 days ago',
    status: 'On Track',
    recentProgress: 'Strong performance in mathematics',
    subjects: ['Mathematics', 'Science'],
    supportNeeds: 'Advanced materials needed',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 7,
    name: 'Lucas Martinez',
    grade: '3rd Grade',
    age: 8,
    lastObservation: '6 days ago',
    status: 'On Track',
    recentProgress: 'Consistent improvement in writing skills',
    subjects: ['Writing', 'Reading'],
    supportNeeds: 'Extra writing practice',
    image: 'https://images.unsplash.com/photo-1545696968-1a5245650b36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 8,
    name: 'Isabella Kim',
    grade: '2nd Grade',
    age: 7,
    lastObservation: '7 days ago',
    status: 'On Track',
    recentProgress: 'Excellent art and creative projects',
    subjects: ['Art', 'Science'],
    supportNeeds: 'Creative enrichment',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 9,
    name: 'Ethan Wilson',
    grade: '3rd Grade',
    age: 8,
    lastObservation: '11 days ago',
    status: 'Needs Observation',
    recentProgress: 'Needs support in reading comprehension',
    subjects: ['Reading', 'Mathematics'],
    supportNeeds: 'Reading intervention',
    image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 10,
    name: 'Ava Thompson',
    grade: '2nd Grade',
    age: 7,
    lastObservation: '3 days ago',
    status: 'On Track',
    recentProgress: 'Strong leadership in group activities',
    subjects: ['Social Studies', 'Writing'],
    supportNeeds: 'Leadership opportunities',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 11,
    name: 'Noah Garcia',
    grade: '3rd Grade',
    age: 8,
    lastObservation: '12 days ago',
    status: 'Needs Observation',
    recentProgress: 'Improving in mathematics',
    subjects: ['Mathematics', 'Science'],
    supportNeeds: 'Math enrichment',
    image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 12,
    name: 'Mia Patel',
    grade: '2nd Grade',
    age: 7,
    lastObservation: '5 days ago',
    status: 'On Track',
    recentProgress: 'Excellent science project work',
    subjects: ['Science', 'Art'],
    supportNeeds: 'Science enrichment',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  }
];

const mockNotifications = [
  {
    id: 1,
    title: 'Observation Due',
    message: 'Observation needed for Emma Johnson',
    time: '2 hours ago',
    type: 'observation'
  },
  {
    id: 2,
    title: 'Progress Update',
    message: 'Alex Smith completed weekly assessment',
    time: '5 hours ago',
    type: 'assessment'
  },
  {
    id: 3,
    title: 'Meeting Reminder',
    message: 'Parent-teacher conference tomorrow at 3 PM',
    time: '1 day ago',
    type: 'meeting'
  }
];

const educatorResources = [
  {
    title: 'Classroom Strategies',
    description: 'Effective teaching methods and classroom management techniques',
    icon: BookOpen,
    link: '/resources/classroom-strategies'
  },
  {
    title: 'Learning Support',
    description: 'Resources for supporting diverse learning needs',
    icon: Brain,
    link: '/resources/learning-support'
  },
  {
    title: 'Behavioral Support',
    description: 'Strategies for managing and improving student behavior',
    icon: Heart,
    link: '/resources/behavioral-support'
  }
];

export function EducatorDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
  
  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

  const mockEducatorStats = {
    activeStudents: mockStudents.length,
    pendingObservations: mockStudents.filter(s => s.status === 'Needs Observation').length,
    completedObservations: 32
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Educator Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Track student progress and coordinate with care teams
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <button 
                  className="text-gray-500 hover:text-gray-600 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        >
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-500">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <button
                        className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                        onClick={() => navigate('/notifications')}
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <img
                  src={mockEducator.image}
                  alt={mockEducator.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{mockEducator.name}</div>
                  <div className="text-xs text-gray-500">{mockEducator.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users2 className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Active Students</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockEducatorStats.activeStudents}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClipboardList className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Pending Observations</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockEducatorStats.pendingObservations}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Completed Observations</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockEducatorStats.completedObservations}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Students</h2>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <ul className="divide-y divide-gray-200">
                {paginatedStudents.map((student) => (
                  <li key={student.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="sm:flex sm:items-center sm:flex-1 min-w-0">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        <div className="mt-4 sm:mt-0 sm:ml-6">
                          <div className="flex items-center justify-between sm:justify-start">
                            <h3 className="text-xl font-medium text-gray-900">{student.name}</h3>
                            <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                              student.status === 'Needs Observation'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {student.status}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                            <p className="text-sm text-gray-500">{student.grade}</p>
                            <p className="text-sm text-gray-500">Age: {student.age}</p>
                            <p className="text-sm text-gray-500">Last Observation: {student.lastObservation}</p>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">{student.recentProgress}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {student.subjects.map((subject) => (
                              <span
                                key={subject}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col sm:flex-row gap-2">
                        <Button
                          onClick={() => navigate(`/observations/new?student=${student.id}`)}
                          variant="outline"
                          className="flex items-center justify-center"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          New Observation
                        </Button>
                        <Button
                          onClick={() => navigate(`/student/${student.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Showing {startIndex + 1} to {Math.min(startIndex + studentsPerPage, filteredStudents.length)} of {filteredStudents.length} students
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Educational Resources</h2>
              <div className="space-y-4">
                {educatorResources.map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <div
                      key={resource.title}
                      className="group p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                      onClick={() => navigate(resource.link)}
                    >
                      <div className="flex items-center">
                        <Icon className="h-6 w-6 text-blue-500" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900">{resource.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <RoleSwitcher />
    </div>
  );
}