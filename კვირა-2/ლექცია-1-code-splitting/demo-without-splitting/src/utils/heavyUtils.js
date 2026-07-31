const COUNTRY_DATA = {
  GE: { name: "Georgia", capital: "Tbilisi", population: 3700000, area: 69700, gdp: 18.7, currency: "GEL", languages: ["Georgian"], continent: "Asia/Europe", callingCode: "+995", tld: ".ge", neighbors: ["Russia", "Turkey", "Armenia", "Azerbaijan"] },
  US: { name: "United States", capital: "Washington D.C.", population: 331000000, area: 9833520, gdp: 25460, currency: "USD", languages: ["English"], continent: "North America", callingCode: "+1", tld: ".us", neighbors: ["Canada", "Mexico"] },
  DE: { name: "Germany", capital: "Berlin", population: 83200000, area: 357022, gdp: 4070, currency: "EUR", languages: ["German"], continent: "Europe", callingCode: "+49", tld: ".de", neighbors: ["France", "Poland", "Czech Republic", "Austria", "Switzerland", "Belgium", "Netherlands", "Denmark", "Luxembourg"] },
  JP: { name: "Japan", capital: "Tokyo", population: 125800000, area: 377975, gdp: 4230, currency: "JPY", languages: ["Japanese"], continent: "Asia", callingCode: "+81", tld: ".jp", neighbors: [] },
  FR: { name: "France", capital: "Paris", population: 67390000, area: 640679, gdp: 2780, currency: "EUR", languages: ["French"], continent: "Europe", callingCode: "+33", tld: ".fr", neighbors: ["Germany", "Belgium", "Luxembourg", "Switzerland", "Italy", "Spain", "Andorra", "Monaco"] },
  GB: { name: "United Kingdom", capital: "London", population: 67890000, area: 242495, gdp: 3070, currency: "GBP", languages: ["English"], continent: "Europe", callingCode: "+44", tld: ".uk", neighbors: ["Ireland"] },
  BR: { name: "Brazil", capital: "Brasilia", population: 214000000, area: 8515767, gdp: 1920, currency: "BRL", languages: ["Portuguese"], continent: "South America", callingCode: "+55", tld: ".br", neighbors: ["Argentina", "Uruguay", "Paraguay", "Bolivia", "Peru", "Colombia", "Venezuela", "Guyana", "Suriname", "French Guiana"] },
  IN: { name: "India", capital: "New Delhi", population: 1408000000, area: 3287263, gdp: 3730, currency: "INR", languages: ["Hindi", "English"], continent: "Asia", callingCode: "+91", tld: ".in", neighbors: ["Pakistan", "China", "Nepal", "Bhutan", "Bangladesh", "Myanmar"] },
  AU: { name: "Australia", capital: "Canberra", population: 25690000, area: 7692024, gdp: 1680, currency: "AUD", languages: ["English"], continent: "Oceania", callingCode: "+61", tld: ".au", neighbors: [] },
  CA: { name: "Canada", capital: "Ottawa", population: 38250000, area: 9984670, gdp: 2140, currency: "CAD", languages: ["English", "French"], continent: "North America", callingCode: "+1", tld: ".ca", neighbors: ["United States"] },
  CN: { name: "China", capital: "Beijing", population: 1412000000, area: 9596960, gdp: 17960, currency: "CNY", languages: ["Mandarin"], continent: "Asia", callingCode: "+86", tld: ".cn", neighbors: ["Russia", "Mongolia", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Afghanistan", "Pakistan", "India", "Nepal", "Bhutan", "Myanmar", "Laos", "Vietnam", "North Korea"] },
  KR: { name: "South Korea", capital: "Seoul", population: 51740000, area: 100210, gdp: 1810, currency: "KRW", languages: ["Korean"], continent: "Asia", callingCode: "+82", tld: ".kr", neighbors: ["North Korea"] },
  IT: { name: "Italy", capital: "Rome", population: 60360000, area: 301340, gdp: 2010, currency: "EUR", languages: ["Italian"], continent: "Europe", callingCode: "+39", tld: ".it", neighbors: ["France", "Switzerland", "Austria", "Slovenia", "San Marino", "Vatican City"] },
  ES: { name: "Spain", capital: "Madrid", population: 47420000, area: 505990, gdp: 1400, currency: "EUR", languages: ["Spanish"], continent: "Europe", callingCode: "+34", tld: ".es", neighbors: ["France", "Portugal", "Andorra", "Morocco", "Gibraltar"] },
  MX: { name: "Mexico", capital: "Mexico City", population: 128900000, area: 1964375, gdp: 1320, currency: "MXN", languages: ["Spanish"], continent: "North America", callingCode: "+52", tld: ".mx", neighbors: ["United States", "Guatemala", "Belize"] },
  RU: { name: "Russia", capital: "Moscow", population: 144100000, area: 17098242, gdp: 1780, currency: "RUB", languages: ["Russian"], continent: "Europe/Asia", callingCode: "+7", tld: ".ru", neighbors: ["Norway", "Finland", "Estonia", "Latvia", "Lithuania", "Poland", "Belarus", "Ukraine", "Georgia", "Azerbaijan", "Kazakhstan", "China", "Mongolia", "North Korea"] },
  TR: { name: "Turkey", capital: "Ankara", population: 84340000, area: 783562, gdp: 906, currency: "TRY", languages: ["Turkish"], continent: "Europe/Asia", callingCode: "+90", tld: ".tr", neighbors: ["Greece", "Bulgaria", "Georgia", "Armenia", "Azerbaijan", "Iran", "Iraq", "Syria"] },
  SA: { name: "Saudi Arabia", capital: "Riyadh", population: 35340000, area: 2149690, gdp: 1108, currency: "SAR", languages: ["Arabic"], continent: "Asia", callingCode: "+966", tld: ".sa", neighbors: ["Jordan", "Iraq", "Kuwait", "Qatar", "UAE", "Oman", "Yemen"] },
  ZA: { name: "South Africa", capital: "Pretoria", population: 59310000, area: 1221037, gdp: 405, currency: "ZAR", languages: ["Zulu", "Xhosa", "Afrikaans", "English"], continent: "Africa", callingCode: "+27", tld: ".za", neighbors: ["Namibia", "Botswana", "Zimbabwe", "Mozambique", "Eswatini", "Lesotho"] },
  EG: { name: "Egypt", capital: "Cairo", population: 102300000, area: 1002450, gdp: 476, currency: "EGP", languages: ["Arabic"], continent: "Africa", callingCode: "+20", tld: ".eg", neighbors: ["Libya", "Sudan", "Israel", "Palestine"] },
};

const PRODUCT_CATALOG = [];
const CATEGORIES = ["Electronics", "Clothing", "Books", "Home", "Sports", "Toys", "Food", "Beauty", "Auto", "Garden"];
const ADJECTIVES = ["Premium", "Classic", "Modern", "Vintage", "Luxury", "Budget", "Pro", "Ultra", "Eco", "Smart"];
const NOUNS = ["Widget", "Gadget", "Device", "Tool", "Kit", "Set", "Pack", "Bundle", "Collection", "System"];

for (let i = 0; i < 500; i++) {
  PRODUCT_CATALOG.push({
    id: i + 1,
    name: `${ADJECTIVES[i % ADJECTIVES.length]} ${NOUNS[Math.floor(i / ADJECTIVES.length) % NOUNS.length]} ${i + 1}`,
    price: Math.round((Math.random() * 500 + 5) * 100) / 100,
    category: CATEGORIES[i % CATEGORIES.length],
    rating: Math.round((Math.random() * 3 + 2) * 10) / 10,
    reviews: Math.floor(Math.random() * 1000),
    inStock: Math.random() > 0.2,
    description: `This is a detailed description for product #${i + 1}. It includes many features and specifications that make this product stand out from the competition. Available in multiple colors and sizes.`,
    tags: [`tag-${i % 20}`, `category-${CATEGORIES[i % CATEGORIES.length].toLowerCase()}`, i % 3 === 0 ? "featured" : "regular"],
  });
}

export function getCountryInfo(code) {
  return COUNTRY_DATA[code] || null;
}

export function getAllCountries() {
  return Object.entries(COUNTRY_DATA).map(([code, data]) => ({ code, ...data }));
}

export function getProductsByCategory(category) {
  return PRODUCT_CATALOG.filter((p) => p.category === category);
}

export function searchProducts(query) {
  const lower = query.toLowerCase();
  return PRODUCT_CATALOG.filter(
    (p) => p.name.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower)
  );
}

export function getProductStats() {
  const stats = {};
  for (const cat of CATEGORIES) {
    const products = PRODUCT_CATALOG.filter((p) => p.category === cat);
    stats[cat] = {
      count: products.length,
      avgPrice: Math.round((products.reduce((s, p) => s + p.price, 0) / products.length) * 100) / 100,
      avgRating: Math.round((products.reduce((s, p) => s + p.rating, 0) / products.length) * 100) / 100,
      inStock: products.filter((p) => p.inStock).length,
    };
  }
  return stats;
}

export function generateReport() {
  const countries = getAllCountries();
  const stats = getProductStats();
  return {
    totalCountries: countries.length,
    totalProducts: PRODUCT_CATALOG.length,
    categoryStats: stats,
    topCountriesByPopulation: countries.sort((a, b) => b.population - a.population).slice(0, 5),
    generatedAt: new Date().toISOString(),
  };
}
