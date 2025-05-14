
import { useEffect, useState } from 'react';
import { type CarouselApi } from "@/components/ui/carousel";

export function useCarouselAutoplay(api: CarouselApi | null, interval = 3000, enabled = true) {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  
  useEffect(() => {
    // Define function to clear any existing autoplay interval
    const clearAutoplay = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        setIntervalId(null);
      }
    };
    
    // Define function to start autoplay with proper timing
    const startAutoplay = () => {
      clearAutoplay();
      if (api) {
        const id = window.setInterval(() => {
          if (api) {
            api.scrollNext();
          }
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
    
    // The key change: DON'T restart autoplay on "select" events
    // This prevents double-advancing which can cause skipping
    api.on("reInit", startAutoplay);
    
    // Cleanup function to clear interval and remove event listeners when component unmounts
    return () => {
      clearAutoplay();
      api.off("reInit", startAutoplay);
    };
  }, [api, interval, enabled, intervalId]);
}
