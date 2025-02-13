import { Outlet } from 'react-router-dom';
import { Users } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-blue-600">
            <Users className="w-full h-full" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Child Assessment Platform
          </h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
}