import { RoleSwitcher } from '@/components/role-switcher';
import { Outlet, useLocation } from 'react-router-dom';

export function DashboardLayout() {
  const location = useLocation();
  const isParentDashboard = location.pathname === '/';
  const exceptions = ['/educator', '/student', '/observations/new'];
  const isException = exceptions.map((exception) => location.pathname.startsWith(exception));

  return (
    <div className="min-h-screen bg-gray-100">
      <main className={`min-h-screen ${!isParentDashboard && !isException && 'pt-16'}`}>
        <Outlet />
      </main>
      <RoleSwitcher />
    </div>
  );
}