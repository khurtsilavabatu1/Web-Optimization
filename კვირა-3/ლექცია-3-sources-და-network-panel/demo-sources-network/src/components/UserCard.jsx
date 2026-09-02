import React from 'react';

const UserCard = ({ user, onClick }) => {
  const handleClick = () => {
    console.log('[UserCard] User clicked:', user.name, user.id);
    onClick(user);
  };

  return (
    <div className="user-card" onClick={handleClick}>
      <div className="card-header">
        <span className="card-id">#{user.id}</span>
        <span className="card-badge">მომხმარებელი</span>
      </div>
      <h3 className="card-title">{user.name}</h3>
      <p className="card-subtitle">{user.email}</p>
      <p className="card-detail">
        <span className="detail-label">კომპანია:</span> {user.company.name}
      </p>
      <p className="card-detail">
        <span className="detail-label">ქალაქი:</span> {user.address.city}
      </p>
    </div>
  );
};

export default UserCard;
