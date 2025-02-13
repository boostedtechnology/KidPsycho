import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for all assessments
const mockAllAssessments = [
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
  },
  {
    id: 'assess-4',
    patientName: 'Sophia Rodriguez',
    patientAge: 6,
    type: 'Learning Assessment',
    date: '2024-02-12',
    status: 'Completed',
    score: 88,
    priority: 'Medium'
  },
  {
    id: 'assess-5',
    patientName: 'Oliver Brown',
    patientAge: 9,
    type: 'ADHD Assessment',
    date: '2024-02-11',
    status: 'Review Needed',
    score: 70,
    priority: 'High'
  },
  {
    id: 'assess-6',
    patientName: 'Isabella Kim',
    patientAge: 7,
    type: 'Developmental Assessment',
    date: '2024-02-10',
    status: 'Completed',
    score: 92,
    priority: 'Low'
  },
  {
    id: 'assess-7',
    patientName: 'William Davis',
    patientAge: 8,
    type: 'Behavioral Assessment',
    date: '2024-02-09',
    status: 'In Progress',
    score: null,
    priority: 'Medium'
  },
  {
    id: 'assess-8',
    patientName: 'Mia Patel',
    patientAge: 6,
    type: 'Learning Assessment',
    date: '2024-02-08',
    status: 'Completed',
    score: 85,
    priority: 'Low'
  },
  {
    id: 'assess-9',
    patientName: 'James Wilson',
    patientAge: 10,
    type: 'ADHD Assessment',
    date: '2024-02-07',
    status: 'Review Needed',
    score: 68,
    priority: 'High'
  },
  {
    id: 'assess-10',
    patientName: 'Ava Martinez',
    patientAge: 7,
    type: 'Developmental Assessment',
    date: '2024-02-06',
    status: 'Completed',
    score: 90,
    priority: 'Medium'
  }
];

const ITEMS_PER_PAGE = 5;

export function ProfessionalAssessmentsPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter assessments based on search term and status
  const filteredAssessments = mockAllAssessments.filter(assessment => {
    const matchesSearch = assessment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAssessments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAssessments = filteredAssessments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-2xl font-bold text-gray-900">All Assessments</h1>
              <p className="mt-1 text-sm text-gray-500">
                View and manage all patient assessments
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Filters and Search */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assessments..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg py-2 px-3"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Review Needed">Review Needed</option>
            </select>
          </div>
        </div>

        {/* Assessments List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {paginatedAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {assessment.patientName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {assessment.patientName}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Age: {assessment.patientAge}</span>
                        <span>•</span>
                        <span>{assessment.type}</span>
                        <span>•</span>
                        <span>{assessment.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {assessment.score && (
                      <div className="hidden sm:flex items-center space-x-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
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
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
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
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredAssessments.length)} of{' '}
            {filteredAssessments.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
