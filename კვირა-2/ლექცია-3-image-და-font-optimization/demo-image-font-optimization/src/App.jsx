import HeroPicture from './components/HeroPicture';
import ResponsiveGallery from './components/ResponsiveGallery';
import LazyImage from './components/LazyImage';
import FontDisplayDemo from './components/FontDisplayDemo';
import PerformanceMetrics from './components/PerformanceMetrics';

function App() {
  return (
    <>
      <HeroPicture />

      <main className="container">
        <ResponsiveGallery />

        <section className="section">
          <h2>Lazy Loading Gallery</h2>
          <p>ქვემოთ მოცემული სურათები <code>loading="lazy"</code> ატრიბუტს იყენებენ. Network tab-ში დააკვირდით — ისინი მხოლოდ scroll-ზე ჩაიტვირთება.</p>

          <div className="scroll-hint">
            &#8595; დასქროლეთ ქვემოთ gallery-ს სანახავად &#8595;
          </div>

          <div style={{
            height: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8fafc',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
              ეს ცარიელი სივრცე gallery-ს ეკრანის ქვემოთ ატანს — scroll-ზე lazy loading-ის დასანახად
            </p>
          </div>

          <div className="gallery">
            <LazyImage
              name="gallery-1"
              alt="Gallery 1"
            />
            <LazyImage
              name="gallery-2"
              alt="Gallery 2"
            />
            <LazyImage
              name="gallery-3"
              alt="Gallery 3"
            />
            <LazyImage
              name="gallery-4"
              alt="Gallery 4"
            />
          </div>
        </section>

        <FontDisplayDemo />

        <section className="section">
          <h2>Self-hosted Font vs Google Fonts CDN</h2>

          <div className="font-compare">
            <div className="font-card">
              <h3>Self-hosted (ლოკალური)</h3>
              <p className="font-self-hosted">
                ეს ტექსტი self-hosted Inter ფონტით ჩანს. ფონტის ფაილი პროექტშია (<code>fonts/</code> ფოლდერში). ბრაუზერს Google-ის სერვერთან დაკავშირება არ სჭირდება.
              </p>
              <span className="badge badge-green">self-hosted</span>
            </div>

            <div className="font-card">
              <h3>Google Fonts CDN</h3>
              <p className="font-cdn">
                ეს ტექსტი Google Fonts CDN-ით ჩაიტვირთა. ბრაუზერი ჯერ Google-ის სერვერთან კავშირს ამყარებს, CSS-ს ტვირთავს, შემდეგ ფონტის ფაილს.
              </p>
              <span className="badge">CDN</span>
            </div>
          </div>

          <div className="info-box">
            <strong>Network tab-ში შეადარეთ:</strong>
            <ol>
              <li>Self-hosted: ერთი request ლოკალური ფაილისთვის</li>
              <li>CDN: fonts.googleapis.com + fonts.gstatic.com — ორი სხვადასხვა სერვერის request</li>
            </ol>
          </div>
        </section>

        <PerformanceMetrics />
      </main>
    </>
  );
}

export default App;
