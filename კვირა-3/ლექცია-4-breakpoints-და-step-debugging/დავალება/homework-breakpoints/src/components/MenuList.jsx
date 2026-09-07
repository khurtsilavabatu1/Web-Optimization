import MenuCard from './MenuCard';

const DISHES = [
  { id: 1, name: 'ხაჭაპური', price: 12.50, category: 'ცომეული', color: '#ffeaa7' },
  { id: 2, name: 'მწვანილიანი სალათი', price: 8.00, category: 'სალათები', color: '#55efc4' },
  { id: 3, name: 'მწვადი', price: 24.00, category: 'ცხელი კერძები', color: '#fd79a8' },
  { id: 4, name: 'ლობიო ქოთანში', price: 11.00, category: 'ცხელი კერძები', color: '#e17055' },
  { id: 5, name: 'ნიგვზიანი ბადრიჯანი', price: 14.00, category: 'სალათები', color: '#a29bfe' },
  { id: 6, name: 'ნაპოლეონი', price: 9.50, category: 'დესერტი', color: '#74b9ff' },
];

export default function MenuList({ onAddToBill }) {
  return (
    <div className="menu">
      <h2>რესტორნის მენიუ</h2>
      <div className="dish-list">
        {DISHES.map(dish => (
          <MenuCard
            key={dish.id}
            dish={dish}
            onAddToBill={onAddToBill}
          />
        ))}
      </div>
    </div>
  );
}
