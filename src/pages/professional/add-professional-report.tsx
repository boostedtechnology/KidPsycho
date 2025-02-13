import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AlertCircle, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock assessment sections data
const mockAssessmentSections = [
  {
    id: 'attention',
    title: 'Attention and Focus',
    criteria: [
      'Ability to maintain focus during tasks',
      'Response to distractions',
      'Task completion rate',
      'Attention to detail'
    ]
  },
  {
    id: 'hyperactivity',
    title: 'Hyperactivity',
    criteria: [
      'Activity level in structured settings',
      'Fidgeting and restlessness',
      'Ability to remain seated',
      'Motor control'
    ]
  },
  {
    id: 'impulsivity',
    title: 'Impulsivity',
    criteria: [
      'Turn-taking behavior',
      'Interrupting others',
      'Decision-making process',
      'Response inhibition'
    ]
  },
  {
    id: 'executive',
    title: 'Executive Function',
    criteria: [
      'Organization skills',
      'Time management',
      'Planning abilities',
      'Working memory'
    ]
  }
];

// Mock data for existing reports
const mockReports = {
  'report-1': {
    title: 'Initial Evaluation Report',
    summary: 'Comprehensive initial evaluation of ADHD symptoms and behavioral patterns.',
    methodology: 'Used standardized assessment tools and behavioral observations.',
    clinicalObservations: 'Patient showed significant difficulty with sustained attention.',
    recommendations: 'Recommend implementing structured routines and regular breaks.',
    followUpPlan: 'Schedule follow-up in 3 months to assess progress.',
    sections: [
      { id: 'attention', title: 'Attention and Focus', grade: 2, notes: 'Shows difficulty maintaining focus during extended tasks.' },
      { id: 'hyperactivity', title: 'Hyperactivity', grade: 3, notes: 'Moderate levels of physical restlessness observed.' },
      { id: 'impulsivity', title: 'Impulsivity', grade: 3, notes: 'Some improvement in turn-taking behaviors.' },
      { id: 'executive', title: 'Executive Function', grade: 2, notes: 'Struggles with organization and time management.' }
    ]
  },
  'report-2': {
    title: 'Progress Assessment Report',
    summary: 'Three-month progress review showing improvements in attention span and task completion.',
    methodology: 'Behavioral observations and parent/teacher feedback.',
    clinicalObservations: 'Notable improvement in classroom participation.',
    recommendations: 'Continue current interventions with minor adjustments.',
    followUpPlan: 'Review progress in 2 months.',
    sections: [
      { id: 'attention', title: 'Attention and Focus', grade: 3, notes: 'Showing improvement in task completion.' },
      { id: 'hyperactivity', title: 'Hyperactivity', grade: 4, notes: 'Better control in structured settings.' },
      { id: 'impulsivity', title: 'Impulsivity', grade: 3, notes: 'Consistent improvement in self-regulation.' },
      { id: 'executive', title: 'Executive Function', grade: 3, notes: 'Making progress with organizational skills.' }
    ]
  }
};

const defaultFormData = {
  title: '',
  summary: '',
  methodology: '',
  clinicalObservations: '',
  recommendations: '',
  followUpPlan: '',
  sections: mockAssessmentSections.map(section => ({
    id: section.id,
    title: section.title,
    grade: 0,
    notes: ''
  }))
};

