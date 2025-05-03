
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  className?: string;
}

const CountdownTimer = ({ className = '' }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set end date to 2 weeks from the first visit
    const savedEndDate = localStorage.getItem('countdownEndDate');
    const endDate = savedEndDate 
      ? new Date(parseInt(savedEndDate)) 
      : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    
    // Save the end date if it's not already saved
    if (!savedEndDate) {
      localStorage.setItem('countdownEndDate', endDate.getTime().toString());
    }
    
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`mt-6 mb-2 ${className}`}>
      <p className="text-grill-gold font-medium text-lg mb-2 font-playfair">Ordering Apps Ready In:</p>
      <div className="flex justify-center gap-3 md:gap-4">
        <div className="flex flex-col items-center">
          <div className="bg-grill-brown/80 text-grill-gold font-bold text-xl md:text-2xl w-14 md:w-16 h-14 md:h-16 flex items-center justify-center rounded-md border border-grill-gold/30">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <span className="text-white/80 text-xs mt-1">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-grill-brown/80 text-grill-gold font-bold text-xl md:text-2xl w-14 md:w-16 h-14 md:h-16 flex items-center justify-center rounded-md border border-grill-gold/30">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <span className="text-white/80 text-xs mt-1">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-grill-brown/80 text-grill-gold font-bold text-xl md:text-2xl w-14 md:w-16 h-14 md:h-16 flex items-center justify-center rounded-md border border-grill-gold/30">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <span className="text-white/80 text-xs mt-1">Mins</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-grill-brown/80 text-grill-gold font-bold text-xl md:text-2xl w-14 md:w-16 h-14 md:h-16 flex items-center justify-center rounded-md border border-grill-gold/30">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <span className="text-white/80 text-xs mt-1">Secs</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
