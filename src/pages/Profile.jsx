import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Ruler, Sparkles, BookOpen, MapPin } from 'lucide-react';
import { sampleLookbook } from '../data.js';

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('fv_user') || '{}');
  const name = user.name || user.email?.split('@')[0] || 'User';
  const profile = user.profile || {};
  const lookbook = JSON.parse(localStorage.getItem('fv_lookbook') || 'null') || sampleLookbook;
  const [measurements, setMeasurements] = useState(user.measurements || { chest: '', waist: '', hips: '', height: '' });
  const [saved, setSaved] = useState(false);

  const saveMeasurements = () => {
    const updated = { ...user, measurements };
    localStorage.setItem('fv_user', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle = {
    width: '100%', padding: '11px 40px 11px 14px', borderRadius: 10,
    border: '1.5px solid rgba(74,29,143,0.12)', background: 'var(--cream)',
    fontSize: 14, fontFamily: 'DM Sans,sans-serif', outline: 'none', boxSizing: 'border-box',
    transition: 'border 0.2s',
  };

  const card = { background: 'white', borderRadius: 16, padding: '20px', marginBottom: 14, border: '1px solid rgba(74,29,143,0.06)', boxShadow: '0 2px 8px rgba(14,11,26,0.04)' };

  return (
    <div className="has-bottom-nav" style={{ minHeight: '100vh' }}>
      {/* Profile header */}
      <div style={{ background: 'linear-gradient(160deg, var(--ink) 0%, #1E1040 100%)', borderRadius: 20, padding: '28px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg,var(--plum),var(--plum-glow))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 24, fontFamily: 'Cormorant Garamond,serif', color: 'white', fontWeight: 600, textTransform: 'uppercase' }}>
            {name[0]}
          </div>
          <div>
            <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(22px,3vw,28px)', fontWeight: 600, color: 'white', textTransform: 'capitalize', lineHeight: 1.1 }}>{name}</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{user.email || 'FitVision Member'}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[{ icon: Sparkles, label: 'Designs', val: lookbook.length }, { icon: BookOpen, label: 'Saved Looks', val: lookbook.length }, { icon: MapPin, label: 'Vendors', val: 3 }].map(({ icon: Icon, label, val }) => (
            <div key={label} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Icon size={14} color="rgba(255,255,255,0.5)" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 20, fontFamily: 'Cormorant Garamond,serif', color: 'white', fontWeight: 600 }}>{val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-col on desktop */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0 }}>
        <div>
          {/* Style profile */}
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 600 }}>Style Profile</h2>
              <button onClick={() => navigate('/onboarding')} style={{ background: 'var(--blush)', border: 'none', borderRadius: 8, padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 12, color: 'var(--plum)', fontWeight: 600, fontFamily: 'DM Sans,sans-serif' }}>
                <Edit2 size={12} /> Edit
              </button>
            </div>
            {profile.bodyType ? (
              <>
                <div style={{ marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>BODY TYPE</span>
                  <p style={{ fontSize: 14, color: 'var(--ink)', textTransform: 'capitalize', marginTop: 3 }}>{profile.bodyType}</p>
                </div>
                {profile.aesthetics?.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>AESTHETIC</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                      {profile.aesthetics.map(a => <span key={a} className="tag" style={{ fontSize: 11 }}>{a}</span>)}
                    </div>
                  </div>
                )}
                {profile.budget && (
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>BUDGET</span>
                    <p style={{ fontSize: 14, color: 'var(--ink)', marginTop: 3 }}>Up to ₦{Number(profile.budget).toLocaleString()}</p>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 14 }}>Complete your style profile for better recommendations.</p>
                <button className="btn-primary" onClick={() => navigate('/onboarding')} style={{ padding: '10px 20px', fontSize: 13 }}>
                  <Sparkles size={14} /> Complete Profile
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          {/* Measurements */}
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Ruler size={16} color="var(--plum)" />
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 600 }}>Measurements</h2>
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16 }}>All measurements in cm — shared with tailors.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              {[['chest', 'Chest'], ['waist', 'Waist'], ['hips', 'Hips'], ['height', 'Height']].map(([key, lbl]) => (
                <div key={key}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', letterSpacing: '0.04em', display: 'block', marginBottom: 5 }}>{lbl.toUpperCase()}</label>
                  <div style={{ position: 'relative' }}>
                    <input type="number" placeholder="0" value={measurements[key]}
                      onChange={e => setMeasurements(m => ({ ...m, [key]: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--plum-light)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(74,29,143,0.12)'} />
                    <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--ink-soft)' }}>cm</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={saveMeasurements} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              {saved ? '✓ Saved successfully!' : 'Save Measurements'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
