import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Share2, Pencil, MapPin, X, Send } from 'lucide-react';
import { occasionOutfitImages } from '../data.js';

const outfitDescriptions = [
  { style: 'Look 1 — Draped Elegance', desc: 'A flowing silhouette with asymmetric draping. The fabric catches light beautifully, creating movement with every step.' },
  { style: 'Look 2 — Structured Power', desc: 'Clean lines and a fitted cut that commands attention. Tailored to perfection with subtle embellishments at the neckline.' },
  { style: 'Look 3 — Relaxed Luxe', desc: 'Effortlessly chic with a relaxed fit and rich texture. The kind of outfit that looks expensive without trying.' },
];

export default function Results() {
  const navigate = useNavigate();
  const design = JSON.parse(localStorage.getItem('fv_design_current') || '{}');
  const occasion = design.occasion || 'Event';
  const images = occasionOutfitImages[occasion] || occasionOutfitImages['default'];
  const [saved, setSaved] = useState([false, false, false]);
  const [refineOpen, setRefineOpen] = useState(false);
  const [refineText, setRefineText] = useState('');
  const [activeIdx, setActiveIdx] = useState(null);

  const saveDesign = (i) => {
    const newSaved = [...saved]; newSaved[i] = !newSaved[i]; setSaved(newSaved);
    if (!saved[i]) {
      const lookbook = JSON.parse(localStorage.getItem('fv_lookbook') || '[]');
      lookbook.unshift({ id: Date.now(), image: images[i], occasion, description: outfitDescriptions[i].style, date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) });
      localStorage.setItem('fv_lookbook', JSON.stringify(lookbook));
    }
  };

  const share = () => {
    if (navigator.share) navigator.share({ title: 'My FitVision Look', text: `Check out this outfit I designed for ${occasion}!` });
    else { navigator.clipboard?.writeText('Check out my FitVision outfit!'); alert('Link copied!'); }
  };

  return (
    <div className="has-bottom-nav" style={{ minHeight: '100vh' }}>
      <div style={{ padding: '32px 0 24px' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(26px,4vw,36px)', fontWeight: 600, marginBottom: 4 }}>Your FitVision Looks</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          <span className="tag">For: {occasion}</span>
          {design.fabric && <span className="tag">{design.fabric}</span>}
          {design.palette && <span className="tag">{design.palette}</span>}
        </div>

        {/* Results grid — 1 col mobile, 3 col desktop */}
        <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, marginBottom: 28 }}>
          {images.map((img, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both', background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 20px rgba(14,11,26,0.08)' }}>
              <div style={{ position: 'relative', height: 340 }}>
                <img src={img} alt={outfitDescriptions[i].style} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
                  <button onClick={() => saveDesign(i)} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                    <Heart size={16} color={saved[i] ? '#E91E63' : '#374151'} fill={saved[i] ? '#E91E63' : 'none'} />
                  </button>
                  <button onClick={share} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                    <Share2 size={16} color="#374151" />
                  </button>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(14,11,26,0.65) 0%, transparent 60%)', padding: '20px 16px 12px' }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Look {i + 1} of 3</span>
                </div>
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 19, fontWeight: 600, marginBottom: 6 }}>{outfitDescriptions[i].style}</h3>
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: 14 }}>{outfitDescriptions[i].desc}</p>
                <button onClick={() => { setActiveIdx(i); setRefineOpen(true); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--blush)', border: 'none', borderRadius: 50, padding: '8px 16px', fontSize: 13, color: 'var(--plum)', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', transition: 'background 0.2s' }}>
                  <Pencil size={13} /> Refine this look
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary" onClick={() => navigate('/vendors')} style={{ padding: '15px 32px', fontSize: 15 }}>
          <MapPin size={17} /> Find Vendors Near Me
        </button>
      </div>

      {/* Refine sheet */}
      {refineOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(14,11,26,0.55)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={() => setRefineOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 600, background: 'white', borderRadius: '20px 20px 0 0', padding: '20px 24px 40px' }}>
            <div style={{ width: 36, height: 4, background: '#E5E7EB', borderRadius: 99, margin: '0 auto 20px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 22, fontWeight: 600 }}>Refine Look {activeIdx + 1}</h3>
              <button onClick={() => setRefineOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="#9CA3AF" /></button>
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16 }}>What would you like to change?</p>
            <textarea value={refineText} onChange={e => setRefineText(e.target.value)}
              placeholder="e.g. Make the neckline higher, add long sleeves, try it in burgundy..."
              style={{ width: '100%', minHeight: 90, resize: 'none', border: '1.5px solid rgba(74,29,143,0.12)', borderRadius: 12, padding: '12px 14px', fontSize: 14, fontFamily: 'DM Sans,sans-serif', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }} />
            <button className="btn-primary" onClick={() => { setRefineOpen(false); navigate('/design/generating'); }} style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}>
              <Send size={15} /> Apply Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
