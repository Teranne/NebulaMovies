
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-nebula-black shadow-lg py-2' : 'bg-gradient-to-b from-nebula-black/90 to-transparent py-3'
      }`}
    >
      <div className="nebula-container flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full nebula-gradient flex items-center justify-center nebula-logo-glow">
              <span className="text-white text-xl font-bold">N</span>
            </div>
            <span className="nebula-text-gradient text-2xl font-bold tracking-tight">
              NebulaMovies
            </span>
          </Link>
          
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-white hover:text-nebula-accent transition-colors text-sm">Home</Link></li>
              <li><Link to="/movies" className="text-white hover:text-nebula-accent transition-colors text-sm">Movies</Link></li>
              <li><Link to="/tv" className="text-white hover:text-nebula-accent transition-colors text-sm">TV Shows</Link></li>
              <li><Link to="/trending" className="text-white hover:text-nebula-accent transition-colors text-sm">Trending</Link></li>
              {currentUser && (
                <li><Link to="/mylist" className="text-white hover:text-nebula-accent transition-colors text-sm">My List</Link></li>
              )}
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-nebula-accent transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          {currentUser && (
            <button className="text-white hover:text-nebula-accent transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          )}
          
          <div className="md:block hidden">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 text-white hover:text-nebula-accent transition-colors">
                    <div className="w-8 h-8 rounded-full bg-nebula-accent flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate('/settings')}>
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-nebula-accent hover:bg-transparent"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-nebula-primary hover:bg-nebula-primary/90 text-white" 
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-nebula-dark border-nebula-primary/20 pt-12">
              <div className="flex flex-col h-full space-y-6">
                <div className="flex flex-col space-y-3">
                  <Link to="/" className="text-lg font-medium text-white hover:text-nebula-accent">Home</Link>
                  <Link to="/movies" className="text-lg font-medium text-white hover:text-nebula-accent">Movies</Link>
                  <Link to="/tv" className="text-lg font-medium text-white hover:text-nebula-accent">TV Shows</Link>
                  <Link to="/trending" className="text-lg font-medium text-white hover:text-nebula-accent">Trending</Link>
                  {currentUser && (
                    <Link to="/mylist" className="text-lg font-medium text-white hover:text-nebula-accent">My List</Link>
                  )}
                </div>
                
                <div className="mt-auto">
                  {currentUser ? (
                    <>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-nebula-accent flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm text-white font-medium">
                            {currentUser.email?.split('@')[0]}
                          </div>
                          <div className="text-xs text-gray-400">
                            {currentUser.email}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => navigate('/profile')}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start mt-2"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Button 
                        className="w-full bg-nebula-primary hover:bg-nebula-primary/90"
                        onClick={() => navigate('/login')}
                      >
                        Sign In
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-nebula-primary text-nebula-primary hover:bg-nebula-primary/10"
                        onClick={() => navigate('/signup')}
                      >
                        Create Account
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
