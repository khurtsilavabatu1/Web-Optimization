import './CssNestingDemo.css'

export default function CssNestingDemo({ useModern }) {
  return (
    <div className="demo-block">
      <h3 className="demo-title">CSS Nesting vs Flat Selectors</h3>
      <p className="demo-description">
        {useModern
          ? "CSS Nesting: Sass-ის მსგავსი სინტაქსი native CSS-ში"
          : "Fallback: ტრადიციული flat სელექტორები"}
      </p>

      <div className={`nesting-demo ${useModern ? 'modern' : 'fallback'}`}>
        <div className="nesting-card">
          <h4>ბარათი</h4>
          <p>გადაიტანეთ კურსორი</p>
          <button className="nesting-btn">ღილაკი</button>
        </div>
      </div>

      <div className="demo-explanation code-comparison">
        <div className="explanation-item">
          <strong>თანამედროვე CSS Nesting:</strong>
          <pre><code>{`.card {
  background: blue;

  &:hover {
    background: darkblue;
  }

  .btn {
    color: white;

    &:hover {
      color: yellow;
    }
  }
}`}</code></pre>
        </div>
        <div className="explanation-item">
          <strong>Fallback Flat Selectors:</strong>
          <pre><code>{`.card {
  background: blue;
}

.card:hover {
  background: darkblue;
}

.card .btn {
  color: white;
}

.card .btn:hover {
  color: yellow;
}`}</code></pre>
        </div>
      </div>
    </div>
  )
}
