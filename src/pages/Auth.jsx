import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowLeft, Wand2 } from 'lucide-react';
import { seedDemoSession } from '../data.js';

export default function Auth({ mode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isSignup = mode === 'signup';

  const handleDemo = () => {
    setError('');
    setLoading(true);
    seedDemoSession();
    setTimeout(() => navigate('/dashboard'), 600);
  };

  const handleSubmit = () => {
    setError('');
    if (isSignup && !name.trim()) { setError('Please enter your name'); return; }
    if (!email.trim()) { setError('Please enter your email'); return; }
    if (!email.includes('@') || !email.includes('.')) { setError('Please enter a valid email address'); return; }
    if (!password) { setError('Please enter a password'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }

    setLoading(true);

    if (!isSignup) {
      // Login: check stored user
      const stored = localStorage.getItem('fv_user');
      if (!stored) {
        setLoading(false);
        setError('No account found. Please sign up first.');
        return;
      }
      try {
        const user = JSON.parse(stored);
        if (user.email !== email.trim()) {
          setLoading(false);
          setError('Email or password is incorrect.');
          return;
        }
        if (user.password && user.password !== password) {
          setLoading(false);
          setError('Email or password is incorrect.');
          return;
        }
        setTimeout(() => navigate('/dashboard'), 800);
      } catch {
        setLoading(false);
        setError('Something went wrong. Please try again.');
      }
      return;
    }

    // Signup: save user
    const user = {
      email: email.trim(),
      name: name.trim() || email.split('@')[0],
      password,
    };
    localStorage.setItem('fv_user', JSON.stringify(user));
    setTimeout(() => navigate('/onboarding'), 800);
  };

  const handleGoogle = () => {
    setError('');
    setLoading(true);
    // Mock Google OAuth: reuse an existing account if present, else create one.
    const existing = JSON.parse(localStorage.getItem('fv_user') || 'null');
    const user = existing?.email
      ? existing
      : { email: 'you@gmail.com', name: 'Google User' };
    localStorage.setItem('fv_user', JSON.stringify(user));
    setTimeout(() => navigate(user.profile ? '/dashboard' : '/onboarding'), 800);
  };

  const inputStyle = {
    width: '100%',
    padding: '13px 44px 13px 44px',
    borderRadius: 12,
    border: '1.5px solid rgba(74,29,143,0.15)',
    background: 'white',
    fontSize: 15,
    fontFamily: 'DM Sans,sans-serif',
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--cream)' }}>
      {/* Left panel — desktop only */}
      <div style={{
        display: 'none',
        flex: 1,
        background: 'var(--ink)',
        padding: '60px',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }} className="auth-left-panel">
        <style>{`@media(min-width:768px){.auth-left-panel{display:flex!important}}`}</style>

        <div style={{ position: 'absolute', top: '15%', right: '-10%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 60 }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#4A1D8F,#8B5CF6)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={18} color="white" />
          </div>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 600, color: 'white' }}>FitVision</span>
        </div>

        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 600, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
          Your personal<br />
          <span style={{ background: 'linear-gradient(135deg, #C9921A, #F0B94A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI stylist</span><br />
          awaits.
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 380 }}>
          Design any outfit, for any occasion. From Lagos owambe to corporate meetings — see it before you wear it.
        </p>

        {/* Floating outfit cards */}
        <div style={{ display: 'flex', gap: 12, marginTop: 48 }}>
          {[
            'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=200&q=80',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&q=80',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80',
          ].map((src, i) => (
            <div key={i} style={{ flex: 1, height: 160, borderRadius: 14, overflow: 'hidden', opacity: 0.75 }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 32px', overflowY: 'auto' }}>
        <style>{`@media(min-width:768px){.auth-right{max-width:480px!important;margin:0!important}}`}</style>

        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-soft)', fontSize: 14, cursor: 'pointer', marginBottom: 32, padding: 0, alignSelf: 'flex-start' }}>
          <ArrowLeft size={16} /> Back to home
        </button>

        <div style={{ marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg,#4A1D8F,#8B5CF6)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Sparkles size={22} color="white" />
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 34, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
            {isSignup ? 'Create account' : 'Welcome back'}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)' }}>
            {isSignup ? 'Start designing your perfect outfits' : 'Sign in to your FitVision account'}
          </p>
        </div>

        {/* Demo — one tap into the full prototype, no signup */}
        <button onClick={handleDemo} disabled={loading}
          style={{ width: '100%', padding: '14px', border: 'none', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 14.5, fontWeight: 600, fontFamily: 'DM Sans,sans-serif', cursor: 'pointer', marginBottom: 12, color: 'var(--ink)', background: 'linear-gradient(135deg, #F0B94A, #C9921A)', boxShadow: '0 4px 18px rgba(201,146,26,0.35)', transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <Wand2 size={17} /> {loading ? 'Loading demo...' : 'Explore the live demo'}
        </button>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-soft)', marginBottom: 20 }}>
          Jump straight in — no account needed.
        </p>

        {/* Google */}
        <button style={{ width: '100%', padding: '13px', border: '1.5px solid rgba(74,29,143,0.15)', background: 'white', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 14, fontFamily: 'DM Sans,sans-serif', cursor: 'pointer', marginBottom: 20, transition: 'border 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--plum-light)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(74,29,143,0.15)'}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/><path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/><path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/><path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/></svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(74,29,143,0.1)' }} />
          <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>or with email</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(74,29,143,0.1)' }} />
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#DC2626' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {isSignup && (
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 13, pointerEvents: 'none' }}>👤</span>
              <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            </div>
          )}
          <div style={{ position: 'relative' }}>
            <Mail size={16} color="#9CA3AF" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={16} color="#9CA3AF" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input type={showPw ? 'text' : 'password'} placeholder="Password (min 6 characters)" value={password} onChange={e => setPassword(e.target.value)} style={{ ...inputStyle, paddingRight: 44 }} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            <button onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              {showPw ? <EyeOff size={16} color="#9CA3AF" /> : <Eye size={16} color="#9CA3AF" />}
            </button>
          </div>
        </div>

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}
          style={{ width: '100%', justifyContent: 'center', padding: '15px', marginTop: 20, fontSize: 15 }}>
          {loading ? 'Just a moment...' : isSignup ? 'Create Account' : 'Sign In'}
        </button>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--ink-soft)' }}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <Link to={isSignup ? '/login' : '/signup'} style={{ color: 'var(--plum-light)', fontWeight: 600 }}>
            {isSignup ? 'Sign in' : 'Sign up free'}
          </Link>
        </p>
      </div>
    </div>
  );
}
