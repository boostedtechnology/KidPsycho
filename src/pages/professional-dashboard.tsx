import { useNavigate } from 'react-router-dom';
import { 
  Activity, Calendar, FileText, Users2, MessageCircle, 
  Search, Bell, ChevronRight, Brain, Heart, HeartPulse, 
  BookOpen, Stethoscope, Sparkles, TrendingUp, Clock,
  Video, LayoutDashboard, BarChart2, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoleSwitcher } from '@/components/role-switcher';

const mockProfile = {
  full_name: 'Dr. Sarah Wilson',
  role: 'professional',
  avatar: 'SW'
};

const mockPatients = [
  {
    id: 'alex-smith',
    name: 'Alex Smith',
    age: 8,
    lastAssessment: '2024-02-15',
    nextAppointment: '2024-02-22',
    status: 'In Progress',
    priority: 'High',
    type: 'ADHD Assessment'
  },
  {
    id: 'emma-thompson',
    name: 'Emma Thompson',
    age: 7,
    lastAssessment: '2024-02-10',
    nextAppointment: '2024-02-23',
    status: 'Scheduled',
    priority: 'Medium',
    type: 'Developmental Assessment'
  },
  {
    id: 'lucas-chen',
    name: 'Lucas Chen',
    age: 5,
    lastAssessment: '2024-02-01',
    nextAppointment: '2024-02-21',
    status: 'Review Needed',
    priority: 'High',
    type: 'Behavioral Assessment'
  }
];

const todaySchedule = [
  {
    id: 1,
    time: '9:00 AM',
    patient: 'Emma Thompson',
    type: 'Follow-up Session',
    status: 'Ongoing'
  },
  {
    id: 2,
    time: '2:30 PM',
    patient: 'Lucas Chen',
    type: 'Initial Assessment',
    status: 'Upcoming'
  }
];

const quickStats = {
  activePatients: 12,
  progressRate: '85%',
  completedAssessments: 45,
  pendingReviews: 8
};

const upcomingAppointments = [
  {
    id: 1,
    time: '3:00 PM',
    date: '2024-02-13',
    doctor: {
      name: 'Dr. Sarah Johnson',
      role: 'Child Psychologist',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online'
    }
  },
  {
    id: 2,
    time: '4:30 PM',
    date: '2024-02-13',
    doctor: {
      name: 'Dr. Emily Williams',
      role: 'Development Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online'
    }
  }
];

export function ProfessionalDashboard() {
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Dashboard', href: '/professional', icon: LayoutDashboard },
    { name: 'Patients', href: '/patients', icon: Users2 },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'Assessments', href: '/assessments', icon: FileText },
    { name: 'Reports', href: '/reports', icon: BarChart2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div>
      <header className="bg-white border-b fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-orange-500">Understandobot</h1>
              <nav className="hidden md:flex space-x-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="flex items-center space-x-2"
                      onClick={() => navigate(item.href)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  );
                })}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">SW</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Dr. Sarah Wilson</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <section className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Recent Patients</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/patients')}
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {mockPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-500">
                            Age: {patient.age} • {patient.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          patient.priority === 'High'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {patient.priority}
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
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Appointments for {new Date().toLocaleDateString('en-US', { 
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </h2>

                <div className="space-y-6">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={appointment.doctor.image}
                            alt={appointment.doctor.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          {appointment.doctor.status === 'online' && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="text-xl font-semibold text-gray-900 mr-3">
                              {appointment.time}
                            </span>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {appointment.doctor.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {appointment.doctor.role}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => navigate(`/meeting/${appointment.id}`)}
                        className="flex items-center space-x-2 bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-full px-6"
                      >
                        <Video className="h-4 w-4" />
                        <span>Join Meeting</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Today's Schedule</h2>
                <div className="space-y-4">
                  {todaySchedule.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {appointment.time} - {appointment.patient}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.type}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        appointment.status === 'Ongoing'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users2 className="h-5 w-5 text-blue-500" />
                      <span className="text-sm text-gray-500">Active Patients</span>
                    </div>
                    <span className="text-lg font-semibold">{quickStats.activePatients}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-500">Progress Rate</span>
                    </div>
                    <span className="text-lg font-semibold">{quickStats.progressRate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-purple-500" />
                      <span className="text-sm text-gray-500">Completed</span>
                    </div>
                    <span className="text-lg font-semibold">{quickStats.completedAssessments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm text-gray-500">Pending Review</span>
                    </div>
                    <span className="text-lg font-semibold">{quickStats.pendingReviews}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => navigate('/assessment/new')}
                  >
                    <span className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      New Assessment
                    </span>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => navigate('/messages')}
                  >
                    <span className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Messages
                    </span>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => navigate('/reports')}
                  >
                    <span className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Generate Report
                    </span>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}