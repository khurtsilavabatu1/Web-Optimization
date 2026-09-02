function BrowserInfo({ info }) {
  const getEngineClass = (engine) => {
    return engine.toLowerCase()
  }

  return (
    <section className="browser-info">
      <h2>თქვენი ბრაუზერი</h2>
      <dl className="browser-details">
        <div className="browser-detail-item">
          <dt>Browser Engine</dt>
          <dd>
            <span className={`engine-badge ${getEngineClass(info.engine)}`}>
              {info.engine}
            </span>
          </dd>
        </div>
        <div className="browser-detail-item">
          <dt>Browser</dt>
          <dd>{info.browser}</dd>
        </div>
        <div className="browser-detail-item">
          <dt>Version</dt>
          <dd>{info.version}</dd>
        </div>
        <div className="browser-detail-item">
          <dt>Platform</dt>
          <dd>{info.platform}</dd>
        </div>
      </dl>
    </section>
  )
}

export default BrowserInfo
