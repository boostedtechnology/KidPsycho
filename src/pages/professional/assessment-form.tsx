import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ASSESSMENT_TEMPLATES } from '@/types/supabase';

export function ProfessionalAssessmentForm() {
  const navigate = useNavigate();
  const { type } = useParams();
  const template = type ? ASSESSMENT_TEMPLATES[type] : null;

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-red-600">Assessment template not found.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold text-gray-900">{template.title}</h1>
              <p className="mt-1 text-sm text-gray-500">{template.description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <form className="space-y-6">
            {template.questions.map((question) => (
              <div key={question.id} className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {question.text}
                </label>
                {question.type === 'scale' && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {question.options?.map((option) => (
                      <label
                        key={option.value}
                        className="relative flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          className="sr-only"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
                {question.type === 'text' && (
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
              >
                Save Assessment
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
