
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CountdownTimer from '../components/CountdownTimer';
import FlameEffect from '../components/effects/FlameEffect';
import useFlameEffect from '../hooks/useFlameEffect';

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isFlameVisible } = useFlameEffect();
  
  useEffect(() => {
    // Simple animation effect
    setIsVisible(true);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Blog | 5 Star Grill | Toms River, NJ</title>
        <meta name="description" content="Read the latest updates, recipes, and culinary insights from 5 Star Grill in Toms River, NJ." />
        <meta name="keywords" content="restaurant blog, food blog, recipes, culinary insights, Toms River, NJ, 5 Star Grill" />
      </Helmet>
      
      <Header />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-grill-gold">Blog</h1>
            
            <CountdownTimer className="mb-6" />
          </div>
          
          <div className={`bg-card p-6 rounded-lg shadow-lg max-w-3xl mx-auto hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
          transitionDelay: '200ms'
        }}>
            <p className="text-center text-xl">
              Our blog is coming soon with exciting recipes and culinary insights!
            </p>
          </div>
        </div>
        <FlameEffect isVisible={isFlameVisible} />
      </main>
      
      <Footer />
    </>
  );
};

export default Blog;
