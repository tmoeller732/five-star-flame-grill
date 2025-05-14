
import { useEffect, useState } from 'react';
import { type CarouselApi } from "@/components/ui/carousel";

export function useCarouselAutoplay(api: CarouselApi | null, interval = 3000, enabled = true) {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  
  useEffect(() => {
    if (!api || !enabled) {
      // Define clearAutoplay first before using it
      const clearAutoplay = () => {
        if (intervalId) {
          window.clearInterval(intervalId);
          setIntervalId(null);
        }
      };
      
      clearAutoplay();
      return;
    }
    
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
        api.scrollNext();
      }, interval);
      setIntervalId(Number(id));
    };
    
    startAutoplay();
    
    api.on("reInit", startAutoplay);
    api.on("select", startAutoplay);
    
    // Add event listeners to pause on hover or focus
    const root = api.rootNode();
    if (root) {
      root.addEventListener("mouseenter", clearAutoplay);
      root.addEventListener("mouseleave", startAutoplay);
      root.addEventListener("focusin", clearAutoplay);
      root.addEventListener("focusout", startAutoplay);
    }
    
    return () => {
      clearAutoplay();
      if (root) {
        root.removeEventListener("mouseenter", clearAutoplay);
        root.removeEventListener("mouseleave", startAutoplay);
        root.removeEventListener("focusin", clearAutoplay);
        root.removeEventListener("focusout", startAutoplay);
      }
      
      api.off("reInit", startAutoplay);
      api.off("select", startAutoplay);
    };
  }, [api, interval, enabled, intervalId]);
}
