import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, placeholder = 'მომხმარებლის ძებნა...' }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    console.log('[SearchBar] Search query changed:', query);

    // Debounced search with 300ms delay
    const timer = setTimeout(() => {
      console.log('[SearchBar] Executing debounced search:', query);
      onSearch(query);
    }, 300);

    // Cleanup function - this is a good breakpoint target in Sources panel
    return () => {
      console.log('[SearchBar] Cleanup: clearing timer');
      clearTimeout(timer);
    };
  }, [query, onSearch]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleClear = () => {
    console.log('[SearchBar] Clearing search');
    setQuery('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      {query && (
        <button onClick={handleClear} className="clear-btn" aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
