import { formatMoney, orderSubtotal } from '../utils/pricing'

export default function OrderList({ orders, selectedId, onSelect }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>შეკვეთები</h2>
        <span className="spacer" />
        <span className="chip">{orders.length} ჩანაწერი</span>
      </div>
      <div className="panel-body">
        <div className="list">
          {orders.map(order => (
            <div className={`list-row ${order.id === selectedId ? 'row-selected' : ''}`}>
              <div className="row-main">
                <div className="row-title">{order.id} — {order.customer.name}</div>
                <div className="row-sub">
                  {order.items.length} პოზიცია · {formatMoney(orderSubtotal(order))}
                </div>
              </div>
              <div className="row-actions">
                <span className="chip">{order.status}</span>
                <button className="btn btn-sm" onClick={() => onSelect(order.id)}>
                  გახსნა
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
