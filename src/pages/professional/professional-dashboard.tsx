import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Calendar,
  CalendarRange,
  ChevronRight,
  Clock,
  FileText,
  MessageCircle,
  Users2,
  Video,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoleSwitcher } from '@/components/role-switcher';
import { addDays, format, isSameDay, isWeekend, nextMonday, parseISO, startOfWeek } from 'date-fns';
import { useState } from 'react';

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
  completedAssessments: 45,
  pendingReviews: 8
};

const mockRecentAssessments = [
  {
    id: 'assess-1',
    patientName: 'Alex Smith',
    patientAge: 8,
    type: 'ADHD Assessment',
    date: '2024-02-15',
    status: 'Completed',
    score: 75,
    priority: 'High'
  },
  {
    id: 'assess-2',
    patientName: 'Emma Thompson',
    patientAge: 7,
    type: 'Developmental Assessment',
    date: '2024-02-14',
    status: 'In Progress',
    score: null,
    priority: 'Medium'
  },
  {
    id: 'assess-3',
    patientName: 'Lucas Chen',
    patientAge: 5,
    type: 'Behavioral Assessment',
    date: '2024-02-13',
    status: 'Review Needed',
    score: 82,
    priority: 'High'
  }
];

const upcomingAppointments = [
  {
    id: 1,
    time: '9:30 AM',
    date: '2025-02-13',
    patient: 'Sarah Johnson',
    type: 'Initial Consultation',
    doctor: {
      name: 'Dr. Sarah Johnson',
      role: 'Child Psychologist',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online'
    }
  },
  {
    id: 2,
    time: '2:30 PM',
    date: '2025-02-13',
    patient: 'Emily Williams',
    type: 'Follow-up Session',
    doctor: {
      name: 'Dr. Emily Williams',
      role: 'Development Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online'
    }
  },
  {
    id: 3,
    time: '11:00 AM',
    date: '2025-02-14',
    patient: 'Michael Chen',
    type: 'Assessment Review',
    doctor: {
      name: 'Dr. Michael Chen',
      role: 'Behavioral Specialist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'offline'
    }
  },
  {
    id: 4,
    time: '3:45 PM',
    date: '2025-02-14',
    patient: 'Olivia Brown',
    type: 'Initial Assessment',
    doctor: {
      name: 'Dr. James Wilson',
      role: 'Child Psychiatrist',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online'
    }
  },
  {
    id: 5,
    time: '10:15 AM',
    date: '2025-02-17',
    patient: 'Sophie Martinez',
    type: 'Follow-up Session',
    doctor: {
      name: 'Dr. Maria Rodriguez',
      role: 'Development Specialist',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online'
    }
  },
  {
    id: 6,
    time: '2:00 PM',
    date: '2025-02-17',
    patient: 'Lucas Thompson',
    type: 'Behavioral Assessment',
    doctor: {
      name: 'Dr. David Brown',
      role: 'Child Psychologist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online'
    }
  },
  {
    id: 7,
    time: '9:00 AM',
    date: '2025-02-18',
    patient: 'Emma Davis',
    type: 'Initial Consultation',
    doctor: {
      name: 'Dr. Sarah Wilson',
      role: 'Child Psychiatrist',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online'
    }
  },
  {
    id: 8,
    time: '1:30 PM',
    date: '2025-02-18',
    patient: 'Noah Wilson',
    type: 'Follow-up Session',
    doctor: {
      name: 'Dr. Emily Williams',
      role: 'Development Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online'
    }
  },
  {
    id: 9,
    time: '11:30 AM',
    date: '2025-02-19',
    patient: 'Isabella Kim',
    type: 'Assessment Review',
    doctor: {
      name: 'Dr. Michael Chen',
      role: 'Behavioral Specialist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online'
    }
  },
  {
    id: 10,
    time: '3:00 PM',
    date: '2025-02-19',
    patient: 'Ethan Parker',
    type: 'Follow-up Session',
    doctor: {
      name: 'Dr. Maria Rodriguez',
      role: 'Development Specialist',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      status: 'online'
    }
  }
];

