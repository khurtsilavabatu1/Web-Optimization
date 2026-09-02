import { useEffect, useRef, useState } from 'react';

function LazyImage({ name, alt }) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div className="gallery-item" ref={imgRef}>
      {isVisible && (
        <picture>
          <source srcSet={`/images/${name}.avif`} type="image/avif" />
          <source srcSet={`/images/${name}.webp`} type="image/webp" />
          <img
            src={`/images/${name}.jpg`}
            alt={alt}
            width="800"
            height="600"
            loading="lazy"
          />
        </picture>
      )}
      <span className="badge">loading="lazy" + Intersection Observer</span>
    </div>
  );
}

export default LazyImage;
