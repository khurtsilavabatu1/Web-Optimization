import React, { useState, useEffect } from 'react';
import { fetchUserPosts, fetchUserTodos } from '../api/apiService';
import LoadingSpinner from './LoadingSpinner';

const UserDetail = ({ user, onClose }) => {
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [errorPosts, setErrorPosts] = useState(null);
  const [errorTodos, setErrorTodos] = useState(null);

  useEffect(() => {
    console.log('[UserDetail] Loading details for user:', user.name);

    const loadPosts = async () => {
      try {
        setLoadingPosts(true);
        setErrorPosts(null);
        console.log('[UserDetail] Fetching posts...');
        const data = await fetchUserPosts(user.id);
        setPosts(data);
        console.log('[UserDetail] Posts loaded:', data.length);
      } catch (error) {
        console.error('[UserDetail] Error loading posts:', error);
        setErrorPosts(error.message);
      } finally {
        setLoadingPosts(false);
      }
    };

    const loadTodos = async () => {
      try {
        setLoadingTodos(true);
        setErrorTodos(null);
        console.log('[UserDetail] Fetching todos...');
        const data = await fetchUserTodos(user.id);
        setTodos(data);
        console.log('[UserDetail] Todos loaded:', data.length);
      } catch (error) {
        console.error('[UserDetail] Error loading todos:', error);
        setErrorTodos(error.message);
      } finally {
        setLoadingTodos(false);
      }
    };

    // Load both in parallel - creates interesting Network panel waterfall
    Promise.all([loadPosts(), loadTodos()]).then(() => {
      console.log('[UserDetail] All data loaded for user:', user.name);
    });
  }, [user.id, user.name]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      console.log('[UserDetail] Closing modal via backdrop click');
      onClose();
    }
  };

  const completedTodos = todos.filter(t => t.completed).length;
  const pendingTodos = todos.length - completedTodos;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h2>{user.name}</h2>
            <p className="modal-subtitle">
              {user.email} • {user.company.name}
            </p>
          </div>
          <button onClick={onClose} className="close-btn" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Posts Section */}
          <section className="detail-section">
            <h3>პოსტები ({posts.length})</h3>
            {loadingPosts ? (
              <LoadingSpinner text="პოსტები იტვირთება..." />
            ) : errorPosts ? (
              <div className="error-message">
                <p>შეცდომა: {errorPosts}</p>
              </div>
            ) : posts.length === 0 ? (
              <p className="empty-text">პოსტები არ არის</p>
            ) : (
              <div className="posts-list">
                {posts.slice(0, 5).map(post => (
                  <div key={post.id} className="post-item">
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-body">{post.body}</p>
                  </div>
                ))}
                {posts.length > 5 && (
                  <p className="more-text">+ კიდევ {posts.length - 5} პოსტი</p>
                )}
              </div>
            )}
          </section>

          {/* Todos Section */}
          <section className="detail-section">
            <h3>
              დავალებები ({todos.length})
              {todos.length > 0 && (
                <span className="todo-stats">
                  {' '}• ✅ {completedTodos} • ⏳ {pendingTodos}
                </span>
              )}
            </h3>
            {loadingTodos ? (
              <LoadingSpinner text="დავალებები იტვირთება..." />
            ) : errorTodos ? (
              <div className="error-message">
                <p>შეცდომა: {errorTodos}</p>
              </div>
            ) : todos.length === 0 ? (
              <p className="empty-text">დავალებები არ არის</p>
            ) : (
              <div className="todos-list">
                {todos.slice(0, 10).map(todo => (
                  <div key={todo.id} className="todo-item">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                      className="todo-checkbox"
                    />
                    <span className={todo.completed ? 'todo-text completed' : 'todo-text'}>
                      {todo.title}
                    </span>
                  </div>
                ))}
                {todos.length > 10 && (
                  <p className="more-text">+ კიდევ {todos.length - 10} დავალება</p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
