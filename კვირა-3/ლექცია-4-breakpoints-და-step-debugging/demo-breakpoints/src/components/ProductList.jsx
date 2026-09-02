import ProductCard from './ProductCard';

const PRODUCTS = [
  { id: 1, name: 'უსადენო მაუსი', price: 45.00, category: 'აქსესუარები', color: '#a29bfe' },
  { id: 2, name: 'მექანიკური კლავიატურა', price: 120.00, category: 'ელექტრონიკა', color: '#6c5ce7' },
  { id: 3, name: 'USB ჰაბი', price: 25.00, category: 'აქსესუარები', color: '#00cec9' },
  { id: 4, name: 'ვებ-კამერა', price: 89.00, category: 'ელექტრონიკა', color: '#fd79a8' },
  { id: 5, name: 'სათამაშო ჯოისტიკი', price: 65.00, category: 'სათამაშოები', color: '#ffeaa7' },
  { id: 6, name: 'HD მონიტორი', price: 299.00, category: 'ელექტრონიკა', color: '#74b9ff' },
];

export default function ProductList({ onAddToCart }) {
  return (
    <div className="shop">
      <h2>სავარჯიშო მაღაზია</h2>
      <div className="product-list">
        {PRODUCTS.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
