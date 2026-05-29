import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Sparkles, BookOpen, MapPin, User } from 'lucide-react';

const tabs = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/design/occasion', icon: Sparkles, label: 'Design' },
  { path: '/lookbook', icon: BookOpen, label: 'Lookbook' },
  { path: '/vendors', icon: MapPin, label: 'Vendors' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const active = tabs.findIndex(t => location.pathname.startsWith(t.path));

  return (
    <nav className="bottom-nav">
      {tabs.map((tab, i) => {
        const Icon = tab.icon;
        const isActive = i === active;
        return (
          <button key={tab.path} onClick={() => navigate(tab.path)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '10px 0 8px', background: 'none', border: 'none',
              cursor: 'pointer', gap: 3, transition: 'all 0.2s',
            }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              background: isActive ? 'linear-gradient(135deg,#4A1D8F,#8B5CF6)' : 'transparent',
              transition: 'all 0.2s',
            }}>
              <Icon size={18} color={isActive ? 'white' : '#9CA3AF'} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span style={{
              fontSize: 10, fontWeight: isActive ? 600 : 400,
              color: isActive ? '#4A1D8F' : '#9CA3AF',
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.02em',
            }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
