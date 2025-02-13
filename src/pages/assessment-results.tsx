import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, MessageCircle, AlertTriangle, 
  CheckCircle, Clock, Video, Shield, Download,
  Monitor, Users, MapPin, TrendingUp, Heart,
  Brain, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ASSESSMENT_TEMPLATES } from '@/types/supabase';
import { useState } from 'react';

function getRiskLevel(score: number) {
  if (score >= 75) return {
    level: 'High Priority',
    color: 'red',
    description: 'Immediate professional consultation recommended',
    icon: AlertTriangle,
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200'
  };
  if (score >= 50) return {
    level: 'Moderate Priority',
    color: 'yellow',
    description: 'Professional review suggested',
    icon: Clock,
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200'
  };
  return {
    level: 'Low Priority',
    color: 'green',
    description: 'Continue monitoring and support',
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  };
}

function generateReport(data: {
  template: any;
  answers: Record<string, any>;
  overallScore: number;
  completedAt: string;
  categoryScores?: Record<string, number>;
}) {
  const { template, answers, overallScore, completedAt, categoryScores } = data;
  const date = new Date(completedAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Create the report content
  const reportContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Assessment Report - ${template.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #eee;
        }
        .section {
          margin-bottom: 30px;
        }
        .question {
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 5px;
        }
        .severity {
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
          background: ${overallScore >= 75 ? '#fee2e2' : overallScore >= 50 ? '#fef3c7' : '#dcfce7'};
        }
        .score {
          font-size: 24px;
          font-weight: bold;
          color: #1e40af;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #f8f9fa;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${template.title}</h1>
        <p>Assessment Date: ${formattedDate}</p>
      </div>

      <div class="section">
        <h2>Assessment Summary</h2>
        <div class="severity">
          <h3>Overall Score: <span class="score">${overallScore}%</span></h3>
          <p><strong>Severity Level:</strong> ${getRiskLevel(overallScore).level}</p>
        </div>
      </div>

      ${categoryScores ? `
        <div class="section">
          <h2>Category Scores</h2>
          <table>
            <tr>
              <th>Category</th>
              <th>Score</th>
            </tr>
            ${Object.entries(categoryScores).map(([category, score]) => `
              <tr>
                <td>${category}</td>
                <td>${score}%</td>
              </tr>
            `).join('')}
          </table>
        </div>
      ` : ''}

      <div class="section">
        <h2>Detailed Responses</h2>
        ${template.questions.map(question => `
          <div class="question">
            <p><strong>${question.text}</strong></p>
            <p>Response: ${
              question.type === 'scale' 
                ? question.options?.find(opt => opt.value === answers[question.id])?.label || 'Not answered'
                : question.type === 'multiple'
                ? (answers[question.id] || []).join(', ') || 'Not answered'
                : answers[question.id] || 'Not answered'
            }</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>Recommendations</h2>
        <p>Based on the assessment results, the following steps are recommended:</p>
        <ul>
          <li>Schedule a consultation with a specialist to review the assessment results</li>
          <li>Discuss potential support strategies and interventions</li>
          <li>Create a personalized action plan</li>
        </ul>
      </div>

      <div style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
        <p>This report is generated by Understandobot Assessment Platform</p>
        <p>For professional review and consultation only</p>
      </div>
    </body>
    </html>
  `;

  return reportContent;
}

function downloadReport(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function AssessmentResults() {
  const navigate = useNavigate();
  const { type } = useParams();
  const location = useLocation();
  const { answers, overallScore, completedAt, videoUrl } = location.state || {};
  
  const template = type ? ASSESSMENT_TEMPLATES[type] : null;
  
  if (!template || !location.state) {
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

  const severity = getRiskLevel(overallScore);
  const SeverityIcon = severity.icon;

  const handleDownload = () => {
    const date = new Date(completedAt);
    const formattedDate = date.toISOString().split('T')[0];
    const filename = `${template.title.toLowerCase().replace(/\s+/g, '-')}-assessment-${formattedDate}.html`;
    
    const reportContent = generateReport({
      template,
      answers,
      overallScore,
      completedAt
    });
    
    downloadReport(reportContent, filename);
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
        {/* Assessment Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Assessment Summary</h2>

          {/* Risk Level Visualization */}
          <div className={`${severity.bgColor} rounded-lg border-2 ${severity.borderColor} p-6 mb-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${severity.bgColor}`}>
                  <SeverityIcon className={`h-6 w-6 ${severity.textColor}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${severity.textColor}`}>
                    {severity.level}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {severity.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`h-2 w-8 rounded-full ${
                      level === 1 && 'bg-green-400'
                    } ${
                      level === 2 && (overallScore >= 50 ? 'bg-yellow-400' : 'bg-gray-200')
                    } ${
                      level === 3 && (overallScore >= 75 ? 'bg-red-400' : 'bg-gray-200')
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Take Action Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="font-semibold text-blue-900">Schedule Consultation</h3>
              </div>
              <p className="text-sm text-blue-800 mb-8">
                Connect with a specialist to review the assessment results and create a personalized plan.
              </p>
              <Button
                onClick={() => navigate('/find-specialists')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Find Specialists
              </Button>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200">
              <div className="flex items-center mb-4">
                <Download className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="font-semibold text-green-900">Save Assessment</h3>
              </div>
              <p className="text-sm text-green-800 mb-8">
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
        </div>

        {/* Impact Stats Banner */}
        <div className="mb-8 bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Why Parents Choose Our Platform</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Brain className="h-8 w-8 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Early Intervention</h3>
                  <p className="text-blue-100">
                    92% of parents reported better outcomes with early professional guidance
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Heart className="h-8 w-8 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Personalized Care</h3>
                  <p className="text-blue-100">
                    Tailored support plans for over 10,000+ children
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Star className="h-8 w-8 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Expert Network</h3>
                  <p className="text-blue-100">
                    Access to 500+ verified specialists across multiple disciplines
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Proven Results</h3>
                  <p className="text-blue-100">
                    85% of families see improvement within 6 months
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 p-4 bg-blue-700 rounded-lg">
            <p className="text-center text-blue-100">
              "The early assessment and professional guidance we received made all the difference for our child's development."
              <br />
              <span className="text-sm mt-2 block">— Sarah M., Parent</span>
            </p>
          </div>
        </div>

        {/* Video Recording */}
        {videoUrl && (
          <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
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