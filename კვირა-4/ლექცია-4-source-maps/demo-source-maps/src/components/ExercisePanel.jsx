export function ExercisePanel({ onTriggerError }) {
  return (
    <div className="card card-full">
      <div className="card-header">
        <h2 className="card-title">
          პრაქტიკული სავარჯიშოები
          <span className="card-badge yellow">4 ნაბიჯი</span>
        </h2>
      </div>

      <div className="exercise-list">
        {/* სავარჯიშო 1 */}
        <div className="exercise-item">
          <div className="exercise-header">
            <div className="exercise-number">1</div>
            <div className="exercise-content">
              <div className="exercise-title">Build with sourcemap: true</div>
              <div className="exercise-description">
                დააბილდეთ პროექტი source maps-ით და ნახეთ როგორ ჩანს ორიგინალი კოდი DevTools-ში
              </div>
              <ul className="exercise-steps">
                <li>გახსენით <code>vite.config.js</code> და დარწმუნდით რომ <code>sourcemap: true</code></li>
                <li>გაუშვით ტერმინალში: <code>npm run build</code></li>
                <li>გახსენით <code>dist/</code> ფოლდერი და ნახეთ <code>.js.map</code> ფაილები</li>
                <li>გაუშვით: <code>npm run preview</code></li>
                <li>გახსენით DevTools → Sources → ნახეთ <code>src/</code> ფოლდერი</li>
                <li>დააყენეთ breakpoint რომელიმე .jsx ფაილში და შეამოწმეთ</li>
              </ul>
            </div>
          </div>
        </div>

        {/* სავარჯიშო 2 */}
        <div className="exercise-item">
          <div className="exercise-header">
            <div className="exercise-number">2</div>
            <div className="exercise-content">
              <div className="exercise-title">Build with sourcemap: false</div>
              <div className="exercise-description">
                გამორთეთ source maps და სცადეთ debugging — ნახავთ რამდენად რთულია
              </div>
              <ul className="exercise-steps">
                <li>შეცვალეთ <code>vite.config.js</code>: <code>sourcemap: false</code></li>
                <li>გაუშვით: <code>npm run build</code></li>
                <li>შეამოწმეთ <code>dist/</code> — <code>.js.map</code> ფაილები აღარ არის</li>
                <li>გაუშვით: <code>npm run preview</code></li>
                <li>გახსენით DevTools → Sources → ნახავთ მხოლოდ minified კოდს</li>
                <li>დააწკაპუნეთ ქვემოთ "შეცდომის გენერირება" ღილაკს და ნახეთ stack trace</li>
              </ul>
            </div>
          </div>
        </div>

        {/* სავარჯიშო 3 */}
        <div className="exercise-item">
          <div className="exercise-header">
            <div className="exercise-number">3</div>
            <div className="exercise-content">
              <div className="exercise-title">Build with sourcemap: 'hidden'</div>
              <div className="exercise-description">
                "hidden" რეჟიმი — .map ფაილები ჩნდება, მაგრამ ბრაუზერი არ იყენებს
              </div>
              <ul className="exercise-steps">
                <li>შეცვალეთ <code>vite.config.js</code>: <code>sourcemap: 'hidden'</code></li>
                <li>გაუშვით: <code>npm run build</code></li>
                <li>შეამოწმეთ <code>dist/</code> — <code>.js.map</code> ფაილები არსებობს</li>
                <li>გახსენით რომელიმე <code>dist/*.js</code> ფაილი და ნახეთ ბოლო ხაზი — <code>sourceMappingURL</code> კომენტარი არ არის</li>
                <li>გაუშვით: <code>npm run preview</code> და გახსენით DevTools</li>
                <li>ბრაუზერი ვერ იპოვის source maps-ს — ნახავთ minified კოდს</li>
              </ul>
            </div>
          </div>
        </div>

        {/* სავარჯიშო 4 */}
        <div className="exercise-item">
          <div className="exercise-header">
            <div className="exercise-number">4</div>
            <div className="exercise-content">
              <div className="exercise-title">Stack Trace შედარება</div>
              <div className="exercise-description">
                შეადარეთ ერთი და იგივე შეცდომის stack trace source maps-ის გარეშე და მასთან
              </div>
              <ul className="exercise-steps">
                <li>დააბილდეთ ორივე ვარიანტით (<code>true</code> და <code>false</code>)</li>
                <li>დააწკაპუნეთ ქვემოთ "შეცდომის გენერირება" ღილაკს</li>
                <li>გახსენით Console და ნახეთ stack trace</li>
                <li>ყურადღება მიაქციეთ: ფუნქციების სახელებს, ფაილის სახელებს, ხაზის ნომრებს</li>
                <li>შეადარეთ რამდენად საინფორმაციოა ერთი და მეორე</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* შეცდომის გენერირების ღილაკი */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          className="btn btn-danger"
          onClick={onTriggerError}
          style={{ fontSize: '1rem', padding: '1rem 2rem' }}
        >
          🔥 შეცდომის გენერირება
        </button>
        <p style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
          ეს ღილაკი განზრახ იწვევს TypeError-ს nested ფუნქციებით.
          <br />
          გახსენით Console და ნახეთ stack trace source maps-ით და მის გარეშე.
        </p>
      </div>
    </div>
  );
}