export function ProfessionalDashboard() {
  const navigate = useNavigate();
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(format(now, 'yyyy-MM-dd'));

  const getNextFiveWorkdays = () => {
    const days = [];
    let currentDate = startOfWeek(now, { weekStartsOn: 1 });

    if (currentDate < now) {
      currentDate = now;
    }

    if (isWeekend(currentDate)) {
      currentDate = nextMonday(currentDate);
    }

    let daysAdded = 0;
    let currentDateToCheck = currentDate;

    while (daysAdded < 5) {
      if (!isWeekend(currentDateToCheck)) {
        const appointmentsForDay = upcomingAppointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return isSameDay(aptDate, currentDateToCheck);
        });

        days.push({
          date: currentDateToCheck.getDate(),
          day: format(currentDateToCheck, 'EEE'),
          isToday: isSameDay(currentDateToCheck, now),
          fullDate: format(currentDateToCheck, 'yyyy-MM-dd'),
          appointments: appointmentsForDay,
          hasAppointments: appointmentsForDay.length > 0
        });

        daysAdded++;
      }
      currentDateToCheck = addDays(currentDateToCheck, 1);
    }

    return days;
  };

  const isToday = (date: string) => {
    return isSameDay(parseISO(date), now);
  };

  const filteredAppointments = upcomingAppointments.filter(apt =>
    format(parseISO(apt.date), 'yyyy-MM-dd') === selectedDate
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Professional Dashboard</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">SW</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Dr. Sarah Wilson</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <section className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Week Overview</h2>
                <div className="grid grid-cols-5 gap-4">
                  {getNextFiveWorkdays().map((day) => (
                    <button
                      key={day.fullDate}
                      onClick={() => setSelectedDate(day.fullDate)}
                      className={`relative flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                        day.fullDate === selectedDate
                          ? 'border-blue-500 bg-blue-50'
                          : day.hasAppointments
                          ? 'border-gray-300 hover:border-blue-300 bg-white'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-500">{day.day}</span>
                      <span className={`text-2xl font-bold ${
                        day.fullDate === selectedDate ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {day.date}
                      </span>
                      {day.hasAppointments && (
                        <div className="mt-2 flex items-center justify-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                            {day.appointments.length}
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Appointments for {format(parseISO(selectedDate), 'MMMM d, yyyy')}
                </h2>

                <div className="space-y-6">
                  {filteredAppointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        There are no appointments scheduled for this day.
                      </p>
                      <div className="mt-6">
                        <Button
                          onClick={() => navigate('/schedule')}
                          className="inline-flex items-center"
                        >
                          <CalendarRange className="h-5 w-5 mr-2" />
                          Schedule Appointment
                        </Button>
                      </div>
                    </div>
                  ) : (
                    filteredAppointments.map((appointment) => (
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
                              {appointment.patient}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {appointment.type} with {appointment.doctor.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/appointments/${appointment.id}/reschedule`)}
                            className="flex items-center space-x-2"
                          >
                            <CalendarRange className="h-4 w-4" />
                            <span>Reschedule</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/appointments/${appointment.id}/cancel`)}
                            className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                            <span>Cancel</span>
                          </Button>
                          <Button
                            onClick={() => navigate(`/meeting/${appointment.id}`)}
                            className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700"
                            disabled={!isToday(appointment.date)}
                            title={!isToday(appointment.date) ? "Meetings can only be joined on the scheduled day" : ""}
                          >
                            <Video className="h-4 w-4" />
                            <span>Join Now</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Recent Assessments</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/professional/assessments')}
                  >
                    View All Assessments
                  </Button>
                </div>
                <div className="space-y-4">
                  {mockRecentAssessments.map((assessment) => (
                    <div
                      key={assessment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {assessment.patientName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-medium text-gray-900">
                              {assessment.patientName}
                            </h3>
                            <span className="text-sm text-gray-500">
                              • Age: {assessment.patientAge}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {assessment.type} • {assessment.date}
                          </p>
                          {assessment.score && (
                            <div className="mt-1 flex items-center space-x-2">
                              <div className="w-24 h-1.5 bg-gray-200 rounded-full">
                                <div
                                  className="h-full bg-blue-600 rounded-full"
                                  style={{ width: `${assessment.score}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-600">
                                {assessment.score}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          assessment.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : assessment.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assessment.status}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/professional/assessment/${assessment.id}/view`)}
                        >
                          View Details
                        </Button>
                      </div>
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
      </main>
      <RoleSwitcher />
    </div>
  );
}
