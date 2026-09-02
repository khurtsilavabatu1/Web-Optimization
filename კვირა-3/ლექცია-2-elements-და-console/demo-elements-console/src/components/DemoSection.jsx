import { useState } from 'react'

function DemoSection() {
  const [products] = useState([
    { id: 1, name: 'ლეპტოპი Pro X', price: 2499, category: 'ელექტრონიკა', icon: '💻' },
    { id: 2, name: 'მექანიკური კლავიატურა', price: 149, category: 'აქსესუარები', icon: '⌨️' },
    { id: 3, name: 'ერგონომიული სავარძელი', price: 799, category: 'ავეჯი', icon: '🪑' },
  ]);

  const [students] = useState([
    { id: 1, name: 'გიორგი', grade: 95, active: true },
    { id: 2, name: 'მარიამი', grade: 88, active: true },
    { id: 3, name: 'ანა', grade: 91, active: true },
    { id: 4, name: 'დავითი', grade: 72, active: false },
  ]);

  return (
    <section className="demo-section">
      <h2 className="section-title">დემო სექციები Console-ისთვის</h2>

      {/* Products Grid */}
      <div className="subsection">
        <h3 className="subsection-title">პროდუქტები</h3>
        <div className="products-grid">
          {products.map(product => (
            <div
              key={product.id}
              className="product-item"
              data-product-id={product.id}
              data-category={product.category}
              data-price={product.price}
            >
              <div className="product-icon">{product.icon}</div>
              <h4 className="product-name">{product.name}</h4>
              <div className="product-meta">
                <span className="product-price">₾{product.price}</span>
                <span className="product-category">{product.category}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="console-hint">
          💡 Console-ში სცადეთ: <code>$$('[data-category="ელექტრონიკა"]')</code>
        </div>
      </div>

      {/* Students List */}
      <div className="subsection">
        <h3 className="subsection-title">სტუდენტები</h3>
        <div className="students-list">
          {students.map(student => (
            <div
              key={student.id}
              className={`student-item ${student.active ? 'active' : 'inactive'}`}
              data-student-id={student.id}
              data-name={student.name}
              data-grade={student.grade}
              data-active={student.active}
            >
              <div className="student-info">
                <span className="student-name">{student.name}</span>
                <span className="student-grade">შეფასება: {student.grade}</span>
              </div>
              <span className={`student-status ${student.active ? 'active' : 'inactive'}`}>
                {student.active ? 'აქტიური' : 'არააქტიური'}
              </span>
            </div>
          ))}
        </div>
        <div className="console-hint">
          💡 Console-ში სცადეთ: <code>$$('[data-active="true"]').length</code>
        </div>
      </div>
    </section>
  );
}

export default DemoSection;
