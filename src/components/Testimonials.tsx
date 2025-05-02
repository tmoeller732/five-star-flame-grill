
import { useEffect } from 'react';

const TestimonialCard = ({ 
  text, 
  name, 
  title,
  delay = "0"
}: { 
  text: string; 
  name: string; 
  title: string;
  delay?: string;
}) => {
  return (
    <div 
      className={`bg-grill-brown/20 p-6 rounded-lg opacity-0 animate-fade-in`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            xmlns="http://www.w3.org/2000/svg" 
            className="inline-block h-5 w-5 text-grill-gold" 
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="text-gray-300 italic mb-6">"{text}"</p>

      <div>
        <p className="text-white font-semibold">{name}</p>
        <p className="text-gray-400 text-sm">{title}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
          }
        });
      },
      {
        threshold: 0.1
      }
    );
    
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach(element => observer.observe(element));
    
    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-grill-black to-grill-brown/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-playfair">
            What Our <span className="text-grill-gold">Customers Say</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it — see what our satisfied customers have to say about their 5 Star Grill experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            text="The flame-grilled steak was perfectly cooked and seasoned. I've never had a better dining experience in Toms River!" 
            name="Michael Johnson"
            title="Toms River Local"
            delay="0.1"
          />
          <TestimonialCard 
            text="I bring my family here every Sunday for breakfast. The sunrise platter is amazing and the staff always make us feel welcome." 
            name="Sarah Williams"
            title="Regular Customer"
            delay="0.3"
          />
          <TestimonialCard 
            text="The burgers here are next level! Juicy, flavorful, and that signature sauce is addictive. Best lunch spot in town." 
            name="David Thompson"
            title="Food Blogger"
            delay="0.5"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
