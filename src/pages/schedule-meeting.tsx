import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const timeSlots = [
  { id: 1, time: '9:00 AM', available: true },
  { id: 2, time: '10:00 AM', available: false },
  { id: 3, time: '11:00 AM', available: true },
  { id: 4, time: '2:00 PM', available: true },
  { id: 5, time: '3:00 PM', available: true },
  { id: 6, time: '4:00 PM', available: false },
];

export function ScheduleMeeting() {
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
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Schedule Meeting</h1>
              <p className="mt-1 text-sm text-gray-500">Select a date and time for your appointment</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Time Slots
            </label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  disabled={!slot.available}
                  className={`p-4 text-center rounded-lg border ${
                    slot.available
                      ? 'hover:bg-blue-50 cursor-pointer'
                      : 'bg-gray-50 cursor-not-allowed'
                  }`}
                >
                  <Calendar className={`h-5 w-5 mx-auto mb-2 ${
                    slot.available ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    slot.available ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {slot.time}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Type
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Initial Consultation</option>
              <option>Follow-up Session</option>
              <option>Assessment Review</option>
              <option>Parent Meeting</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="Any additional information..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Simulate scheduling
                setTimeout(() => navigate('/'), 500);
              }}
            >
              Schedule Meeting
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}