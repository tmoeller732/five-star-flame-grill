
import React from 'react';

const AboutHero = () => {
  return (
    <section className="pt-32 pb-10 bg-gradient-to-b from-grill-black to-grill-brown/30">
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
  );
};

export default AboutHero;
