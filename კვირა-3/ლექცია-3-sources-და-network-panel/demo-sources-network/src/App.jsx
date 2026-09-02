import React, { useState, useEffect, useCallback } from 'react';
import { fetchUsers, searchUsers, getStats } from './api/apiService';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [stats, setStats] = useState({ totalRequests: 0, averageTime: 0 });

  // Load initial users
  useEffect(() => {
    console.log('[App] Initializing app...');
    loadUsers();
  }, []);

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const currentStats = getStats();
      setStats(currentStats);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadUsers = async () => {
    try {
      console.log('[App] Loading users...');
    
      setLoading(true);
      setError(null);

      const data = await fetchUsers();

      console.log('[App] Users loaded successfully:', data.length);
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error('[App] Error loading users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(async (query) => {
    console.log('[App] Search triggered with query:', query);

    if (!query || query.trim() === '') {
      console.log('[App] Empty search, showing all users');
      setFilteredUsers(users);
      return;
    }

    try {
      setLoading(true);
      const results = await searchUsers(query);
      console.log('[App] Search results:', results.length);
      setFilteredUsers(results);
    } catch (err) {
      console.error('[App] Search error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [users]);

  const handleUserClick = (user) => {
    console.log('[App] User selected:', user.name);
    setSelectedUser(user);
  };

  const handleCloseDetail = () => {
    console.log('[App] Closing user detail');
    setSelectedUser(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>User Dashboard</h1>
        <p className="header-subtitle">Sources & Network Panel პრაქტიკა</p>
      </header>

      {/* Search Bar */}
      <div className="control-panel">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Main Content */}
      <main className="content">
        {error ? (
          <div className="error-container">
            <div className="error-message">
              <h3>შეცდომა</h3>
              <p>{error}</p>
              <button onClick={loadUsers} className="retry-btn">
                თავიდან ცდა
              </button>
            </div>
          </div>
        ) : (
          <UserList
            users={filteredUsers}
            loading={loading}
            onUserClick={handleUserClick}
          />
        )}
      </main>

      {/* Performance Stats Footer */}
      <footer className="stats-footer">
        <div className="stats-container">
          <span className="stats-label">Performance Stats:</span>
          <span className="stats-item">
            სულ Requests: <strong>{stats.totalRequests}</strong>
          </span>
          <span className="stats-item">
            საშუალო დრო: <strong>{stats.averageTime}ms</strong>
          </span>
          <span className="stats-hint">
            (Network panel-ში ნახეთ დეტალები)
          </span>
        </div>
      </footer>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetail user={selectedUser} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;
