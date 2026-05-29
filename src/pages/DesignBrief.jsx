import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Upload, X } from 'lucide-react';
import BottomNav from '../components/BottomNav.jsx';

const colors = ['#C0392B','#E67E22','#F1C40F','#27AE60','#1ABC9C','#2980B9','#8E44AD','#E91E90','#FFFFFF','#1A1A2E','#795548','#C9921A'];
const palettes = ['Earth Tones','Pastels','Bold Primaries','Neutrals','Deep Jewels','All-White','All-Black','Metallics'];
const fabrics = ['Ankara','Aso-oke','Lace','Chiffon','Cotton','Denim','Velvet','Satin','Chantilly Lace','Kente','Adire','Silk','Chanel Tweed'];

export default function DesignBrief() {
  const navigate = useNavigate();
  const occasion = localStorage.getItem('fv_design_occasion') || 'Event';
  const [brief, setBrief] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPalette, setSelectedPalette] = useState('');
  const [fabric, setFabric] = useState('');
  const [refImage, setRefImage] = useState(null);
  const fileRef = useRef();

  const toggleColor = (c) => setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRefImage(url);
    }
  };

  const generate = () => {
    if (!brief.trim()) return;
    const designData = { occasion, brief, colors: selectedColors, palette: selectedPalette, fabric };
    localStorage.setItem('fv_design_current', JSON.stringify(designData));
    navigate('/design/generating');
  };

  return (
    <div className="page-wrap has-bottom-nav" style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: 'white', padding: '52px 24px 20px', borderBottom: '1px solid rgba(74,29,143,0.06)' }}>
        <button onClick={() => navigate('/design/occasion')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--ink-soft)', fontSize: 14, cursor: 'pointer', marginBottom: 12, padding: 0 }}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--blush)', borderRadius: 50, padding: '4px 12px', marginBottom: 8 }}>
          <span style={{ fontSize: 12 }}>✨</span>
          <span style={{ fontSize: 12, color: 'var(--plum)', fontWeight: 600 }}>{occasion}</span>
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 28, fontWeight: 600 }}>Describe your look</h1>
      </div>

      <div style={{ padding: '20px 20px 100px', overflowY: 'auto' }}>
        {/* Brief */}
        <div style={{ background: 'white', borderRadius: 16, padding: '18px', marginBottom: 14, border: '1px solid rgba(74,29,143,0.08)' }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--plum-light)', letterSpacing: '0.06em', display: 'block', marginBottom: 10 }}>OUTFIT BRIEF *</label>
          <textarea value={brief} onChange={e => setBrief(e.target.value)}
            placeholder="e.g. A fitted Ankara gown with a boat neckline, puff sleeves, and a thigh-high split. Gold accessories. Mid-length..."
            style={{ width: '100%', minHeight: 110, resize: 'none', border: 'none', outline: 'none', fontSize: 14, lineHeight: 1.6, color: 'var(--ink)', fontFamily: 'DM Sans,sans-serif', background: 'transparent', boxSizing: 'border-box' }} />
          <p style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 6 }}>{brief.length} characters — be as detailed as you like</p>
        </div>

        {/* Colour section */}
        <div style={{ background: 'white', borderRadius: 16, padding: '18px', marginBottom: 14, border: '1px solid rgba(74,29,143,0.08)' }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--plum-light)', letterSpacing: '0.06em', display: 'block', marginBottom: 12 }}>COLOUR PALETTE</label>
          {/* Preset palettes */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 12, borderBottom: '1px solid rgba(74,29,143,0.06)', marginBottom: 12 }}>
            {palettes.map(p => (
              <button key={p} onClick={() => setSelectedPalette(p === selectedPalette ? '' : p)}
                style={{ flexShrink: 0, padding: '6px 12px', borderRadius: 50, fontSize: 11, fontWeight: 600, border: `1.5px solid ${p === selectedPalette ? 'var(--plum)' : 'rgba(74,29,143,0.1)'}`, background: p === selectedPalette ? 'var(--blush)' : 'transparent', color: p === selectedPalette ? 'var(--plum)' : 'var(--ink-soft)', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'DM Sans,sans-serif' }}>
                {p}
              </button>
            ))}
          </div>
          {/* Colour swatches */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {colors.map(c => {
              const sel = selectedColors.includes(c);
              return (
                <button key={c} onClick={() => toggleColor(c)}
                  style={{
                    width: 36, height: 36, borderRadius: '50%', background: c, cursor: 'pointer',
                    border: sel ? '3px solid var(--plum)' : c === '#FFFFFF' ? '2px solid #E5E7EB' : '2px solid transparent',
                    boxShadow: sel ? '0 0 0 2px white, 0 0 0 4px var(--plum)' : '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'all 0.15s', flexShrink: 0,
                    outline: 'none',
                  }} />
              );
            })}
          </div>
        </div>

        {/* Fabric */}
        <div style={{ background: 'white', borderRadius: 16, padding: '18px', marginBottom: 14, border: '1px solid rgba(74,29,143,0.08)' }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--plum-light)', letterSpacing: '0.06em', display: 'block', marginBottom: 12 }}>FABRIC / MATERIAL</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {fabrics.map(f => (
              <button key={f} onClick={() => setFabric(f === fabric ? '' : f)}
                style={{ padding: '8px 14px', borderRadius: 50, fontSize: 12, fontWeight: 500, border: `1.5px solid ${f === fabric ? 'var(--plum)' : 'rgba(74,29,143,0.1)'}`, background: f === fabric ? 'linear-gradient(135deg,var(--plum),var(--plum-glow))' : 'white', color: f === fabric ? 'white' : 'var(--ink)', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', transition: 'all 0.15s' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Reference image */}
        <div style={{ background: 'white', borderRadius: 16, padding: '18px', marginBottom: 20, border: '1px solid rgba(74,29,143,0.08)' }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--plum-light)', letterSpacing: '0.06em', display: 'block', marginBottom: 12 }}>MOOD BOARD / REFERENCE <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--ink-soft)' }}>(optional)</span></label>
          {refImage ? (
            <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', height: 140 }}>
              <img src={refImage} alt="Reference" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => setRefImage(null)} style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, background: 'rgba(14,11,26,0.7)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={14} color="white" />
              </button>
            </div>
          ) : (
            <button onClick={() => fileRef.current?.click()}
              style={{ width: '100%', padding: '24px', border: '2px dashed rgba(74,29,143,0.2)', borderRadius: 12, background: 'var(--blush)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Upload size={20} color="var(--plum-light)" />
              <span style={{ fontSize: 13, color: 'var(--plum-light)', fontWeight: 500 }}>Upload inspiration image</span>
              <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>PNG, JPG up to 10MB</span>
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        </div>

        <button className="btn-primary" onClick={generate} disabled={!brief.trim()}
          style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 16, opacity: brief.trim() ? 1 : 0.4 }}>
          <Sparkles size={18} /> Generate My Look
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
