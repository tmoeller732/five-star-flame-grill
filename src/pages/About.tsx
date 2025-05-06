
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';
import OurCuisine from '../components/about/OurCuisine';
import TeamSection from '../components/TeamSection';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      {
        threshold: 0.1
      }
    );
    
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach(element => observer.observe(element));
    
    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | 5 Star Grill | Toms River, NJ</title>
        <meta name="description" content="Learn about 5 Star Grill's history, our vision, and our dedication to serving high-quality breakfast, lunch, and dinner in Toms River, NJ." />
        <meta name="keywords" content="about 5 Star Grill, restaurant history, grill restaurant Toms River, NJ restaurant" />
      </Helmet>
      
      <Header />
      
      <main>
        <AboutHero />
        <OurStory />
        <OurCuisine />
        <TeamSection />
      </main>
      
      <Footer />
    </>
  );
};

export default About;
