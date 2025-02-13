import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockChildren = [
  {
    id: 'alex-smith',
    name: 'Alex Smith',
    age: 8,
    lastAssessment: '2024-02-15',
    avatar: 'AS'
  },
  {
    id: 'emma-smith',
    name: 'Emma Smith',
    age: 6,
    lastAssessment: '2024-02-10',
    avatar: 'ES'
  }
];

export function ChildSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Select a Child</h1>
            <p className="mt-2 text-lg text-gray-600">
              Choose which child you'd like to assess
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {mockChildren.map((child) => (
            <button
              key={child.id}
              onClick={() => navigate(`/assessment/new/type?childId=${child.id}`)}
              className="w-full bg-white rounded-xl border-2 border-gray-200 p-6 text-left transition-all hover:border-blue-500 hover:shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {child.avatar}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{child.name}</h3>
                  <p className="text-sm text-gray-500">
                    Age: {child.age} • Last Assessment: {child.lastAssessment}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate('/add-child')}
            className="bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            Add Another Child
          </Button>
        </div>
      </div>
    </div>
  );
}