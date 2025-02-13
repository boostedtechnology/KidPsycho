import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Clock, Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/store/appointments';

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 16; hour++) {
    const time = `${hour === 12 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
    slots.push(time);
  }
  return slots;
};

export function RescheduleAppointment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [notificationPreference, setNotificationPreference] = useState<'email' | 'text' | null>(null);

  const appointments = useAppointmentStore((state) => state.getAppointments(1));
  const updateAppointment = useAppointmentStore((state) => state.updateAppointment);
  const appointment = appointments.find(apt => apt.id === Number(id));

  const allTimeSlots = generateTimeSlots();

  const isTimeSlotAvailable = (time: string) => {
    if (!selectedDate || !appointment?.professional) return true;
    return !appointment.professional.unavailability?.[selectedDate]?.includes(time);
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

  const handleReschedule = () => {
    if (!appointment) return;

    const updatedAppointment = {
      ...appointment,
      date: selectedDate,
      time: selectedTime
    };

    updateAppointment(1, updatedAppointment);
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

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Appointment not found</h2>
          <Button onClick={() => navigate('/')} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reschedule Appointment</h1>
              <p className="mt-1 text-sm text-gray-500">
                Select a new date and time for your appointment
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select New Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              {...getDateRestrictions()}
            />
            <p className="mt-1 text-sm text-gray-500">
              Available Monday through Friday only
            </p>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="mb-6">
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

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={!selectedDate || !selectedTime}
              onClick={handleReschedule}
            >
              Confirm Reschedule
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}