import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AdminProvider } from "@/context/AdminContext";
import { ProtectedRoute } from "@/components/admin";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Development = lazy(() => import("./pages/Development"));
const Services = lazy(() => import("./pages/Services"));
const Clients = lazy(() => import("./pages/Clients"));
const Career = lazy(() => import("./pages/Career"));
const Courses = lazy(() => import("./pages/Courses"));
const Contact = lazy(() => import("./pages/Contact"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const ClientManagement = lazy(() => import("./pages/AdminManagement").then(m => ({ default: m.ClientManagement })));
const ContactManagement = lazy(() => import("./pages/AdminManagement").then(m => ({ default: m.ContactManagement })));
const InternManagement = lazy(() => import("./pages/AdminManagement").then(m => ({ default: m.InternManagement })));
const JobRoleManagement = lazy(() => import("./pages/AdminManagement").then(m => ({ default: m.JobRoleManagement })));
const CourseManagement = lazy(() => import("./pages/AdminManagement").then(m => ({ default: m.CourseManagement })));
const PhotoManagement = lazy(() => import("./pages/AdminManagement").then(m => ({ default: m.PhotoManagement })));
const PortfolioManagement = lazy(() => import("./pages/AdminManagement").then(m => ({ default: m.PortfolioManagement })));
const PopupManagement = lazy(() => import("./pages/AdminManagement").then(m => ({ default: m.PopupManagement })));
const ServiceRequestManagement = lazy(() => import("./pages/AdminManagement").then(m => ({ default: m.ServiceRequestManagement })));
const TeamManagement = lazy(() => import("./pages/AdminManagement").then(m => ({ default: m.TeamManagement })));
const TestimonialManagement = lazy(() => import("./pages/AdminManagement").then(m => ({ default: m.TestimonialManagement })));

const WebDevelopment = lazy(() => import("./pages/development/WebDevelopment"));
const SocialMediaMarketing = lazy(() => import("./pages/development/SocialMediaMarketing"));
const ContentWriting = lazy(() => import("./pages/development/ContentWriting"));
const GraphicsDesigner = lazy(() => import("./pages/development/GraphicsDesigner"));
const SoftwareDevelopment = lazy(() => import("./pages/development/SoftwareDevelopment"));
const AppDevelopment = lazy(() => import("./pages/development/AppDevelopment"));
const AiMl = lazy(() => import("./pages/development/AiMl"));
const GovernmentTenders = lazy(() => import("./pages/development/GovernmentTenders"));

const BulkSms = lazy(() => import("./pages/services/BulkSms"));
const VoiceSms = lazy(() => import("./pages/services/VoiceSms"));
const WhatsappPanel = lazy(() => import("./pages/services/WhatsappPanel"));
const WhatsappMarketing = lazy(() => import("./pages/services/WhatsappMarketing"));
const DigitalElectionCampaign = lazy(() => import("./pages/services/DigitalElectionCampaign"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/development" element={<Development />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/career" element={<Career />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/get-started" element={<GetStarted />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/popups" element={<ProtectedRoute><PopupManagement /></ProtectedRoute>} />
                  <Route path="/admin/clients" element={<ProtectedRoute><ClientManagement /></ProtectedRoute>} />
                  <Route path="/admin/portfolio" element={<ProtectedRoute><PortfolioManagement /></ProtectedRoute>} />
                  <Route path="/admin/testimonials" element={<ProtectedRoute><TestimonialManagement /></ProtectedRoute>} />
                  <Route path="/admin/team" element={<ProtectedRoute><TeamManagement /></ProtectedRoute>} />
                  <Route path="/admin/job-roles" element={<ProtectedRoute><JobRoleManagement /></ProtectedRoute>} />
                  <Route path="/admin/contacts" element={<ProtectedRoute><ContactManagement /></ProtectedRoute>} />
                  <Route path="/admin/interns" element={<ProtectedRoute><InternManagement /></ProtectedRoute>} />
                  <Route path="/admin/courses" element={<ProtectedRoute><CourseManagement /></ProtectedRoute>} />
                  <Route path="/admin/photo" element={<ProtectedRoute><PhotoManagement /></ProtectedRoute>} />
                  <Route path="/admin/service-requests" element={<ProtectedRoute><ServiceRequestManagement /></ProtectedRoute>} />
                  <Route path="/development/web-development" element={<WebDevelopment />} />
                  <Route path="/development/social-media-marketing" element={<SocialMediaMarketing />} />
                  <Route path="/development/content-writing" element={<ContentWriting />} />
                  <Route path="/development/graphics-designer" element={<GraphicsDesigner />} />
                  <Route path="/development/software-development" element={<SoftwareDevelopment />} />
                  <Route path="/development/app-development" element={<AppDevelopment />} />
                  <Route path="/development/ai-ml" element={<AiMl />} />
                  <Route path="/development/government-tenders" element={<GovernmentTenders />} />
                  <Route path="/services/bulk-sms" element={<BulkSms />} />
                  <Route path="/services/voice-sms" element={<VoiceSms />} />
                  <Route path="/services/whatsapp-panel" element={<WhatsappPanel />} />
                  <Route path="/services/whatsapp-marketing" element={<WhatsappMarketing />} />
                  <Route path="/services/digital-election-campaign" element={<DigitalElectionCampaign />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
};

export default App;
