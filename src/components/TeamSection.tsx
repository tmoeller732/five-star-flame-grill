
import { useEffect, useState } from 'react';
import runwareService from '../services/RunwareService';
import { toast } from "sonner";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  delay?: string;
}

const TeamMember = ({ name, role, description, imageUrl, delay = "0" }: TeamMemberProps) => {
  return (
    <div 
      className={`bg-grill-brown/10 rounded-lg overflow-hidden shadow-lg opacity-0 animate-fade-in transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-grill-gold mb-1">{name}</h3>
        <p className="text-gray-300 text-sm mb-4">{role}</p>
        <div className="w-16 h-1 bg-grill-gold mb-4"></div>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrls, setImageUrls] = useState({
    owner1: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2074",
    owner2: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=2070",
    chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2274"
  });
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
    
    const element = document.querySelector('.team-section');
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
    <section className="py-20 bg-grill-black team-section">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-playfair">
            Meet the <span className="text-grill-gold">Team</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The passionate people behind 5 Star Grill who are dedicated to bringing exceptional dining experiences to Toms River.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeamMember 
            name="Syed"
            role="Co-Founder"
            description="A local resident with a passion for creating a welcoming spot where the community can enjoy exceptional food."
            imageUrl={imageUrls.owner1}
            delay="0.1"
          />
          <TeamMember 
            name="Carlos"
            role="Co-Founder"
            description="Brings his love for culinary excellence to 5 Star Grill, ensuring quality in every dish that leaves the kitchen."
            imageUrl={imageUrls.owner2}
            delay="0.3"
          />
          <TeamMember 
            name="Chef Juan"
            role="Head Chef"
            description="With decades of experience, Chef Juan leads the kitchen in creating authentic Spanish dishes rich with robust flavors."
            imageUrl={imageUrls.chef}
            delay="0.5"
          />
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
