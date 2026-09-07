import { SERVICE_RATES } from '../utils/billing';

export default function ServiceSelector({ servicePercent, onChangeService, people, onChangePeople }) {
  return (
    <div className="discount-form">
      <div className="service-label">მომსახურება (ჩაი)</div>
      <div className="service-options">
        {SERVICE_RATES.map(rate => (
          <button
            key={rate}
            className={`service-btn ${servicePercent === rate ? 'active' : ''}`}
            onClick={() => {
              console.log('🎟️ ServiceSelector — service changed', { rate });
              onChangeService(rate);
            }}
          >
            {rate}%
          </button>
        ))}
      </div>

      <div className="people-row">
        <label htmlFor="people">ადამიანების რაოდენობა:</label>
        <input
          id="people"
          type="number"
          min="1"
          max="20"
          className="discount-input"
          value={people}
          onChange={(e) => onChangePeople(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
