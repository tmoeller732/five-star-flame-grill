
import { useEffect, useState } from 'react';
import runwareService from '../services/RunwareService';
import { toast } from "sonner";

const StorySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070");
  const [isLoading, setIsLoading] = useState(false);

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
    
    const element = document.querySelector('.story-section');
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
    <section className="py-24 bg-grill-brown/5 story-section overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-grill-gold animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-grill-gold animate-pulse"></div>
              <img 
                src={imageUrl} 
                alt="5 Star Grill Story" 
                className="w-full h-auto object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair">
              Our <span className="text-grill-gold">Story</span>
            </h2>
            
            <p className="text-gray-300 mb-4">
              Founded in 2025 by two local residents, 5 Star Grill was born from a shared passion for exceptional food and community. They envisioned creating a welcoming spot where locals could enjoy an eclectic blend of cuisines — all under one roof.
            </p>
            
            <p className="text-gray-300 mb-4">
              What started as a dream quickly became Toms River's newest culinary gem. Working alongside Chef Juan and his talented team, they've created a restaurant that serves quality meals crafted from high-quality ingredients and seasoned with care.
            </p>
            
            <p className="text-gray-300">
              Today, 5 Star Grill is open seven days a week for breakfast, lunch, and dinner, embodying the community spirit and culinary excellence that was first envisioned. Every dish that leaves our kitchen is a testament to their commitment to bringing memorable dining experiences to Toms River.
            </p>
            
            <div className="mt-8">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-grill-gold mr-3 animate-flame-slow"
                >
                  <path d="M15 11.25A1.25 1.25 0 0 1 13.75 10h-1.5A1.25 1.25 0 0 1 11 8.75v-.089c.004-.322.027-.644.069-.963a4.989 4.989 0 0 1 .344-.9 3.736 3.736 0 0 1 .516-.71c.166-.182.364-.357.516-.495.152-.137.381-.3.552-.452.171-.151.394-.336.516-.503a1.461 1.461 0 0 0 .333-.761c.004-.317-.059-.591-.213-.83a1.251 1.251 0 0 0-.348-.392 1.27 1.27 0 0 0-.45-.24 1.191 1.191 0 0 0-1.098.212 1.302 1.302 0 0 0-.466.815 1.13 1.13 0 0 1-.781.848 1.356 1.356 0 0 1-.498.057 1.383 1.383 0 0 1-.496-.123 1.135 1.135 0 0 1-.696-.942 3.88 3.88 0 0 1 .272-1.653A3.363 3.363 0 0 1 9.73 3.86a3.842 3.842 0 0 1 1.545-.793A3.77 3.77 0 0 1 13.585 3a3.758 3.758 0 0 1 1.903.933 3.32 3.32 0 0 1 1.075 1.774c.047.227.08.456.098.687A3.134 3.134 0 0 1 16.6 7.332a3.373 3.373 0 0 1-.791 1.207 5.223 5.223 0 0 1-.818.683 9.458 9.458 0 0 0-.398.308 2.27 2.27 0 0 0-.301.299.816.816 0 0 0-.175.334.872.872 0 0 0-.019.359c.008.043.019.085.035.126.016.042.037.082.062.119a.87.87 0 0 0 .249.26.844.844 0 0 0 .209.122.847.847 0 0 0 .347.071Z"></path>
                  <path d="M14 15h-.25a.75.75 0 0 0-.75.75v.5c0 .414.336.75.75.75h.25a.75.75 0 0 0 .75-.75v-.5a.75.75 0 0 0-.75-.75Z"></path>
                  <path d="M7 3.77 2 7v11a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7l-5-3.23a1 1 0 0 0-1.1 0L12 6.5 8.1 3.77a1 1 0 0 0-1.1 0Z"></path>
                </svg>
                <span className="text-grill-gold font-medium">Est. 2025 in Toms River, NJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
