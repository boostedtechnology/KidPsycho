import { LoadingScreen } from '@/components/loading-screen';
import { useAuth } from '@/contexts/auth-context';
import { AuthLayout } from '@/layouts/auth-layout';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { Login } from '@/pages/auth/login';
import { Register } from '@/pages/auth/register';
import { CompleteProfile } from '@/pages/complete-profile';
import { Dashboard } from '@/pages/dashboard';
import { Navigate, Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {user ? (
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      ) : (
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      )}
    </Routes>
  );
}