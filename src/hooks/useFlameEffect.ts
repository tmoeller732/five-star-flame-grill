
import { useState, useCallback, useEffect } from 'react';

export const useFlameEffect = () => {
  const [isFlameVisible, setIsFlameVisible] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  const showFlame = useCallback(() => {
    if (!isCooldown) {
      setIsFlameVisible(true);
      setIsCooldown(true);
      
      // Hide flame after 2 seconds
      setTimeout(() => {
        setIsFlameVisible(false);
        
        // Set cooldown for 15 seconds before allowing trigger again
        setTimeout(() => {
          setIsCooldown(false);
        }, 15000);
      }, 2000);
    }
  }, [isCooldown]);

  // Add global image hover listener
  useEffect(() => {
    const handleImageHover = () => {
      showFlame();
    };

    // Add event listeners to all images
    const addHoverListeners = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.addEventListener('mouseenter', handleImageHover);
      });
    };

    // Initial setup
    addHoverListeners();

    // Setup mutation observer to catch dynamically added images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          addHoverListeners();
        }
      });
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      // Cleanup
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.removeEventListener('mouseenter', handleImageHover);
      });
      observer.disconnect();
    };
  }, [showFlame]);

  return { isFlameVisible, showFlame, isCooldown };
};

export default useFlameEffect;
