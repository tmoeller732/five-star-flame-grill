
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
      if (api) {
        const id = window.setInterval(() => {
          if (api) api.scrollNext();
        }, interval);
        setIntervalId(Number(id));
      }
    };
    
    // If api is null or autoplay is disabled, clear any existing interval and return
    if (!api || !enabled) {
      clearAutoplay();
      return;
    }
    
    // Start autoplay immediately
    startAutoplay();
    
    // Add event listeners to restart autoplay after certain events
    api.on("reInit", startAutoplay);
    api.on("select", startAutoplay);
    
    // Cleanup function to clear interval and remove event listeners when component unmounts
    return () => {
      clearAutoplay();
      api.off("reInit", startAutoplay);
      api.off("select", startAutoplay);
    };
  }, [api, interval, enabled, intervalId]);
}
