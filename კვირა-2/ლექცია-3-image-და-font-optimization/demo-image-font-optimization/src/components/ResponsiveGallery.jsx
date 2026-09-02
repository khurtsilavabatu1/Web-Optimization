function ResponsiveGallery() {
  return (
    <section className="section">
      <h2>Responsive Images — srcset + sizes</h2>
      <p>
        ეს სურათი სხვადასხვა ზომის ვერსიებს იყენებს. DevTools-ში viewport-ის ზომა შეცვალეთ
        და Network tab-ში დააკვირდით რომელი ვერსია ჩაიტვირთება.
      </p>

      <picture>
        <source
          srcSet="/images/hero-400w.avif 400w, /images/hero-800w.avif 800w, /images/hero-1200w.avif 1200w"
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
          type="image/avif"
        />
        <source
          srcSet="/images/hero-400w.webp 400w, /images/hero-800w.webp 800w, /images/hero-1200w.webp 1200w"
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
          type="image/webp"
        />
        <img
          srcSet="/images/hero-400w.jpg 400w, /images/hero-800w.jpg 800w, /images/hero-1200w.jpg 1200w"
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src="/images/hero-800w.jpg"
          alt="Responsive სურათი — ბრაუზერი ეკრანის ზომის მიხედვით აირჩევს"
          width="800"
          height="400"
          loading="lazy"
          className="responsive-img"
        />
      </picture>

      <div className="info-box">
        <strong>როგორ შევამოწმოთ:</strong>
        <ol>
          <li>DevTools &rarr; Network tab &rarr; "Img" ფილტრი</li>
          <li>Device Toolbar ჩართეთ (Cmd+Shift+M)</li>
          <li>სხვადასხვა viewport ზომაზე გადატვირთეთ (hard refresh: Cmd+Shift+R)</li>
          <li>ნახეთ რომელი ფაილი ჩაიტვირთა (400w, 800w თუ 1200w)</li>
        </ol>
      </div>
    </section>
  );
}

export default ResponsiveGallery;
