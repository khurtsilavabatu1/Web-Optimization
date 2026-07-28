/*
    ============================================================
    ❌ გამოუყენებელი ბიბლიოთეკა — Coverage Tab-ის დემო
    ============================================================

    📊 Coverage Tab-ში დაინახავ:
    ─────────────────────────────
    - ეს ფაილი 90%+ წითელია (გამოუყენებელი)
    - მხოლოდ initLibrary() იძახება, დანარჩენი ფუნქციები არასდროს
    - ეს ნიშნავს: ეს ბიბლიოთეკა წასაშლელია ან code splitting სჭირდება

    💡 Code Splitting-ის გადაწყვეტილება:
    ─────────────────────────────────────
    Coverage-ით ნახე → 90% გამოუყენებელია → ვარიანტები:
    1. წაშალე თუ საერთოდ არ სჭირდება
    2. dynamic import გააკეთე თუ ზოგიერთ გვერდზე სჭირდება:
       const lib = await import('./unused-library.js');
    3. tree-shaking — bundler-მა გამოუყენებელი ფუნქციები ამოაგდოს
*/

const UnusedLibrary = {
    version: '1.0.0',
    name: 'Unused Demo Library'
};

function initLibrary() {
    console.log('[Unused Library] initialized — but 90% of this file is unused!');
    return UnusedLibrary;
}

initLibrary();

// =========================================
// ქვემოთ არის ფუნქციები რომლებიც ᲐᲠᲐᲡᲓᲠᲝᲡ გამოიყენება
// Coverage tab-ში ეს ყველაფერი წითელი იქნება!
// =========================================

function unusedFormatDate(date) {
    const d = new Date(date);
    const months = [
        'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი',
        'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო',
        'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function unusedCurrencyFormat(amount, currency) {
    const formats = {
        'USD': { symbol: '$', position: 'before', decimals: 2 },
        'EUR': { symbol: '€', position: 'before', decimals: 2 },
        'GEL': { symbol: '₾', position: 'after', decimals: 2 },
        'GBP': { symbol: '£', position: 'before', decimals: 2 },
        'JPY': { symbol: '¥', position: 'before', decimals: 0 }
    };
    const fmt = formats[currency] || formats['USD'];
    const formatted = amount.toFixed(fmt.decimals);
    return fmt.position === 'before' ? `${fmt.symbol}${formatted}` : `${formatted}${fmt.symbol}`;
}

function unusedValidateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function unusedValidatePhone(phone) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(phone);
}

function unusedDeepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => unusedDeepClone(item));
    if (obj instanceof Object) {
        const copy = {};
        Object.keys(obj).forEach(key => {
            copy[key] = unusedDeepClone(obj[key]);
        });
        return copy;
    }
    return obj;
}

function unusedDebounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function unusedThrottle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function unusedFlattenArray(arr) {
    return arr.reduce((flat, item) => {
        return flat.concat(Array.isArray(item) ? unusedFlattenArray(item) : item);
    }, []);
}

function unusedGroupBy(array, key) {
    return array.reduce((groups, item) => {
        const group = item[key];
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;
    }, {});
}

function unusedChunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

function unusedMergeObjects(...objects) {
    return objects.reduce((merged, obj) => {
        Object.keys(obj).forEach(key => {
            if (typeof merged[key] === 'object' && typeof obj[key] === 'object') {
                merged[key] = unusedMergeObjects(merged[key], obj[key]);
            } else {
                merged[key] = obj[key];
            }
        });
        return merged;
    }, {});
}

function unusedStringHelpers() {
    return {
        capitalize: str => str.charAt(0).toUpperCase() + str.slice(1),
        camelCase: str => str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : ''),
        kebabCase: str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
        snakeCase: str => str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase(),
        truncate: (str, len) => str.length > len ? str.substring(0, len) + '...' : str,
        padStart: (str, len, char) => String(str).padStart(len, char),
        padEnd: (str, len, char) => String(str).padEnd(len, char),
        repeat: (str, n) => str.repeat(n),
        reverse: str => str.split('').reverse().join(''),
        countWords: str => str.trim().split(/\s+/).length,
        slugify: str => str.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').trim()
    };
}

function unusedColorUtils() {
    return {
        hexToRgb: hex => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        },
        rgbToHex: (r, g, b) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join(''),
        lighten: (hex, percent) => {
            const rgb = unusedColorUtils().hexToRgb(hex);
            if (!rgb) return hex;
            const factor = percent / 100;
            return unusedColorUtils().rgbToHex(
                Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor)),
                Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor)),
                Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor))
            );
        },
        darken: (hex, percent) => {
            const rgb = unusedColorUtils().hexToRgb(hex);
            if (!rgb) return hex;
            const factor = 1 - percent / 100;
            return unusedColorUtils().rgbToHex(
                Math.round(rgb.r * factor),
                Math.round(rgb.g * factor),
                Math.round(rgb.b * factor)
            );
        },
        randomColor: () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    };
}