export function AddProfessionalReport() {
  const navigate = useNavigate();
  const { id, reportId } = useParams();
  const [formData, setFormData] = useState(defaultFormData);
  const isEditing = Boolean(reportId);

  useEffect(() => {
    if (reportId && mockReports[reportId]) {
      setFormData(mockReports[reportId]);
    }
  }, [reportId]);

  const handleSectionGradeChange = (sectionId: string, grade: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, grade } : section
      )
    }));
  };

  const handleSectionNotesChange = (sectionId: string, notes: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, notes } : section
      )
    }));
  };

  const handleSubmit = (status: 'draft' | 'final') => {
    // Here you would typically save the report
    console.log('Saving report as:', status, formData);
    navigate(`/professional/assessment/${id}/view`);
  };

  const calculateOverallGrade = () => {
    const totalGrades = formData.sections.reduce((sum, section) => sum + section.grade, 0);
    return Math.round(totalGrades / formData.sections.length);
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
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Edit Professional Report' : 'Add Professional Report'}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {isEditing ? 'Update the professional assessment report' : 'Create a new professional assessment report'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => handleSubmit('draft')}
              >
                Save as Draft
              </Button>
              <Button
                onClick={() => handleSubmit('final')}
              >
                Finalize Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Basic Information */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Report Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Report Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Initial ADHD Assessment Report"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Executive Summary</label>
                  <textarea
                    value={formData.summary}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Brief overview of key findings and recommendations"
                  />
                </div>
              </div>
            </section>

            {/* Assessment Sections */}
            {mockAssessmentSections.map((section) => (
              <section key={section.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((grade) => (
                      <button
                        key={grade}
                        onClick={() => handleSectionGradeChange(section.id, grade)}
                        className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                          formData.sections.find(s => s.id === section.id)?.grade >= grade
                            ? 'text-yellow-400 hover:text-yellow-500'
                            : 'text-gray-300 hover:text-gray-400'
                        }`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Assessment Criteria</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {section.criteria.map((criterion, index) => (
                        <li key={index} className="text-sm text-gray-600">{criterion}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Clinical Notes</label>
                    <textarea
                      value={formData.sections.find(s => s.id === section.id)?.notes || ''}
                      onChange={(e) => handleSectionNotesChange(section.id, e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter detailed observations and notes for this section..."
                    />
                  </div>
                </div>
              </section>
            ))}

            {/* Additional Notes */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Methodology</label>
                  <textarea
                    value={formData.methodology}
                    onChange={(e) => setFormData(prev => ({ ...prev, methodology: e.target.value }))}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe the assessment methods used..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Clinical Observations</label>
                  <textarea
                    value={formData.clinicalObservations}
                    onChange={(e) => setFormData(prev => ({ ...prev, clinicalObservations: e.target.value }))}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Additional clinical observations..."
                  />
                </div>
              </div>
            </section>

            {/* Recommendations */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recommendations & Follow-up</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Recommendations</label>
                  <textarea
                    value={formData.recommendations}
                    onChange={(e) => setFormData(prev => ({ ...prev, recommendations: e.target.value }))}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter detailed recommendations..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Follow-up Plan</label>
                  <textarea
                    value={formData.followUpPlan}
                    onChange={(e) => setFormData(prev => ({ ...prev, followUpPlan: e.target.value }))}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Outline the follow-up plan..."
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Overall Grade */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Overall Assessment</h2>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {calculateOverallGrade()}/5
                </div>
                <p className="text-sm text-gray-500">Average Grade</p>
              </div>
              <div className="mt-4 pt-4 border-t">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Section Grades</h3>
                <div className="space-y-2">
                  {formData.sections.map((section) => (
                    <div key={section.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{section.title}</span>
                      <span className="text-sm font-medium text-gray-900">{section.grade}/5</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Guidelines */}
            <section className="bg-blue-50 rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-bold text-gray-900">Grading Guidelines</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">5 - Exceptional</p>
                  <p className="text-sm text-gray-600">Significantly above age-appropriate expectations</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">4 - Above Average</p>
                  <p className="text-sm text-gray-600">Exceeds age-appropriate expectations</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">3 - Average</p>
                  <p className="text-sm text-gray-600">Meets age-appropriate expectations</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">2 - Below Average</p>
                  <p className="text-sm text-gray-600">Below age-appropriate expectations</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">1 - Needs Support</p>
                  <p className="text-sm text-gray-600">Significantly below age-appropriate expectations</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
