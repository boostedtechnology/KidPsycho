import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  Activity, Calendar, FileText, TrendingUp, Users, MessageCircle, 
  HelpCircle, ChevronRight, Brain, Heart, PlusCircle, UserPlus, 
  Search, Bell, Book, Lightbulb, Video, GraduationCap,
  HandHeart, UsersRound, Phone, Mail, ChevronLeft, ChevronDown, X,
  Puzzle, Sparkles, Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, subMonths, addMonths, isSameDay } from 'date-fns';
import { useAppointmentStore } from '@/store/appointments';

const mockProfile = {
  name: 'Marina George',
  email: 'marina.george@example.com',
  avatar: 'MG'
};

const allAppointments = [
  {
    id: 1,
    date: '2024-02-20',
    time: '10:00 AM',
    type: 'Initial Consultation',
    professional: {
      name: 'Dr. Sarah Wilson',
      specialty: 'Child Psychologist'
    }
  },
  {
    id: 2,
    date: '2024-02-22',
    time: '2:30 PM',
    type: 'Follow-up Session',
    professional: {
      name: 'Dr. Michael Chen',
      specialty: 'Development Specialist'
    }
  }
];

const mockChildren = [
  {
    id: 1,
    name: 'Alex Smith',
    age: 8,
    recentAssessments: [
      {
        id: 1,
        type: 'ADHD Screening',
        date: '2024-02-15',
        status: 'Completed',
        score: 75,
        trend: 'improving'
      },
      {
        id: 2,
        type: 'Behavioral Assessment',
        date: '2024-02-01',
        status: 'Completed',
        score: 82,
        trend: 'stable'
      }
    ],
    upcomingAppointments: [
      {
        id: 1,
        type: 'Follow-up Consultation',
        date: '2024-02-25',
        time: '10:00 AM',
        provider: 'Dr. Sarah Wilson'
      }
    ]
  },
  {
    id: 2,
    name: 'Emma Smith',
    age: 6,
    recentAssessments: [
      {
        id: 3,
        type: 'Developmental Assessment',
        date: '2024-02-10',
        status: 'Completed',
        score: 88,
        trend: 'improving'
      }
    ],
    upcomingAppointments: []
  }
];

const resourceCategories = [
  {
    title: 'Growth & Development',
    icon: Sparkles,
    items: [
      { 
        title: 'Developmental Milestones',
        description: 'Understanding your child\'s unique developmental journey'
      },
      { 
        title: 'Social Skills Support',
        description: 'Helping your child build meaningful relationships'
      },
      { 
        title: 'Strength-Based Approach',
        description: 'Focusing on and nurturing your child\'s talents'
      },
      { 
        title: 'Future Planning',
        description: 'Preparing for transitions and long-term success'
      }
    ]
  },
  {
    title: 'Emotional Wellbeing',
    icon: Heart,
    items: [
      { 
        title: 'Understanding Your Child',
        description: 'Insights into your child\'s emotional needs and triggers'
      },
      { 
        title: 'Self-Care for Parents',
        description: 'Taking care of yourself while caring for your child'
      },
      { 
        title: 'Building Resilience',
        description: 'Helping your child develop emotional strength'
      },
      { 
        title: 'Family Harmony',
        description: 'Maintaining balance and support within the family'
      }
    ]
  },
  {
    title: 'Personalized Support',
    icon: Brain,
    items: [
      { 
        title: 'ADHD Strategies',
        description: 'Tailored approaches for attention and focus challenges'
      },
      { 
        title: 'Learning Adaptations',
        description: 'Customized learning strategies based on assessments'
      },
      { 
        title: 'Behavioral Support',
        description: 'Personalized behavior management techniques'
      },
      { 
        title: 'Progress Tracking',
        description: 'Monitor and celebrate your child\'s achievements'
      }
    ]
  }
];

const supportOptions = [
  {
    title: 'Professional Support',
    icon: GraduationCap,
    description: 'Connect with qualified specialists',
    action: 'Find Specialists',
    path: '/find-specialists'
  },
  {
    title: 'Parent Community',
    icon: UsersRound,
    description: 'Join support groups and forums',
    action: 'Join Community',
    path: '/community'
  },
  {
    title: 'Care Coordination',
    icon: HandHeart,
    description: 'Get help coordinating care services',
    action: 'Learn More',
    path: '/care-coordination'
  }
];

const contactChannels = [
  {
    icon: Phone,
    title: '24/7 Helpline',
    detail: '1-800-123-4567',
    action: 'Call Now'
  },
  {
    icon: Mail,
    title: 'Email Support',
    detail: 'support@understandobot.com',
    action: 'Send Email'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    detail: 'Available 9AM-5PM EST',
    action: 'Start Chat'
  }
];