function unusedMathUtils() {
    return {
        clamp: (val, min, max) => Math.min(Math.max(val, min), max),
        lerp: (start, end, t) => start + (end - start) * t,
        map: (val, inMin, inMax, outMin, outMax) => outMin + (outMax - outMin) * ((val - inMin) / (inMax - inMin)),
        distance: (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
        degToRad: deg => deg * (Math.PI / 180),
        radToDeg: rad => rad * (180 / Math.PI),
        factorial: n => n <= 1 ? 1 : n * unusedMathUtils().factorial(n - 1),
        fibonacci: n => {
            const seq = [0, 1];
            for (let i = 2; i <= n; i++) seq.push(seq[i-1] + seq[i-2]);
            return seq;
        },
        isPrime: n => {
            if (n < 2) return false;
            for (let i = 2; i <= Math.sqrt(n); i++) {
                if (n % i === 0) return false;
            }
            return true;
        },
        gcd: (a, b) => b === 0 ? a : unusedMathUtils().gcd(b, a % b),
        lcm: (a, b) => (a * b) / unusedMathUtils().gcd(a, b),
        average: arr => arr.reduce((sum, val) => sum + val, 0) / arr.length,
        median: arr => {
            const sorted = [...arr].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
        },
        standardDeviation: arr => {
            const avg = unusedMathUtils().average(arr);
            const squareDiffs = arr.map(val => (val - avg) ** 2);
            return Math.sqrt(unusedMathUtils().average(squareDiffs));
        }
    };
}

function unusedDOMHelpers() {
    return {
        createElement: (tag, attrs, children) => {
            const el = document.createElement(tag);
            if (attrs) Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
            if (children) {
                if (typeof children === 'string') el.textContent = children;
                else children.forEach(child => el.appendChild(child));
            }
            return el;
        },
        addClass: (el, ...classes) => el.classList.add(...classes),
        removeClass: (el, ...classes) => el.classList.remove(...classes),
        toggleClass: (el, cls) => el.classList.toggle(cls),
        hasClass: (el, cls) => el.classList.contains(cls),
        getStyle: (el, prop) => getComputedStyle(el)[prop],
        setStyles: (el, styles) => Object.assign(el.style, styles),
        fadeIn: (el, duration) => {
            el.style.opacity = 0;
            el.style.display = '';
            let start = null;
            const step = timestamp => {
                if (!start) start = timestamp;
                const progress = (timestamp - start) / duration;
                el.style.opacity = Math.min(progress, 1);
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        },
        fadeOut: (el, duration) => {
            let start = null;
            const step = timestamp => {
                if (!start) start = timestamp;
                const progress = (timestamp - start) / duration;
                el.style.opacity = Math.max(1 - progress, 0);
                if (progress < 1) requestAnimationFrame(step);
                else el.style.display = 'none';
            };
            requestAnimationFrame(step);
        }
    };
}

function unusedEventBus() {
    const events = {};
    return {
        on: (event, callback) => {
            events[event] = events[event] || [];
            events[event].push(callback);
        },
        off: (event, callback) => {
            if (events[event]) {
                events[event] = events[event].filter(cb => cb !== callback);
            }
        },
        emit: (event, ...args) => {
            if (events[event]) {
                events[event].forEach(cb => cb(...args));
            }
        },
        once: (event, callback) => {
            const wrapper = (...args) => {
                callback(...args);
                unusedEventBus().off(event, wrapper);
            };
            unusedEventBus().on(event, wrapper);
        }
    };
}

function unusedLocalStorageHelper() {
    return {
        set: (key, value, ttl) => {
            const item = { value, timestamp: Date.now(), ttl };
            localStorage.setItem(key, JSON.stringify(item));
        },
        get: (key) => {
            const raw = localStorage.getItem(key);
            if (!raw) return null;
            const item = JSON.parse(raw);
            if (item.ttl && Date.now() - item.timestamp > item.ttl) {
                localStorage.removeItem(key);
                return null;
            }
            return item.value;
        },
        remove: key => localStorage.removeItem(key),
        clear: () => localStorage.clear(),
        keys: () => Object.keys(localStorage),
        size: () => {
            let total = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    total += localStorage[key].length * 2;
                }
            }
            return total;
        }
    };
}
