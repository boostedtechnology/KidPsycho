import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, ExternalLink, FileText, Plus, User, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

// Mock data for a specific assessment
const mockAssessmentData = {
  id: 'assess-1',
  patient: {
    name: 'Alex Smith',
    age: 8,
    dateOfBirth: '2016-03-15',
    gender: 'Male',
    parentName: 'Sarah Smith',
    parentEmail: 'sarah.smith@email.com',
    emergencyContact: '+1 (555) 123-4567'
  },
  assessment: {
    type: 'ADHD Assessment',
    date: '2024-02-15',
    status: 'Completed',
    score: 75,
    priority: 'High',
    conductedBy: 'Dr. Sarah Wilson',
    duration: '45 minutes',
    nextReview: '2024-05-15'
  },
  sections: [
    {
      title: 'Attention and Focus',
      score: 72,
      questions: [
        {
          id: 'q1',
          question: 'How often does the child have difficulty staying focused on tasks?',
          answer: 'Often',
          notes: 'Shows consistent difficulty with sustained attention during longer tasks',
          videoEvidence: {
            url: 'https://example.com/video1.mp4',
            duration: '2:30',
            timestamp: '2024-02-15T10:30:00Z',
            description: 'Classroom observation during independent work'
          }
        },
        {
          id: 'q2',
          question: 'Does the child get easily distracted by external stimuli?',
          answer: 'Very Often',
          notes: 'Particularly sensitive to visual and auditory distractions',
          videoEvidence: {
            url: 'https://example.com/video2.mp4',
            duration: '3:15',
            timestamp: '2024-02-15T11:15:00Z',
            description: 'Group activity observation'
          }
        }
      ]
    },
    {
      title: 'Hyperactivity',
      score: 78,
      questions: [
        {
          id: 'q3',
          question: 'How often does the child fidget or have trouble sitting still?',
          answer: 'Sometimes',
          notes: 'Shows improvement with structured movement breaks',
          videoEvidence: {
            url: 'https://example.com/video3.mp4',
            duration: '2:45',
            timestamp: '2024-02-15T13:20:00Z',
            description: 'Seated work period observation'
          }
        }
      ]
    },
    {
      title: 'Impulsivity',
      score: 75,
      questions: [
        {
          id: 'q4',
          question: 'Does the child frequently interrupt others?',
          answer: 'Sometimes',
          notes: 'Has shown improvement with social skills training',
          videoEvidence: null
        }
      ]
    }
  ],
  recommendations: [
    {
      category: 'Educational Support',
      items: [
        'Implement structured daily routines',
        'Provide regular movement breaks',
        'Use visual schedules and timers'
      ]
    },
    {
      category: 'Behavioral Strategies',
      items: [
        'Continue positive reinforcement system',
        'Practice self-monitoring techniques',
        'Regular check-ins during independent work'
      ]
    }
  ]
};

// Add mock data for professional reports
const mockProfessionalReports = [
  {
    id: 'report-1',
    title: 'Initial Evaluation Report',
    author: 'Dr. Sarah Wilson',
    date: '2024-02-15',
    type: 'Psychological Evaluation',
    status: 'Final',
    summary: 'Comprehensive initial evaluation of ADHD symptoms and behavioral patterns.',
    fileSize: '1.2 MB'
  },
  {
    id: 'report-2',
    title: 'Progress Assessment Report',
    author: 'Dr. Michael Chen',
    date: '2024-02-01',
    type: 'Progress Review',
    status: 'Draft',
    summary: 'Three-month progress review showing improvements in attention span and task completion.',
    fileSize: '850 KB'
  }
];

export function ProfessionalAssessmentView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleReportAction = (reportId: string, status: 'Draft' | 'Final') => {
    if (status === 'Draft') {
      navigate(`/professional/assessment/${id}/reports/${reportId}/edit`);
    } else {
      navigate(`/professional/assessment/${id}/reports/${reportId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-2xl font-bold text-gray-900">Assessment Details</h1>
              <p className="mt-1 text-sm text-gray-500">
                {mockAssessmentData.assessment.type} for {mockAssessmentData.patient.name}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <section className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Professional Reports</h2>
                <Button onClick={() => navigate(`/professional/assessment/${id}/reports/new`)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Report
                </Button>
              </div>
              <div className="space-y-4">
                {mockProfessionalReports.map((report) => (
                  <div
                    key={report.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{report.title}</h3>
                        <p className="text-sm text-gray-500">
                          {report.author} • {report.date}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        report.status === 'Final'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{report.summary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <FileText className="h-4 w-4 mr-2" />
                        {report.type} • {report.fileSize}
                      </div>
                      <div className="flex items-center space-x-2">
                        {report.status === 'Draft' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReportAction(report.id, 'Draft')}
                          >
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit Report
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReportAction(report.id, 'Final')}
                          >
                            View Report
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Assessment Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1 flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        mockAssessmentData.assessment.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {mockAssessmentData.assessment.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date Conducted</label>
                    <p className="mt-1 text-sm text-gray-900">{mockAssessmentData.assessment.date}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Duration</label>
                    <p className="mt-1 text-sm text-gray-900">{mockAssessmentData.assessment.duration}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Conducted By</label>
                    <p className="mt-1 text-sm text-gray-900">{mockAssessmentData.assessment.conductedBy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Next Review</label>
                    <p className="mt-1 text-sm text-gray-900">{mockAssessmentData.assessment.nextReview}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Overall Score</label>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${mockAssessmentData.assessment.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {mockAssessmentData.assessment.score}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {mockAssessmentData.sections.map((section) => (
              <section key={section.title} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${section.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{section.score}%</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {section.questions.map((question) => (
                    <div key={question.id} className="border-t pt-4">
                      <h3 className="text-sm font-medium text-gray-900">{question.question}</h3>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-gray-500">Answer</label>
                          <p className="mt-1 text-sm text-gray-900">{question.answer}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-500">Notes</label>
                          <p className="mt-1 text-sm text-gray-900">{question.notes}</p>
                        </div>
                      </div>
                      {question.videoEvidence && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Video className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {question.videoEvidence.description}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Duration: {question.videoEvidence.duration} • Recorded: {
                                    format(new Date(question.videoEvidence.timestamp), 'MMM d, yyyy h:mm a')
                                  }
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(question.videoEvidence.url, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Recording
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h2>
              <div className="space-y-6">
                {mockAssessmentData.recommendations.map((rec) => (
                  <div key={rec.category}>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">{rec.category}</h3>
                    <ul className="space-y-2">
                      {rec.items.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Patient Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{mockAssessmentData.patient.name}</h3>
                    <p className="text-sm text-gray-500">
                      {mockAssessmentData.patient.age} years old • {mockAssessmentData.patient.gender}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                      <dd className="mt-1 text-sm text-gray-900">{mockAssessmentData.patient.dateOfBirth}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Parent/Guardian</dt>
                      <dd className="mt-1 text-sm text-gray-900">{mockAssessmentData.patient.parentName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{mockAssessmentData.patient.parentEmail}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Emergency Contact</dt>
                      <dd className="mt-1 text-sm text-gray-900">{mockAssessmentData.patient.emergencyContact}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
