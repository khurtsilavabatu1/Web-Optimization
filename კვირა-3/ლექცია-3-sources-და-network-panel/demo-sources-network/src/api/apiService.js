/**
 * API Service for JSONPlaceholder
 * ეს მოდული უზრუნველყოფს API calls-ს და შექმნილია
 * Sources და Network panel-ების პრაქტიკისთვის
 */

const API_BASE = 'https://jsonplaceholder.typicode.com';

// Utility function to add random delays for interesting Network waterfall
const addRandomDelay = (min = 100, max = 500) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Stats tracking
let requestStats = {
  totalRequests: 0,
  totalTime: 0,
  requests: []
};

export const getStats = () => ({
  totalRequests: requestStats.totalRequests,
  averageTime: requestStats.totalRequests > 0
    ? Math.round(requestStats.totalTime / requestStats.totalRequests)
    : 0,
  requests: [...requestStats.requests]
});

export const resetStats = () => {
  requestStats = {
    totalRequests: 0,
    totalTime: 0,
    requests: []
  };
};

/**
 * Generic fetch wrapper with logging and timing
 */
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const startTime = performance.now();

  console.log(`[API] 🚀 Request started: ${endpoint}`);
  console.log(`[API] URL: ${url}`);

  try {
    // Add artificial delay to make Network panel more interesting
    await addRandomDelay();

    const response = await fetch(url, options);
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    console.log(`[API] ✅ Request completed: ${endpoint} (${duration}ms)`);
    console.log(`[API] Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
      console.error(`[API] ❌ Request failed: ${endpoint}`, error);
      throw error;
    }

    const data = await response.json();

    // Update stats
    requestStats.totalRequests++;
    requestStats.totalTime += duration;
    requestStats.requests.push({
      endpoint,
      duration,
      timestamp: Date.now(),
      status: response.status
    });

    console.log(`[API] 📦 Data received:`, data.length ? `${data.length} items` : 'object');

    return data;
  } catch (error) {
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    console.error(`[API] ❌ Request failed: ${endpoint} (${duration}ms)`, error);

    requestStats.totalRequests++;
    requestStats.totalTime += duration;
    requestStats.requests.push({
      endpoint,
      duration,
      timestamp: Date.now(),
      status: 'error',
      error: error.message
    });

    throw error;
  }
};

/**
 * Fetch all users
 */
export const fetchUsers = async () => {
  console.group('[API] fetchUsers');
  try {
    const users = await apiFetch('/users');
    console.log(`[API] Fetched ${users.length} users`);
    return users;
  } catch (error) {
    console.error('[API] Failed to fetch users', error);
    throw error;
  } finally {
    console.groupEnd();
  }
};

/**
 * Fetch posts for a specific user
 */
export const fetchUserPosts = async (userId) => {
  console.group(`[API] fetchUserPosts - User ${userId}`);
  try {
    const posts = await apiFetch(`/posts?userId=${userId}`);
    console.log(`[API] Fetched ${posts.length} posts for user ${userId}`);
    return posts;
  } catch (error) {
    console.error(`[API] Failed to fetch posts for user ${userId}`, error);
    throw error;
  } finally {
    console.groupEnd();
  }
};

/**
 * Fetch todos for a specific user
 */
export const fetchUserTodos = async (userId) => {
  console.group(`[API] fetchUserTodos - User ${userId}`);
  try {
    const todos = await apiFetch(`/todos?userId=${userId}`);
    console.log(`[API] Fetched ${todos.length} todos for user ${userId}`);
    return todos;
  } catch (error) {
    console.error(`[API] Failed to fetch todos for user ${userId}`, error);
    throw error;
  } finally {
    console.groupEnd();
  }
};

/**
 * Fetch comments for a specific post
 */
export const fetchComments = async (postId) => {
  console.group(`[API] fetchComments - Post ${postId}`);
  try {
    const comments = await apiFetch(`/comments?postId=${postId}`);
    console.log(`[API] Fetched ${comments.length} comments for post ${postId}`);
    return comments;
  } catch (error) {
    console.error(`[API] Failed to fetch comments for post ${postId}`, error);
    throw error;
  } finally {
    console.groupEnd();
  }
};

/**
 * Search users by name (client-side filtering)
 */
export const searchUsers = async (query) => {
  console.group(`[API] searchUsers - Query: "${query}"`);
  try {
    const users = await fetchUsers();

    if (!query || query.trim() === '') {
      console.log('[API] Empty query, returning all users');
      return users;
    }

    const normalizedQuery = query.toLowerCase().trim();
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery) ||
      user.company.name.toLowerCase().includes(normalizedQuery) ||
      user.username.toLowerCase().includes(normalizedQuery)
    );

    console.log(`[API] Search returned ${filtered.length} results for "${query}"`);
    return filtered;
  } catch (error) {
    console.error(`[API] Search failed for query "${query}"`, error);
    throw error;
  } finally {
    console.groupEnd();
  }
};
