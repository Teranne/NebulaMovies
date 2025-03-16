
import { useRef, useState } from 'react';
import MovieCard from './MovieCard';
import { Category } from '../utils/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '../utils/animations';

interface ContentRowProps {
  category: Category;
}

const ContentRow = ({ category }: ContentRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [containerRef, isVisible] = useReveal();
  
  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 1.5
        : scrollLeft + clientWidth / 1.5;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };
  
  const handleScroll = () => {
    if (!rowRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };
  
  return (
    <div 
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`content-row transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="netflix-container mb-2">
        <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight">
          {category.name}
        </h2>
      </div>
      
      <div className="relative group">
        {showLeftArrow && (
          <button 
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-netflix-black/30 hover:bg-netflix-black/70 rounded-r-md p-2 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}
        
        <div 
          ref={rowRef}
          className="flex space-x-2 overflow-x-scroll scrollbar-hide py-6 pl-4 md:pl-8"
          onScroll={handleScroll}
        >
          {category.movies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="flex-none w-[180px] sm:w-[200px] md:w-[240px] first:ml-0"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
                animation: isVisible ? 'slideUp 0.5s ease-out forwards' : 'none',
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              <MovieCard movie={movie} index={index} />
            </div>
          ))}
        </div>
        
        {showRightArrow && (
          <button 
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-netflix-black/30 hover:bg-netflix-black/70 rounded-l-md p-2 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentRow;