export function ParentDashboard() {
  const navigate = useNavigate();
  const [activeResourceCategory, setActiveResourceCategory] = useState(resourceCategories[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<typeof appointments[0] | null>(null);
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
  const appointments = useAppointmentStore((state) => state.getAppointments(1));
  const { cancelAppointment } = useAppointmentStore();

  const handleCancelClick = (appointmentId: number) => {
    setAppointmentToCancel(appointmentId);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (appointmentToCancel) {
      cancelAppointment(1, appointmentToCancel);
      setShowCancelModal(false);
      setAppointmentToCancel(null);
    }
  };

  const handleJoinMeeting = (appointment: typeof appointments[0]) => {
    setSelectedMeeting(appointment);
    setShowMeetingModal(true);
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const getAppointmentsForDay = (date: Date) => {
    return allAppointments.filter(apt => 
      isSameDay(new Date(apt.date), date)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cancel Appointment Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowCancelModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cancel Appointment
              </h3>
              <p className="text-gray-600">
                Are you sure you want to cancel this appointment? This action cannot be undone.
              </p>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Appointment
              </Button>
              <Button
                className="flex-1 bg-red-600 text-white hover:bg-red-700"
                onClick={handleConfirmCancel}
              >
                Cancel Appointment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Room Modal */}
      {showMeetingModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
            <div className="border-b p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedMeeting.professional.name}'s Personal Meeting Room
                </h2>
                <button
                  onClick={() => setShowMeetingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 text-center space-y-6">
              <p className="text-lg text-gray-600">
                We've let the host know you're here
              </p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Test Speaker and Mic
              </a>
              <div>
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8"
                  onClick={() => {
                    setShowMeetingModal(false);
                    // Here you would typically initiate the video call
                  }}
                >
                  Join Meeting
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* User Profile Bar */}
          <div className="py-4 border-b border-blue-500/30">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-orange-500">Understandobot</h1>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-blue-200 hover:text-white transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-blue-200 hover:text-white transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-semibold">{mockProfile.avatar}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{mockProfile.name}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12">
            <div>
              <h1 className="text-4xl font-bold">Welcome to Your Child's Care Journey</h1>
              <p className="mt-4 text-lg text-blue-100">
                Track progress, access resources, and stay connected with your care team - all in one place.
              </p>
              <div className="mt-8 flex space-x-4">
                <Button 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/assessment/new')}
                >
                  Start New Assessment
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-blue-700"
                  onClick={() => navigate('/find-specialists')}
                >
                  Find Specialists
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Parent and child"
                className="rounded-lg shadow-xl w-[500px] h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Children Management */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Children</h2>
          <Button
            onClick={() => navigate('/add-child')}
            className="flex items-center"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add Child
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockChildren.map((child) => (
            <div
              key={child.id}
              className="p-6 rounded-lg border-2 border-gray-200 bg-white hover:border-blue-300 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{child.name}</h3>
                  <p className="text-sm text-gray-500">{child.age} years old</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {child.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  Latest Assessment: {child.recentAssessments[0]?.type || 'None'}
                </p>
                <p className="text-sm text-gray-600">
                  Next Appointment: {child.upcomingAppointments[0]?.date || 'None scheduled'}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(`/child/${child.name.toLowerCase().replace(' ', '-')}`)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>

        {/* Upcoming Appointments */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                <Button
                  onClick={() => navigate('/schedule')}
                  className="bg-white text-gray-900 hover:bg-gray-50 border shadow-sm"
                >
                  Schedule New
                </Button>
              </div>
            </div>
            {appointments.length === 0 ? (
              <div className="p-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Appointments</h3>
                <p className="text-gray-500 mb-6">
                  Schedule a consultation with one of our professionals.
                </p>
                <Button
                  onClick={() => navigate('/schedule')}
                  className="flex items-center mx-auto"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border rounded-lg p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={appointment.professional.image}
                          alt={appointment.professional.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-semibold text-gray-900">
                              {appointment.time}
                            </span>
                            <span className="text-gray-500">(EST)</span>
                          </div>
                          <h3 className="text-lg text-gray-900">
                            {appointment.type} with {appointment.professional.name}
                          </h3>
                          <p className="text-gray-500">
                            {format(new Date(appointment.date), 'yyyy-MM-dd')} • {appointment.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleCancelClick(appointment.id)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/appointments/reschedule/${appointment.id}`)}
                        >
                          Reschedule
                        </Button>
                        <Button
                          onClick={() => handleJoinMeeting(appointment)}
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Resources & Support */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources & Support</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resource Categories */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <div className="flex space-x-4 mb-6">
                {resourceCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.title}
                      onClick={() => setActiveResourceCategory(category)}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        activeResourceCategory.title === category.title
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <Icon className="h-6 w-6 text-blue-600 mb-2" />
                      <h3 className="font-medium text-gray-900">{category.title}</h3>
                    </button>
                  );
                })}
              </div>
              <div className="space-y-4">
                {activeResourceCategory.items.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => navigate('/resources/' + item.title.toLowerCase().replace(/\s+/g, '-'))}
                    className="w-full flex items-center justify-between p-4 rounded-lg border hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Support Options */}
            <div className="space-y-6">
              {supportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.title} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600 mr-3" />
                      <h3 className="text-lg font-medium text-gray-900">{option.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <Button
                      onClick={() => navigate(option.path)}
                      className="w-full"
                    >
                      {option.action}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact & Support */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div key={channel.title} className="bg-white rounded-lg p-6">
                  <Icon className="h-6 w-6 text-blue-600 mb-3" />
                  <h3 className="font-medium text-gray-900 mb-1">{channel.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{channel.detail}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (channel.title === 'Email Support') {
                        window.location.href = `mailto:${channel.detail}`;
                      } else if (channel.title === '24/7 Helpline') {
                        window.location.href = `tel:${channel.detail}`;
                      } else {
                        navigate('/support/chat');
                      }
                    }}
                  >
                    {channel.action}
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}