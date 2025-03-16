
const API_KEY = 'c3c0d755e98ab50d28df858980b852ee';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface TMDBMovie {
  id: number;
  title: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  media_type?: string;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

const formatImageUrl = (path: string | null, size = 'original') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatMovie = (movie: TMDBMovie) => {
  return {
    id: movie.id,
    title: movie.title || movie.name || '',
    poster: formatImageUrl(movie.poster_path, 'w500'),
    backdrop: formatImageUrl(movie.backdrop_path, 'original'),
    year: new Date(movie.release_date || movie.first_air_date || '').getFullYear() || 0,
    rating: movie.vote_average,
    duration: '2h 0m', // Need a separate request to get the runtime
    description: movie.overview,
    genres: [], // Need a separate request to get the genres
    mediaType: movie.media_type || 'movie'
  };
};

export const fetchTrending = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
    const data: TMDBResponse = await response.json();
    return data.results.map(formatMovie);
  } catch (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
};

export const fetchMovies = async (type = 'popular') => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=1`);
    const data: TMDBResponse = await response.json();
    return data.results.map(formatMovie);
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error);
    return [];
  }
};

export const fetchTVShows = async (type = 'popular') => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${type}?api_key=${API_KEY}&language=en-US&page=1`);
    const data: TMDBResponse = await response.json();
    return data.results.map(formatMovie);
  } catch (error) {
    console.error(`Error fetching ${type} TV shows:`, error);
    return [];
  }
};

export const fetchGenres = async (mediaType = 'movie') => {
  try {
    const response = await fetch(`${BASE_URL}/genre/${mediaType}/list?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data.genres as TMDBGenre[];
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

export const fetchMovieDetails = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return {
      ...formatMovie(data),
      duration: formatRuntime(data.runtime || 0),
      genres: data.genres.map((genre: TMDBGenre) => genre.name)
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
    const data: TMDBResponse = await response.json();
    return data.results.map(formatMovie);
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};
