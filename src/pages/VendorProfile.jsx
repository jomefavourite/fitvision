import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Phone, MessageCircle, FileText } from 'lucide-react';
import Stars from '../components/Stars.jsx';
import { vendors } from '../data.js';

const typeColors = { tailor: { bg: '#EDE9FF', color: '#4A1D8F' }, boutique: { bg: '#FFF3E0', color: '#E65100' }, fabric: { bg: '#E8F5E9', color: '#2E7D32' } };
const typeMap = { tailor: 'Tailor', boutique: 'Boutique', fabric: 'Fabric Seller' };

export default function VendorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendor = vendors.find(v => v.id === Number(id));
  if (!vendor) return <div style={{ padding: '40px 0', textAlign: 'center', fontFamily: 'Cormorant Garamond,serif', fontSize: 22 }}>Vendor not found</div>;
  const tc = typeColors[vendor.type];
  const priceStr = '₦'.repeat(vendor.priceTier);

  return (
    <div className="has-bottom-nav" style={{ minHeight: '100vh' }}>
      {/* Back */}
      <div style={{ padding: '24px 0 0' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-soft)', fontSize: 14, cursor: 'pointer', marginBottom: 20, padding: 0 }}>
          <ArrowLeft size={16} /> Back to Vendors
        </button>
      </div>

      {/* Hero banner */}
      <div style={{ borderRadius: 20, overflow: 'hidden', height: 260, marginBottom: 0, position: 'relative' }}>
        <img src={vendor.gallery[0] || vendor.image} alt={vendor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(14,11,26,0.4) 100%)' }} />
      </div>

      {/* Main content — 2 col on desktop */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, padding: '0 0 24px' }}>
        {/* Left: info */}
        <div>
          <div style={{ background: 'white', borderRadius: '0 0 20px 20px', padding: '20px', marginBottom: 16, boxShadow: '0 4px 20px rgba(14,11,26,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(22px,3vw,28px)', fontWeight: 600, lineHeight: 1.1 }}>{vendor.name}</h1>
                  {vendor.verified && <CheckCircle size={16} color="var(--plum)" fill="var(--plum)" />}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: tc.color, background: tc.bg, padding: '3px 10px', borderRadius: 50 }}>{typeMap[vendor.type]}</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>📍 {vendor.city}</span>
                  <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 700 }}>{priceStr}</span>
                </div>
              </div>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: 26, fontFamily: 'Cormorant Garamond,serif', fontWeight: 700, color: 'var(--ink)' }}>{vendor.rating}</div>
                <Stars rating={vendor.rating} size={12} />
                <div style={{ fontSize: 10, color: 'var(--ink-soft)', marginTop: 2 }}>{vendor.reviews} reviews</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 14 }}>{vendor.bio}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {vendor.specialties.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 8 }}>
            <a href={`https://wa.me/${vendor.whatsapp}`} target="_blank" rel="noreferrer"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px', background: '#25D366', borderRadius: 12, color: 'white', fontSize: 13, fontWeight: 600, fontFamily: 'DM Sans,sans-serif', textDecoration: 'none' }}>
              <MessageCircle size={15} /> WhatsApp
            </a>
            <a href={`tel:${vendor.phone}`}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px', background: 'var(--blush)', borderRadius: 12, color: 'var(--plum)', fontSize: 13, fontWeight: 600, fontFamily: 'DM Sans,sans-serif', textDecoration: 'none', border: '1.5px solid rgba(74,29,143,0.15)' }}>
              <Phone size={15} /> Call
            </a>
            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px', background: 'var(--ink)', borderRadius: 12, color: 'white', fontSize: 13, fontWeight: 600, fontFamily: 'DM Sans,sans-serif', border: 'none', cursor: 'pointer' }}>
              <FileText size={15} /> Quote
            </button>
          </div>
        </div>

        {/* Right: gallery + reviews */}
        <div>
          <div style={{ background: 'white', borderRadius: 16, padding: '18px', marginBottom: 16, border: '1px solid rgba(74,29,143,0.06)' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 600, marginBottom: 14 }}>Gallery</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {vendor.gallery.map((img, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 10, overflow: 'hidden' }}>
                  <img src={img} alt={`Gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: 16, padding: '18px', border: '1px solid rgba(74,29,143,0.06)' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Reviews</h2>
            {vendor.reviewsList.map((r, i) => (
              <div key={i} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: i < vendor.reviewsList.length - 1 ? '1px solid rgba(74,29,143,0.06)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,var(--plum),var(--plum-glow))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{r.name[0]}</div>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</span>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{r.date}</span>
                </div>
                <Stars rating={r.rating} size={12} />
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.6 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
