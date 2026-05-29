import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, CheckCircle } from 'lucide-react';
import BottomNav from '../components/BottomNav.jsx';
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

  const priceStr = (tier) => '₦'.repeat(tier) + '₦'.repeat(3 - tier).replace(/./g, '·');

  return (
    <div className="page-wrap has-bottom-nav" style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: 'white', padding: '52px 20px 16px', borderBottom: '1px solid rgba(74,29,143,0.06)', position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 28, fontWeight: 600, marginBottom: 12 }}>Find Vendors</h1>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          <input type="text" placeholder="Search tailors, boutiques, city..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '11px 12px 11px 38px', borderRadius: 12, border: '1.5px solid rgba(74,29,143,0.12)', background: 'var(--cream)', fontSize: 14, fontFamily: 'DM Sans,sans-serif', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        {/* Type filter */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {typeFilters.map(f => (
            <button key={f} onClick={() => setTypeFilter(f)}
              style={{ flexShrink: 0, padding: '7px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600, border: `1.5px solid ${f === typeFilter ? 'var(--plum)' : 'rgba(74,29,143,0.1)'}`, background: f === typeFilter ? 'linear-gradient(135deg,var(--plum),var(--plum-glow))' : 'white', color: f === typeFilter ? 'white' : 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', transition: 'all 0.15s' }}>
              {f}
            </button>
          ))}
          <div style={{ width: 8, flexShrink: 0 }} />
          {budgetFilters.map(f => (
            <button key={f} onClick={() => setBudgetFilter(f)}
              style={{ flexShrink: 0, padding: '7px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600, border: `1.5px solid ${f === budgetFilter ? 'var(--gold)' : 'rgba(74,29,143,0.1)'}`, background: f === budgetFilter ? '#FFF8E1' : 'white', color: f === budgetFilter ? 'var(--gold)' : 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', transition: 'all 0.15s' }}>
              {f}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{filtered.length} vendors in Lagos</p>
      </div>

      <div style={{ padding: '12px 16px 20px' }}>
        {filtered.map(vendor => {
          const tc = typeColors[vendor.type];
          return (
            <div key={vendor.id} onClick={() => navigate(`/vendors/${vendor.id}`)}
              style={{ background: 'white', borderRadius: 16, padding: '14px', marginBottom: 10, display: 'flex', gap: 12, cursor: 'pointer', border: '1px solid rgba(74,29,143,0.06)', boxShadow: '0 2px 12px rgba(14,11,26,0.05)', transition: 'all 0.15s' }}>
              <div style={{ width: 64, height: 64, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
                <img src={vendor.image} alt={vendor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 4 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>{vendor.name}</h3>
                      {vendor.verified && <CheckCircle size={13} color="var(--plum)" fill="var(--plum)" />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: tc.color, background: tc.bg, padding: '2px 8px', borderRadius: 50 }}>{typeMap[vendor.type]}</span>
                      <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>• {vendor.city}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} color="#D1D5DB" style={{ flexShrink: 0, marginTop: 2 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <Stars rating={vendor.rating} size={12} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{vendor.rating}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>({vendor.reviews})</span>
                  <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, marginLeft: 'auto' }}>{priceStr(vendor.priceTier)}</span>
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {vendor.specialties.slice(0, 3).map(s => (
                    <span key={s} className="tag" style={{ fontSize: 10, padding: '2px 8px' }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', fontFamily: 'Cormorant Garamond,serif' }}>No vendors found</p>
            <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Try adjusting your filters</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
