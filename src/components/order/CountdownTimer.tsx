
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";

interface CountdownTimerProps {
  pickupTime: string;
  waitMinutes: number;
}

const CountdownTimer = ({ pickupTime, waitMinutes }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<{
    minutes: number;
    seconds: number;
    progress: number;
  }>({ minutes: 0, seconds: 0, progress: 0 });

  useEffect(() => {
    const targetTime = new Date(pickupTime).getTime();
    const totalWaitTime = waitMinutes * 60 * 1000; // Convert to milliseconds

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Calculate progress (how much time has passed)
        const elapsed = totalWaitTime - difference;
        const progress = Math.max(0, Math.min(100, (elapsed / totalWaitTime) * 100));

        setTimeLeft({ minutes, seconds, progress });
      } else {
        setTimeLeft({ minutes: 0, seconds: 0, progress: 100 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [pickupTime, waitMinutes]);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-grill-gold mb-2">Order Ready In</h3>
        <div className="text-3xl font-bold text-white">
          {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </div>
        <p className="text-gray-300 text-sm mt-1">
          {timeLeft.progress >= 100 ? 'Your order is ready for pickup!' : 'Estimated time remaining'}
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Progress</span>
          <span>{Math.round(timeLeft.progress)}%</span>
        </div>
        <Progress 
          value={timeLeft.progress} 
          className="h-3 bg-gray-700"
        />
      </div>
      
      {timeLeft.progress >= 100 && (
        <div className="mt-4 p-3 bg-green-900/20 border border-green-600 rounded-lg">
          <p className="text-green-400 text-sm font-medium text-center">
            🎉 Your order is ready! Please come pick it up.
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
