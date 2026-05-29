import { Routes, Route, Navigate } from 'react-router-dom';
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

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('fv_user');
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Auth mode="signup" />} />
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/design/occasion" element={<ProtectedRoute><DesignOccasion /></ProtectedRoute>} />
      <Route path="/design/brief" element={<ProtectedRoute><DesignBrief /></ProtectedRoute>} />
      <Route path="/design/generating" element={<ProtectedRoute><Generating /></ProtectedRoute>} />
      <Route path="/design/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
      <Route path="/lookbook" element={<ProtectedRoute><Lookbook /></ProtectedRoute>} />
      <Route path="/vendors" element={<ProtectedRoute><Vendors /></ProtectedRoute>} />
      <Route path="/vendors/:id" element={<ProtectedRoute><VendorProfile /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
