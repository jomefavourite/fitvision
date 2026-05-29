import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Edit2, Ruler, Sparkles, BookOpen, MapPin } from 'lucide-react';
import BottomNav from '../components/BottomNav.jsx';
import { sampleLookbook } from '../data.js';

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('fv_user') || '{}');
  const name = user.name || user.email?.split('@')[0] || 'User';
  const profile = user.profile || {};
  const lookbook = JSON.parse(localStorage.getItem('fv_lookbook') || 'null') || sampleLookbook;
  const [measurements, setMeasurements] = useState({ chest: '', waist: '', hips: '', height: '' });
  const [saved, setSaved] = useState(false);

  const signOut = () => {
    localStorage.removeItem('fv_user');
    navigate('/');
  };

  const saveMeasurements = () => {
    const updated = { ...user, measurements };
    localStorage.setItem('fv_user', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid rgba(74,29,143,0.12)',
    background: 'var(--cream)', fontSize: 14, fontFamily: 'DM Sans,sans-serif', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div className="page-wrap has-bottom-nav" style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, var(--ink) 0%, #1E1040 100%)', padding: '52px 24px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg,var(--plum),var(--plum-glow))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 24, fontFamily: 'Cormorant Garamond,serif', color: 'white', fontWeight: 600, textTransform: 'uppercase' }}>{name[0]}</span>
          </div>
          <div>
            <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 26, fontWeight: 600, color: 'white', textTransform: 'capitalize' }}>{name}</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{user.email || 'FitVision Member'}</p>
          </div>
        </div>
        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          {[
            { icon: Sparkles, label: 'Designs', val: lookbook.length },
            { icon: BookOpen, label: 'Saved Looks', val: lookbook.length },
            { icon: MapPin, label: 'Vendors', val: 3 },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Icon size={16} color="rgba(255,255,255,0.5)" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 20, fontFamily: 'Cormorant Garamond,serif', color: 'white', fontWeight: 600 }}>{val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Style Profile */}
        <div style={{ background: 'white', borderRadius: 16, padding: '18px', marginBottom: 12, border: '1px solid rgba(74,29,143,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 600 }}>Style Profile</h2>
            <button onClick={() => navigate('/onboarding')} style={{ background: 'var(--blush)', border: 'none', borderRadius: 8, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 12, color: 'var(--plum)', fontWeight: 600, fontFamily: 'DM Sans,sans-serif' }}>
              <Edit2 size={12} /> Edit
            </button>
          </div>
          {profile.bodyType && (
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>BODY TYPE</span>
              <p style={{ fontSize: 14, color: 'var(--ink)', textTransform: 'capitalize', marginTop: 2 }}>{profile.bodyType}</p>
            </div>
          )}
          {profile.aesthetics?.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>AESTHETIC</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                {profile.aesthetics.map(a => <span key={a} className="tag" style={{ fontSize: 11 }}>{a}</span>)}
              </div>
            </div>
          )}
          {profile.budget && (
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>BUDGET RANGE</span>
              <p style={{ fontSize: 14, color: 'var(--ink)', marginTop: 2 }}>Up to ₦{profile.budget?.toLocaleString()}</p>
            </div>
          )}
          {!profile.bodyType && (
            <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Complete your style profile to get better outfit recommendations.</p>
          )}
        </div>

        {/* Measurements */}
        <div style={{ background: 'white', borderRadius: 16, padding: '18px', marginBottom: 12, border: '1px solid rgba(74,29,143,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Ruler size={16} color="var(--plum)" />
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 600 }}>Measurements</h2>
          </div>
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 14 }}>Save for tailor-ready spec sheets. All measurements in cm.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {[['chest', 'Chest'], ['waist', 'Waist'], ['hips', 'Hips'], ['height', 'Height']].map(([key, label]) => (
              <div key={key}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', letterSpacing: '0.04em', display: 'block', marginBottom: 4 }}>{label.toUpperCase()}</label>
                <div style={{ position: 'relative' }}>
                  <input type="number" placeholder="0" value={measurements[key]} onChange={e => setMeasurements(m => ({ ...m, [key]: e.target.value }))} style={inputStyle} />
                  <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--ink-soft)' }}>cm</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={saveMeasurements} className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {saved ? '✓ Saved!' : 'Save Measurements'}
          </button>
        </div>

        {/* Sign out */}
        <button onClick={signOut}
          style={{ width: '100%', padding: '14px', background: '#FEF2F2', color: '#DC2626', border: '1.5px solid #FECACA', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
