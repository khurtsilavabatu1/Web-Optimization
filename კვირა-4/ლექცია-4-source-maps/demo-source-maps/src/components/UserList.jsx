export function UserList({ users, onDeleteUser, sortField, sortOrder, onSort }) {
  const handleSort = (field) => {
    // თუ იგივე ველზე დააწკაპუნა — შეცვალე order
    const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(field, newOrder);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          მომხმარებლები
          <span className="card-badge purple">{users.length}</span>
        </h2>
      </div>

      {/* სორტირების ღილაკები */}
      <div className="button-group" style={{ marginBottom: '1.5rem' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleSort('name')}
        >
          სახელით {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleSort('age')}
        >
          ასაკით {sortField === 'age' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleSort('active')}
        >
          სტატუსით {sortField === 'active' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      {/* მომხმარებლების სია */}
      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <div className="empty-state-text">მომხმარებლები ვერ მოიძებნა</div>
        </div>
      ) : (
        <div className="user-list">
          {users.map(user => (
            <div key={user.id} className="user-item">
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-details">
                  <span>{user.email}</span>
                  <span>ასაკი: {user.age}</span>
                  <span className={`user-status ${user.active ? 'active' : 'inactive'}`}>
                    {user.active ? 'აქტიური' : 'არააქტიური'}
                  </span>
                </div>
              </div>
              <div className="user-actions">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteUser(user.id)}
                  title="წაშლა"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
