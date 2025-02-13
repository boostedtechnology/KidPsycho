import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Clock, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addDays, addWeeks, format, parseISO, startOfWeek, subWeeks } from 'date-fns';

interface TimeSlot {
  id: number;
  date: string; // ISO date string
  start: string;
  end: string;
}

interface Availability {
  [key: string]: TimeSlot[]; // key is ISO date string
}

// Generate time slots from 8am to 7pm
const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = (i + 8).toString().padStart(2, '0');
  return `${hour}:00`;
});

export function Calendar() {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: new Date().toISOString().split('T')[0],
    start: '09:00',
    end: '17:00'
  });
  const [availability, setAvailability] = useState<Availability>({
    '2024-02-19': [
      { id: 1, date: '2024-02-19', start: '09:00', end: '12:00' },
      { id: 2, date: '2024-02-19', start: '14:00', end: '17:00' }
    ],
    '2024-02-21': [
      { id: 3, date: '2024-02-21', start: '10:00', end: '15:00' }
    ],
    '2024-02-23': [
      { id: 4, date: '2024-02-23', start: '09:00', end: '13:00' }
    ]
  });

  const startDate = startOfWeek(currentWeek);
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const handlePreviousWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));
  const handleToday = () => setCurrentWeek(new Date());

  const isTimeSlotAvailable = (date: Date, time: string) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const daySlots = availability[dateStr] || [];
    return daySlots.some(slot => {
      const slotStart = parseISO(`${dateStr}T${slot.start}`);
      const slotEnd = parseISO(`${dateStr}T${slot.end}`);
      const currentTime = parseISO(`${dateStr}T${time}`);
      return currentTime >= slotStart && currentTime < slotEnd;
    });
  };

  const handleAddSlot = () => {
    const newId = Math.max(0, ...Object.values(availability).flat().map(slot => slot.id)) + 1;
    const newTimeSlot: TimeSlot = {
      id: newId,
      date: newSlot.date,
      start: newSlot.start,
      end: newSlot.end
    };

    setAvailability(prev => ({
      ...prev,
      [newSlot.date]: [
        ...(prev[newSlot.date] || []),
        newTimeSlot
      ]
    }));

    setShowAddSlot(false);
  };

  const handleRemoveSlot = (date: string, slotId: number) => {
    setAvailability(prev => ({
      ...prev,
      [date]: prev[date].filter(slot => slot.id !== slotId)
    }));
  };

  const getAllTimeSlots = () => {
    return Object.entries(availability)
      .map(([date, slots]) => ({
        date,
        slots
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .filter(({ slots }) => slots.length > 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
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
                <h1 className="text-2xl font-bold text-gray-900">Availability Calendar</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your availability schedule (8:00 AM - 7:00 PM)
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowAddSlot(true)}
                className="flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Time Slot
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Quick Time Slots Overview */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">All Time Slots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getAllTimeSlots().map(({ date, slots }) => (
                <div key={date} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
                  </h3>
                  <div className="space-y-2">
                    {slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between bg-white rounded-md p-2 shadow-sm"
                      >
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">
                            {slot.start} - {slot.end}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveSlot(date, slot.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          {/* Calendar Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviousWeek}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="text-lg font-semibold">
                  {format(weekDates[0], 'MMM d')} - {format(weekDates[6], 'MMM d, yyyy')}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextWeek}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToday}
                  className="ml-2 flex items-center"
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Today
                </Button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-8 border-b">
            {/* Time column */}
            <div className="border-r">
              <div className="h-12 border-b bg-gray-50"></div>
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="h-12 border-b px-2 py-1 text-xs text-gray-500"
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Days columns */}
            {weekDates.map((date) => (
              <div key={date.toISOString()} className="relative">
                <div className="h-12 border-b bg-gray-50 px-2 py-1">
                  <div className="text-sm font-medium text-gray-900">
                    {format(date, 'EEE')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(date, 'MMM d')}
                  </div>
                </div>
                {timeSlots.map((time) => (
                  <div
                    key={`${date.toISOString()}-${time}`}
                    className={`h-12 border-b border-r ${
                      isTimeSlotAvailable(date, time)
                        ? 'bg-blue-50'
                        : ''
                    }`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Add Time Slot Modal */}
        {showAddSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add Availability Slot
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newSlot.date}
                    onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Time
                    </label>
                    <select
                      value={newSlot.start}
                      onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Time
                    </label>
                    <select
                      value={newSlot.end}
                      onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddSlot(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddSlot}>
                    Add Slot
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
