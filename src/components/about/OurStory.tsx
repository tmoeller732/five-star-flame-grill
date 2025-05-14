
import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useCarouselAutoplay } from "../../hooks/useCarouselAutoplay";
import { type CarouselApi } from "@/components/ui/carousel";

const OurStory: React.FC = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  
  // Use our custom autoplay hook with 5000ms (5 seconds) interval
  useCarouselAutoplay(api, 5000, true);
  
  const foodImages = [
    "/lovable-uploads/267bc1e8-d899-45ce-984c-5ebcba58c0b0.png",
    "/lovable-uploads/8e53c131-2e7e-47f3-9dbb-cbcb26ac1d77.png",
    "/lovable-uploads/8d943221-6932-4417-8f75-dd26216e8d6a.png"
  ];

  return (
    <section className="py-10 bg-grain">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in-element opacity-0 translate-y-10 transition-all duration-1000">
            <div className="relative group overflow-hidden rounded-lg shadow-xl">
              <Carousel 
                opts={{
                  align: "start",
                  loop: true,
                }}
                setApi={setApi}
                className="w-full overflow-hidden pointer-events-none"
              >
                <CarouselContent>
                  {foodImages.map((src, index) => (
                    <CarouselItem key={index} className="min-w-full">
                      <AspectRatio ratio={4/3} className="bg-muted">
                        <img 
                          src={src} 
                          alt={`5 Star Grill Food Item ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="absolute inset-0 bg-gradient-to-r from-grill-black/10 to-grill-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
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
