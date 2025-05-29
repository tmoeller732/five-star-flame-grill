
import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, MapPin, Navigation } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CountdownTimer from '../components/order/CountdownTimer';

const OrderConfirmation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const order = location.state?.order;

  // Restaurant details - updated with actual information
  const restaurantInfo = {
    phone: '(856) 559-4938',
    address: '1681 Lakewood Rd, Toms River, NJ 08755',
    googleMapsUrl: 'https://maps.google.com/?q=1681+Lakewood+Rd+Toms+River+NJ+08755'
  };

  if (!user || !order) {
    return <Navigate to="/menu" replace />;
  }

  const handleGetDirections = () => {
    window.open(restaurantInfo.googleMapsUrl, '_blank');
  };

  const handleCallRestaurant = () => {
    window.open(`tel:${restaurantInfo.phone}`, '_self');
  };

  return (
    <div className="min-h-screen bg-grill-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-card border-gray-700 text-center">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
            
            <h1 className="text-3xl font-bold text-grill-gold mb-4">
              Order Confirmed!
            </h1>
            
            <p className="text-gray-300 mb-6">
              Thank you for your order. We're preparing your delicious meal right now.
            </p>

            {/* Countdown Timer */}
            {order.pickup_time && order.estimated_wait_minutes && (
              <div className="mb-6">
                <CountdownTimer 
                  pickupTime={order.pickup_time}
                  waitMinutes={order.estimated_wait_minutes}
                />
              </div>
            )}

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-6">
              <h2 className="text-xl font-semibold text-grill-gold mb-4">Order Details</h2>
              
              <div className="text-left space-y-2">
                <p><strong>Order ID:</strong> #{order.id.slice(0, 8)}</p>
                <p><strong>Total:</strong> ${order.grand_total.toFixed(2)}</p>
                <p><strong>Status:</strong> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
                {order.estimated_wait_minutes && (
                  <p><strong>Estimated Wait:</strong> {order.estimated_wait_minutes} minutes</p>
                )}
                {order.special_instructions && (
                  <p><strong>Special Instructions:</strong> {order.special_instructions}</p>
                )}
              </div>
            </div>

            {/* Restaurant Contact & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <Phone size={24} className="text-grill-gold mx-auto mb-2" />
                <h3 className="font-semibold text-grill-gold mb-2">Call Us</h3>
                <p className="text-sm text-gray-300 mb-2">{restaurantInfo.phone}</p>
                <Button
                  onClick={handleCallRestaurant}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  Call Now
                </Button>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <MapPin size={24} className="text-grill-gold mx-auto mb-2" />
                <h3 className="font-semibold text-grill-gold mb-2">Location</h3>
                <p className="text-sm text-gray-300 mb-2">{restaurantInfo.address}</p>
                <Button
                  onClick={handleGetDirections}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  <Navigation size={16} className="mr-2" />
                  Directions
                </Button>
              </div>
            </div>

            {/* Map Embed */}
            <div className="mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <h3 className="font-semibold text-grill-gold mb-3">Find Us Here</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.4037143825745!2d-74.15986248460547!3d39.94123897942456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c17a1f5b2a8a8f%3A0x123456789abcdef!2s1681%20Lakewood%20Rd%2C%20Toms%20River%2C%20NJ%2008755!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-yellow-400 mb-2">Payment Information</h3>
              <p className="text-yellow-200 text-sm">
                Payment will be collected upon pickup. We accept cash and all major credit cards.
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                asChild 
                className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
              >
                <Link to="/menu">Order More Items</Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                className="w-full border-gray-600 text-white hover:bg-gray-800"
              >
                <Link to="/account">View Order History</Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                className="w-full border-gray-600 text-white hover:bg-gray-800"
              >
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
