import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

// Mock data for professional reports
const mockReports = {
  'report-1': {
    title: 'Initial Evaluation Report',
    author: 'Dr. Sarah Wilson',
    date: '2024-02-15',
    type: 'Psychological Evaluation',
    status: 'Final',
    summary: 'Comprehensive initial evaluation of ADHD symptoms and behavioral patterns.',
    methodology: 'Used standardized assessment tools and behavioral observations over a period of two weeks. Assessment included classroom observations, parent interviews, and standardized testing protocols.',
    clinicalObservations: 'Patient showed significant difficulty with sustained attention during extended tasks. Notable strengths in creative problem-solving and verbal communication were observed.',
    recommendations: 'Implementation of structured daily routines, regular movement breaks, and visual scheduling tools. Consider additional support during extended academic tasks.',
    followUpPlan: 'Schedule follow-up assessment in 3 months to evaluate progress and adjust interventions as needed.',
    sections: [
      {
        id: 'attention',
        title: 'Attention and Focus',
        grade: 2,
        notes: 'Shows difficulty maintaining focus during extended tasks. Particularly challenging in group settings with multiple stimuli.'
      },
      {
        id: 'hyperactivity',
        title: 'Hyperactivity',
        grade: 3,
        notes: 'Moderate levels of physical restlessness observed. Movement breaks have shown positive impact on subsequent focus.'
      },
      {
        id: 'impulsivity',
        title: 'Impulsivity',
        grade: 3,
        notes: 'Some improvement in turn-taking behaviors. Continues to need support with waiting and impulse control.'
      },
      {
        id: 'executive',
        title: 'Executive Function',
        grade: 2,
        notes: 'Struggles with organization and time management. Benefits from external structure and visual supports.'
      }
    ],
    patient: {
      name: 'Alex Smith',
      age: 8,
      dateOfBirth: '2016-03-15'
    }
  }
};

export function ViewProfessionalReport() {
  const navigate = useNavigate();
  const { id, reportId } = useParams();
  const report = reportId ? mockReports[reportId] : null;

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-red-600">Report not found.</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Professional assessment report for {report.patient.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {report.status}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Report Overview */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Executive Summary</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{report.summary}</p>
            </section>

            {/* Methodology */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Methodology</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{report.methodology}</p>
            </section>

            {/* Clinical Observations */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Clinical Observations</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{report.clinicalObservations}</p>
            </section>

            {/* Assessment Sections */}
            {report.sections.map((section) => (
              <section key={section.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((grade) => (
                      <Star
                        key={grade}
                        className={`h-5 w-5 ${
                          grade <= section.grade
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{section.notes}</p>
              </section>
            ))}

            {/* Recommendations */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{report.recommendations}</p>
            </section>

            {/* Follow-up Plan */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Follow-up Plan</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{report.followUpPlan}</p>
            </section>
          </div>

          <div className="space-y-6">
            {/* Report Information */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Report Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Author</p>
                    <p className="text-sm text-gray-900">{report.author}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="text-sm text-gray-900">
                      {format(new Date(report.date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="text-sm text-gray-900">{report.type}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Patient Information */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Patient Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-sm text-gray-900">{report.patient.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Age</p>
                  <p className="text-sm text-gray-900">{report.patient.age} years old</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                  <p className="text-sm text-gray-900">
                    {format(new Date(report.patient.dateOfBirth), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            </section>

            {/* Grade Legend */}
            <section className="bg-gray-50 rounded-lg shadow-sm p-6">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Grade Scale</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Exceptional</span>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Above Average</span>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Average</span>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    {[4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Below Average</span>
                  </div>
                  <div className="flex items-center">
                    {[1, 2].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    {[3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Needs Support</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    {[2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}