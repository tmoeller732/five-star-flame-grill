
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuContent from '../components/MenuContent';
import CountdownTimer from '../components/CountdownTimer';
import FlameEffect from '../components/effects/FlameEffect';
import useFlameEffect from '../hooks/useFlameEffect';
import ReviewWidget from '../components/ReviewWidget';

const Menu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isFlameVisible } = useFlameEffect();

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Menu | 5 Star Grill | Toms River, NJ</title>
        <meta name="description" content="Explore our delicious menu offerings at 5 Star Grill in Toms River, NJ. From breakfast classics to dinner specialties, prepared fresh on our signature grill." />
        <meta name="keywords" content="restaurant menu, grill menu, breakfast menu, lunch menu, dinner menu, Toms River, NJ, 5 Star Grill" />
      </Helmet>
      
      <Header />
      <ReviewWidget />
      
      <main className="pt-36 pb-16">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="container mx-auto px-4 mb-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-grill-gold">Our Menu</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
                Explore our delicious selection of grilled specialties.
              </p>
              <CountdownTimer />
            </div>
          </div>
          <MenuContent />
          <FlameEffect isVisible={isFlameVisible} />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Menu;
