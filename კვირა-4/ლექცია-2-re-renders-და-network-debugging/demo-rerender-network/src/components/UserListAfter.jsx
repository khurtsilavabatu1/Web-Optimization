import { useState, useMemo, useCallback, useRef } from 'react';
import { sampleUsers } from '../data';
import UserCardAfter from './UserCardAfter';
import ExpensiveStatsAfter from './ExpensiveStatsAfter';

/**
 * UserListAfter - ოპტიმიზებული Parent კომპონენტი
 *
 * ოპტიმიზაციები:
 * 1. useCallback - handleClick ფუნქციის სტაბილური რეფერენსი
 * 2. useMemo - filteredUsers მემოიზებული, ხელახლა ითვლება მხოლოდ search-ის ცვლილებაზე
 * 3. child კომპონენტები React.memo-თია გახვეული
 *
 * შედეგი: child კომპონენტები რენდერდება მხოლოდ საჭიროებისას
 */
function UserListAfter() {
  const renderCount = useRef(0);
  renderCount.current++;

  const [search, setSearch] = useState('');

  // useMemo — ფილტრაცია მხოლოდ search-ის ცვლილებაზე
  const filteredUsers = useMemo(
    () => sampleUsers.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  // useCallback — ფუნქციის რეფერენსი სტაბილურია
  const handleClick = useCallback((user) => {
    console.log('Clicked (after):', user.name);
  }, []);

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
          filteredUsers.map((user) => (
            <UserCardAfter
              key={user.id}
              user={user}
              index={user.id}
              onClick={handleClick}
            />
          ))
        )}
      </div>

      <ExpensiveStatsAfter users={filteredUsers} />
    </div>
  );
}

export default UserListAfter;
