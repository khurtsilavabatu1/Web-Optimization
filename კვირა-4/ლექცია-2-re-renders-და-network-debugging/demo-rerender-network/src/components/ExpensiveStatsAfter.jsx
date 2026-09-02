import { memo, useMemo, useRef } from 'react';
import { countPrimes } from '../data';

/**
 * ExpensiveStatsAfter - ოპტიმიზებული ვერსია useMemo-თი
 *
 * ოპტიმიზაცია:
 * 1. React.memo ხელს უშლის რე-რენდერს თუ props არ შეცვლილა
 * 2. useMemo კეშავს მძიმე გამოთვლებს
 *
 * შედეგი:
 * - primeCount ითვლება მხოლოდ ერთხელ (dependencies ცარიელია)
 * - avgNameLength და uniqueRoles ითვლება მხოლოდ users-ის ცვლილებაზე
 */
const ExpensiveStatsAfter = memo(function ExpensiveStatsAfter({ users }) {
  const renderCount = useRef(0);
  renderCount.current++;

  // useMemo — მძიმე გამოთვლა კეშირებულია!
  const primeCount = useMemo(() => countPrimes(25000), []);
  const avgNameLength = useMemo(
    () => users.reduce((sum, u) => sum + u.name.length, 0) / users.length,
    [users]
  );
  const uniqueRoles = useMemo(
    () => new Set(users.map(u => u.role)).size,
    [users]
  );

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
          <div className="stat-value">{uniqueRoles}</div>
          <div className="stat-label">როლი</div>
        </div>
      </div>
    </div>
  );
});

export default ExpensiveStatsAfter;
