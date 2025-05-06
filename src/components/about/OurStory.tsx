
import React from 'react';

const OurStory = () => {
  return (
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
  );
};

export default OurStory;
