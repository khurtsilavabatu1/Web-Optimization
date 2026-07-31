const GENRES = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance", "Thriller", "Animation", "Documentary", "Fantasy"];
const DIRECTORS = ["Christopher Nolan", "Quentin Tarantino", "Martin Scorsese", "Steven Spielberg", "Denis Villeneuve", "Greta Gerwig", "Bong Joon-ho", "Wes Anderson", "Jordan Peele", "Chloe Zhao"];
const ACTORS = ["Leonardo DiCaprio", "Margot Robbie", "Timothee Chalamet", "Florence Pugh", "Oscar Isaac", "Zendaya", "Pedro Pascal", "Ana de Armas", "Austin Butler", "Saoirse Ronan", "Robert Downey Jr.", "Cate Blanchett", "Joaquin Phoenix", "Emma Stone", "Ryan Gosling"];
const COUNTRIES = ["USA", "UK", "France", "South Korea", "Japan", "Germany", "Spain", "Italy", "Canada", "Australia"];

const MOVIES = [];

for (let i = 0; i < 300; i++) {
  const genre = GENRES[i % GENRES.length];
  const year = 2010 + (i % 15);
  const castCount = 3 + (i % 4);
  const cast = [];
  for (let j = 0; j < castCount; j++) {
    cast.push(ACTORS[(i + j * 3) % ACTORS.length]);
  }

  MOVIES.push({
    id: i + 1,
    title: `Movie Title #${i + 1}`,
    genre,
    year,
    director: DIRECTORS[i % DIRECTORS.length],
    cast,
    rating: Math.round((Math.random() * 4 + 6) * 10) / 10,
    votes: Math.floor(Math.random() * 500000) + 1000,
    budget: Math.floor(Math.random() * 200 + 10) * 1000000,
    revenue: Math.floor(Math.random() * 800 + 20) * 1000000,
    runtime: Math.floor(Math.random() * 90 + 80),
    country: COUNTRIES[i % COUNTRIES.length],
    plot: `This is the plot description for Movie #${i + 1}. It tells an engaging story in the ${genre.toLowerCase()} genre, directed by ${DIRECTORS[i % DIRECTORS.length]}. The film explores themes of human nature, resilience, and the power of storytelling. Set in ${year}, it has captivated audiences worldwide with its compelling narrative and stunning visuals.`,
    posterColor: `hsl(${(i * 37) % 360}, 70%, 45%)`,
  });
}

export function getAllMovies() {
  return MOVIES;
}

export function getMoviesByGenre(genre) {
  return MOVIES.filter((m) => m.genre === genre);
}

export function searchMovies(query) {
  const lower = query.toLowerCase();
  return MOVIES.filter(
    (m) => m.title.toLowerCase().includes(lower) || m.director.toLowerCase().includes(lower) || m.cast.some((a) => a.toLowerCase().includes(lower))
  );
}

export function getGenres() {
  return GENRES;
}

export function getMovieById(id) {
  return MOVIES.find((m) => m.id === id);
}

export function generateMovieReport() {
  const genreStats = {};
  for (const genre of GENRES) {
    const movies = MOVIES.filter((m) => m.genre === genre);
    genreStats[genre] = {
      count: movies.length,
      avgRating: Math.round((movies.reduce((s, m) => s + m.rating, 0) / movies.length) * 100) / 100,
      totalRevenue: movies.reduce((s, m) => s + m.revenue, 0),
      avgBudget: Math.round(movies.reduce((s, m) => s + m.budget, 0) / movies.length),
    };
  }

  const directorStats = {};
  for (const dir of DIRECTORS) {
    const movies = MOVIES.filter((m) => m.director === dir);
    directorStats[dir] = {
      count: movies.length,
      avgRating: Math.round((movies.reduce((s, m) => s + m.rating, 0) / movies.length) * 100) / 100,
    };
  }

  const yearStats = {};
  for (let y = 2010; y <= 2024; y++) {
    const movies = MOVIES.filter((m) => m.year === y);
    if (movies.length > 0) {
      yearStats[y] = {
        count: movies.length,
        avgRating: Math.round((movies.reduce((s, m) => s + m.rating, 0) / movies.length) * 100) / 100,
      };
    }
  }

  return {
    totalMovies: MOVIES.length,
    genreStats,
    directorStats,
    yearStats,
    topRated: [...MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 10),
    highestGrossing: [...MOVIES].sort((a, b) => b.revenue - a.revenue).slice(0, 10),
    generatedAt: new Date().toISOString(),
  };
}
