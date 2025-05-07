
import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ReviewWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reviewUrl = "https://g.page/r/CVMgJx-yFLxcEBM/review";
  
  // Function to start the collapse timer
  const startCollapseTimer = () => {
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set a new timer to collapse the widget
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, isVisible ? 10000 : 15000); // 10 seconds for initial display, 15 seconds after click
  };

  // Set initial timer on component mount
  useEffect(() => {
    startCollapseTimer();
    
    // Cleanup function to clear timer on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  
  // Reset timer when visibility changes
  useEffect(() => {
    if (isVisible) {
      startCollapseTimer();
    }
  }, [isVisible]);

  // Handle button mouse over
  const handleMouseOver = () => {
    if (!isVisible) {
      setIsVisible(true); // Show the widget
    } else {
      // Add a small delay before opening to prevent accidental triggering
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      hoverTimeoutRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 300);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };
  
  return (
    <>
      <div 
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 transition-transform duration-300 ${
          isVisible ? 'translate-x-0' : 'translate-x-[-85%]'
        }`}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className="bg-white rounded-r-lg shadow-lg p-3 transform transition-transform hover:translate-x-1 hover:shadow-xl border border-gray-200 border-l-0 relative"
          aria-label="Leave a review"
        >
          <div className="flex flex-col items-center">
            <img 
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google"
              className="h-6 object-contain mb-1"
            />
            <div className="flex text-grill-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <span className={`text-xs font-medium text-grill-black mt-1 ${
              !isVisible ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-300`}>
              Review
            </span>
            {!isVisible && (
              <span className="absolute top-1/2 -right-14 transform -translate-y-1/2 text-xs font-medium bg-white px-2 py-1 rounded-t-md shadow-md">
                Review Us
              </span>
            )}
          </div>
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair text-center">Share Your Experience</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Your feedback helps us serve you better
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <p className="text-center">
              We strive to provide exceptional dining experiences at 5 Star Grill. Your feedback is invaluable and helps us continue to improve our service and cuisine.
            </p>
            <div className="flex justify-center">
              <div className="flex text-grill-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Click the button below to share your review on Google
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={() => window.open(reviewUrl, "_blank")}
              className="bg-grill-gold hover:bg-grill-orange text-grill-black"
            >
              Leave Your Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewWidget;
