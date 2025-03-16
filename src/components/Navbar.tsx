
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-netflix-black shadow-md py-2' : 'bg-gradient-to-b from-netflix-black/90 to-transparent py-3'
      }`}
    >
      <div className="netflix-container flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-netflix-red text-3xl font-bold">
            NETMOVIE
          </Link>
          
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-white hover:text-gray-300 transition-colors text-sm">Home</Link></li>
              <li><Link to="/series" className="text-white hover:text-gray-300 transition-colors text-sm">Series</Link></li>
              <li><Link to="/movies" className="text-white hover:text-gray-300 transition-colors text-sm">Movies</Link></li>
              <li><Link to="/trending" className="text-white hover:text-gray-300 transition-colors text-sm">Trending</Link></li>
              <li><Link to="/mylist" className="text-white hover:text-gray-300 transition-colors text-sm">My List</Link></li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-300 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-gray-300 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors">
              <div className="w-7 h-7 rounded-sm bg-netflix-red flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute right-0 mt-2 w-48 origin-top-right glassmorphism border border-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="py-2 px-4">
                <ul className="space-y-2">
                  <li><Link to="/profile" className="block text-white hover:text-netflix-red transition-colors text-sm">Profile</Link></li>
                  <li><Link to="/account" className="block text-white hover:text-netflix-red transition-colors text-sm">Account</Link></li>
                  <li><Link to="/settings" className="block text-white hover:text-netflix-red transition-colors text-sm">Settings</Link></li>
                  <li><hr className="border-gray-700 my-1" /></li>
                  <li><button className="text-white hover:text-netflix-red transition-colors text-sm">Sign Out</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
