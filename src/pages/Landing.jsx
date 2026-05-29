import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Eye, MapPin, Scissors } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="page-wrap" style={{ background: 'var(--ink)', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Decorative orbs */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 280, height: 280,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 180, left: -60, width: 200, height: 200,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,146,26,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Top nav */}
      <nav style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#4A1D8F,#8B5CF6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: 'white', letterSpacing: '-0.01em' }}>FitVision</span>
        </div>
        <button onClick={() => navigate('/login')} style={{ color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 50, padding: '8px 20px', fontSize: 14, fontFamily: 'DM Sans,sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}>
          Sign in
        </button>
      </nav>

      {/* Hero */}
      <div style={{ padding: '40px 28px 0', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 50, padding: '5px 14px', marginBottom: 24 }}>
          <Sparkles size={12} color="#8B5CF6" />
          <span style={{ fontSize: 12, color: '#C4B5FD', fontWeight: 500, letterSpacing: '0.04em' }}>AI-Powered Fashion</span>
        </div>

        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 52, fontWeight: 600, color: 'white', lineHeight: 1.05, marginBottom: 8 }}>
          See it before<br />
          <span style={{ background: 'linear-gradient(135deg, #C9921A, #F0B94A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>you wear it.</span>
        </h1>

        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginTop: 20, marginBottom: 36, maxWidth: 320 }}>
          Describe your dream outfit. See it instantly. Find local tailors and boutiques who can make it real.
        </p>

        <button className="btn-primary" onClick={() => navigate('/signup')} style={{ width: '100%', justifyContent: 'center', padding: '16px 32px', fontSize: 16 }}>
          Design My Outfit <ArrowRight size={18} />
        </button>
        <button onClick={() => navigate('/login')} style={{ width: '100%', marginTop: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', borderRadius: 50, padding: '14px 32px', fontSize: 15, fontFamily: 'DM Sans,sans-serif', cursor: 'pointer' }}>
          I already have an account
        </button>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 48 }}>
          {[
            { icon: Eye, text: 'Visualise any outfit instantly with AI' },
            { icon: Scissors, text: 'Describe your style in your own words' },
            { icon: MapPin, text: 'Find vetted tailors & boutiques near you' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'rgba(255,255,255,0.05)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ width: 36, height: 36, background: 'rgba(139,92,246,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color="#A78BFA" />
              </div>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Floating outfit preview strip */}
        <div style={{ display: 'flex', gap: 10, marginTop: 40, marginBottom: 40, overflow: 'hidden', borderRadius: 16 }}>
          {[
            'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=200&q=70',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&q=70',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=70',
          ].map((src, i) => (
            <div key={i} style={{ flex: 1, height: 140, borderRadius: 12, overflow: 'hidden', opacity: 0.75 }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
