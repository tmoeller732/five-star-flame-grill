
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Featured from '../components/Featured';
import OrderPartners from '../components/OrderPartners';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>5 Star Grill | Breakfast, Lunch & Dinner | Toms River, NJ</title>
        <meta name="description" content="5 Star Grill in Toms River, NJ offers delicious breakfast, lunch, and dinner specialties prepared on our signature grill. Order online or dine in!" />
        <meta name="keywords" content="restaurant, grill, breakfast, lunch, dinner, Toms River, NJ, 5 Star Grill" />
      </Helmet>
      
      <Header />
      
      <main>
        <Hero />
        <Featured />
        <OrderPartners />
        <Testimonials />
        <CTASection />
      </main>
      
      <Footer />
    </>
  );
};

export default Home;
