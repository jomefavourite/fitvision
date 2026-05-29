import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const bodyTypes = [
  { id: 'slim', label: 'Slim', emoji: '🧍' },
  { id: 'athletic', label: 'Athletic', emoji: '💪' },
  { id: 'curvy', label: 'Curvy', emoji: '🌸' },
  { id: 'plus', label: 'Plus Size', emoji: '✨' },
  { id: 'petite', label: 'Petite', emoji: '🌟' },
];

const aesthetics = [
  'Afrocentric', 'Streetwear', 'Formal / Corporate', 'Casual',
  'Bohemian', 'Glamour', 'Minimalist', 'Traditional Nigerian',
  'Bridal', 'Athleisure',
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [bodyType, setBodyType] = useState('');
  const [selectedAesthetics, setSelectedAesthetics] = useState([]);
  const [budget, setBudget] = useState(50000);
  const [city, setCity] = useState('');

  const toggleAesthetic = (a) => {
    setSelectedAesthetics(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  const finish = () => {
    const profile = { bodyType, aesthetics: selectedAesthetics, budget, city };
    const user = JSON.parse(localStorage.getItem('fv_user') || '{}');
    localStorage.setItem('fv_user', JSON.stringify({ ...user, profile }));
    navigate('/dashboard');
  };

  const progressPct = (step / 3) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }} style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '24px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          {step > 1
            ? <button onClick={() => setStep(s => s - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--ink-soft)', fontSize: 14 }}><ChevronLeft size={16} /> Back</button>
            : <div />
          }
          <span style={{ fontSize: 13, color: 'var(--ink-soft)', fontWeight: 500 }}>Step {step} of 3</span>
        </div>
        <div style={{ height: 4, background: 'rgba(74,29,143,0.1)', borderRadius: 99 }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, var(--plum), var(--plum-glow))', borderRadius: 99, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      <div style={{ flex: 1, padding: '8px 24px 32px', overflowY: 'auto' }}>
        {step === 1 && (
          <div className="animate-fade-up">
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 13, color: 'var(--plum-light)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Step 1</span>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 30, fontWeight: 600, marginTop: 4, marginBottom: 8 }}>What's your body type?</h2>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>This helps us suggest the most flattering silhouettes for you.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {bodyTypes.map(bt => (
                <button key={bt.id} onClick={() => setBodyType(bt.id)}
                  style={{
                    padding: '20px 16px', borderRadius: 16, border: `2px solid ${bodyType === bt.id ? 'var(--plum)' : 'rgba(74,29,143,0.1)'}`,
                    background: bodyType === bt.id ? 'var(--blush)' : 'white', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    transition: 'all 0.2s', textAlign: 'center',
                    ...(bodyTypes.indexOf(bt) === 4 ? { gridColumn: '1 / -1', maxWidth: '50%', margin: '0 auto', width: '100%' } : {}),
                  }}>
                  <span style={{ fontSize: 32 }}>{bt.emoji}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: bodyType === bt.id ? 'var(--plum)' : 'var(--ink)' }}>{bt.label}</span>
                </button>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setStep(2)} disabled={!bodyType}
              style={{ width: '100%', justifyContent: 'center', marginTop: 28, opacity: bodyType ? 1 : 0.4 }}>
              Continue <ChevronRight size={16} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-up">
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 13, color: 'var(--plum-light)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Step 2</span>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 30, fontWeight: 600, marginTop: 4, marginBottom: 8 }}>Your style aesthetic</h2>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>Select all that speak to your style. You can always change this later.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {aesthetics.map(a => {
                const sel = selectedAesthetics.includes(a);
                return (
                  <button key={a} onClick={() => toggleAesthetic(a)}
                    style={{
                      padding: '10px 18px', borderRadius: 50,
                      border: `1.5px solid ${sel ? 'var(--plum)' : 'rgba(74,29,143,0.12)'}`,
                      background: sel ? 'linear-gradient(135deg,var(--plum),var(--plum-glow))' : 'white',
                      color: sel ? 'white' : 'var(--ink)', fontSize: 13, fontWeight: 500,
                      cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'DM Sans,sans-serif',
                    }}>{a}</button>
                );
              })}
            </div>
            <button className="btn-primary" onClick={() => setStep(3)} disabled={!selectedAesthetics.length}
              style={{ width: '100%', justifyContent: 'center', marginTop: 28, opacity: selectedAesthetics.length ? 1 : 0.4 }}>
              Continue <ChevronRight size={16} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up">
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 13, color: 'var(--plum-light)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Step 3</span>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 30, fontWeight: 600, marginTop: 4, marginBottom: 8 }}>Budget & location</h2>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>Help us find vendors in your price range and city.</p>
            </div>

            <div style={{ background: 'white', borderRadius: 16, padding: '20px', marginBottom: 16, border: '1px solid rgba(74,29,143,0.08)' }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)', display: 'block', marginBottom: 12 }}>TYPICAL OUTFIT BUDGET</label>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 28, fontWeight: 600, color: 'var(--plum)' }}>
                  ₦{budget >= 500000 ? '500,000+' : budget.toLocaleString()}
                </span>
              </div>
              <input type="range" min={5000} max={500000} step={5000} value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--plum)', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>₦5,000</span>
                <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>₦500,000+</span>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 16, padding: '20px', border: '1px solid rgba(74,29,143,0.08)' }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)', display: 'block', marginBottom: 12 }}>YOUR CITY</label>
              <input type="text" placeholder="e.g. Lagos, Abuja, Port Harcourt..." value={city}
                onChange={e => setCity(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid rgba(74,29,143,0.12)', background: 'var(--cream)', fontSize: 15, fontFamily: 'DM Sans,sans-serif', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <button className="btn-primary" onClick={finish}
              style={{ width: '100%', justifyContent: 'center', marginTop: 28 }}>
              <Sparkles size={16} /> Complete My Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
