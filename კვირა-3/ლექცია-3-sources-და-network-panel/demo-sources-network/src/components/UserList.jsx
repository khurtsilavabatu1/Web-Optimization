import React from 'react';
import UserCard from './UserCard';
import LoadingSpinner from './LoadingSpinner';

const UserList = ({ users, loading, onUserClick }) => {
  console.log('[UserList] Rendering with', users.length, 'users, loading:', loading);

  if (loading) {
    return <LoadingSpinner text="მომხმარებლები იტვირთება..." />;
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>მომხმარებლები არ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className="user-grid">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onClick={onUserClick}
        />
      ))}
    </div>
  );
};

export default UserList;
