import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight, Heart, TrendingUp } from 'lucide-react';
import { sampleLookbook } from '../data.js';

const quickOccasions = [
  { label: 'Owambe', emoji: '🎉' },
  { label: 'Wedding', emoji: '💍' },
  { label: 'Office', emoji: '💼' },
  { label: 'Church', emoji: '⛪' },
  { label: 'Date Night', emoji: '🌙' },
  { label: 'Casual', emoji: '👕' },
  { label: 'Gala', emoji: '🥂' },
  { label: 'Beach', emoji: '🌊' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('fv_user') || '{"name":"Friend"}');
  const savedDesigns = JSON.parse(localStorage.getItem('fv_lookbook') || 'null') || sampleLookbook;
  const name = user.name || user.email?.split('@')[0] || 'Friend';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="has-bottom-nav" style={{ minHeight: '100vh' }}>
      <div style={{ padding: '32px 0 24px' }}>
        {/* Hero header */}
        <div className="dashboard-hero" style={{
          background: 'linear-gradient(160deg, var(--ink) 0%, #1E1040 100%)',
          borderRadius: 20,
          padding: '32px 28px',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>{greeting},</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, color: 'white', textTransform: 'capitalize', lineHeight: 1.1 }}>{name} ✨</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>What are you dressing for today?</p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          {[
            { label: 'Designs', val: savedDesigns.length, icon: Sparkles },
            { label: 'Saved', val: savedDesigns.length, icon: Heart },
            { label: 'Trending', val: '8 new', icon: TrendingUp },
          ].map(({ label, val, icon: Icon }) => (
            <div key={label} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Icon size={14} color="rgba(255,255,255,0.4)" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 18, fontFamily: 'Cormorant Garamond,serif', color: 'white', fontWeight: 600 }}>{val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{label}</div>
            </div>
          ))}
        </div>
        </div>

        {/* Hero CTA */}
        <div onClick={() => navigate('/design/occasion')}
          style={{
            background: 'linear-gradient(135deg, var(--plum) 0%, var(--plum-glow) 100%)',
            borderRadius: 20, padding: '24px 28px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 8px 32px rgba(107,53,196,0.4)', marginBottom: 24,
            position: 'relative', overflow: 'hidden', transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Sparkles size={17} color="#F0B94A" />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.06em' }}>AI DESIGN STUDIO</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'white', lineHeight: 1.15 }}>Design My Outfit</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>Describe it. Visualise it. Wear it.</p>
          </div>
          <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.15)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
            <ChevronRight size={22} color="white" />
          </div>
        </div>

        {/* Quick occasions */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 22, fontWeight: 600, marginBottom: 14 }}>Quick Start</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 10 }}>
            {quickOccasions.map(occ => (
              <button key={occ.label} onClick={() => {
                localStorage.setItem('fv_design_occasion', occ.label);
                navigate('/design/brief');
              }} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 6, padding: '14px 10px', borderRadius: 14,
                border: '1.5px solid rgba(74,29,143,0.1)', background: 'white',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--plum)'; e.currentTarget.style.background = 'var(--blush)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,29,143,0.1)'; e.currentTarget.style.background = 'white'; }}>
                <span style={{ fontSize: 24 }}>{occ.emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-soft)', textAlign: 'center', lineHeight: 1.2 }}>{occ.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent designs */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 22, fontWeight: 600 }}>Recent Designs</h3>
            <button onClick={() => navigate('/lookbook')} style={{ fontSize: 13, color: 'var(--plum-light)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>See all →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {savedDesigns.slice(0, 6).map(design => (
              <div key={design.id} onClick={() => navigate('/lookbook')}
                style={{ borderRadius: 14, overflow: 'hidden', cursor: 'pointer', position: 'relative', aspectRatio: '3/4', boxShadow: '0 4px 16px rgba(14,11,26,0.1)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <img src={design.image} alt={design.description} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,11,26,0.75) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px' }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{design.occasion}</span>
                </div>
                <div style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, background: 'rgba(233,30,99,0.8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={12} color="white" fill="white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
