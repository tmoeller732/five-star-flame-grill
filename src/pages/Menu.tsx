
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuContent from '../components/MenuContent';

const Menu = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      
      <main className="pt-28 pb-16">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <MenuContent />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Menu;
