import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function Auth({ mode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isSignup = mode === 'signup';

  const handleSubmit = () => {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    if (!email.includes('@')) { setError('Please enter a valid email'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true); setError('');
    const user = { email, name: email.split('@')[0] };
    localStorage.setItem('fv_user', JSON.stringify(user));
    setTimeout(() => { navigate(isSignup ? '/onboarding' : '/dashboard'); }, 900);
  };

  const inputStyle = {
    width: '100%', padding: '14px 44px 14px 44px', borderRadius: 12,
    border: '1.5px solid rgba(74,29,143,0.15)', background: 'white',
    fontSize: 15, fontFamily: 'DM Sans,sans-serif', color: 'var(--ink)',
    outline: 'none', transition: 'border 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <div className="page-wrap" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--cream)' }}>
      <div style={{ padding: '20px 24px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-soft)', fontSize: 14, cursor: 'pointer', padding: '6px 0' }}>
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div style={{ flex: 1, padding: '20px 28px 40px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#4A1D8F,#8B5CF6)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Sparkles size={24} color="white" />
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 32, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
            {isSignup ? 'Your personal stylist awaits' : 'Sign in to your FitVision'}
          </p>
        </div>

        {/* Google button */}
        <button style={{ width: '100%', padding: '14px', border: '1.5px solid rgba(74,29,143,0.15)', background: 'white', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 15, fontFamily: 'DM Sans,sans-serif', cursor: 'pointer', marginBottom: 20 }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/><path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/><path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/><path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/></svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(74,29,143,0.1)' }} />
          <span style={{ fontSize: 12, color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>or with email</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(74,29,143,0.1)' }} />
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#DC2626' }}>
            {error}
          </div>
        )}

        <div style={{ position: 'relative', marginBottom: 14 }}>
          <Mail size={16} color="#9CA3AF" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        </div>
        <div style={{ position: 'relative', marginBottom: 24 }}>
          <Lock size={16} color="#9CA3AF" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input type={showPw ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, paddingRight: 44 }} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          <button onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {showPw ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
          </button>
        </div>

        <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '15px', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Just a moment...' : isSignup ? 'Create Account' : 'Sign In'}
        </button>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--ink-soft)' }}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <Link to={isSignup ? '/login' : '/signup'} style={{ color: 'var(--plum-light)', fontWeight: 600 }}>
            {isSignup ? 'Sign in' : 'Sign up'}
          </Link>
        </p>
      </div>
    </div>
  );
}
