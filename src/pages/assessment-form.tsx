import { useNavigate, useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import { ArrowLeft, Video, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ASSESSMENT_TEMPLATES } from '@/types/supabase';

export function AssessmentForm() {
  const navigate = useNavigate();
  const { type } = useParams();
  const template = type ? ASSESSMENT_TEMPLATES[type] : null;
  const [answers, setAnswers] = useState<Record<string, number | string | string[]>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const questionsByCategory = template.questions.reduce((acc, question) => {
    const category = question.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(question);
    return acc;
  }, {} as Record<string, typeof template.questions>);

  const categories = Object.keys(questionsByCategory);
  const currentCategory = categories[currentStep];
  const currentQuestions = questionsByCategory[currentCategory];
  const isLastStep = currentStep === categories.length - 1;

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        alert('Video file size must be less than 100MB');
        return;
      }
      
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
      setVideoPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < categories.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      const requiredQuestions = template.questions.filter(q => q.type === 'scale');
      const allAnswered = requiredQuestions.every(q => answers[q.id] !== undefined);
      
      if (!allAnswered) {
        alert('Please answer all required questions before submitting.');
        return;
      }

      const categoryScores = Object.entries(questionsByCategory).reduce((acc, [category, questions]) => {
        const scaleQuestions = questions.filter(q => q.type === 'scale');
        if (scaleQuestions.length === 0) return acc;

        const total = scaleQuestions.reduce((sum, q) => sum + (answers[q.id] as number || 0), 0);
        const maxPossible = scaleQuestions.length * 4;
        const score = Math.round((total / maxPossible) * 100);

        return { ...acc, [category]: score };
      }, {} as Record<string, number>);

      const scaleQuestions = template.questions.filter(q => q.type === 'scale');
      const totalScore = scaleQuestions.reduce((sum, q) => sum + (answers[q.id] as number || 0), 0);
      const maxPossible = scaleQuestions.length * 4;
      const overallScore = Math.round((totalScore / maxPossible) * 100);

      // Create URL for video if exists
      let videoUrl = null;
      if (videoPreviewUrl) {
        videoUrl = videoPreviewUrl;
      }

      navigate(`/assessment/${type}/results`, { 
        state: { 
          answers,
          template,
          categoryScores,
          overallScore,
          completedAt: new Date().toISOString(),
          videoUrl
        }
      });
    }
  };

  const handleAnswerChange = (questionId: string, value: number | string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const progress = ((currentStep + 1) / categories.length) * 100;

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
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{template.title}</h1>
              <p className="mt-1 text-sm text-gray-500">{template.description}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="absolute right-0 top-4 text-sm text-gray-500">
                {currentStep + 1} of {categories.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                {currentCategory}
              </h2>
              <p className="text-sm text-gray-500">
                Please answer the following questions about {currentCategory.toLowerCase()}
              </p>
            </div>

            {currentQuestions.map((question) => (
              <div key={question.id} className="border-b pb-6">
                <label className="block text-base font-medium text-gray-900 mb-4">
                  {question.text}
                </label>

                {question.type === 'scale' && (
                  <div className="grid grid-cols-5 gap-4">
                    {question.options?.map((option) => (
                      <label
                        key={option.value}
                        className="relative flex flex-col items-center"
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          className="sr-only peer"
                          onChange={(e) => handleAnswerChange(question.id, Number(e.target.value))}
                          checked={answers[question.id] === option.value}
                          required={question.type === 'scale'}
                        />
                        <div className="w-full p-4 text-center border rounded-lg cursor-pointer transition-all peer-checked:bg-blue-50 peer-checked:border-blue-500 hover:bg-gray-50">
                          <span className="text-sm font-medium block">{option.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'multiple' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {question.options?.map((option) => (
                      <label
                        key={option.value}
                        className="relative flex items-center"
                      >
                        <input
                          type="checkbox"
                          name={question.id}
                          value={option.value}
                          className="sr-only peer"
                          onChange={(e) => {
                            const value = e.target.value;
                            const currentValues = (answers[question.id] as string[] || []);
                            const newValues = e.target.checked
                              ? [...currentValues, value]
                              : currentValues.filter(v => v !== value);
                            handleAnswerChange(question.id, newValues);
                          }}
                          checked={(answers[question.id] as string[] || []).includes(option.value as string)}
                        />
                        <div className="w-full p-4 text-center border rounded-lg cursor-pointer transition-all peer-checked:bg-blue-50 peer-checked:border-blue-500 hover:bg-gray-50">
                          <span className="text-sm font-medium">{option.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === 'text' && (
                  <textarea
                    name={question.id}
                    rows={4}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your response here..."
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    value={answers[question.id] as string || ''}
                  />
                )}
              </div>
            ))}

            {/* Video Upload Section - Only shown on the last step */}
            {isLastStep && (
              <div className="mt-8 border-t pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Add Video Observation (Optional)
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Upload a video showing relevant behaviors or situations that would help specialists better understand your child's needs.
                  Maximum file size: 100MB
                </p>
                
                {!videoFile ? (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Select Video File
                    </Button>
                    <p className="mt-2 text-sm text-gray-500">
                      or drag and drop a video file here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="aspect-video w-full max-w-2xl mx-auto bg-black rounded-lg overflow-hidden">
                      <video
                        src={videoPreviewUrl || undefined}
                        controls
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={removeVideo}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove Video
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between space-x-4 pt-4">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
              <div className="flex-1" />
              <Button
                type="submit"
              >
                {currentStep === categories.length - 1 ? 'Complete Assessment' : 'Next'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}