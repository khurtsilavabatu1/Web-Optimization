import { useRef } from 'react';
import { countPrimes } from '../data';

/**
 * ExpensiveStatsBefore - არაოპტიმიზებული ვერსია
 *
 * პრობლემა: ყოველ რენდერზე ახორციელებს მძიმე გამოთვლებს (countPrimes),
 * თუნდაც users მონაცემები არ შეცვლილიყო
 *
 * გადაწყვეტა: useMemo გამოყენება მძიმე გამოთვლების კეშირებისთვის
 */
function ExpensiveStatsBefore({ users }) {
  const renderCount = useRef(0);
  renderCount.current++;

  // მძიმე გამოთვლა — ყოველ რენდერზე ხელახლა ეშვება!
  const primeCount = countPrimes(25000);
  const avgNameLength = users.reduce((sum, u) => sum + u.name.length, 0) / users.length;

  return (
    <div className="stats-box">
      <div className="component-label">
        ExpensiveStats
        <span className={`render-badge ${renderCount.current > 1 ? 'render-badge--high' : 'render-badge--low'}`}>
          renders: {renderCount.current}
        </span>
      </div>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">მომხმარებელი</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{primeCount}</div>
          <div className="stat-label">Prime (1-25000)</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{avgNameLength.toFixed(1)}</div>
          <div className="stat-label">სახელის სიგრძე</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{new Set(users.map(u => u.role)).size}</div>
          <div className="stat-label">როლი</div>
        </div>
      </div>
    </div>
  );
}

export default ExpensiveStatsBefore;
