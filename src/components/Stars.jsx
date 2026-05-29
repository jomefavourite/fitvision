import { Star } from 'lucide-react';
export default function Stars({ rating, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size}
          fill={i <= Math.round(rating) ? '#C9921A' : 'none'}
          color={i <= Math.round(rating) ? '#C9921A' : '#D1D5DB'}
          strokeWidth={1.5} />
      ))}
    </span>
  );
}
