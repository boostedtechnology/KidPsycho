import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ClipboardList,
  BarChart2,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/professional', icon: LayoutDashboard, role: 'professional' },
  { name: 'Dashboard', href: '/educator', icon: LayoutDashboard, role: 'educator' },
  { name: 'Children', href: '/children', icon: Users },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Assessments', href: '/assessments', icon: ClipboardList },
  { name: 'Reports', href: '/reports', icon: BarChart2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function SideNav() {
  const location = useLocation();
  const isProfessional = location.pathname.startsWith('/professional');
  const isEducator = location.pathname.startsWith('/educator');
  
  // Filter navigation items based on role
  const roleSpecificNavigation = navigation.filter(item => {
    if (item.role) {
      return (isProfessional && item.role === 'professional') || 
             (isEducator && item.role === 'educator');
    }
    return true;
  });

  return (
    <nav className="w-64 bg-white border-r min-h-screen fixed left-0 top-0 z-30">
      <div className="px-6 py-8">
        <h1 className="text-xl font-semibold text-orange-500">Understandobot</h1>
      </div>
      <div className="px-3">
        {roleSpecificNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name + item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-orange-50 text-orange-500'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}