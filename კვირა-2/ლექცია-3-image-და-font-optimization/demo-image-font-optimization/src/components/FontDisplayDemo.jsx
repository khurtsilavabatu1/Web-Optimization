function FontDisplayDemo() {
  return (
    <section className="section">
      <h2>Font Display — 4 ვარიანტი</h2>
      <p>
        ქვემოთ იგივე ტექსტი 4 სხვადასხვა <code>font-display</code> მნიშვნელობით ჩანს.
        Network tab-ში ფონტების ჩატვირთვა შეაჩერეთ (Slow 3G) და განსხვავება დააკვირდით.
      </p>

      <div className="info-box">
        <strong>როგორ შევამოწმოთ font-display:</strong>
        <ol>
          <li>DevTools &rarr; Network tab &rarr; "Font" ფილტრი</li>
          <li>Network throttling: "Slow 3G" აირჩიეთ</li>
          <li>Hard refresh (Cmd+Shift+R)</li>
          <li>დააკვირდით ტექსტის ქცევას ფონტის ჩატვირთვამდე</li>
        </ol>
      </div>

      <div className="font-grid">
        <div className="font-card">
          <h3>font-display: block</h3>
          <p className="font-block">
            ეს ტექსტი უხილავია ფონტის ჩატვირთვამდე. ბრაუზერი ელოდება custom ფონტს და
            მანამდე ტექსტი საერთოდ არ ჩანს (FOIT — Flash of Invisible Text).
          </p>
          <span className="badge">block</span>
        </div>

        <div className="font-card">
          <h3>font-display: swap</h3>
          <p className="font-swap">
            ეს ტექსტი მაშინვე ჩანს სისტემური ფონტით, შემდეგ იცვლება custom ფონტზე. ეს არის
            რეკომენდებული ვარიანტი (FOUT — Flash of Unstyled Text).
          </p>
          <span className="badge badge-green">swap (recommended)</span>
        </div>

        <div className="font-card">
          <h3>font-display: fallback</h3>
          <p className="font-fallback">
            მოკლე ხანს ელოდება, შემდეგ სისტემურ ფონტს აჩვენებს. თუ custom ფონტი რამდენიმე
            წამში არ ჩაიტვირთა, სისტემურზე რჩება.
          </p>
          <span className="badge">fallback</span>
        </div>

        <div className="font-card">
          <h3>font-display: optional</h3>
          <p className="font-optional">
            თუ ფონტი ძალიან სწრაფად ჩაიტვირთა (მაგ. ქეშში იყო), იყენებს. თუ არა — სისტემურს
            ტოვებს. ყველაზე მკაცრი performance-ის კუთხით.
          </p>
          <span className="badge">optional</span>
        </div>
      </div>
    </section>
  );
}

export default FontDisplayDemo;
