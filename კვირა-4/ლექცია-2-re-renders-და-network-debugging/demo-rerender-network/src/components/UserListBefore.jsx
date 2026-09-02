import { useState, useRef } from 'react';
import { sampleUsers } from '../data';
import UserCardBefore from './UserCardBefore';
import ExpensiveStatsBefore from './ExpensiveStatsBefore';

/**
 * UserListBefore - არაოპტიმიზებული Parent კომპონენტი
 *
 * პრობლემები:
 * 1. handleClick ფუნქცია ყოველ რენდერზე ხელახლა იქმნება
 * 2. filteredUsers არ არის მემოიზებული
 * 3. ყველა child კომპონენტი რენდერდება search-ის ცვლილებაზე
 *
 * გადაწყვეტა:
 * - useCallback handleClick-ისთვის
 * - useMemo filteredUsers-ისთვის
 * - React.memo child კომპონენტებისთვის
 */
function UserListBefore() {
  const renderCount = useRef(0);
  renderCount.current++;

  const [search, setSearch] = useState('');

  const filteredUsers = sampleUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // ფუნქცია რომელიც ყოველ რენდერზე ხელახლა იქმნება
  const handleClick = (user) => {
    console.log('Clicked (before):', user.name);
  };

  return (
    <div className="parent-wrapper">
      <div className="parent-header">
        <h3>UserList</h3>
        <span className={`render-badge ${renderCount.current > 1 ? 'render-badge--high' : 'render-badge--low'}`}>
          renders: {renderCount.current}
        </span>
      </div>

      <div className="search-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="მომხმარებლის ძიება..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="user-cards-grid">
        {filteredUsers.length === 0 ? (
          <div className="empty-state">მომხმარებელი ვერ მოიძებნა</div>
        ) : (
          filteredUsers.map((user, idx) => (
            <UserCardBefore
              key={user.id}
              user={user}
              index={idx}
              onClick={handleClick}
            />
          ))
        )}
      </div>

      <ExpensiveStatsBefore users={filteredUsers} />
    </div>
  );
}

export default UserListBefore;
