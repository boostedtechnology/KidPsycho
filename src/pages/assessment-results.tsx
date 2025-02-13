import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, FileText, MessageCircle, Activity, Shield,
  Brain, Star, Heart, TrendingUp, Video, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { ASSESSMENT_TEMPLATES } from '@/types/supabase';

export function AssessmentResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { answers, overallScore, completedAt, videoUrl, template } = location.state || {};

  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-red-600">Assessment data not found.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;
    const lineHeight = 7;
    const margin = 20;

    // Title
    doc.setFontSize(20);
    doc.text(template.title, pageWidth / 2, yPos, { align: 'center' });
    yPos += lineHeight * 2;

    // Date
    doc.setFontSize(12);
    doc.text(`Assessment Date: ${format(new Date(completedAt), 'MMMM d, yyyy')}`, margin, yPos);
    yPos += lineHeight * 2;

    // Overall Score
    doc.text(`Overall Score: ${overallScore}%`, margin, yPos);
    yPos += lineHeight * 2;

    // Questions and Answers
    doc.setFontSize(14);
    doc.text('Assessment Details', margin, yPos);
    yPos += lineHeight;

    doc.setFontSize(12);
    template.questions.forEach((question) => {
      // Check if we need a new page
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      // Question
      doc.text(question.text, margin, yPos);
      yPos += lineHeight;

      // Answer
      let answer = '';
      if (question.type === 'scale') {
        const option = question.options?.find(opt => opt.value === answers[question.id]);
        answer = option ? option.label : 'Not answered';
      } else if (question.type === 'multiple') {
        answer = (answers[question.id] || []).join(', ') || 'Not answered';
      } else {
        answer = answers[question.id] || 'Not answered';
      }

      doc.text(`Answer: ${answer}`, margin + 5, yPos);
      yPos += lineHeight * 2;
    });

    // Save the PDF
    doc.save(`assessment-results-${format(new Date(completedAt), 'yyyy-MM-dd')}.pdf`);
  };

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
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Assessment Complete</h1>
                <p className="mt-1 text-blue-100">
                  Your results are ready for professional review
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-blue-700 rounded-full px-4 py-2">
              <Shield className="h-5 w-5 text-blue-200" />
              <span className="text-sm">Secure & Confidential</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Immediate Attention Alert */}
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Activity className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Immediate Attention Needed</h2>
              <p className="mt-1 text-gray-600">
                Based on the assessment results, we recommend scheduling a consultation with a specialist to review assessment and discuss the next steps.
              </p>
            </div>
          </div>
        </div>

        {/* Take Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Schedule Consultation</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Connect with a specialist to review the assessment results and create a personalized plan.
            </p>
            <Button
              onClick={() => navigate('/find-specialists')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Find Specialists
            </Button>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Download className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Save Assessment</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Download a secure copy of the assessment results for your records.
            </p>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={handleDownload}
            >
              Download Report
            </Button>
          </div>
        </div>

        {/* Why Parents Choose Our Platform */}
        <div className="bg-blue-900 text-white rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-8">Why Parents Choose Our Platform</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Brain className="h-8 w-8 text-blue-300 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Early Intervention</h3>
                    <p className="text-blue-100">
                      92% of parents reported better outcomes with early professional guidance
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Heart className="h-8 w-8 text-blue-300 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Personalized Care</h3>
                    <p className="text-blue-100">
                      Tailored support plans for over 10,000+ children
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Star className="h-8 w-8 text-blue-300 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Expert Network</h3>
                    <p className="text-blue-100">
                      Access to 500+ verified specialists across multiple disciplines
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <TrendingUp className="h-8 w-8 text-blue-300 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Proven Results</h3>
                    <p className="text-blue-100">
                      85% of families see improvement within 6 months
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-800 rounded-lg">
              <p className="text-center text-blue-100">
                "The early assessment and professional guidance we received made all the difference for our child's development."
                <br />
                <span className="text-sm mt-2 block">— Sarah M., Parent</span>
              </p>
            </div>
          </div>
        </div>

        {/* Video Recording Section */}
        {videoUrl && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Video className="h-5 w-5 mr-2 text-blue-500" />
              Recorded Observations
            </h2>
            <video
              src={videoUrl}
              controls
              className="w-full rounded-lg"
              style={{ maxHeight: '400px' }}
            />
          </div>
        )}
      </main>
    </div>
  );
}