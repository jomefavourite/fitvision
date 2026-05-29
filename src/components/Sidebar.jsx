import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Sparkles, BookOpen, MapPin, User, LogOut } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/design/occasion', icon: Sparkles, label: 'Design' },
  { path: '/lookbook', icon: BookOpen, label: 'Lookbook' },
  { path: '/vendors', icon: MapPin, label: 'Vendors' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const signOut = () => {
    localStorage.removeItem('fv_user');
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('fv_user') || '{}');
  const name = user.name || user.email?.split('@')[0] || 'User';

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(74,29,143,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#4A1D8F,#8B5CF6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>FitVision</span>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname.startsWith(path);
          return (
            <button key={path} onClick={() => navigate(path)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 12, border: 'none',
                background: isActive ? 'linear-gradient(135deg, rgba(74,29,143,0.12), rgba(139,92,246,0.08))' : 'transparent',
                color: isActive ? 'var(--plum)' : 'var(--ink-soft)',
                fontSize: 14, fontWeight: isActive ? 600 : 400,
                fontFamily: 'DM Sans, sans-serif',
                cursor: 'pointer', marginBottom: 4,
                transition: 'all 0.2s',
                borderLeft: isActive ? '3px solid var(--plum)' : '3px solid transparent',
              }}>
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* User + signout */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(74,29,143,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--blush)', borderRadius: 12, marginBottom: 8 }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,var(--plum),var(--plum-glow))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 13, color: 'white', fontWeight: 700, textTransform: 'uppercase' }}>{name[0]}</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', textTransform: 'capitalize', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</p>
            <p style={{ fontSize: 11, color: 'var(--ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email || ''}</p>
          </div>
        </div>
        <button onClick={signOut}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, border: 'none', background: 'transparent', color: '#DC2626', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
