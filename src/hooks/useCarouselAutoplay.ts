
import { useEffect, useState } from 'react';
import { type CarouselApi } from "@/components/ui/carousel";

export function useCarouselAutoplay(api: CarouselApi | null, interval = 3000, enabled = true) {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  
  useEffect(() => {
    // Define all functions first before using them
    const clearAutoplay = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        setIntervalId(null);
      }
    };
    
    const startAutoplay = () => {
      clearAutoplay();
      const id = window.setInterval(() => {
        api?.scrollNext();
      }, interval);
      setIntervalId(Number(id));
    };
    
    if (!api || !enabled) {
      clearAutoplay();
      return;
    }
    
    startAutoplay();
    
    api.on("reInit", startAutoplay);
    api.on("select", startAutoplay);
    
    // Remove mouse/touch event listeners to prevent control
    
    return () => {
      clearAutoplay();
      
      api.off("reInit", startAutoplay);
      api.off("select", startAutoplay);
    };
  }, [api, interval, enabled, intervalId]);
}
