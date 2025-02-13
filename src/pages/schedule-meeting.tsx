import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Calendar, Star, Clock, MapPin, Video, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/store/appointments';

const professionals = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    specialty: 'Child Psychologist',
    rating: 4.9,
    timezone: 'EST',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    unavailability: {
      '2024-02-20': ['10:00 AM', '2:00 PM'],
      '2024-02-21': ['11:00 AM', '3:00 PM'],
      '2024-02-22': ['9:00 AM', '1:00 PM'],
    }
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Child & Adolescent Psychiatrist',
    rating: 4.8,
    timezone: 'PST',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    unavailability: {
      '2024-02-20': ['9:00 AM', '4:00 PM'],
      '2024-02-21': ['1:00 PM', '3:00 PM'],
      '2024-02-22': ['11:00 AM', '2:00 PM'],
    }
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Developmental Psychologist',
    rating: 4.9,
    timezone: 'CST',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    unavailability: {
      '2024-02-20': ['10:00 AM', '3:00 PM'],
      '2024-02-21': ['9:00 AM', '2:00 PM'],
      '2024-02-22': ['11:00 AM', '4:00 PM'],
    }
  }
];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 16; hour++) {
    const time = `${hour === 12 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
    slots.push(time);
  }
  return slots;
};

export function ScheduleMeeting() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedProfessional, setSelectedProfessional] = useState(professionals[0]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [notificationPreference, setNotificationPreference] = useState<'email' | 'text' | null>(null);
  const [meetingType, setMeetingType] = useState('initial');
  const { addAppointment } = useAppointmentStore();

  const allTimeSlots = generateTimeSlots();
  
  const isTimeSlotAvailable = (time: string) => {
    if (!selectedDate || !selectedProfessional) return true;
    return !selectedProfessional.unavailability[selectedDate]?.includes(time);
  };

  const handleSchedule = () => {
    // For demo purposes, we'll use child ID 1
    const childId = 1;
    const newAppointment = {
      id: Date.now(), // Simple ID generation for demo
      professional: selectedProfessional,
      type: meetingType === 'initial' ? 'Initial Consultation' : 'Follow-Up Appointment',
      date: selectedDate,
      time: selectedTime,
      location: 'Virtual Consultation',
      duration: '45 minutes',
      status: 'Scheduled'
    };

    addAppointment(childId, newAppointment);
    setShowSuccessPopup(true);
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate('/');
  };

  const handleNotificationPreference = (preference: 'email' | 'text') => {
    setNotificationPreference(preference);
    setTimeout(handleClosePopup, 500);
  };

  // Function to check if a date is a weekend
  const isWeekend = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  // Function to disable weekends in the date input
  const getDateRestrictions = () => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); // Allow booking up to 3 months in advance

    return {
      min: today.toISOString().split('T')[0],
      max: maxDate.toISOString().split('T')[0]
    };
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (!isWeekend(date)) {
      setSelectedDate(date);
      setSelectedTime('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Appointment Successfully Booked!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                You have now successfully booked an appointment. Please check your email for the calendar invite and Zoom link for the appointment.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Would you like to receive appointment reminders?
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={notificationPreference === 'email' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => handleNotificationPreference('email')}
                >
                  Email Reminders
                </Button>
                <Button
                  variant={notificationPreference === 'text' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => handleNotificationPreference('text')}
                >
                  Text Reminders
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                You'll receive reminders 1 day and 10 minutes before your appointment
              </p>
            </div>
          </div>
        </div>
      )}

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
              <h1 className="text-2xl font-bold text-gray-900">Schedule Appointment</h1>
              <p className="mt-1 text-sm text-gray-500">Select a professional and schedule your appointment</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Professional Selection Sidebar */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Recommended Professionals</h2>
            <div className="space-y-4">
              {professionals.map((professional) => (
                <button
                  key={professional.id}
                  onClick={() => {
                    setSelectedProfessional(professional);
                    setSelectedTime('');
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedProfessional.id === professional.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={professional.image}
                      alt={professional.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{professional.name}</h3>
                      <p className="text-sm text-gray-500">{professional.specialty}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">{professional.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600 ml-1">{professional.timezone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scheduling Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              {/* Selected Professional Info */}
              {selectedProfessional && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <img
                      src={selectedProfessional.image}
                      alt={selectedProfessional.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedProfessional.name}
                      </h3>
                      <p className="text-gray-600">{selectedProfessional.specialty}</p>
                      <div className="mt-2 grid grid-cols-3 gap-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Video className="h-4 w-4 mr-2" />
                          Virtual Consultation
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          45 min session
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {selectedProfessional.timezone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      {...getDateRestrictions()}
                      onKeyDown={(e) => e.preventDefault()}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Available Monday through Friday only
                    </p>
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Available Time Slots
                      </label>
                      <span className="text-sm text-gray-500">
                        All times in {selectedProfessional.timezone}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {allTimeSlots.map((time) => {
                        const isAvailable = isTimeSlotAvailable(time);
                        return (
                          <button
                            key={time}
                            onClick={() => isAvailable && setSelectedTime(time)}
                            disabled={!isAvailable}
                            className={`
                              p-3 rounded-lg border text-sm font-medium transition-colors
                              ${isAvailable
                                ? selectedTime === time
                                  ? 'bg-blue-500 text-white border-blue-500'
                                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                              }
                            `}
                          >
                            <div className="flex items-center justify-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {time}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Meeting Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meeting Type
                  </label>
                  <select 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={meetingType}
                    onChange={(e) => setMeetingType(e.target.value)}
                  >
                    <option value="initial">Initial Consultation</option>
                    <option value="followup">Follow-Up Appointment</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes for the Professional
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    placeholder="Any specific concerns or information you'd like to share..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleSchedule}
                  >
                    Schedule Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}