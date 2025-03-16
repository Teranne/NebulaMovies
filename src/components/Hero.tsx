
import { Play, Info } from 'lucide-react';
import { Movie } from '../utils/mockData';
import { useReveal } from '../utils/animations';

interface HeroProps {
  movie: Movie;
}

const Hero = ({ movie }: HeroProps) => {
  const [containerRef, isVisible] = useReveal();
  
  return (
    <div 
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="relative w-full h-[85vh] min-h-[650px] flex items-end"
      style={{
        backgroundImage: `url(${movie.backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Content */}
      <div className="netflix-container relative z-10 pb-20 md:pb-32">
        <div className="max-w-2xl transition-all duration-1000 ease-out transform translate-y-0 opacity-100">
          <div 
            className={`transition-all duration-700 ease-out delay-300 ${
              isVisible 
                ? 'transform-none opacity-100' 
                : 'transform translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-netflix-red text-sm font-semibold">#1 in Movies Today</span>
              <span className="bg-netflix-red/20 text-white px-2 py-0.5 rounded text-xs">
                {movie.rating.toFixed(1)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
              {movie.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-white/80 mb-4">
              <span>{movie.year}</span>
              <span className="rounded border border-white/30 px-2">{movie.duration}</span>
              <span className="hidden md:inline-block">{movie.genres.join(' • ')}</span>
            </div>
            
            <p className="text-white/90 text-sm md:text-base mb-8 max-w-lg line-clamp-3 md:line-clamp-4">
              {movie.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center bg-white hover:bg-white/90 text-netflix-black font-semibold px-6 py-2 rounded transition-all duration-300 transform hover:scale-105">
                <Play className="w-5 h-5 mr-2" />
                Play
              </button>
              <button className="flex items-center bg-neutral-600/80 hover:bg-neutral-600 text-white font-semibold px-6 py-2 rounded transition-all duration-300 transform hover:scale-105">
                <Info className="w-5 h-5 mr-2" />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
