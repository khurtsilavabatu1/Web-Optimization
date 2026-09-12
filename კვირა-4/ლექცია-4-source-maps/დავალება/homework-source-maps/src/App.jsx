import { useState } from 'react'
import OrderList from './components/OrderList'
import OrderDetails from './components/OrderDetails'
import CouponForm from './components/CouponForm'
import TotalsBar from './components/TotalsBar'
import SymptomPanel from './components/SymptomPanel'
import { orders } from './data'
import { formatMoney } from './utils/pricing'

function App() {
  const [selectedId, setSelectedId] = useState('ORD-1001')
  const [couponPercent, setCouponPercent] = useState(0)
  const [lastTotal, setLastTotal] = useState(0)

  const selectedOrder = orders.find(order => order.id === selectedId)

  console.log('🔄 App rendering. არჩეული შეკვეთა:', selectedId)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Order Desk</h1>
        <p className="app-subtitle">
          დავალება — Source Maps და production build-ის დებაგინგი
        </p>
      </header>

      <div className="app-layout">
        <div className="main-content">
          <OrderList
            orders={orders}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          {selectedOrder && <OrderDetails order={selectedOrder} />}
        </div>

        <aside className="sidebar">
          <CouponForm onApply={setCouponPercent} />
          {selectedOrder && (
            <TotalsBar
              order={selectedOrder}
              couponPercent={couponPercent}
              onTotalChange={setLastTotal}
            />
          )}
          <div className="panel">
            <div className="panel-header">
              <h2>ბოლო გამოთვლა</h2>
            </div>
            <div className="panel-body">
              <div className="stat-box">
                <div className="stat-label">დაფიქსირებული ჯამი</div>
                <div className="stat-value">{formatMoney(lastTotal)}</div>
              </div>
              <p className="panel-note">
                ეს მაჩვენებელი „გადასახდელი" პანელიდან ეგზავნება მთავარ კომპონენტს.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <SymptomPanel />
    </div>
  )
}

export default App
