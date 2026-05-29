import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav.jsx';

const occasions = [
  { label: 'Owambe / Aso-ebi', emoji: '🎉' },
  { label: 'Traditional Wedding', emoji: '💍' },
  { label: 'Court Wedding', emoji: '⚖️' },
  { label: 'Naming Ceremony', emoji: '🍼' },
  { label: 'Graduation', emoji: '🎓' },
  { label: 'Church Service', emoji: '⛪' },
  { label: 'Friday Prayers', emoji: '🕌' },
  { label: 'Corporate / Office', emoji: '💼' },
  { label: 'Business Meeting', emoji: '🤝' },
  { label: 'Beach / Resort', emoji: '🌊' },
  { label: 'Date Night', emoji: '🌙' },
  { label: 'Birthday Party', emoji: '🎂' },
  { label: 'Concert / Nightlife', emoji: '🎵' },
  { label: 'Gala / Black Tie', emoji: '🥂' },
  { label: 'Casual Hangout', emoji: '👕' },
  { label: 'Garden Party', emoji: '🌿' },
];

export default function DesignOccasion() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(localStorage.getItem('fv_design_occasion') || '');

  const proceed = () => {
    if (!selected) return;
    localStorage.setItem('fv_design_occasion', selected);
    navigate('/design/brief');
  };

  return (
    <div className="page-wrap has-bottom-nav" style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'white', padding: '52px 24px 20px', borderBottom: '1px solid rgba(74,29,143,0.06)', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--ink-soft)', fontSize: 14, cursor: 'pointer', marginBottom: 12, padding: 0 }}>
          <ArrowLeft size={16} /> Home
        </button>
        <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 28, fontWeight: 600 }}>What's the occasion?</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4 }}>Choose the event you're dressing for</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {occasions.map(occ => {
            const isSelected = selected === occ.label;
            return (
              <button key={occ.label} onClick={() => setSelected(occ.label)}
                style={{
                  padding: '18px 12px', borderRadius: 14,
                  border: `2px solid ${isSelected ? 'var(--plum)' : 'rgba(74,29,143,0.08)'}`,
                  background: isSelected ? 'var(--blush)' : 'white',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  transition: 'all 0.18s', textAlign: 'center',
                  boxShadow: isSelected ? '0 4px 16px rgba(107,53,196,0.18)' : 'none',
                }}>
                <span style={{ fontSize: 28 }}>{occ.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: isSelected ? 'var(--plum)' : 'var(--ink)', lineHeight: 1.3 }}>{occ.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '12px 20px 16px', background: 'white', borderTop: '1px solid rgba(74,29,143,0.06)', position: 'sticky', bottom: 80 }}>
        <button className="btn-primary" onClick={proceed} disabled={!selected}
          style={{ width: '100%', justifyContent: 'center', opacity: selected ? 1 : 0.4, padding: '15px' }}>
          Next: Describe Your Outfit <ChevronRight size={16} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
