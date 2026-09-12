import { calculateTotals, formatMoney } from '../utils/pricing'

export default function OrderDetails({ order }) {
  const totals = calculateTotals(order)

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>შეკვეთის დეტალები</h2>
        <span className="spacer" />
        <span className="chip chip-info">{order.id}</span>
      </div>
      <div className="panel-body">
        <p className="panel-note">
          კლიენტი: <strong>{order.customer.name}</strong>
          <br />
          მისამართი: {order.customer.address}
        </p>

        <table className="data-table" style={{ marginTop: '0.6rem' }}>
          <thead>
            <tr>
              <th>SKU</th>
              <th>დასახელება</th>
              <th>ფასი</th>
              <th>რაოდ.</th>
              <th>ჯამი</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => (
              <tr key={item.sku}>
                <td className="mono">{item.sku}</td>
                <td>{item.title}</td>
                <td>{formatMoney(item.price)}</td>
                <td>{item.quantity}</td>
                <td>{formatMoney(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="stat-grid" style={{ marginTop: '0.75rem' }}>
          <div className="stat-box">
            <div className="stat-label">ქვეჯამი</div>
            <div className="stat-value">{formatMoney(totals.subtotal)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">ფასდაკლება</div>
            <div className="stat-value">{formatMoney(totals.discount)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">მიწოდება</div>
            <div className="stat-value">{formatMoney(totals.shipping)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
