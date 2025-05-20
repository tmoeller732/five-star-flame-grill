import { useState, useEffect } from 'react';
interface CountdownTimerProps {
  className?: string;
}
const CountdownTimer = ({
  className = ''
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  useEffect(() => {
    // Set end date to 2 weeks from the first visit
    const savedEndDate = localStorage.getItem('countdownEndDate');
    const endDate = savedEndDate ? new Date(parseInt(savedEndDate)) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    // Save the end date if it's not already saved
    if (!savedEndDate) {
      localStorage.setItem('countdownEndDate', endDate.getTime().toString());
    }
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(difference / (1000 * 60 * 60) % 24),
          minutes: Math.floor(difference / 1000 / 60 % 60),
          seconds: Math.floor(difference / 1000 % 60)
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Default display for the menu page
  if (!className.includes('inline-flex')) {
    return;
  }

  // Compact display for the banner
  return <div className={className}>
      <div className="flex items-center space-x-1">
        <div className="bg-grill-gold/20 text-grill-black font-bold text-xs px-2 py-1 rounded">
          {String(timeLeft.days).padStart(2, '0')}d
        </div>
        <div className="bg-grill-gold/20 text-grill-black font-bold text-xs px-2 py-1 rounded">
          {String(timeLeft.hours).padStart(2, '0')}h
        </div>
        <div className="bg-grill-gold/20 text-grill-black font-bold text-xs px-2 py-1 rounded">
          {String(timeLeft.minutes).padStart(2, '0')}m
        </div>
        <div className="bg-grill-gold/20 text-grill-black font-bold text-xs px-2 py-1 rounded">
          {String(timeLeft.seconds).padStart(2, '0')}s
        </div>
      </div>
    </div>;
};
export default CountdownTimer;