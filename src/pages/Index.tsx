
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContentRow from '../components/ContentRow';
import { featuredContent, categories } from '../utils/mockData';

const Index = () => {
  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      
      <main>
        <Hero movie={featuredContent} />
        
        <section className="pt-4 pb-20 space-y-8">
          {categories.map((category) => (
            <ContentRow key={category.id} category={category} />
          ))}
        </section>
      </main>
      
      <footer className="py-10 bg-netflix-black">
        <div className="netflix-container">
          <div className="text-netflix-gray/80 text-sm text-center">
            <p>© 2023 NETMOVIE. All rights reserved.</p>
            <p className="mt-2">This is a demo clone. Not an actual streaming service.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
