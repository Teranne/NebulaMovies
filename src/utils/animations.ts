import { useState, useEffect, useRef } from 'react';

// Hook for revealing elements on scroll
export const useReveal = (threshold = 0.1) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
  }, [ref, threshold]);

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
