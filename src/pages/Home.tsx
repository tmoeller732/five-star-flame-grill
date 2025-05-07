
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Featured from '../components/Featured';
import OrderPartners from '../components/OrderPartners';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import TeamSection from '../components/TeamSection';
import CulinarySpecialties from '../components/CulinarySpecialties';
import StorySection from '../components/StorySection';
import FlameEffect from '../components/effects/FlameEffect';
import useFlameEffect from '../hooks/useFlameEffect';

const Home = () => {
  const { isFlameVisible } = useFlameEffect();
  
  return (
    <>
      <Helmet>
        <title>5 Star Grill | Breakfast, Lunch & Dinner | Toms River, NJ</title>
        <meta name="description" content="5 Star Grill in Toms River, NJ offers delicious breakfast, lunch, and dinner specialties including NY-style breakfast sandwiches, signature cheesesteaks, and authentic Spanish cuisine. Founded in 2025 by Syed and Carlos." />
        <meta name="keywords" content="restaurant, grill, breakfast sandwiches, cheesesteaks, Spanish cuisine, Toms River, NJ, 5 Star Grill, smash burgers" />
      </Helmet>
      
      <Header />
      
      <main>
        <Hero />
        <StorySection />
        <Featured />
        <CulinarySpecialties />
        <TeamSection />
        <OrderPartners />
        <Testimonials />
        <CTASection />
        <FlameEffect isVisible={isFlameVisible} />
      </main>
      
      <Footer />
    </>
  );
};

export default Home;
