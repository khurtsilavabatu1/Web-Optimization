export function SourceMapInfo() {
  return (
    <div className="card card-full">
      <div className="card-header">
        <h2 className="card-title">
          რა არის Source Maps?
          <span className="card-badge green">ინფო</span>
        </h2>
      </div>

      <div className="info-section">
        <h3>მოკლედ</h3>
        <p>
          Source Maps არის ფაილები, რომლებიც აკავშირებენ minified/transpiled კოდს
          თქვენს ორიგინალ source კოდთან. როცა production-ში ხდება შეცდომა,
          ბრაუზერი source map-ის დახმარებით გიჩვენებთ ზუსტ ხაზს და ფუნქციას
          თქვენს ორიგინალ .jsx/.js ფაილში — არა მინიფიცირებულ bundle-ში.
        </p>
      </div>

      <div className="info-section">
        <h3>Vite-ში კონფიგურაცია</h3>
        <p>
          <code>vite.config.js</code> ფაილში <code>build.sourcemap</code> პარამეტრი
          განსაზღვრავს როგორ გენერირდება source maps:
        </p>

        <div className="config-options">
          <div className="config-option">
            <div className="config-option-title">sourcemap: true</div>
            <div className="config-option-desc">
              ✅ ქმნის სრულფასოვან .js.map ფაილებს<br />
              ✅ ბრაუზერი ავტომატურად ტვირთავს და აჩვენებს ორიგინალ კოდს<br />
              ✅ DevTools-ში ხედავთ .jsx/.js ფაილებს სრულად<br />
              ⚠️ .map ფაილები ხელმისაწვდომია ნებისმიერი მომხმარებლისთვის
            </div>
          </div>

          <div className="config-option">
            <div className="config-option-title">sourcemap: false</div>
            <div className="config-option-desc">
              ❌ source maps არ ქმნის<br />
              ❌ DevTools-ში მხოლოდ minified კოდი ჩანს<br />
              ❌ stack trace-ები წაუკითხავი და უსარგებლოა<br />
              ✅ უსაფრთხო, რადგან source არ იხილება
            </div>
          </div>

          <div className="config-option">
            <div className="config-option-title">sourcemap: 'hidden'</div>
            <div className="config-option-desc">
              ✅ ქმნის .js.map ფაილებს<br />
              ❌ არ ემატება sourceMappingURL კომენტარი<br />
              ❌ ბრაუზერი ავტომატურად ვერ იპოვის .map ფაილს<br />
              ✅ შეგიძლიათ ხელით ატვირთოთ error tracking სერვისში (Sentry)
            </div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>შედარება: ორიგინალი vs Build კოდი</h3>
        <div className="comparison-grid">
          <div className="comparison-panel">
            <div className="comparison-header good">ორიგინალი კოდი (src/)</div>
            <div className="comparison-body">
              <div className="code-block">
                <pre><code>{`function calculateTotal(items) {
  let total = 0;

  for (let item of items) {
    total += item.price * item.quantity;
  }

  return total;
}`}</code></pre>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.75rem' }}>
                ✅ წაკითხვადი სახელები<br />
                ✅ კომენტარები და ფორმატირება<br />
                ✅ გასაგები სტრუქტურა
              </p>
            </div>
          </div>

          <div className="comparison-panel">
            <div className="comparison-header bad">Build კოდი (dist/)</div>
            <div className="comparison-body">
              <div className="code-block">
                <pre><code>{`function a(b){let c=0;for(let d of b)c+=d.p*d.q;return c}`}</code></pre>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.75rem' }}>
                ❌ ერთასოიანი ცვლადები (a, b, c, d)<br />
                ❌ არანაირი კომენტარი<br />
                ❌ ყველაფერი ერთ ხაზზე<br />
                ⚠️ Source Maps-ის გარეშე ამას უნდა დააბაგოთ!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>როდის გვჭირდება Source Maps?</h3>
        <ul style={{ paddingLeft: '1.5rem', color: '#cbd5e1', lineHeight: '1.8' }}>
          <li>Production-ში შეცდომების debugging-ისთვის</li>
          <li>Performance profiling-ისთვის DevTools-ში</li>
          <li>Error tracking სერვისებისთვის (Sentry, Rollbar)</li>
          <li>React DevTools-ში კომპონენტების იდენტიფიცირებისთვის</li>
        </ul>
      </div>
    </div>
  );
}
