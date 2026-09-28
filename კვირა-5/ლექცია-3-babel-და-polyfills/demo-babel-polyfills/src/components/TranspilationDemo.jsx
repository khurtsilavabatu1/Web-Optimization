import React, { useEffect, useState } from 'react'
import CodeComparison from './CodeComparison'

/**
 * ეს სექცია ნამდვილ Babel-ს უშვებს პირდაპირ ბრაუზერში (@babel/standalone).
 * ქვემოთ მოცემული არცერთი "ტრანსპილირებული" შედეგი ხელით არ წერია —
 * ყველა რეალურად გენერირდება გვერდის ჩატვირთვისას.
 */
const examples = [
  {
    title: 'Arrow Functions',
    code: `const greet = (name) => {
  return \`Hello, \${name}!\`;
};`,
  },
  {
    title: 'Destructuring',
    code: `const user = { name: 'Giorgi', age: 25 };
const { name, age } = user;`,
  },
  {
    title: 'Template Literals',
    code: `const name = 'Nino';
const greeting = \`Hello, \${name}!
Welcome to our site.\`;`,
  },
  {
    title: 'Async/Await',
    code: `async function fetchUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();
  return user;
}`,
  },
  {
    title: 'Optional Chaining',
    code: `const city = user?.address?.city ?? 'უცნობი';`,
  },
  {
    title: 'Nullish Coalescing',
    code: `const port = config.port ?? 3000;
const title = config.title ?? 'Default';`,
  },
  {
    title: 'Class Fields',
    code: `class Counter {
  count = 0;
  step = 1;

  increment = () => {
    this.count += this.step;
  };
}`,
  },
  {
    title: 'Private Methods',
    code: `class BankAccount {
  #balance = 0;

  #validate(amount) {
    return amount > 0;
  }

  deposit(amount) {
    if (this.#validate(amount)) {
      this.#balance += amount;
    }
  }
}`,
  },
]

/**
 * სამი სამიზნე კონფიგურაცია — შეცვლისას Babel-ის output რეალურად იცვლება.
 * სწორედ ეს აჩვენებს, რომ „ტრანსპილაცია" ერთი ფიქსირებული რამ არ არის:
 * ყველაფერს `targets` წყვეტს.
 */
const TARGET_PRESETS = [
  {
    id: 'es5',
    label: 'ES5 (IE 11)',
    hint: 'ყველაზე აგრესიული — ყველაფერი var-ებად და function-ებად იშლება',
    targets: { ie: '11' },
  },
  {
    id: 'safari12',
    label: 'Safari 12',
    hint: 'arrow function-ები რჩება, მაგრამ ?. და ??  გარდაიქმნება',
    targets: { safari: '12' },
  },
  {
    id: 'modern',
    label: 'თანამედროვე',
    hint: 'defaults — თითქმის არაფერი იცვლება',
    targets: 'defaults, not IE 11',
  },
]

function TranspilationDemo() {
  const [babel, setBabel] = useState(null)
  const [error, setError] = useState(null)
  const [targetId, setTargetId] = useState('es5')

  // Babel დიდია (~3 MB), ამიტომ dynamic import-ით ცალკე chunk-ად იტვირთება —
  // მთავარ ბანდლს არ ამძიმებს.
  useEffect(() => {
    let cancelled = false
    import('@babel/standalone')
      .then((mod) => {
        if (!cancelled) setBabel(mod)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const preset = TARGET_PRESETS.find((t) => t.id === targetId)

  const results = React.useMemo(() => {
    if (!babel) return []
    return examples.map((example) => {
      try {
        const { code } = babel.transform(example.code, {
          presets: [['env', { targets: preset.targets }]],
          // ბრაუზერში მოდულის ნაცვლად სკრიპტად ვამუშავებთ,
          // რომ output-ში "use strict" და export-ების ხმაური არ ჩაერიოს
          sourceType: 'script',
          comments: false,
        })
        return { ...example, transpiled: code }
      } catch (err) {
        return { ...example, transpiled: `// შეცდომა: ${err.message}` }
      }
    })
  }, [babel, preset])

  return (
    <section className="transpilation-section">
      <h2 className="section-title">Babel ტრანსპილაცია</h2>
      <p className="section-desc">
        Babel გარდაქმნის თანამედროვე JavaScript-ს ისეთ სინტაქსად, რომელსაც
        სამიზნე ბრაუზერები იცნობენ. მარჯვენა პანელი <strong>რეალური</strong>{' '}
        Babel-ის output-ია — აქვე, ბრაუზერში გენერირებული.
      </p>

      <div className="target-picker">
        <span className="target-picker-label">სამიზნე ბრაუზერები:</span>
        {TARGET_PRESETS.map((t) => (
          <button
            key={t.id}
            className={`target-btn ${t.id === targetId ? 'active' : ''}`}
            onClick={() => setTargetId(t.id)}
          >
            {t.label}
          </button>
        ))}
        <p className="target-hint">{preset.hint}</p>
      </div>

      {error && (
        <p className="babel-status error">Babel ვერ ჩაიტვირთა: {error}</p>
      )}

      {!babel && !error && (
        <p className="babel-status">⏳ Babel იტვირთება…</p>
      )}

      {babel && (
        <div className="transpilation-grid">
          {results.map((example) => (
            <CodeComparison
              key={example.title}
              title={example.title}
              modern={example.code}
              transpiled={example.transpiled}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default TranspilationDemo
