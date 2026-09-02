import { useState, useMemo } from 'react';
import { UserManager } from './utils/userManager';
import { UserForm } from './components/UserForm';
import { UserSearch } from './components/UserSearch';
import { UserList } from './components/UserList';
import { SourceMapInfo } from './components/SourceMapInfo';
import { ExercisePanel } from './components/ExercisePanel';
import './App.css';

// UserManager-ის ინსტანსი (სინგლტონი)
const userManager = new UserManager();

function App() {
  const [users, setUsers] = useState(userManager.getAllUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  /**
   * მომხმარებლის დამატება
   */
  const handleAddUser = (name, email, age, active) => {
    userManager.addUser(name, email, age, active);
    setUsers(userManager.getAllUsers());
  };

  /**
   * მომხმარებლის წაშლა
   */
  const handleDeleteUser = (userId) => {
    if (window.confirm('დარწმუნებული ხართ რომ გსურთ წაშლა?')) {
      userManager.deleteUser(userId);
      setUsers(userManager.getAllUsers());
    }
  };

  /**
   * ძიება და სორტირება (memoized)
   */
  const displayedUsers = useMemo(() => {
    // ჯერ ძიება
    const searchResults = userManager.search(searchQuery);

    // შემდეგ სორტირება
    const sorted = [...searchResults].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [searchQuery, sortField, sortOrder]);

  /**
   * სტატისტიკა
   */
  const stats = useMemo(() => {
    return userManager.getStatistics();
  }, [users]);

  /**
   * შეცდომის გენერირება — სავარჯიშოებისთვის
   */
  const handleTriggerError = () => {
    try {
      userManager.triggerIntentionalError();
    } catch (error) {
      console.error('🔥 განზრახ შეცდომა:', error);
      console.error('Stack trace:', error.stack);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Source Maps Demo</h1>
        <p className="app-subtitle">
          Vite + React • შეისწავლეთ Source Maps-ის მნიშვნელობა Production Debugging-ისთვის
        </p>
      </header>

      {/* Source Map Info */}
      <SourceMapInfo />

      {/* Main Grid */}
      <div className="app-grid">
        {/* Left Column - User Form */}
        <UserForm onAddUser={handleAddUser} />

        {/* Right Column - User List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Statistics */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                სტატისტიკა
                <span className="card-badge green">რეალურ დროში</span>
              </h2>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.totalUsers}</div>
                <div className="stat-label">სულ</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.activeUsers}</div>
                <div className="stat-label">აქტიური</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.inactiveUsers}</div>
                <div className="stat-label">არააქტიური</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.averageAge}</div>
                <div className="stat-label">საშუალო ასაკი</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.minAge}</div>
                <div className="stat-label">მინ. ასაკი</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.maxAge}</div>
                <div className="stat-label">მაქს. ასაკი</div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                ძიება
                <span className="card-badge primary">ფილტრი</span>
              </h2>
            </div>
            <UserSearch value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {/* User List - Full Width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <UserList
            users={displayedUsers}
            onDeleteUser={handleDeleteUser}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={(field, order) => {
              setSortField(field);
              setSortOrder(order);
            }}
          />
        </div>
      </div>

      {/* Exercises */}
      <div style={{ marginTop: '2rem' }}>
        <ExercisePanel onTriggerError={handleTriggerError} />
      </div>
    </div>
  );
}

export default App;
