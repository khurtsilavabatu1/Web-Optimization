import BillItem from './BillItem';
import ServiceSelector from './ServiceSelector';
import CloseBill from './CloseBill';
import {
  calculateSubtotal,
  calculateServiceFee,
  calculateTotal,
  splitPerPerson
} from '../utils/billing';

export default function Bill({
  order,
  onUpdateQuantity,
  onRemoveDish,
  onClearBill,
  servicePercent,
  onChangeService,
  people,
  onChangePeople
}) {
  console.log('🧾 Bill.render()', { orderLength: order.length, servicePercent, people });

  const subtotal = calculateSubtotal(order);
  const serviceFee = calculateServiceFee(subtotal, servicePercent);
  const total = calculateTotal(subtotal, serviceFee);
  const perPerson = splitPerPerson(total, people);

  const handleBillClosed = () => {
    console.log('✅ Bill.handleBillClosed()');
    onClearBill();
  };

  return (
    <aside className="bill-sidebar">
      <h3>ანგარიში</h3>

      <div id="bill-items">
        {order.length === 0 ? (
          <p className="empty-bill">ანგარიში ცარიელია</p>
        ) : (
          order.map(item => (
            <BillItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveDish}
            />
          ))
        )}
      </div>

      <ServiceSelector
        servicePercent={servicePercent}
        onChangeService={onChangeService}
        people={people}
        onChangePeople={onChangePeople}
      />

      <div className="bill-summary">
        <div className="summary-row">
          <span>ქვეჯამი:</span>
          <span>{subtotal.toFixed(2)} ₾</span>
        </div>

        <div className="summary-row">
          <span>მომსახურება ({servicePercent}%):</span>
          <span>{serviceFee.toFixed(2)} ₾</span>
        </div>

        <div className="summary-row total-row">
          <span>ჯამი:</span>
          <span>{total.toFixed(2)} ₾</span>
        </div>

        <div className="summary-row discount-row">
          <span>თითო ადამიანზე ({people}):</span>
          <span>{perPerson.toFixed(2)} ₾</span>
        </div>
      </div>

      <div className="bill-actions">
        <CloseBill
          order={order}
          total={total}
          perPerson={perPerson}
          onBillClosed={handleBillClosed}
        />
        <button className="clear-bill-btn" onClick={onClearBill}>
          ანგარიშის გასუფთავება
        </button>
      </div>
    </aside>
  );
}
