import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight, Heart } from 'lucide-react';
import BottomNav from '../components/BottomNav.jsx';
import { sampleLookbook } from '../data.js';

const quickOccasions = [
  { label: 'Owambe', emoji: '🎉' },
  { label: 'Wedding', emoji: '💍' },
  { label: 'Office', emoji: '💼' },
  { label: 'Church', emoji: '⛪' },
  { label: 'Date Night', emoji: '🌙' },
  { label: 'Casual', emoji: '👕' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('fv_user') || '{"name":"Friend"}');
  const savedDesigns = JSON.parse(localStorage.getItem('fv_lookbook') || 'null') || sampleLookbook;
  const name = user.name || user.email?.split('@')[0] || 'Friend';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="page-wrap has-bottom-nav" style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Top header */}
      <div style={{ background: 'linear-gradient(160deg, var(--ink) 0%, #1E1040 100%)', padding: '52px 24px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>{greeting},</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 30, fontWeight: 600, color: 'white', textTransform: 'capitalize', lineHeight: 1.1 }}>{name} ✨</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>What are you dressing for today?</p>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        {/* Hero CTA card */}
        <div onClick={() => navigate('/design/occasion')} style={{
          background: 'linear-gradient(135deg, var(--plum) 0%, var(--plum-glow) 100%)',
          borderRadius: 20, padding: '24px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 8px 32px rgba(107,53,196,0.4)', marginBottom: 20, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -30, right: 40, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Sparkles size={18} color="#F0B94A" />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500, letterSpacing: '0.04em' }}>AI DESIGN STUDIO</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 26, fontWeight: 600, color: 'white', lineHeight: 1.15 }}>Design My<br />Outfit</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>Describe it. Visualise it. Wear it.</p>
          </div>
          <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.15)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
            <ChevronRight size={22} color="white" />
          </div>
        </div>

        {/* Quick Occasions */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Quick Start</h3>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {quickOccasions.map(occ => (
              <button key={occ.label} onClick={() => {
                localStorage.setItem('fv_design_occasion', occ.label);
                navigate('/design/brief');
              }} style={{
                flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 5, padding: '12px 14px', borderRadius: 14, border: '1.5px solid rgba(74,29,143,0.1)',
                background: 'white', cursor: 'pointer', minWidth: 70, transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: 22 }}>{occ.emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>{occ.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Designs */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 600 }}>Recent Designs</h3>
            <button onClick={() => navigate('/lookbook')} style={{ fontSize: 13, color: 'var(--plum-light)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {savedDesigns.slice(0, 4).map(design => (
              <div key={design.id} onClick={() => navigate('/lookbook')} style={{ borderRadius: 14, overflow: 'hidden', cursor: 'pointer', position: 'relative', aspectRatio: '3/4' }}>
                <img src={design.image} alt={design.description} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,11,26,0.75) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 10px 10px' }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{design.occasion}</span>
                </div>
                <div style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                  <Heart size={12} color="white" fill="white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
