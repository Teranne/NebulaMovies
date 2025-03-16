import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContentRow from '../components/ContentRow';
import { Movie } from '../utils/mockData';
import { 
  fetchTrending, 
  fetchMovies, 
  fetchTVShows 
} from '../services/tmdb';
import { useToast } from '@/hooks/use-toast';
import { useLoaderAnimation } from '../utils/animations';

const Index = () => {
  const [featuredContent, setFeaturedContent] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<Movie[]>([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const loaderProgress = useLoaderAnimation(1.2);

  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // Fetch trending content
        const trending = await fetchTrending();
        setTrendingMovies(trending);
        
        // Set featured content from trending
        if (trending.length > 0) {
          setFeaturedContent(trending[0]);
        }
        
        // Fetch popular movies
        const popular = await fetchMovies('popular');
        setPopularMovies(popular);
        
        // Fetch top rated movies
        const topRated = await fetchMovies('top_rated');
        setTopRatedMovies(topRated);
        
        // Fetch popular TV shows
        const popularTV = await fetchTVShows('popular');
        setPopularTVShows(popularTV);
        
        // Fetch top rated TV shows
        const topRatedTV = await fetchTVShows('top_rated');
        setTopRatedTVShows(topRatedTV);
        
      } catch (error) {
        console.error('Error loading content:', error);
        toast({
          title: "Failed to load content",
          description: "There was a problem fetching content. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800); // Small delay for smooth transition
      }
    };
    
    loadContent();
  }, [toast]);

  // Create categories array for ContentRow component
  const categories = [
    {
      id: 1,
      name: 'Trending Now',
      movies: trendingMovies,
    },
    {
      id: 2,
      name: 'Popular Movies',
      movies: popularMovies,
    },
    {
      id: 3,
      name: 'Top Rated Movies',
      movies: topRatedMovies,
    },
    {
      id: 4,
      name: 'Popular TV Shows',
      movies: popularTVShows,
    },
    {
      id: 5,
      name: 'Top Rated TV Shows',
      movies: topRatedTVShows,
    },
  ];

  return (
    <div className="min-h-screen bg-nebula-black text-white">
      <Navbar />
      
      <main>
        {loading ? (
          <div className="h-screen flex items-center justify-center bg-nebula-black">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-6 relative">
                <div className="nebula-gradient absolute inset-0 rounded-full opacity-30 animate-pulse-slow"></div>
                <div 
                  className="nebula-gradient absolute inset-0 rounded-full" 
                  style={{
                    clipPath: `polygon(50% 50%, 100% 50%, 100% 0, 0 0, 0 ${loaderProgress}%, ${loaderProgress}% 100%, 100% 100%, 100% 50%)`,
                    opacity: 0.8,
                    transform: 'rotate(0deg)',
                    animation: 'glow 2s infinite'
                  }}
                ></div>
              </div>
              <p className="text-nebula-accent text-lg font-medium">Loading NebulaMovies</p>
              <p className="text-nebula-gray/70 text-sm mt-2">Discovering cosmic entertainment</p>
            </div>
          </div>
        ) : (
          <>
            {featuredContent && <Hero movie={featuredContent} />}
            
            <section className="pt-4 pb-20 space-y-8">
              {categories.map((category) => (
                <ContentRow key={category.id} category={category} />
              ))}
            </section>
          </>
        )}
      </main>
      
      <footer className="py-10 bg-nebula-black">
        <div className="nebula-container">
          <div className="text-nebula-gray/80 text-sm text-center">
            <p>© 2023 NebulaMovies. All rights reserved.</p>
            <p className="mt-2">This is a demo streaming service.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

