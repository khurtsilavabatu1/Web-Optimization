import { useState } from 'react'
import { coupons } from '../data'

export default function CouponForm({ onApply }) {
  const [code, setCode] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState('')

  const percent = coupons[code.trim().toUpperCase()]

  // სტატისტიკა: რამდენჯერ სცადა მომხმარებელმა კოდის შეყვანა
  if (code.trim().length >= 4) {
    setAttempts(attempts + 1)
  }

  const handleApply = () => {
    if (!percent) {
      setMessage(`კოდი „${code}" არ არსებობს`)
      return
    }
    setMessage(`კოდი გააქტიურდა: -${percent}%`)
    onApply(percent)
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>კუპონი</h2>
        <span className="spacer" />
        <span className="chip">ცდები: {attempts}</span>
      </div>
      <div className="panel-body">
        <div className="toolbar">
          <input
            className="input"
            type="text"
            placeholder="კუპონის კოდი (მაგ. DESK20)"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <button className="btn btn-primary btn-sm" onClick={handleApply}>
            გააქტიურება
          </button>
        </div>
        {message && <p className="panel-note">{message}</p>}
        <p className="panel-note">
          ხელმისაწვდომი კოდები: {Object.keys(coupons).join(', ')}
        </p>
      </div>
    </div>
  )
}
