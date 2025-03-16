
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

const Index = () => {
  const [featuredContent, setFeaturedContent] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
        
      } catch (error) {
        console.error('Error loading content:', error);
        toast({
          title: "Failed to load content",
          description: "There was a problem fetching content. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
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
  ];

  return (
    <div className="min-h-screen bg-nebula-black text-white">
      <Navbar />
      
      <main>
        {loading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 rounded-full nebula-gradient mb-4"></div>
              <p className="text-nebula-accent">Loading awesome content...</p>
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
