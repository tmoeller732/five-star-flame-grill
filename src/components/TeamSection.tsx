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
const TeamMember = ({
  name,
  role,
  description,
  imageUrl,
  delay = "0"
}: TeamMemberProps) => {
  return <div className={`bg-grill-brown/10 rounded-lg overflow-hidden shadow-lg opacity-0 animate-fade-in transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl`} style={{
    animationDelay: `${delay}s`
  }}>
      <div className="h-64 overflow-hidden">
        
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-grill-gold mb-1">{name}</h3>
        <p className="text-gray-300 text-sm mb-4">{role}</p>
        <div className="w-16 h-1 bg-grill-gold mb-4"></div>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>;
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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
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
  return <section className="py-20 bg-grill-black team-section">
      
    </section>;
};
export default TeamSection;