import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Upload, Video, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockStudents = {
  1: {
    id: 1,
    name: 'Alex Smith',
    grade: '3rd Grade',
    image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  2: {
    id: 2,
    name: 'Emma Johnson',
    grade: '2nd Grade',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  },
  3: {
    id: 3,
    name: 'Michael Chen',
    grade: '3rd Grade',
    image: 'https://images.unsplash.com/photo-1545696968-1a5245650b36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
  }
};

export function NewObservation() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get('student');
  const student = studentId ? mockStudents[Number(studentId)] : null;

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center p-8">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Observation Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Your observation has been successfully recorded and saved.
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => navigate('/educator')}
              variant="outline"
              className="w-full"
            >
              Return to Dashboard
            </Button>
            <Button
              onClick={() => {
                setTitle('');
                setNotes('');
                setVideoFile(null);
                setIsComplete(false);
              }}
              className="w-full"
            >
              Create Another Observation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Student not found</h2>
          <Button
            onClick={() => navigate('/educator')}
            className="mt-4"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4"
              onClick={() => navigate('/educator')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">New Observation</h1>
              <p className="mt-1 text-sm text-gray-500">
                Record your observations and upload supporting video
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Student Info Card */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <img
              src={student.image}
              alt={student.name}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
              <p className="text-sm text-gray-500">{student.grade}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {/* Title Section */}
          <div className="p-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Observation Title
            </label>
            <input
              id="title"
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter a title for this observation..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Notes Section */}
          <div className="p-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Observation Notes
            </label>
            <textarea
              id="notes"
              rows={6}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
              placeholder="Enter your detailed observations here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </div>

          {/* Video Upload Section */}
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Upload Video Recording
            </label>
            
            {!videoFile ? (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-2 text-center">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <Video className="h-12 w-12" />
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="video-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a video</span>
                      <input
                        id="video-upload"
                        name="video-upload"
                        type="file"
                        className="sr-only"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    MP4, WebM, or Ogg up to 100MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-1 flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                <div className="flex items-center">
                  <Video className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{videoFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setVideoFile(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Submit Section */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-4 rounded-b-lg">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/educator')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title || !notes || !videoFile || isSubmitting}
              className="flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Upload className="h-5 w-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Observation'
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}