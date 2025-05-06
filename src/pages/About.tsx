
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-grill-black to-grill-brown/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
                About <span className="text-grill-gold">5 Star Grill</span>
              </h1>
              <p className="text-xl text-gray-300">
                Our story, our passion, and our commitment to exceptional food
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-grain">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="fade-in-element opacity-0 translate-y-10 transition-all duration-1000">
                <img 
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2274" 
                  alt="Restaurant founders" 
                  className="rounded-lg shadow-xl"
                />
              </div>
              
              <div className="fade-in-element opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                <h2 className="text-3xl font-bold text-white mb-6 font-playfair">
                  Our <span className="text-grill-gold">Story</span>
                </h2>
                
                <p className="text-gray-300 mb-4">
                  Welcome to 5 Star Grill, Toms River's newest culinary gem, proudly founded in 2025 by two local residents. Driven by their passion for exceptional food and community, they created 5 Star Grill as a welcoming spot where locals can enjoy an eclectic blend of classic American favorites, vibrant Spanish dishes, and fresh, satisfying salads—all under one roof.
                </p>
                
                <p className="text-gray-300 mb-4">
                  Open seven days a week, 5 Star Grill has quickly become a staple for breakfast, lunch, and dinner, consistently serving meals crafted from high-quality ingredients and seasoned with care. Whether you're grabbing a quick bite or planning a family dinner, the restaurant's extensive menu ensures there's something for every palate.
                </p>
                
                <p className="text-gray-300">
                  At its heart, 5 Star Grill embodies community spirit and culinary excellence. Chef Juan and the entire dedicated team are committed to serving delicious, memorable meals to the residents of Toms River and beyond.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Culinary Offerings Section */}
        <section className="py-20 bg-grill-brown/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 fade-in-element opacity-0 translate-y-10 transition-all duration-1000">
                <h2 className="text-3xl font-bold text-white mb-6 font-playfair">
                  Our <span className="text-grill-gold">Cuisine</span>
                </h2>
                
                <p className="text-gray-300 mb-4">
                  Morning enthusiasts rave about 5 Star Grill's breakfast sandwiches, which effortlessly capture that iconic New York street cart experience. Imagine biting into a warm, freshly-made sandwich packed with sizzling eggs, crispy bacon, melted cheese, and perfectly toasted bread—an indulgent start to any day.
                </p>
                
                <p className="text-gray-300 mb-4">
                  As the day moves forward, lunchtime brings an array of mouthwatering options. Renowned for their cheesesteaks and smash burgers, 5 Star Grill sets itself apart through culinary precision and flavor-packed dishes that keep customers returning for more.
                </p>
                
                <p className="text-gray-300">
                  Dinner at 5 Star Grill introduces diners to a vibrant Spanish culinary journey, guided expertly by Chef Juan and his talented culinary team. With decades of combined experience, Chef Juan leads the kitchen in creating authentic Spanish dishes that are rich, hearty, and packed with robust flavors.
                </p>
              </div>
              
              <div className="order-1 lg:order-2 fade-in-element opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2274" 
                  alt="Restaurant cuisine" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-20 bg-grain">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-playfair">
                Meet Our <span className="text-grill-gold">Team</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                The passionate individuals who make 5 Star Grill a culinary destination in Toms River
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="fade-in-element opacity-0 translate-y-10 transition-all duration-1000">
                <div className="bg-grill-brown/20 rounded-lg overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2080" 
                      alt="Local Founder" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">Founder</h3>
                    <p className="text-grill-gold mb-4">Co-Founder</p>
                    <p className="text-gray-300">
                      A local resident with a passion for creating a welcoming spot where the community can enjoy exceptional food.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="fade-in-element opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                <div className="bg-grill-brown/20 rounded-lg overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961" 
                      alt="Local Founder" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">Founder</h3>
                    <p className="text-grill-gold mb-4">Co-Founder</p>
                    <p className="text-gray-300">
                      Brings their love for culinary excellence to 5 Star Grill, ensuring quality in every dish that leaves the kitchen.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="fade-in-element opacity-0 translate-y-10 transition-all duration-1000 delay-400">
                <div className="bg-grill-brown/20 rounded-lg overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1567072379583-c75f10e1c325?q=80&w=2068" 
                      alt="Chef Juan" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">Chef Juan</h3>
                    <p className="text-grill-gold mb-4">Head Chef</p>
                    <p className="text-gray-300">
                      With decades of experience, Chef Juan leads the kitchen in creating authentic Spanish dishes rich with robust flavors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default About;
