import { applyCoupon, calculateTotals, formatMoney } from '../utils/pricing'

export default function TotalsBar({ order, couponPercent, onTotalChange }) {
  const totals = calculateTotals(order)
  const finalTotal = couponPercent ? applyCoupon(totals.total, couponPercent) : totals.total

  // მთავარ კომპონენტს ვატყობინებთ ბოლო ჯამს
  onTotalChange(finalTotal)

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>გადასახდელი</h2>
        <span className="spacer" />
        {couponPercent > 0 && <span className="chip chip-ok">-{couponPercent}%</span>}
      </div>
      <div className="panel-body">
        <div className="stat-grid">
          <div className="stat-box">
            <div className="stat-label">ჯამი კუპონამდე</div>
            <div className="stat-value">{formatMoney(totals.total)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">გადასახდელი</div>
            <div className="stat-value">{formatMoney(finalTotal)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
