
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Phone } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface ActiveOrderTimerProps {
  order: {
    id: string;
    pickup_time: string;
    estimated_wait_minutes: number;
    status: string;
    grand_total: number;
  };
}

const ActiveOrderTimer = ({ order }: ActiveOrderTimerProps) => {
  // Updated with actual restaurant information
  const restaurantInfo = {
    phone: '(856) 559-4938',
    googleMapsUrl: 'https://maps.google.com/?q=1681+Lakewood+Rd+Toms+River+NJ+08755'
  };

  const handleGetDirections = () => {
    window.open(restaurantInfo.googleMapsUrl, '_blank');
  };

  const handleCallRestaurant = () => {
    window.open(`tel:${restaurantInfo.phone}`, '_self');
  };

  const isOrderActive = () => {
    const pickupTime = new Date(order.pickup_time).getTime();
    const now = new Date().getTime();
    return now < pickupTime && ['confirmed', 'preparing'].includes(order.status);
  };

  if (!isOrderActive()) {
    return null;
  }

  return (
    <Card className="p-6 bg-card border-gray-700 mb-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-grill-gold mb-2">Active Order</h3>
        <p className="text-gray-300 text-sm">
          Order #{order.id.slice(0, 8)} • ${order.grand_total.toFixed(2)}
        </p>
      </div>

      <CountdownTimer 
        pickupTime={order.pickup_time}
        waitMinutes={order.estimated_wait_minutes}
      />

      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button
          onClick={handleCallRestaurant}
          variant="outline"
          className="border-gray-600 text-white hover:bg-gray-700"
        >
          <Phone size={16} className="mr-2" />
          Call Us
        </Button>
        
        <Button
          onClick={handleGetDirections}
          variant="outline"
          className="border-gray-600 text-white hover:bg-gray-700"
        >
          <Navigation size={16} className="mr-2" />
          Directions
        </Button>
      </div>
    </Card>
  );
};

export default ActiveOrderTimer;
