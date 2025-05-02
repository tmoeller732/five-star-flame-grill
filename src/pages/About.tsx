
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
                  5 Star Grill was founded in 2015 by the Johnson family, who brought their passion for exceptional grilling and hospitality to Toms River. What started as a small family-run breakfast spot has evolved into a beloved culinary destination serving breakfast, lunch, and dinner to locals and visitors alike.
                </p>
                
                <p className="text-gray-300 mb-4">
                  Our journey began when Master Chef Michael Johnson decided to combine his expertise in flame grilling with his wife Sarah's talent for creating inviting dining experiences. Together, they crafted a restaurant concept that would showcase the very best of grilled cuisine while maintaining a welcoming, family-friendly atmosphere.
                </p>
                
                <p className="text-gray-300">
                  Today, 5 Star Grill continues to honor its founding principles: sourcing the finest ingredients, preparing them with care and expertise, and serving each dish with genuine hospitality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="py-20 bg-grill-brown/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 fade-in-element opacity-0 translate-y-10 transition-all duration-1000">
                <h2 className="text-3xl font-bold text-white mb-6 font-playfair">
                  Our <span className="text-grill-gold">Vision</span>
                </h2>
                
                <p className="text-gray-300 mb-4">
                  At 5 Star Grill, we believe that great food brings people together. Our vision is to create memorable dining experiences by combining tradition with innovation, quality with accessibility, and flavor with presentation.
                </p>
                
                <p className="text-gray-300 mb-4">
                  We aim to be more than just a restaurant – we strive to be a gathering place where families create memories, friends share laughter, and individuals savor moments of culinary delight. Each dish we serve is a testament to our dedication to the art of grilling.
                </p>
                
                <p className="text-gray-300">
                  As we grow, we remain committed to supporting our local community, embracing sustainable practices, and continuing to elevate the dining experience in Toms River, all while staying true to our core values of quality, service, and passion.
                </p>
              </div>
              
              <div className="order-1 lg:order-2 fade-in-element opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2274" 
                  alt="Restaurant vision" 
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
                      alt="Executive Chef" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">Michael Johnson</h3>
                    <p className="text-grill-gold mb-4">Executive Chef & Founder</p>
                    <p className="text-gray-300">
                      With over 20 years of culinary experience, Chef Michael brings his passion for flame-grilled perfection to every dish.
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
                      alt="General Manager" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">Sarah Johnson</h3>
                    <p className="text-grill-gold mb-4">General Manager & Co-Founder</p>
                    <p className="text-gray-300">
                      Sarah creates the warm, inviting atmosphere that complements our exceptional cuisine, ensuring every guest feels welcome.
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
                      alt="Sous Chef" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">David Rodriguez</h3>
                    <p className="text-grill-gold mb-4">Sous Chef</p>
                    <p className="text-gray-300">
                      David's innovative approach to grilled cuisine brings exciting new flavors to our seasonal menu offerings.
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
