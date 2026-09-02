import { useState } from 'react';

/**
 * NetworkDemo - Network Debugging დემო
 *
 * აჩვენებს:
 * 1. API მოთხოვნების შესრულებას fetch-ით
 * 2. Loading, Error და Success state-ების მართვას
 * 3. Response Time და Status Code-ის ჩვენებას
 * 4. შეცდომების დამუშავებას (404, network errors)
 *
 * Network Debugging-ის პრაქტიკა:
 * - DevTools Network Tab-ში დააკვირდით მოთხოვნებს
 * - შეამოწმეთ response headers, payload size
 * - გაარჩიეთ waterfall chart, timing breakdown
 */
function NetworkDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [responseTime, setResponseTime] = useState(null);

  const fetchData = async (url, label) => {
    setLoading(true);
    setError(null);
    setData(null);
    setStatusCode(null);
    setResponseTime(null);

    const startTime = performance.now();

    try {
      const response = await fetch(url);
      const elapsed = Math.round(performance.now() - startTime);
      setResponseTime(elapsed);
      setStatusCode(response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText || 'Not Found'}`);
      }

      const json = await response.json();
      setData(json);
      console.log(`[${label}] Success:`, json.length, 'items,', elapsed + 'ms');
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      if (!responseTime) setResponseTime(elapsed);
      setError(err.message);
      console.error(`[${label}] Error:`, err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadUsers = () => {
    fetchData('https://jsonplaceholder.typicode.com/users', 'Load Users');
  };

  const handleLoadError = () => {
    fetchData('https://jsonplaceholder.typicode.com/nonexistent-endpoint', 'Load Error');
  };

  return (
    <div className="api-section">
      <div className="api-buttons">
        <button
          className="btn btn--primary"
          onClick={handleLoadUsers}
          disabled={loading}
        >
          {loading ? 'იტვირთება...' : 'Load Users'}
        </button>
        <button
          className="btn btn--danger"
          onClick={handleLoadError}
          disabled={loading}
        >
          Load Error (404)
        </button>
      </div>

      {/* Response Info */}
      {(statusCode !== null || responseTime !== null) && (
        <div className="response-info">
          {statusCode !== null && (
            <span className={`info-chip ${statusCode >= 200 && statusCode < 300 ? 'info-chip--success' : 'info-chip--error'}`}>
              Status: {statusCode}
            </span>
          )}
          {responseTime !== null && (
            <span className="info-chip">
              Response Time: {responseTime}ms
            </span>
          )}
          {data && (
            <span className="info-chip info-chip--success">
              {data.length} records
            </span>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <div className="loading-text">მონაცემები იტვირთება...</div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="error-container">
          <h4>შეცდომა!</h4>
          <p>{error}</p>
        </div>
      )}

      {/* Success State — Table */}
      {data && !loading && (
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {data.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.company?.name || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Initial empty state */}
      {!data && !loading && !error && (
        <div className="empty-state">
          დააჭირეთ ღილაკს მონაცემების ჩასატვირთად
        </div>
      )}
    </div>
  );
}

export default NetworkDemo;
