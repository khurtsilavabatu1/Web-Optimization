import { useState } from 'react';

export function UserForm({ onAddUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    active: true,
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      onAddUser(formData.name, formData.email, formData.age, formData.active);

      // ფორმის გასუფთავება წარმატებული დამატების შემდეგ
      setFormData({
        name: '',
        email: '',
        age: '',
        active: true,
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          ახალი მომხმარებელი
          <span className="card-badge primary">ფორმა</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">სახელი</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="მაგ: გიორგი მელაძე"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">ემაილი</label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-input"
            placeholder="მაგ: giorgi@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age" className="form-label">ასაკი</label>
          <input
            type="text"
            id="age"
            name="age"
            className="form-input"
            placeholder="მაგ: 28"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <div className="form-checkbox-wrapper">
            <input
              type="checkbox"
              id="active"
              name="active"
              className="form-checkbox"
              checked={formData.active}
              onChange={handleChange}
            />
            <label htmlFor="active" className="form-checkbox-label">
              აქტიური მომხმარებელი
            </label>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            color: '#f87171',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '0.9rem',
          }}>
            {error}
          </div>
        )}

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          დამატება
        </button>
      </form>
    </div>
  );
}
