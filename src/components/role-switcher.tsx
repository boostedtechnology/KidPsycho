import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function RoleSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const getCurrentRole = () => {
    if (location.pathname === '/') return 'parent';
    if (location.pathname === '/professional/dashboard') return 'professional';
    if (location.pathname === '/educator') return 'educator';
    return 'parent';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg">
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-900">Switch Role View:</h3>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>

        <div className={`space-y-2 transition-all duration-200 ease-in-out ${
          isExpanded ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0 overflow-hidden'
        }`}>
          <Button
            variant={getCurrentRole() === 'parent' ? 'default' : 'outline'}
            size="sm"
            className="w-full"
            onClick={() => navigate('/')}
          >
            Parent View
          </Button>
          <Button
            variant={getCurrentRole() === 'professional' ? 'default' : 'outline'}
            size="sm"
            className="w-full"
            onClick={() => navigate('/professional')}
          >
            Professional View
          </Button>
          <Button
            variant={getCurrentRole() === 'educator' ? 'default' : 'outline'}
            size="sm"
            className="w-full"
            onClick={() => navigate('/educator')}
          >
            Educator View
          </Button>
        </div>
      </div>
    </div>
  );
}
