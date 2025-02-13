import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DashboardLayout } from './layouts/dashboard-layout.tsx';
import { AssessmentDetails } from './pages/assessment-details.tsx';
import { AssessmentForm } from './pages/assessment-form.tsx';
import { AssessmentResults } from './pages/assessment-results.tsx';
import { AssessmentSelection } from './pages/assessment-selection.tsx';
import { ChildHistory } from './pages/child-history.tsx';
import { ChildSelection } from './pages/child-selection.tsx';
import { EducatorDashboard } from './pages/educator/educator-dashboard.tsx';
import { NewObservation } from './pages/educator/observations/new.tsx';
import { StudentDetails } from './pages/educator/student/[id].tsx';
import { FindSpecialists } from './pages/find-specialists.tsx';
import { ParentDashboard } from './pages/parent-dashboard.tsx';
import { PatientProfile } from './pages/patient-profile.tsx';
import { ScheduleMeeting } from './pages/schedule-meeting.tsx';
import { ProfessionalAssessmentDetails } from '@/pages/professional/assessment-details.tsx';
import { AddProfessionalReport } from '@/pages/professional/add-professional-report.tsx';
import { ProfessionalAssessmentView } from '@/pages/professional/assessment-view.tsx';
import { ViewProfessionalReport } from '@/pages/professional/view-professional-report.tsx';
import { ProfessionalAssessmentsPage } from '@/pages/professional/assessments.tsx';
import { ProfessionalDashboard } from '@/pages/professional/professional-dashboard.tsx';
import { AIAdaptiveAssessment } from '@/pages/ai-adaptive-assessment.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<ParentDashboard />} />
            <Route path="/educator" element={<EducatorDashboard />} />
            <Route path="/assessment/new" element={<ChildSelection />} />
            <Route path="/assessment/new/type" element={<AssessmentSelection />} />
            <Route path="/assessment/ai-adaptive" element={<AIAdaptiveAssessment />} />
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
            <Route path="/assessment/:type" element={<AssessmentForm />} />
            <Route path="/professional" element={<ProfessionalDashboard />} />
            <Route path="/professional/assessment/:id/view" element={<ProfessionalAssessmentView />} />
            <Route path="/professional/assessment/:id/reports/new" element={<AddProfessionalReport />} />
            <Route path="/professional/assessment/:id/reports/:reportId/edit" element={<AddProfessionalReport />} />
            <Route path="/professional/assessment/:id/reports/:reportId" element={<ViewProfessionalReport />} />
            <Route path="/professional/assessment/:type/details" element={<ProfessionalAssessmentDetails />} />
            <Route path="/professional/assessments" element={<ProfessionalAssessmentsPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
