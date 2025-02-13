import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DashboardLayout } from './layouts/dashboard-layout';
import { AssessmentDetails } from './pages/assessment-details';
import { AssessmentForm } from './pages/assessment-form';
import { AssessmentResults } from './pages/assessment-results';
import { AssessmentSelection } from './pages/assessment-selection';
import { ChildHistory } from './pages/child-history';
import { ChildSelection } from './pages/child-selection';
import { EducatorDashboard } from './pages/educator/educator-dashboard';
import { NewObservation } from './pages/educator/observations/new';
import { StudentDetails } from './pages/educator/student/[id]';
import { FindSpecialists } from './pages/find-specialists';
import { ParentDashboard } from './pages/parent-dashboard';
import { PatientProfile } from './pages/patient-profile';
import { ProfessionalDashboard } from './pages/professional-dashboard';
import { ScheduleMeeting } from './pages/schedule-meeting';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<ParentDashboard />} />
            <Route path="/professional" element={<ProfessionalDashboard />} />
            <Route path="/educator" element={<EducatorDashboard />} />
            <Route path="/assessment/new" element={<ChildSelection />} />
            <Route path="/assessment/new/type" element={<AssessmentSelection />} />
            <Route path="/assessment/:type" element={<AssessmentForm />} />
            <Route path="/assessment/:type/results" element={<AssessmentResults />} />
            <Route path="/assessment/:type/details" element={<AssessmentDetails />} />
            <Route path="/patient/:id" element={<PatientProfile />} />
            <Route path="/schedule" element={<ScheduleMeeting />} />
            <Route path="/schedule/:professionalId" element={<ScheduleMeeting />} />
            <Route path="/find-specialists" element={<FindSpecialists />} />
            <Route path="/children" element={<ParentDashboard />} />
            <Route path="/appointments" element={<ScheduleMeeting />} />
            <Route path="/assessments" element={<AssessmentForm />} />
            <Route path="/reports" element={<div>Reports Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            <Route path="/child/:id" element={<ChildHistory />} />
            <Route path="/educator" element={<EducatorDashboard />} />
            <Route path="/educator" element={<EducatorDashboard />} />
            <Route path="/observations/new" element={<NewObservation />} />
            <Route path="/student/:id" element={<StudentDetails />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;