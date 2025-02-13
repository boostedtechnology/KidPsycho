import { useNavigate } from 'react-router-dom';
import { ClipboardList, Users2, Calendar, PlusCircle, Brain, Activity, HeartPulse, BookOpen, Stethoscope, Sparkles, FileText, TrendingUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockProfile = {
  full_name: 'Dr. Sarah Wilson',
  role: 'professional'
};

const ASSESSMENT_TEMPLATES = {
  'adhd': {
    id: 'adhd',
    title: 'ADHD Assessment',
    description: 'Comprehensive ADHD screening with behavioral and attention metrics',
    icon: Activity
  },
  'autism': {
    id: 'autism',
    title: 'Autism Spectrum Assessment',
    description: 'Detailed evaluation for Autism Spectrum Disorder (ASD)',
    icon: Brain
  },
  'developmental': {
    id: 'developmental',
    title: 'Developmental Assessment',
    description: 'General developmental milestones and progress tracking',
    icon: HeartPulse
  },
  'learning': {
    id: 'learning',
    title: 'Learning Disability Assessment',
    description: 'Evaluation of specific learning challenges and needs',
    icon: BookOpen
  },
  'behavioral': {
    id: 'behavioral',
    title: 'Behavioral Assessment',
    description: 'Analysis of behavioral patterns and concerns',
    icon: Sparkles
  },
  'medical': {
    id: 'medical',
    title: 'Medical Assessment',
    description: 'General health and medical history evaluation',
    icon: Stethoscope
  }
};

const mockPatients = [
  {
    id: 'alex-smith',
    name: 'Alex Smith',
    age: 8,
    lastAssessment: '2 days ago',
    status: 'In Progress',
    priority: 'High'
  },
  {
    id: 'emma-johnson',
    name: 'Emma Johnson',
    age: 6,
    lastAssessment: '1 week ago',
    status: 'Scheduled',
    priority: 'Medium'
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    age: 10,
    lastAssessment: '3 days ago',
    status: 'Review Needed',
    priority: 'High'
  }
];

const mockStats = {
  totalAssessments: 45,
  pendingReviews: 8,
  activePatients: 12,
  completedToday: 3
};

export function ProfessionalDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {mockProfile.full_name}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Professional Dashboard
              </p>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={() => navigate('/messages')}
                variant="outline"
                className="flex items-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Messages
              </Button>
              <Button
                onClick={() => navigate('/schedule')}
                className="flex items-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClipboardList className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Total Assessments</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockStats.totalAssessments}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockStats.pendingReviews}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users2 className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Active Patients</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockStats.activePatients}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Completed Today</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockStats.completedToday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient List */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Active Patients</h2>
                  <Button
                    onClick={() => navigate('/patients')}
                    variant="outline"
                    size="sm"
                  >
                    View All
                  </Button>
                </div>
              </div>
              <ul className="divide-y divide-gray-200">
                {mockPatients.map((patient) => (
                  <li key={patient.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-500">
                            Age: {patient.age} • Last Assessment: {patient.lastAssessment}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          patient.priority === 'High' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {patient.priority} Priority
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/patient/${patient.id}`)}
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Actions and Templates */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/assessment/new')}
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  New Assessment
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/reports')}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Generate Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/schedule')}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Assessment Templates</h2>
              <div className="space-y-3">
                {Object.values(ASSESSMENT_TEMPLATES).map((template) => {
                  const Icon = template.icon;
                  return (
                    <div
                      key={template.id}
                      className="border rounded-lg p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/assessment/${template.id}`)}
                    >
                      <div className="flex items-center">
                        <Icon className="h-5 w-5 text-blue-500 mr-2" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {template.title}
                          </h3>
                          <p className="mt-1 text-xs text-gray-500">
                            {template.description}
                          </p>
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
    </div>
  );
}

export function EducatorDashboard() {
  const navigate = useNavigate();
  
  const mockEducatorStats = {
    activeStudents: 15,
    pendingAssessments: 5,
    completedAssessments: 32,
    recentObservations: 8
  };

  const mockStudents = [
    {
      id: 1,
      name: 'Alex Smith',
      grade: '3rd Grade',
      lastObservation: '2 days ago',
      status: 'Needs Review'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      grade: '2nd Grade',
      lastObservation: '1 week ago',
      status: 'On Track'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Educator Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Track student progress and coordinate with care teams
              </p>
            </div>
            <Button
              onClick={() => navigate('/observations/new')}
              className="flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Observation
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
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
                  <p className="text-sm font-medium text-gray-500">Pending Assessments</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockEducatorStats.pendingAssessments}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Completed Assessments</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockEducatorStats.completedAssessments}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-purple-500" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Recent Observations</p>
                  <p className="text-2xl font-semibold text-gray-900">{mockEducatorStats.recentObservations}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student List */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Students Requiring Attention</h2>
                  <Button
                    onClick={() => navigate('/students')}
                    variant="outline"
                    size="sm"
                  >
                    View All Students
                  </Button>
                </div>
              </div>
              <ul className="divide-y divide-gray-200">
                {mockStudents.map((student) => (
                  <li key={student.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-500">
                          {student.grade} • Last Observation: {student.lastObservation}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
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
          </div>

          {/* Quick Actions and Resources */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/observations/new')}
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  New Observation
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/assessments/classroom')}
                >
                  <ClipboardList className="h-5 w-5 mr-2" />
                  Classroom Assessment
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/communication')}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Care Team
                </Button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Educational Resources</h2>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate('/resources/classroom-strategies')}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Classroom Strategies
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate('/resources/behavior-support')}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Behavior Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate('/resources/learning-accommodations')}
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Learning Accommodations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Export the dashboard components
export { ProfessionalDashboard as Dashboard };