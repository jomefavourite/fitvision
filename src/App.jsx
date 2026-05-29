import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Auth from './pages/Auth.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DesignOccasion from './pages/DesignOccasion.jsx';
import DesignBrief from './pages/DesignBrief.jsx';
import Generating from './pages/Generating.jsx';
import Results from './pages/Results.jsx';
import Lookbook from './pages/Lookbook.jsx';
import Vendors from './pages/Vendors.jsx';
import VendorProfile from './pages/VendorProfile.jsx';
import Profile from './pages/Profile.jsx';
import Sidebar from './components/Sidebar.jsx';
import BottomNav from './components/BottomNav.jsx';

function isLoggedIn() {
  try {
    const user = localStorage.getItem('fv_user');
    return !!user && !!JSON.parse(user)?.email;
  } catch { return false; }
}

function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  return isLoggedIn() ? <Navigate to="/dashboard" replace /> : children;
}

function AuthenticatedLayout({ children }) {
  return (
    <div className="app-authenticated">
      <Sidebar />
      <main className="main-content">
        <div className="content-inner">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Auth mode="signup" /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Auth mode="login" /></PublicRoute>} />

      {/* Onboarding - protected but no sidebar yet */}
      <Route path="/onboarding" element={
        <ProtectedRoute><Onboarding /></ProtectedRoute>
      } />

      {/* Authenticated routes with sidebar + bottom nav */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Dashboard /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/design/occasion" element={
        <ProtectedRoute>
          <AuthenticatedLayout><DesignOccasion /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/design/brief" element={
        <ProtectedRoute>
          <AuthenticatedLayout><DesignBrief /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/design/generating" element={
        <ProtectedRoute><Generating /></ProtectedRoute>
      } />
      <Route path="/design/results" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Results /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/lookbook" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Lookbook /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/vendors" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Vendors /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/vendors/:id" element={
        <ProtectedRoute>
          <AuthenticatedLayout><VendorProfile /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Profile /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to={isLoggedIn() ? '/dashboard' : '/'} replace />} />
    </Routes>
  );
}
