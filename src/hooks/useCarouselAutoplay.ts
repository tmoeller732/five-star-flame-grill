
import { useEffect, useState, useCallback } from 'react';
import { type CarouselApi } from "@/components/ui/carousel";

export function useCarouselAutoplay(api: CarouselApi | null, interval = 5000, enabled = true) {
  const [autoplayActive, setAutoplayActive] = useState(enabled);
  
  // Function to handle the actual scrolling
  const doScroll = useCallback(() => {
    if (api && autoplayActive) {
      api.scrollNext();
      console.log('Auto scrolling carousel to next slide at', new Date().toLocaleTimeString());
    }
  }, [api, autoplayActive]);
  
  // Set up the autoplay timer
  useEffect(() => {
    if (!api || !enabled) {
      return;
    }
    
    // Make sure loop is enabled when the API is ready
    api.on("reInit", () => {
      // Log that the carousel is initialized
      console.log('Carousel initialized/re-initialized');
      setAutoplayActive(true);
    });
    
    // Set up the interval for auto-scrolling
    const timer = setInterval(doScroll, interval);
    
    // Add event listeners for pause on user interaction
    const pauseAutoplay = () => {
      console.log('Carousel interaction detected, pausing autoplay');
      setAutoplayActive(false);
      
      // Resume autoplay after a short delay
      setTimeout(() => {
        console.log('Resuming autoplay after interaction');
        setAutoplayActive(true);
      }, 2000);
    };
    
    // Listen for user interaction events to pause autoplay
    api.on("select", pauseAutoplay);
    api.on("pointerDown", pauseAutoplay);
    
    // Clean up all event listeners and timers
    return () => {
      clearInterval(timer);
      if (api) {
        api.off("reInit");
        api.off("select", pauseAutoplay);
        api.off("pointerDown", pauseAutoplay);
      }
    };
  }, [api, interval, enabled, doScroll]);
  
  return { isAutoplayActive: autoplayActive };
}
