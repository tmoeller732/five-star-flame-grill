
import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderConfirmation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const order = location.state?.order;

  if (!user || !order) {
    return <Navigate to="/menu" replace />;
  }

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

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-6">
              <h2 className="text-xl font-semibold text-grill-gold mb-4">Order Details</h2>
              
              <div className="text-left space-y-2">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Total:</strong> ${order.grand_total.toFixed(2)}</p>
                <p><strong>Status:</strong> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
                {order.special_instructions && (
                  <p><strong>Special Instructions:</strong> {order.special_instructions}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <Clock size={24} className="text-grill-gold mx-auto mb-2" />
                <h3 className="font-semibold text-grill-gold mb-1">Pickup Time</h3>
                <p className="text-sm text-gray-300">15-20 minutes</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <Phone size={24} className="text-grill-gold mx-auto mb-2" />
                <h3 className="font-semibold text-grill-gold mb-1">We'll Call You</h3>
                <p className="text-sm text-gray-300">When ready</p>
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
