import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Video, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useAppointmentStore } from '@/store/appointments.ts';

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 16; hour++) {
    const time = `${hour === 12 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
    slots.push(time);
  }
  return slots;
};

export function AppointmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const appointmentId = parseInt(id || '0');
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [notificationPreference, setNotificationPreference] = useState<'email' | 'text' | null>(null);
  const { updateAppointment } = useAppointmentStore();

  // For demo purposes, we'll use the first child's appointments
  const childId = 1;
  const appointments = useAppointmentStore((state) => state.getAppointments(childId));
  const appointment = appointments.find((apt) => apt.id === appointmentId);

  const allTimeSlots = generateTimeSlots();

  const isTimeSlotAvailable = (time: string) => {
    if (!selectedDate || !appointment) return true;
    return !appointment.professional.unavailability?.[selectedDate]?.includes(time);
  };

  const handleReschedule = () => {
    if (!appointment || !selectedDate || !selectedTime) return;

    const updatedAppointment = {
      ...appointment,
      date: selectedDate,
      time: selectedTime,
    };

    updateAppointment(childId, updatedAppointment);
    setShowSuccessPopup(true);
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setIsRescheduling(false);
    navigate('/');
  };

  const handleNotificationPreference = (preference: 'email' | 'text') => {
    setNotificationPreference(preference);
    setTimeout(handleClosePopup, 500);
  };

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-red-600">Appointment not found.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

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
                Appointment Successfully Rescheduled!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                You have successfully rescheduled your appointment. Please check your email for the calendar invite and Zoom link for the appointment.
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
              <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
              <p className="mt-1 text-sm text-gray-500">View or reschedule your appointment</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {!isRescheduling ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={appointment.professional.image}
                  alt={appointment.professional.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {appointment.professional.name}
                  </h2>
                  <p className="text-gray-600">{appointment.professional.specialty}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-gray-900">{appointment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Time</p>
                      <p className="text-gray-900">{appointment.time} ({appointment.professional.timezone})</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Video className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-900">{appointment.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="text-gray-900">{appointment.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  onClick={() => setIsRescheduling(true)}
                  className="w-full sm:w-auto"
                >
                  Reschedule Appointment
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Reschedule Appointment</h2>
              <p className="text-sm text-gray-500">Select a new date and time for your appointment</p>
            </div>

            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select New Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime('');
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Available Time Slots
                    </label>
                    <span className="text-sm text-gray-500">
                      All times in {appointment.professional.timezone}
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

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setIsRescheduling(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleReschedule}
                >
                  Confirm Reschedule
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
