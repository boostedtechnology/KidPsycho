import { useNavigate } from 'react-router-dom';
import { Monitor, Users, MapPin, Calendar, ArrowLeft, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const specialists = [
  {
    id: 'specialist-1',
    name: 'Dr. Rachel Smith',
    role: 'Child Psychologist',
    experience: '15 years experience',
    location: 'Toronto, ON',
    specialties: ['ADHD', 'Behavioral Therapy', 'Child Development'],
    nextAvailable: 'Tomorrow',
    rating: 4.9,
    reviews: 128,
    virtual: true,
    inPerson: true
  },
  {
    id: 'specialist-2',
    name: 'Dr. Michael Chen',
    role: 'Developmental Pediatrician',
    experience: '12 years experience',
    location: 'Vancouver, BC',
    specialties: ['Early Intervention', 'Developmental Delays', 'Autism'],
    nextAvailable: 'This Week',
    rating: 4.8,
    reviews: 95,
    virtual: true,
    inPerson: true
  },
  {
    id: 'specialist-3',
    name: 'Dr. Sarah Johnson',
    role: 'Child Psychiatrist',
    experience: '18 years experience',
    location: 'Montreal, QC',
    specialties: ['Behavioral Health', 'ADHD', 'Anxiety'],
    nextAvailable: 'Next Week',
    rating: 4.9,
    reviews: 156,
    virtual: true,
    inPerson: false
  },
  {
    id: 'specialist-4',
    name: 'Dr. Emily Thompson',
    role: 'Child Psychologist',
    experience: '10 years experience',
    location: 'Calgary, AB',
    specialties: ['Anxiety', 'Depression', 'Family Therapy'],
    nextAvailable: 'Tomorrow',
    rating: 4.7,
    reviews: 89,
    virtual: true,
    inPerson: true
  },
  {
    id: 'specialist-5',
    name: 'Dr. David Wilson',
    role: 'Behavioral Therapist',
    experience: '14 years experience',
    location: 'Ottawa, ON',
    specialties: ['ADHD', 'Autism', 'Social Skills'],
    nextAvailable: 'This Week',
    rating: 4.9,
    reviews: 112,
    virtual: true,
    inPerson: true
  },
  {
    id: 'specialist-6',
    name: 'Dr. Lisa Anderson',
    role: 'Educational Psychologist',
    experience: '16 years experience',
    location: 'Edmonton, AB',
    specialties: ['Learning Disabilities', 'Academic Assessment', 'ADHD'],
    nextAvailable: 'Next Week',
    rating: 4.8,
    reviews: 134,
    virtual: true,
    inPerson: false
  },
  {
    id: 'specialist-7',
    name: 'Dr. James Lee',
    role: 'Child Development Specialist',
    experience: '20 years experience',
    location: 'Winnipeg, MB',
    specialties: ['Early Childhood', 'Developmental Delays', 'Behavioral Issues'],
    nextAvailable: 'Tomorrow',
    rating: 5.0,
    reviews: 178,
    virtual: true,
    inPerson: true
  },
  {
    id: 'specialist-8',
    name: 'Dr. Marie Dubois',
    role: 'Child Psychiatrist',
    experience: '13 years experience',
    location: 'Quebec City, QC',
    specialties: ['Anxiety', 'Depression', 'ADHD'],
    nextAvailable: 'This Week',
    rating: 4.9,
    reviews: 92,
    virtual: true,
    inPerson: true
  }
];

const canadianCities = [
  'All Locations',
  'Toronto, ON',
  'Vancouver, BC',
  'Montreal, QC',
  'Calgary, AB',
  'Ottawa, ON',
  'Edmonton, AB',
  'Winnipeg, MB',
  'Quebec City, QC',
  'Halifax, NS',
  'Victoria, BC'
];

export function FindSpecialists() {
  const navigate = useNavigate();
  const [appointmentType, setAppointmentType] = useState<'virtual' | 'in-person'>('virtual');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

  const filteredSpecialists = specialists.filter(specialist => {
    const matchesType = appointmentType === 'virtual' ? specialist.virtual : specialist.inPerson;
    const matchesLocation = selectedLocation === 'All Locations' || specialist.location === selectedLocation;
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || 
      specialist.specialties.some(specialty => specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    
    return matchesType && matchesLocation && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="mr-4 text-white hover:bg-blue-700"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Find a Specialist</h1>
                <p className="mt-1 text-blue-100">
                  Connect with experienced professionals for personalized care
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-blue-700 rounded-full px-4 py-2">
              <Shield className="h-5 w-5 text-blue-200" />
              <span className="text-sm">Verified Professionals</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-4">
              <button 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  appointmentType === 'virtual' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'border hover:bg-gray-50'
                }`}
                onClick={() => setAppointmentType('virtual')}
              >
                <Monitor className="h-4 w-4" />
                <span>Virtual</span>
              </button>
              <button 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  appointmentType === 'in-person' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'border hover:bg-gray-50'
                }`}
                onClick={() => setAppointmentType('in-person')}
              >
                <Users className="h-4 w-4" />
                <span>In-Person</span>
              </button>
            </div>
            <div className="flex-1" />
            <select 
              className="rounded-lg border-gray-300 py-2"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option>All Specialties</option>
              <option>ADHD</option>
              <option>Autism</option>
              <option>Anxiety</option>
              <option>Depression</option>
              <option>Learning Disabilities</option>
              <option>Behavioral Issues</option>
              <option>Developmental Delays</option>
            </select>
            <select 
              className="rounded-lg border-gray-300 py-2"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {canadianCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Specialists List */}
        <div className="space-y-6">
          {filteredSpecialists.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No specialists found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setAppointmentType('virtual');
                  setSelectedLocation('All Locations');
                  setSelectedSpecialty('All Specialties');
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            filteredSpecialists.map((specialist) => (
              <div key={specialist.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-xl">
                        {specialist.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{specialist.name}</h3>
                      <p className="text-gray-600">{specialist.role} • {specialist.experience}</p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{specialist.location}</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{specialist.rating} ({specialist.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {specialist.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-3">
                        {specialist.virtual && (
                          <span className="flex items-center text-sm text-gray-500">
                            <Monitor className="h-4 w-4 mr-1" />
                            Virtual Available
                          </span>
                        )}
                        {specialist.inPerson && (
                          <span className="flex items-center text-sm text-gray-500">
                            <Users className="h-4 w-4 mr-1" />
                            In-Person Available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-2">
                      Next available: {specialist.nextAvailable}
                    </p>
                    <Button
                      onClick={() => navigate(`/schedule/${specialist.id}`)}
                      className="flex items-center space-x-2"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Book Consultation</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}