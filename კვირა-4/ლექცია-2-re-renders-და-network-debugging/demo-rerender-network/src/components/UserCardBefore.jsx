import { useRef } from 'react';

/**
 * UserCardBefore - არაოპტიმიზებული ვერსია
 *
 * პრობლემა: ყოველ parent-ის რენდერზე ხელახლა რენდერდება,
 * თუნდაც props არ შეცვლილიყო
 *
 * გადაწყვეტა: React.memo გამოყენება
 */
function UserCardBefore({ user, index, onClick }) {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div className="user-card">
      <div className={`user-avatar avatar-color-${index % 6}`}>
        {user.name.charAt(0)}
      </div>
      <div className="user-info">
        <div className="user-name">{user.name}</div>
        <div className="user-email">{user.email}</div>
      </div>
      <span className="user-role">{user.role}</span>
      <span className={`render-badge ${renderCount.current > 1 ? 'render-badge--high' : 'render-badge--low'}`}>
        renders: {renderCount.current}
      </span>
    </div>
  );
}

export default UserCardBefore;
