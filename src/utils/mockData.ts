
export interface Movie {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  year: number;
  rating: number;
  duration: string;
  description: string;
  genres: string[];
}

export interface Category {
  id: number;
  name: string;
  movies: Movie[];
}

// Mock movie data
export const featuredContent: Movie = {
  id: 1,
  title: "Inception",
  poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&auto=format&fit=crop",
  backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&auto=format&fit=crop",
  year: 2010,
  rating: 8.8,
  duration: "2h 28m",
  description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  genres: ["Action", "Sci-Fi", "Thriller"]
};

export const categories: Category[] = [
  {
    id: 1,
    name: "Trending Now",
    movies: [
      {
        id: 2,
        title: "The Matrix",
        poster: "https://images.unsplash.com/photo-1636572481914-a07d36917486?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1920&auto=format&fit=crop",
        year: 1999,
        rating: 8.7,
        duration: "2h 16m",
        description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
        genres: ["Action", "Sci-Fi"]
      },
      {
        id: 3,
        title: "Interstellar",
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&auto=format&fit=crop",
        year: 2014,
        rating: 8.6,
        duration: "2h 49m",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        genres: ["Adventure", "Drama", "Sci-Fi"]
      },
      {
        id: 4,
        title: "The Dark Knight",
        poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&auto=format&fit=crop",
        year: 2008,
        rating: 9.0,
        duration: "2h 32m",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        genres: ["Action", "Crime", "Drama"]
      },
      {
        id: 5,
        title: "Pulp Fiction",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920&auto=format&fit=crop",
        year: 1994,
        rating: 8.9,
        duration: "2h 34m",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        genres: ["Crime", "Drama"]
      },
      {
        id: 6,
        title: "Blade Runner 2049",
        poster: "https://images.unsplash.com/photo-1605391528575-a6739dc285d1?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1494587416117-f102a2ac0a8d?w=1920&auto=format&fit=crop",
        year: 2017,
        rating: 8.0,
        duration: "2h 44m",
        description: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
        genres: ["Action", "Drama", "Mystery"]
      }
    ]
  },
  {
    id: 2,
    name: "New Releases",
    movies: [
      {
        id: 7,
        title: "Dune",
        poster: "https://images.unsplash.com/photo-1547700055-b61cacebece9?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&auto=format&fit=crop",
        year: 2021,
        rating: 8.2,
        duration: "2h 35m",
        description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
        genres: ["Action", "Adventure", "Drama"]
      },
      {
        id: 8,
        title: "No Time to Die",
        poster: "https://images.unsplash.com/photo-1512113899577-85cf8272dfdd?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?w=1920&auto=format&fit=crop",
        year: 2021,
        rating: 7.4,
        duration: "2h 43m",
        description: "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
        genres: ["Action", "Adventure", "Thriller"]
      },
      {
        id: 9,
        title: "The Power of the Dog",
        poster: "https://images.unsplash.com/photo-1619472351888-f844a0b33c5a?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1553522151-3ca5ac588a7a?w=1920&auto=format&fit=crop",
        year: 2021,
        rating: 7.0,
        duration: "2h 6m",
        description: "A domineering but charismatic rancher wages a war of intimidation on his brother's new wife and her teen son, until long-hidden secrets come to light.",
        genres: ["Drama", "Romance", "Western"]
      },
      {
        id: 10,
        title: "The French Dispatch",
        poster: "https://images.unsplash.com/photo-1527772482340-7895c3f2b3f7?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1533620539989-61353a93bc9f?w=1920&auto=format&fit=crop",
        year: 2021,
        rating: 7.2,
        duration: "1h 48m",
        description: "A love letter to journalists set in an outpost of an American newspaper in a fictional 20th-century French city that brings to life a collection of stories published in 'The French Dispatch'.",
        genres: ["Comedy", "Drama", "Romance"]
      },
      {
        id: 11,
        title: "Spencer",
        poster: "https://images.unsplash.com/photo-1605301385542-082f272c3737?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1534254628718-48979483193b?w=1920&auto=format&fit=crop",
        year: 2021,
        rating: 6.9,
        duration: "1h 57m",
        description: "During her Christmas holidays with the royal family at the Sandringham estate in Norfolk, England, Diana Spencer, struggling with mental health problems, decides to end her decade-long marriage to Prince Charles.",
        genres: ["Biography", "Drama", "History"]
      }
    ]
  },
  {
    id: 3,
    name: "Top Rated",
    movies: [
      {
        id: 12,
        title: "The Shawshank Redemption",
        poster: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?w=1920&auto=format&fit=crop",
        year: 1994,
        rating: 9.3,
        duration: "2h 22m",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genres: ["Drama"]
      },
      {
        id: 13,
        title: "The Godfather",
        poster: "https://images.unsplash.com/photo-1604975701397-6365ccbd028a?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1492176273113-2d51f47b23b0?w=1920&auto=format&fit=crop",
        year: 1972,
        rating: 9.2,
        duration: "2h 55m",
        description: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
        genres: ["Crime", "Drama"]
      },
      {
        id: 14,
        title: "12 Angry Men",
        poster: "https://images.unsplash.com/photo-1607734834519-d8576ae60ea6?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1576662236484-43f7f4a4ad0c?w=1920&auto=format&fit=crop",
        year: 1957,
        rating: 9.0,
        duration: "1h 36m",
        description: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
        genres: ["Crime", "Drama"]
      },
      {
        id: 15,
        title: "Schindler's List",
        poster: "https://images.unsplash.com/photo-1618945524163-32451704cbb8?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=1920&auto=format&fit=crop",
        year: 1993,
        rating: 9.0,
        duration: "3h 15m",
        description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        genres: ["Biography", "Drama", "History"]
      },
      {
        id: 16,
        title: "The Lord of the Rings: The Return of the King",
        poster: "https://images.unsplash.com/photo-1635623064547-781a8892edf4?w=800&auto=format&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&auto=format&fit=crop",
        year: 2003,
        rating: 9.0,
        duration: "3h 21m",
        description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        genres: ["Action", "Adventure", "Drama"]
      }
    ]
  }
];
