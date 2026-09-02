export function UserSearch({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="ძიება სახელით ან ემაილით..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
