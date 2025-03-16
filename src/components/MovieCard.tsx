
import { useState } from 'react';
import { Movie } from '../utils/mockData';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  index: number;
}

const MovieCard = ({ movie, index }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative transition-all duration-300 ease-in-out"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        zIndex: isHovered ? 10 : 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`card-hover-effect rounded-md overflow-hidden ${
          isHovered ? 'ring-2 ring-white/10 shadow-xl' : ''
        }`}
      >
        <div className="relative aspect-[2/3] bg-netflix-dark">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-all"
            loading="lazy"
          />
          
          {isHovered && (
            <div className="absolute inset-0 flex flex-col">
              <div className="relative flex-grow movie-card-zoom">
                <img 
                  src={movie.backdrop || movie.poster} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent"></div>
              </div>
              
              <div className="p-3 bg-netflix-dark">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2">
                    <button className="bg-white hover:bg-white/90 text-netflix-black rounded-full p-1 transition-transform transform hover:scale-110">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="border-2 border-gray-600 hover:border-gray-300 text-white rounded-full p-1 transition-all hover:border-white transform hover:scale-110">
                      <Plus className="w-4 h-4" />
                    </button>
                    <button className="border-2 border-gray-600 hover:border-gray-300 text-white rounded-full p-1 transition-all hover:border-white transform hover:scale-110">
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="border-2 border-gray-600 hover:border-gray-300 text-white rounded-full p-1 transition-all hover:border-white transform hover:scale-110">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-500 font-bold text-xs">{Math.floor(movie.rating * 10)}% Match</span>
                  <span className="text-xs text-gray-400 border border-gray-600 px-1">{movie.duration}</span>
                </div>
                
                <div className="flex flex-wrap text-xs text-gray-300 gap-1">
                  {movie.genres.map((genre, i) => (
                    <span key={i}>
                      {genre}{i < movie.genres.length - 1 && ","}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
