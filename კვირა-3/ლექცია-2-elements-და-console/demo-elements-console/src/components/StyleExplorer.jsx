function StyleExplorer() {
  const cssVariables = [
    { name: '--primary-color', value: '#4a6cf7', description: 'მთავარი ფერი' },
    { name: '--secondary-color', value: '#6c5ce7', description: 'მეორადი ფერი' },
    { name: '--success-color', value: '#00b894', description: 'წარმატების ფერი' },
    { name: '--warning-color', value: '#fdcb6e', description: 'გაფრთხილების ფერი' },
    { name: '--danger-color', value: '#e74c3c', description: 'საშიშროების ფერი' },
    { name: '--bg-dark', value: '#1a1d2e', description: 'მუქი ფონი' },
  ];

  return (
    <section className="style-explorer">
      <h2 className="section-title">CSS ცვლადების Explorer</h2>
      <p className="section-description">
        Elements panel-ში შეცვალეთ :root-ის CSS ცვლადები და დააკვირდით როგორ იცვლება გვერდი
      </p>

      <div className="variables-grid">
        {cssVariables.map((variable, index) => (
          <div key={index} className="variable-card" data-variable={variable.name}>
            <div
              className="color-preview"
              style={{ backgroundColor: variable.value }}
              data-color={variable.value}
            />
            <div className="variable-info">
              <code className="variable-name">{variable.name}</code>
              <span className="variable-description">{variable.description}</span>
              <span className="variable-value">{variable.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="style-demo-box">
        <p>ეს ყუთი იყენებს <code>var(--primary-color)</code> ცვლადს border-სთვის</p>
        <p>შეცვალეთ --primary-color :root-ში და დააკვირდით ცვლილებებს!</p>
      </div>

      <div className="console-hint">
        💡 Console-ში სცადეთ:
        <code>document.documentElement.style.setProperty('--primary-color', '#e74c3c')</code>
      </div>
    </section>
  );
}

export default StyleExplorer;
