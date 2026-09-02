import { useState } from 'react';

const domNodeTracker = {
  nodes: [],
  add(node) {
    this.nodes.push(node);
  },
  clearAll() {
    this.nodes = [];
  }
};

export { domNodeTracker };

export default function DetachedDomLeak({ onUpdate }) {
  const [nodeCount, setNodeCount] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  const createDetachedNode = () => {
    // შევქმნათ დიდი DOM node მნიშვნელოვანი მონაცემებით
    const div = document.createElement('div');
    div.className = 'detached-node';
    div.innerHTML = `
      <h3>Detached Node #${domNodeTracker.nodes.length + 1}</h3>
      <p>${'Lorem ipsum dolor sit amet. '.repeat(100)}</p>
    `;

    // შევინახოთ ლინკი JS-ში, მაგრამ არ დავამატოთ DOM-ში
    // ეს არის detached DOM node — მეხსიერებაში რჩება!
    domNodeTracker.add(div);

    const count = domNodeTracker.nodes.length;
    setNodeCount(count);
    setMemoryUsage(count * 50); // ~50KB თითო node-ზე
    onUpdate?.();

    console.log(
      `%c+ Detached DOM node შეიქმნა (არ არის DOM-ში, მაგრამ JS-ში ინახება!)`,
      'color: #e74c3c; font-weight: bold;',
      div
    );
  };

  const clearNodes = () => {
    const count = domNodeTracker.nodes.length;
    domNodeTracker.clearAll();
    setNodeCount(0);
    setMemoryUsage(0);
    onUpdate?.();
    console.log(`%c✓ ${count} detached node გასუფთავდა`, 'color: #27ae60; font-weight: bold;');
  };

  return (
    <div className="leak-demo-card">
      <h3 className="leak-title">3. Detached DOM Nodes</h3>
      <p className="leak-description">
        შეიქმნება DOM node-ები რომლებიც არ არის დამატებული DOM-ში, მაგრამ JS-ში რჩება ლინკი
      </p>

      <div className="leak-stats-row">
        <div className="leak-stat-item">
          <span className="leak-stat-label">Detached Nodes:</span>
          <span className={`leak-stat-value ${nodeCount > 0 ? 'danger' : ''}`}>
            {nodeCount}
          </span>
        </div>
        <div className="leak-stat-item">
          <span className="leak-stat-label">~Memory:</span>
          <span className="leak-stat-value">{memoryUsage} KB</span>
        </div>
      </div>

      <div className="leak-memory-bar">
        <div
          className="leak-memory-fill"
          style={{ width: `${Math.min((memoryUsage / 1000) * 100, 100)}%` }}
        />
      </div>

      <div className="leak-actions">
        <button className="btn btn-warning" onClick={createDetachedNode}>
          შექმენი Detached Node
        </button>
        <button className="btn btn-reset" onClick={clearNodes}>
          გაასუფთავე
        </button>
      </div>

      <div className="leak-hint">
        💡 Hint: გახსენი DevTools → Memory → Heap Snapshot და იპოვე "Detached"
      </div>
    </div>
  );
}
