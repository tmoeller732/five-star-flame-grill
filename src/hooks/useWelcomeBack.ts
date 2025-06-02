
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const WELCOME_BACK_COOKIE = 'fivestar_last_visit';
const WELCOME_BACK_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

export const useWelcomeBack = () => {
  const { user } = useAuth();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    if (user) {
      const lastVisit = localStorage.getItem(WELCOME_BACK_COOKIE);
      const now = new Date().getTime();

      if (lastVisit) {
        const lastVisitTime = parseInt(lastVisit);
        const timeDiff = now - lastVisitTime;
        
        // Show welcome modal if last visit was more than 1 day ago but less than 30 days
        if (timeDiff > 24 * 60 * 60 * 1000 && timeDiff < WELCOME_BACK_EXPIRY) {
          setShowWelcomeModal(true);
        }
      }

      // Update last visit time
      localStorage.setItem(WELCOME_BACK_COOKIE, now.toString());
    }
  }, [user]);

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  return {
    showWelcomeModal,
    closeWelcomeModal
  };
};
