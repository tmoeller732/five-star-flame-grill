import React from 'react';
const OurCuisine = () => {
  return <section className="py-20 bg-grill-brown/20">
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
            <img alt="Restaurant cuisine" className="rounded-lg shadow-xl" src="/lovable-uploads/e76625d9-e323-4127-bf17-f0d9f1b5c2e6.jpg" />
          </div>
        </div>
      </div>
    </section>;
};
export default OurCuisine;