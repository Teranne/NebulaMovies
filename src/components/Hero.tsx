
import { Play, Info } from 'lucide-react';
import { Movie } from '../utils/mockData';
import { useReveal } from '../utils/animations';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  movie: Movie;
}

const Hero = ({ movie }: HeroProps) => {
  const [containerRef, isVisible] = useReveal();
  const navigate = useNavigate();
  
  const handleMoreInfoClick = () => {
    navigate(`/detail/${movie.mediaType}/${movie.id}`);
  };
  
  return (
    <div 
      ref={containerRef}
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
      <div className="nebula-container relative z-10 pb-20 md:pb-32">
        <div className="max-w-2xl transition-all duration-1000 ease-out transform translate-y-0 opacity-100">
          <div 
            className={`transition-all duration-700 ease-out delay-300 ${
              isVisible 
                ? 'transform-none opacity-100' 
                : 'transform translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-nebula-primary/20 px-3 py-1 rounded-full text-sm text-nebula-primary font-semibold border border-nebula-primary/30">
                #1 Popular Today
              </span>
              <span className="bg-nebula-accent/20 text-nebula-accent px-3 py-1 rounded-full text-sm font-medium border border-nebula-accent/30">
                {movie.rating.toFixed(1)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
              {movie.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-white/80 mb-4">
              <span>{movie.year}</span>
              <span className="rounded-full border border-white/30 px-3 py-0.5">{movie.duration}</span>
              <span className="hidden md:inline-block">{movie.genres.join(' • ')}</span>
            </div>
            
            <p className="text-white/90 text-sm md:text-base mb-8 max-w-lg line-clamp-3 md:line-clamp-4">
              {movie.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button 
                className="bg-nebula-primary hover:bg-nebula-primary/90 text-white font-semibold px-6 py-2 rounded-lg flex items-center transform transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Play
              </Button>
              <Button 
                variant="outline"
                className="border-white/20 bg-nebula-dark/80 hover:bg-nebula-dark text-white font-semibold px-6 py-2 rounded-lg flex items-center transform transition-all duration-300 hover:scale-105"
                onClick={handleMoreInfoClick}
              >
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
