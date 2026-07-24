function computeDistanceMatrix(locations) {
  let total = 0;
  for (let i = 0; i < locations.length; i++) {
    for (let j = 0; j < locations.length; j++) {
      total += Math.sqrt(
        Math.pow(locations[i].lat - locations[j].lat, 2) +
        Math.pow(locations[i].lng - locations[j].lng, 2)
      ) * Math.sin(i + j) * Math.cos(i - j);
    }
  }
  return total;
}

function generateLocations(count) {
  const locs = [];
  for (let i = 0; i < count; i++) {
    locs.push({
      lat: 41.0 + Math.random() * 3,
      lng: 43.0 + Math.random() * 3
    });
  }
  return locs;
}

const mapLocations = generateLocations(800);
computeDistanceMatrix(mapLocations);


const regions = ['კახეთი', 'იმერეთი', 'სვანეთი', 'თუშეთი', 'აჭარა', 'გურია', 'მცხეთა-მთიანეთი', 'სამეგრელო', 'რაჭა'];
const tourTypes = ['ტრეკინგი', 'ღვინის ტური', 'კულტურული', 'საზაფხულო', 'საზამთრო', 'გასტრო', 'ფოტო ტური'];
const images = [
  'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800',
];

const destinations = _.range(1, 501).map(i => ({
  id: i,
  name: `${regions[i % regions.length]} — ტური #${i}`,
  price: _.round(Math.random() * 2000 + 100, 2),
  date: new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000),
  region: regions[i % regions.length],
  type: tourTypes[i % tourTypes.length],
  rating: _.round(Math.random() * 2 + 3, 1),
  image: images[i % images.length],
  description: `აღმოაჩინე ${regions[i % regions.length]}ს სილამაზე ამ საოცარი ტურით. `
}));


function renderDestinations(data) {
  const container = document.getElementById('destination-cards');
  container.innerHTML = '';

  data.forEach(dest => {
    const card = document.createElement('div');
    card.className = 'destination-card';

    const formattedDate = moment(dest.date).format('DD MMMM YYYY, HH:mm');
    const formattedPrice = _.padStart(String(_.round(dest.price, 2)), 8, ' ');

    const stars = '★'.repeat(Math.floor(dest.rating)) + (dest.rating % 1 >= 0.5 ? '½' : '');

    card.innerHTML = `
      <img src="${dest.image}" class="card-image">
      <div class="card-body">
        <h3>${dest.name}</h3>
        <div class="rating">${stars} (${dest.rating})</div>
        <p class="price">₾${formattedPrice}</p>
        <p class="date">${formattedDate}</p>
        <span class="category">${dest.type}</span>
      </div>
    `;

    card.addEventListener('mouseenter', function() {
      computeDistanceMatrix(generateLocations(100));
      this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });

    container.appendChild(card);
  });

  document.getElementById('destination-count').textContent =
    `ნაჩვენებია ${data.length} მიმართულება`;
}

renderDestinations(destinations);


document.getElementById('destination-search').addEventListener('input', function(e) {
  const term = e.target.value.toLowerCase();

  computeDistanceMatrix(generateLocations(200));

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(term) ||
    d.region.toLowerCase().includes(term) ||
    d.type.toLowerCase().includes(term) ||
    d.description.toLowerCase().includes(term)
  );

  const sorted = _.orderBy(filtered, ['price'], ['desc']);

  renderDestinations(sorted);
});


function generateReviews() {
  const container = document.getElementById('reviews-container');
  const names = ['ნინო', 'გიორგი', 'მარიამ', 'დავით', 'ანა', 'ლუკა', 'თამარ', 'ნიკა', 'ელენე', 'სანდრო'];
  const texts = [
    'საოცარი გამოცდილება იყო! აუცილებლად გავიმეორებ.',
    'ბუნება თვალწარმტაცია, გიდი პროფესიონალი.',
    'ფასი და ხარისხი შესანიშნავ ბალანსშია.',
    'ოჯახთან ერთად მშვენიერი დრო გავატარეთ.',
    'ტრანსპორტი კომფორტული იყო, მარშრუტი საინტერესო.',
  ];

  for (let i = 0; i < 300; i++) {
    const review = document.createElement('div');
    review.className = 'review-card';

    const reviewDate = moment(new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)).format('DD MMMM YYYY, HH:mm:ss');
    const rating = _.round(Math.random() * 2 + 3, 1);
    const stars = '★'.repeat(Math.floor(rating));

    review.innerHTML = `
      <div class="reviewer">${names[i % names.length]} ${String.fromCharCode(65 + (i % 26))}.</div>
      <div class="review-date">${reviewDate}</div>
      <div class="review-text">${texts[i % texts.length]}</div>
      <div class="review-rating">${stars} (${rating})</div>
    `;

    container.appendChild(review);
  }
}

