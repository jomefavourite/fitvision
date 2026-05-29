import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

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
    <div className="has-bottom-nav" style={{ minHeight: '100vh' }}>
      <div style={{ padding: '32px 0 0' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(26px,4vw,36px)', fontWeight: 600, marginBottom: 6 }}>What's the occasion?</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 24 }}>Choose the event you're dressing for</p>

        <div className="occasion-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12, marginBottom: 24 }}>
          {occasions.map(occ => {
            const isSelected = selected === occ.label;
            return (
              <button key={occ.label} onClick={() => setSelected(occ.label)}
                style={{
                  padding: '20px 12px', borderRadius: 14,
                  border: `2px solid ${isSelected ? 'var(--plum)' : 'rgba(74,29,143,0.08)'}`,
                  background: isSelected ? 'var(--blush)' : 'white',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  transition: 'all 0.18s', textAlign: 'center',
                  boxShadow: isSelected ? '0 4px 16px rgba(107,53,196,0.18)' : '0 2px 8px rgba(14,11,26,0.04)',
                }}
                onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(107,53,196,0.3)'; e.currentTarget.style.background = '#fdf9ff'; }}}
                onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(74,29,143,0.08)'; e.currentTarget.style.background = 'white'; }}}>
                <span style={{ fontSize: 30 }}>{occ.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: isSelected ? 'var(--plum)' : 'var(--ink)', lineHeight: 1.3 }}>{occ.label}</span>
              </button>
            );
          })}
        </div>

        <button className="btn-primary" onClick={proceed} disabled={!selected}
          style={{ padding: '15px 36px', fontSize: 15, opacity: selected ? 1 : 0.4 }}>
          Next: Describe Your Outfit <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
