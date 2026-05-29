import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Eye, MapPin, Scissors, Star, Wand2 } from 'lucide-react';
import { seedDemoSession } from '../data.js';

export default function Landing() {
  const navigate = useNavigate();

  const startDemo = () => {
    seedDemoSession();
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', flexDirection: 'column' }}>
      {/* Shared top nav */}
      <nav style={{ padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#4A1D8F,#8B5CF6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: 'white' }}>FitVision</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{ color: 'rgba(255,255,255,0.7)', background: 'transparent', border: 'none', fontSize: 14, fontFamily: 'DM Sans,sans-serif', cursor: 'pointer', padding: '8px 16px' }}>
            Sign in
          </button>
          <button onClick={() => navigate('/signup')} className="btn-primary" style={{ padding: '10px 24px', fontSize: 14 }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Main content — 2 col on desktop, stacked on mobile */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Orbs */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '0%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,146,26,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '60px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center', flex: 1 }}>
          {/* Left: hero copy */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 50, padding: '5px 14px', marginBottom: 28 }}>
              <Sparkles size={12} color="#8B5CF6" />
              <span style={{ fontSize: 12, color: '#C4B5FD', fontWeight: 500, letterSpacing: '0.04em' }}>AI-Powered Fashion for Nigeria</span>
            </div>

            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 600, color: 'white', lineHeight: 1.0, marginBottom: 8 }}>
              See it before<br />
              <span style={{ background: 'linear-gradient(135deg, #C9921A, #F0B94A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>you wear it.</span>
            </h1>

            <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginTop: 24, marginBottom: 40, maxWidth: 480 }}>
              Describe your dream outfit. See it instantly with AI. Then find the best local tailors and boutiques in Lagos to bring it to life.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
              <button className="btn-primary" onClick={() => navigate('/signup')} style={{ padding: '15px 32px', fontSize: 16 }}>
                Design My Outfit <ArrowRight size={18} />
              </button>
              <button onClick={startDemo} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #F0B94A, #C9921A)', border: 'none', color: 'var(--ink)', borderRadius: 50, padding: '15px 28px', fontSize: 15, fontWeight: 600, fontFamily: 'DM Sans,sans-serif', cursor: 'pointer', boxShadow: '0 4px 18px rgba(201,146,26,0.35)' }}>
                <Wand2 size={17} /> Try Live Demo
              </button>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 44 }}>
              No signup required — explore the full experience in one tap.
            </p>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex' }}>
                {['#8B5CF6','#C9921A','#4A1D8F','#6B35C4'].map((c, i) => (
                  <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: '2px solid rgba(255,255,255,0.2)', marginLeft: i ? -8 : 0 }} />
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2 }}>{[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#F0B94A" color="#F0B94A" />)}</div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Loved by Lagos fashionistas</p>
              </div>
            </div>
          </div>

          {/* Right: feature cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 2 }}>
            {/* Image preview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 4 }}>
              {[
                'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=300&q=80',
                'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80',
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80',
              ].map((src, i) => (
                <div key={i} style={{ aspectRatio: '3/4', borderRadius: 14, overflow: 'hidden', opacity: 0.85 }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            {[
              { icon: Eye, title: 'AI Outfit Visualisation', desc: 'See exactly how your outfit looks before you commission it.' },
              { icon: Scissors, title: 'Smart Occasion Styling', desc: 'From owambe to corporate — context-aware outfit suggestions.' },
              { icon: MapPin, title: 'Lagos Vendor Network', desc: 'Find vetted tailors and boutiques near you, instantly.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 18px', background: 'rgba(255,255,255,0.05)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)' }}>
                <div style={{ width: 40, height: 40, background: 'rgba(139,92,246,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color="#A78BFA" />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 2 }}>{title}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
