
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  className?: string;
}

const CountdownTimer = ({
  className = ''
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Static 7-day countdown that never changes
    const staticTime = {
      days: 7,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    setTimeLeft(staticTime);
  }, []);

  // For small screens or non-banner displays
  if (!className.includes('inline-flex')) {
    return <div className={className}></div>;
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
