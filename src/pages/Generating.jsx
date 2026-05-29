import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const messages = [
  'Styling your look...',
  'Mixing colours and fabrics...',
  'Adding the finishing touches...',
  'Almost ready for you...',
  'Bringing your vision to life...',
];

export default function Generating() {
  const navigate = useNavigate();
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => setMsgIdx(i => (i + 1) % messages.length), 1600);
    const progTimer = setInterval(() => setProgress(p => Math.min(p + 2, 95)), 80);
    const redirect = setTimeout(() => {
      clearInterval(msgTimer); clearInterval(progTimer);
      setProgress(100);
      setTimeout(() => navigate('/design/results'), 400);
    }, 4200);
    return () => { clearInterval(msgTimer); clearInterval(progTimer); clearTimeout(redirect); };
  }, [navigate]);

  return (
    <div className="page-wrap" style={{
      minHeight: '100vh', background: 'var(--ink)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Orb bg */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '20%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,146,26,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', zIndex: 1, padding: '0 40px' }}>
        {/* Spinner */}
        <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 32px' }}>
          <div style={{ position: 'absolute', inset: 0, border: '3px solid rgba(139,92,246,0.15)', borderRadius: '50%' }} />
          <div style={{
            position: 'absolute', inset: 0,
            border: '3px solid transparent',
            borderTopColor: '#8B5CF6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <div style={{ position: 'absolute', inset: 8, background: 'rgba(139,92,246,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={28} color="#A78BFA" />
          </div>
        </div>

        <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 32, fontWeight: 600, color: 'white', marginBottom: 12 }}>
          AI Styling in Progress
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', minHeight: 26, transition: 'opacity 0.3s' }}>
          {messages[msgIdx]}
        </p>

        {/* Progress bar */}
        <div style={{ marginTop: 36, width: '100%', maxWidth: 240, margin: '36px auto 0', background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #4A1D8F, #8B5CF6)', borderRadius: 99, transition: 'width 0.1s ease' }} />
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 10 }}>{progress}%</p>

        {/* Fashion image strip */}
        <div style={{ display: 'flex', gap: 8, marginTop: 48, opacity: 0.4 }}>
          {[
            'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=100&q=50',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=100&q=50',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=50',
          ].map((src, i) => (
            <div key={i} style={{ flex: 1, height: 80, borderRadius: 10, overflow: 'hidden', animation: `pulse 1.5s ${i * 0.3}s infinite` }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
