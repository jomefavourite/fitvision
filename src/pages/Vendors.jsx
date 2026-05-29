import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, CheckCircle } from 'lucide-react';
import Stars from '../components/Stars.jsx';
import { vendors } from '../data.js';

const typeFilters = ['All', 'Tailor', 'Boutique', 'Fabric'];
const budgetFilters = ['Any', '₦', '₦₦', '₦₦₦'];
const typeMap = { tailor: 'Tailor', boutique: 'Boutique', fabric: 'Fabric' };
const typeColors = { tailor: { bg: '#EDE9FF', color: '#4A1D8F' }, boutique: { bg: '#FFF3E0', color: '#E65100' }, fabric: { bg: '#E8F5E9', color: '#2E7D32' } };

export default function Vendors() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('Any');
  const tierMap = { '₦': 1, '₦₦': 2, '₦₦₦': 3 };

  const filtered = vendors.filter(v => {
    const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase()) || v.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchType = typeFilter === 'All' || typeMap[v.type] === typeFilter;
    const matchBudget = budgetFilter === 'Any' || v.priceTier === tierMap[budgetFilter];
    return matchSearch && matchType && matchBudget;
  });

  return (
    <div className="has-bottom-nav" style={{ minHeight: '100vh' }}>
      <div style={{ padding: '32px 0 0' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(26px,4vw,36px)', fontWeight: 600, marginBottom: 16 }}>Find Vendors</h1>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input type="text" placeholder="Search tailors, boutiques, city, speciality..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '13px 14px 13px 42px', borderRadius: 12, border: '1.5px solid rgba(74,29,143,0.12)', background: 'white', fontSize: 14, fontFamily: 'DM Sans,sans-serif', outline: 'none', boxSizing: 'border-box', boxShadow: '0 2px 8px rgba(14,11,26,0.04)' }} />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
          {typeFilters.map(f => (
            <button key={f} onClick={() => setTypeFilter(f)}
              style={{ padding: '7px 16px', borderRadius: 50, fontSize: 12, fontWeight: 600, border: `1.5px solid ${f === typeFilter ? 'var(--plum)' : 'rgba(74,29,143,0.1)'}`, background: f === typeFilter ? 'linear-gradient(135deg,var(--plum),var(--plum-glow))' : 'white', color: f === typeFilter ? 'white' : 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', transition: 'all 0.15s' }}>
              {f}
            </button>
          ))}
          <div style={{ width: 1, height: 32, background: 'rgba(74,29,143,0.1)', margin: '0 4px' }} />
          {budgetFilters.map(f => (
            <button key={f} onClick={() => setBudgetFilter(f)}
              style={{ padding: '7px 16px', borderRadius: 50, fontSize: 12, fontWeight: 600, border: `1.5px solid ${f === budgetFilter ? 'var(--gold)' : 'rgba(74,29,143,0.1)'}`, background: f === budgetFilter ? '#FFF8E1' : 'white', color: f === budgetFilter ? 'var(--gold)' : 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', transition: 'all 0.15s' }}>
              {f}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginBottom: 16 }}>{filtered.length} vendors found in Lagos</p>

        {/* Vendors grid — 1 col mobile, 2 col desktop */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12, marginBottom: 24 }}>
          {filtered.map(vendor => {
            const tc = typeColors[vendor.type];
            const priceStr = '₦'.repeat(vendor.priceTier);
            return (
              <div key={vendor.id} onClick={() => navigate(`/vendors/${vendor.id}`)}
                style={{ background: 'white', borderRadius: 16, padding: '16px', display: 'flex', gap: 14, cursor: 'pointer', border: '1px solid rgba(74,29,143,0.06)', boxShadow: '0 2px 12px rgba(14,11,26,0.05)', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(74,29,143,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(14,11,26,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ width: 68, height: 68, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={vendor.image} alt={vendor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 4 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{vendor.name}</h3>
                        {vendor.verified && <CheckCircle size={13} color="var(--plum)" fill="var(--plum)" />}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: tc.color, background: tc.bg, padding: '2px 8px', borderRadius: 50 }}>{typeMap[vendor.type]}</span>
                        <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>📍 {vendor.city}</span>
                        <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, marginLeft: 'auto' }}>{priceStr}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} color="#D1D5DB" style={{ flexShrink: 0, marginTop: 2 }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Stars rating={vendor.rating} size={12} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{vendor.rating}</span>
                    <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>({vendor.reviews} reviews)</span>
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {vendor.specialties.slice(0, 3).map(s => <span key={s} className="tag" style={{ fontSize: 10, padding: '2px 8px' }}>{s}</span>)}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px 20px' }}>
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 22, color: 'var(--ink-soft)' }}>No vendors found</p>
              <p style={{ fontSize: 14, color: '#9CA3AF', marginTop: 4 }}>Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
