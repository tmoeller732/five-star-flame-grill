
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

  return { isFlameVisible, showFlame, isCooldown };
};

export default useFlameEffect;
