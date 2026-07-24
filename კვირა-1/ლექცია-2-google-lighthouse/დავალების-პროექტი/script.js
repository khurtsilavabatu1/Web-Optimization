function calculateDeliveryRoutes() {
    let result = 0;
    for (let i = 0; i < 3000000; i++) {
        result += Math.sqrt(i) * Math.sin(i);
    }
    return result;
}

calculateDeliveryRoutes();


function generateTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    const names = ['ნინო მ.', 'გიორგი კ.', 'მარიამ ბ.', 'დავით ხ.', 'ანა ტ.', 'ლუკა გ.', 'თამარ ჯ.', 'ნიკა ს.'];
    const texts = [
        'საუკეთესო მიტანის სერვისი! საკვები ცხელი მოვიდა.',
        'ძალიან სწრაფი მომსახურება. 20 წუთში მოიტანეს.',
        'ხარისხი შესანიშნავია, ფასები ხელმისაწვდომი.',
        'აპლიკაცია მოსახერხებელია, შეკვეთის თვალყურის დევნება მშვენიერია.',
        'პიცა ძალიან გემრიელი იყო, აუცილებლად გავიმეორებ.',
    ];

    for (let i = 0; i < 150; i++) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';

        const wrapper1 = document.createElement('div');
        const wrapper2 = document.createElement('div');
        const wrapper3 = document.createElement('div');

        const nameEl = document.createElement('div');
        nameEl.className = 'testimonial-name';
        nameEl.textContent = names[i % names.length];

        const dateEl = document.createElement('div');
        dateEl.className = 'testimonial-date';
        dateEl.textContent = '2024-0' + ((i % 9) + 1) + '-' + ((i % 28) + 1);

        const textEl = document.createElement('div');
        textEl.className = 'testimonial-text';
        textEl.textContent = texts[i % texts.length];

        const ratingEl = document.createElement('div');
        ratingEl.className = 'testimonial-rating';
        const rating = Math.floor(Math.random() * 2) + 4;
        ratingEl.textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating);

        wrapper3.appendChild(nameEl);
        wrapper3.appendChild(dateEl);
        wrapper2.appendChild(wrapper3);
        wrapper2.appendChild(textEl);
        wrapper2.appendChild(ratingEl);
        wrapper1.appendChild(wrapper2);
        card.appendChild(wrapper1);
        container.appendChild(card);
    }
}

window.addEventListener('load', function() {
    generateTestimonials();
});

window.addEventListener('load', function() {
    calculateDeliveryRoutes();
});

window.addEventListener('load', function() {
    const restaurants = document.querySelectorAll('.restaurant-wrapper');
    restaurants.forEach(function(el) {
        const h = el.offsetHeight;
        el.style.minHeight = h + 'px';
    });
});


console.error('Configuration error: payment gateway API key is missing');
console.error('Failed to load analytics script');


function unusedOrderTracker(orderId) {
    return fetch('/api/orders/' + orderId).then(function(r) { return r.json(); });
}

function unusedMenuFilter(items, category) {
    return items.filter(function(item) { return item.category === category; });
}

function unusedPriceFormatter(price) {
    return '₾' + price.toFixed(2);
}

function unusedDistanceCalculator(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function unusedTimeEstimator(distance) {
    var speed = 30;
    return Math.round((distance / speed) * 60);
}

function unusedRatingCalculator(reviews) {
    var sum = reviews.reduce(function(a, b) { return a + b.rating; }, 0);
    return (sum / reviews.length).toFixed(1);
}

function unusedPromocodeValidator(code) {
    var valid = ['FOOD20', 'WELCOME10', 'FRIDAY50'];
    return valid.indexOf(code.toUpperCase()) !== -1;
}

function unusedDeliveryFeeCalculator(subtotal, distance) {
    if (subtotal >= 30) return 0;
    return Math.min(distance * 0.5, 5);
}
