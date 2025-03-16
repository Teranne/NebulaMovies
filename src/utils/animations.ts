
import { useState, useEffect, useRef } from 'react';

// Hook for revealing elements on scroll
export const useReveal = (threshold = 0.1) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isRevealed] as const;
};

// Hook for parallax effect
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return { y: offset * speed };
};

// Hook for staggered animations
export const useStaggeredAnimation = (itemCount: number, delay = 0.1) => {
  return Array.from({ length: itemCount }).map((_, i) => ({
    transition: { delay: i * delay }
  }));
};

// Function to generate hover animation props
export const getHoverAnimation = (scale = 1.05, duration = 0.3) => ({
  whileHover: { scale },
  transition: { duration }
});

// Hook for smooth carousel animations
export const useCarouselAnimation = (speed = 0.3) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const startAnimation = () => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), speed * 1000);
    return () => clearTimeout(timer);
  };
  
  return { isAnimating, startAnimation, duration: speed };
};

// Hook for fade-in animation sequence
export const useFadeInSequence = (items: any[], delay = 0.1) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(items.length).fill(false));
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    items.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleItems(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }, index * delay * 1000);
      
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [items, delay]);
  
  return visibleItems;
};

// Hook for loader/spinner animations
export const useLoaderAnimation = (duration = 1.5) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, duration * 10);
    
    return () => clearInterval(interval);
  }, [duration]);
  
  return progress;
};
