function HeroPicture() {
  return (
    <header className="hero">
      <picture>
        <source srcSet="/images/hero.avif" type="image/avif" />
        <source srcSet="/images/hero.webp" type="image/webp" />
        <img
          src="/images/hero.jpg"
          alt="Hero სურათი — ბრაუზერი საუკეთესო ფორმატს აირჩევს"
          width="1200"
          height="600"
          fetchpriority="high"
          className="hero-img"
        />
      </picture>
      <div className="hero-overlay">
        <h1>Image & Font Optimization</h1>
        <p>
          ეს სურათი <code>&lt;picture&gt;</code> ელემენტით ჩაიტვირთა — ბრაუზერმა
          საუკეთესო ფორმატი აირჩია
        </p>
        <p>
          <code>fetchpriority="high"</code> — ეს სურათი პრიორიტეტულად ჩაიტვირთება
        </p>
      </div>
    </header>
  );
}

export default HeroPicture;
