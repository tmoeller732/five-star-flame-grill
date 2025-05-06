
import { useEffect, useState } from 'react';

interface SpecialtyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: string;
}

const SpecialtyCard = ({ title, description, icon, delay = "0" }: SpecialtyCardProps) => {
  return (
    <div 
      className={`bg-grill-brown/10 p-6 rounded-lg border border-grill-gold/20 opacity-0 animate-fade-in transform hover:scale-105 transition-all duration-500`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-grill-gold mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 text-center">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
};

const CulinarySpecialties = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1
      }
    );
    
    const element = document.querySelector('.specialties-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-grill-black specialties-section">
      <div 
        className={`absolute left-0 right-0 h-full max-h-[500px] overflow-hidden opacity-10 z-0`}
      >
        <div className="bg-[url('https://images.unsplash.com/photo-1515668236457-83c3b8764839?q=80&w=2274')] bg-cover bg-center h-full w-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-playfair">
            Our Culinary <span className="text-grill-gold">Journey</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            At 5 Star Grill, we pride ourselves on offering an eclectic blend of flavors across breakfast, lunch, and dinner.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SpecialtyCard 
            title="New York Style Breakfast"
            description="Capture that iconic NYC street cart experience with our freshly-made breakfast sandwiches."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-flame-slow">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                <path d="M7 2v20"></path>
                <path d="M21 15V2"></path>
                <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                <path d="M18 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
              </svg>
            }
            delay="0.1"
          />
          <SpecialtyCard 
            title="Signature Cheesesteaks"
            description="Tender steak, grilled onions, peppers, and melted cheese on fresh rolls that keep customers coming back."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-flame-slow">
                <path d="M14 15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6z"></path>
                <path d="M20 9h-4l-2 2 2 2h4l2 2v-8l-2 2z"></path>
                <path d="M12 13v9"></path>
              </svg>
            }
            delay="0.3"
          />
          <SpecialtyCard 
            title="Authentic Spanish Cuisine"
            description="Transport yourself to the streets of Barcelona with our savory rice, bean platters and perfectly seasoned grilled meats."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-flame-slow">
                <path d="M15 8V2"></path>
                <path d="M22 14L16 14"></path>
                <path d="M20 13a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM9 9L8 7"></path>
                <path d="M12 7L11.40 5.40"></path>
                <path d="M15 9L16 7"></path>
              </svg>
            }
            delay="0.5"
          />
          <SpecialtyCard 
            title="Fresh Salads"
            description="Crisp, thoughtfully assembled salads with seasonal vegetables and house-made dressings for a healthier option."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-flame-slow">
                <path d="M7 21h10"></path>
                <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path>
                <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-1.09 2.4 2.4 0 0 1 3.37.82 2.4 2.4 0 0 1 2.04 3.52 2.4 2.4 0 0 1-1.1 4.7 2.4 2.4 0 0 1-2.53 3.31 2.4 2.4 0 0 1-4 2.62 2.4 2.4 0 0 1-3.9-.5 2.4 2.4 0 0 1-2.76-4.43"></path>
                <path d="M8 10.4A2.4 2.4 0 0 1 7.8 7a2.4 2.4 0 0 1 2.44-2.55 2.4 2.4 0 0 1 2.04-2.03 2.4 2.4 0 0 1 4.29 1.07 2.4 2.4 0 0 1 1.63 5.72"></path>
              </svg>
            }
            delay="0.7"
          />
        </div>
      </div>
    </section>
  );
};

export default CulinarySpecialties;
