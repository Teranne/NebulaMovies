
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchGenres } from '../services/tmdb';
import Navbar from '../components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Play, Plus, ThumbsUp, ArrowLeft, Star, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReveal } from '../utils/animations';

interface MovieDetailType {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  year: number;
  rating: number;
  duration: string;
  description: string;
  genres: string[];
  mediaType: string;
  cast?: string[];
  director?: string;
  similar?: any[];
}

const MovieDetail = () => {
  const { mediaType, id } = useParams();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contentRef, isContentVisible] = useReveal(0.1);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const details = await fetchMovieDetails(parseInt(id));
        if (details) {
          setMovie(details);
        } else {
          toast({
            title: "Error",
            description: "Could not load movie details",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        toast({
          title: "Error",
          description: "Failed to load movie details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-nebula-black">
        <Navbar />
        <div className="h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="nebula-gradient w-16 h-16 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-nebula-black">
        <Navbar />
        <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center text-nebula-accent">
          <h2 className="text-2xl mb-4">Movie not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nebula-black text-white">
      <Navbar />
      
      <div className="relative">
        {/* Hero Banner */}
        <div className="relative h-[70vh]">
          <div className="absolute inset-0">
            <img 
              src={movie.backdrop} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nebula-black via-nebula-black/60 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-4 text-nebula-accent hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="text-yellow-500 mr-1 h-4 w-4" />
                <span>{movie.rating.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center">
                <Calendar className="text-nebula-accent mr-1 h-4 w-4" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-nebula-accent mr-1 h-4 w-4" />
                <span>{movie.duration}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-nebula-accent/20 rounded-full text-xs"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <Button className="bg-nebula-accent hover:bg-nebula-accent/90">
                <Play className="mr-2 h-4 w-4" />
                Play
              </Button>
              <Button variant="outline" className="border-nebula-accent text-nebula-accent hover:bg-nebula-accent/10">
                <Plus className="mr-2 h-4 w-4" />
                Add to List
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                <ThumbsUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div 
          ref={contentRef}
          className={`p-8 transition-opacity duration-1000 ${
            isContentVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-screen-xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6 bg-nebula-black/50 border border-nebula-accent/20">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="similar">Similar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {movie.description}
                    </p>
                    
                    {/* Placeholder for cast info */}
                    <h3 className="text-xl font-bold mb-2">Cast</h3>
                    <p className="text-gray-400">Cast information unavailable</p>
                  </div>
                  
                  <div className="md:col-span-1">
                    <div className="bg-nebula-accent/5 rounded-lg p-6 border border-nebula-accent/20">
                      <h3 className="text-xl font-bold mb-4">Information</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-gray-400 text-sm">Type</p>
                          <p className="capitalize">{mediaType}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-400 text-sm">Release Year</p>
                          <p>{movie.year}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-400 text-sm">Duration</p>
                          <p>{movie.duration}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-400 text-sm">Genres</p>
                          <p>{movie.genres.join(', ')}</p>
                        </div>
                        
                        <div>
                          <p className="text-gray-400 text-sm">Rating</p>
                          <div className="flex items-center">
                            <Star className="text-yellow-500 mr-1 h-4 w-4" />
                            <span>{movie.rating.toFixed(1)}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details">
                <div className="p-4 bg-nebula-accent/5 rounded-lg border border-nebula-accent/20">
                  <p className="text-center text-gray-400">
                    Additional details for this title are not available at the moment.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="similar">
                <div className="p-4 bg-nebula-accent/5 rounded-lg border border-nebula-accent/20">
                  <p className="text-center text-gray-400">
                    Similar titles are not available at the moment.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
