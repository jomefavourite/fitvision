import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Share2, Trash2, X, Sparkles } from 'lucide-react';
import { sampleLookbook } from '../data.js';

export default function Lookbook() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem('fv_lookbook') || 'null');
  const [designs, setDesigns] = useState(stored || sampleLookbook);
  const [selected, setSelected] = useState(null);

  const deleteDesign = (id) => {
    const updated = designs.filter(d => d.id !== id);
    setDesigns(updated);
    localStorage.setItem('fv_lookbook', JSON.stringify(updated));
    setSelected(null);
  };

  const share = () => {
    if (navigator.share) navigator.share({ title: 'My FitVision Look', text: 'Check out my outfit design!' });
    else { navigator.clipboard?.writeText('Check out my FitVision outfit!'); alert('Copied!'); }
  };

  return (
    <div className="has-bottom-nav" style={{ minHeight: '100vh' }}>
      <div style={{ padding: '32px 0 0' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(26px,4vw,36px)', fontWeight: 600, marginBottom: 4 }}>My Lookbook</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 24 }}>{designs.length} saved {designs.length === 1 ? 'design' : 'designs'}</p>

        {designs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ width: 80, height: 80, background: 'var(--blush)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Heart size={32} color="var(--plum-light)" />
            </div>
            <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 24, fontWeight: 600, marginBottom: 8 }}>No saved looks yet</h3>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 24 }}>Design your first outfit and save it here</p>
            <button className="btn-primary" onClick={() => navigate('/design/occasion')}>
              <Sparkles size={16} /> Design My First Look
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
            {designs.map(design => (
              <div key={design.id} onClick={() => setSelected(design)}
                style={{ borderRadius: 16, overflow: 'hidden', cursor: 'pointer', position: 'relative', aspectRatio: '3/4', boxShadow: '0 4px 16px rgba(14,11,26,0.1)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <img src={design.image} alt={design.description} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,11,26,0.8) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px' }}>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginBottom: 2 }}>{design.occasion}</p>
                  <p style={{ fontSize: 11, color: 'white', lineHeight: 1.3 }}>{design.description}</p>
                </div>
                <div style={{ position: 'absolute', top: 10, right: 10, width: 28, height: 28, background: 'rgba(233,30,99,0.85)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={12} color="white" fill="white" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(14,11,26,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 20, overflow: 'hidden', maxWidth: 480, width: '100%', boxShadow: '0 24px 64px rgba(14,11,26,0.3)' }}>
            <div style={{ position: 'relative', height: 320 }}>
              <img src={selected.image} alt={selected.description} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, background: 'rgba(14,11,26,0.6)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                <X size={16} color="white" />
              </button>
            </div>
            <div style={{ padding: '20px 24px 28px' }}>
              <span className="tag" style={{ marginBottom: 10 }}>{selected.occasion}</span>
              <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 22, fontWeight: 600, marginTop: 10, marginBottom: 4 }}>{selected.description}</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 20 }}>Saved {selected.date}</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={share} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Share2 size={15} /> Share
                </button>
                <button onClick={() => deleteDesign(selected.id)}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#FEF2F2', color: '#DC2626', border: '1.5px solid #FECACA', borderRadius: 50, padding: '13px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }}>
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
