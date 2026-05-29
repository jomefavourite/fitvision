import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Phone, MessageCircle, FileText } from 'lucide-react';
import BottomNav from '../components/BottomNav.jsx';
import Stars from '../components/Stars.jsx';
import { vendors } from '../data.js';

const typeColors = { tailor: { bg: '#EDE9FF', color: '#4A1D8F' }, boutique: { bg: '#FFF3E0', color: '#E65100' }, fabric: { bg: '#E8F5E9', color: '#2E7D32' } };
const typeMap = { tailor: 'Tailor', boutique: 'Boutique', fabric: 'Fabric Seller' };

export default function VendorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendor = vendors.find(v => v.id === Number(id));
  if (!vendor) return <div style={{ padding: 40, textAlign: 'center' }}>Vendor not found</div>;
  const tc = typeColors[vendor.type];
  const priceStr = '₦'.repeat(vendor.priceTier);

  return (
    <div className="page-wrap has-bottom-nav" style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Hero banner */}
      <div style={{ position: 'relative', height: 240 }}>
        <img src={vendor.gallery[0] || vendor.image} alt={vendor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,11,26,0.4) 0%, transparent 40%, rgba(14,11,26,0.3) 100%)' }} />
        <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 52, left: 16, width: 36, height: 36, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
          <ArrowLeft size={16} color="#1A1A2E" />
        </button>
      </div>

      <div style={{ padding: '0 16px 20px' }}>
        {/* Vendor info card */}
        <div style={{ background: 'white', borderRadius: '0 0 20px 20px', padding: '18px 18px 20px', marginBottom: 14, boxShadow: '0 4px 20px rgba(14,11,26,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 24, fontWeight: 600, lineHeight: 1.1 }}>{vendor.name}</h1>
                {vendor.verified && <CheckCircle size={16} color="var(--plum)" fill="var(--plum)" />}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: tc.color, background: tc.bg, padding: '3px 10px', borderRadius: 50 }}>{typeMap[vendor.type]}</span>
                <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>📍 {vendor.city}</span>
                <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 700 }}>{priceStr}</span>
              </div>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 24, fontFamily: 'Cormorant Garamond,serif', fontWeight: 700, color: 'var(--ink)' }}>{vendor.rating}</div>
              <Stars rating={vendor.rating} size={11} />
              <div style={{ fontSize: 10, color: 'var(--ink-soft)', marginTop: 1 }}>{vendor.reviews} reviews</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7 }}>{vendor.bio}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
            {vendor.specialties.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
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

        {/* Gallery */}
        <div style={{ background: 'white', borderRadius: 16, padding: '16px', marginBottom: 14, border: '1px solid rgba(74,29,143,0.06)' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Gallery</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {vendor.gallery.map((img, i) => (
              <div key={i} style={{ aspectRatio: '1', borderRadius: 10, overflow: 'hidden' }}>
                <img src={img} alt={`Gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div style={{ background: 'white', borderRadius: 16, padding: '16px', border: '1px solid rgba(74,29,143,0.06)' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, fontWeight: 600, marginBottom: 14 }}>Reviews</h2>
          {vendor.reviewsList.map((r, i) => (
            <div key={i} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: i < vendor.reviewsList.length - 1 ? '1px solid rgba(74,29,143,0.06)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,var(--plum),var(--plum-glow))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700 }}>{r.name[0]}</div>
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

      <BottomNav />
    </div>
  );
}