generateReviews();


const select = document.getElementById('destination-select');
destinations.forEach(d => {
  const option = document.createElement('option');
  option.value = d.id;
  option.textContent = d.name;
  select.appendChild(option);
});


window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;

  document.getElementById('scroll-value').textContent = Math.round(scrollY);

  const cards = document.querySelectorAll('.destination-card');
  cards.forEach(function(card) {
    const rect = card.getBoundingClientRect();
    const h = card.offsetHeight;
    card.style.opacity = rect.top < window.innerHeight ? '1' : '0.3';
    const w = card.offsetWidth;
    card.style.minHeight = h + 'px';
  });

  const galleryImages = document.querySelectorAll('.gallery-grid img');
  galleryImages.forEach(function(img) {
    const imgRect = img.getBoundingClientRect();
    const imgH = img.offsetHeight;
    img.style.filter = imgRect.top < window.innerHeight ? 'none' : 'grayscale(100%)';
  });

  computeDistanceMatrix(generateLocations(50));
});


setTimeout(function() {
  const promo = document.getElementById('promo-container');
  promo.innerHTML = `
    <div class="promo-banner">
      <strong>სპეციალური შეთავაზება!</strong><br>
      ყველა ტურზე 30% ფასდაკლება — მხოლოდ ამ კვირაში!
    </div>
  `;
}, 2000);


setTimeout(function() {
  const totalDest = destinations.length;
  const avgPrice = _.meanBy(destinations, 'price');
  const maxPrice = _.maxBy(destinations, 'price').price;
  const minPrice = _.minBy(destinations, 'price').price;
  const regionCount = _.uniqBy(destinations, 'region').length;
  const typeCount = _.uniqBy(destinations, 'type').length;

  computeDistanceMatrix(generateLocations(500));

  const statsContainer = document.getElementById('stats-container');
  statsContainer.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="number">${totalDest}</div>
        <div class="label">სულ ტური</div>
      </div>
      <div class="stat-card">
        <div class="number">₾${_.round(avgPrice, 0)}</div>
        <div class="label">საშუალო ფასი</div>
      </div>
      <div class="stat-card">
        <div class="number">₾${_.round(maxPrice, 0)}</div>
        <div class="label">ყველაზე ძვირი</div>
      </div>
      <div class="stat-card">
        <div class="number">₾${_.round(minPrice, 0)}</div>
        <div class="label">ყველაზე იაფი</div>
      </div>
      <div class="stat-card">
        <div class="number">${regionCount}</div>
        <div class="label">რეგიონი</div>
      </div>
      <div class="stat-card">
        <div class="number">${typeCount}</div>
        <div class="label">ტურის ტიპი</div>
      </div>
    </div>
  `;
}, 800);


let counterValue = 0;
setInterval(function() {
  counterValue++;
  const el = document.getElementById('scroll-counter');
  if (el) {
    el.style.left = el.offsetLeft + 'px';
    el.style.width = el.offsetWidth + 'px';
  }
}, 50);


document.getElementById('book-btn').addEventListener('click', function() {
  computeDistanceMatrix(generateLocations(600));
  alert('ტური დაჯავშნილია!');
});


function unusedRouteOptimizer(points) {
  const n = points.length;
  let best = Infinity;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        best = Math.min(best,
          Math.sqrt(Math.pow(points[i].x - points[j].x, 2) + Math.pow(points[i].y - points[j].y, 2)) +
          Math.sqrt(Math.pow(points[j].x - points[k].x, 2) + Math.pow(points[j].y - points[k].y, 2))
        );
      }
    }
  }
  return best;
}

function unusedWeatherFetcher(city) {
  return fetch(`/api/weather/${city}`).then(r => r.json());
}

function unusedCurrencyConverter(amount, from, to) {
  const rates = { USD: 1, GEL: 2.65, EUR: 0.92 };
  return (amount / rates[from]) * rates[to];
}

function unusedImageResizer(width, height, maxWidth) {
  const ratio = maxWidth / width;
  return { width: maxWidth, height: Math.round(height * ratio) };
}

function unusedDateFormatter(date) {
  return new Intl.DateTimeFormat('ka-GE', {
    year: 'numeric', month: 'long', day: 'numeric'
  }).format(date);
}

function unusedSlugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9ა-ჰ]+/g, '-').replace(/^-|-$/g, '');
}

function unusedPaginate(array, page, perPage) {
  return array.slice((page - 1) * perPage, page * perPage);
}

function unusedDebounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
