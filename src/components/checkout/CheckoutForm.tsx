
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from '../../contexts/CartContext';
import { useOrders } from '../../contexts/OrderContext';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  specialInstructions: string;
}

const CheckoutForm = () => {
  const { state, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    specialInstructions: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      // Create order object
      const now = new Date();
      const pickupTime = new Date(now.getTime() + 20 * 60000); // 20 minutes from now
      
      const order = {
        id: `ORDER_${Date.now()}`,
        items: state.items,
        total: state.total,
        customerInfo,
        orderDate: now.toISOString(),
        status: 'confirmed' as const,
        estimatedPickupTime: pickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Add order to order management
      addOrder(order);

      // In a real app, you would send this to your backend
      console.log('Order placed:', order);

      // Clear cart
      clearCart();

      // Show success message
      toast({
        title: "Order Confirmed!",
        description: "Your order has been placed successfully. We'll contact you when it's ready for pickup.",
        duration: 5000
      });

      // Navigate to confirmation page
      navigate('/order-confirmation', { 
        state: { order },
        replace: true 
      });

      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Card className="p-6 bg-card border-gray-700">
      <h2 className="text-2xl font-bold text-grill-gold mb-6">Customer Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-white">
              First Name *
            </Label>
            <Input
              id="firstName"
              value={customerInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="lastName" className="text-white">
              Last Name *
            </Label>
            <Input
              id="lastName"
              value={customerInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="text-white">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-white">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <Label htmlFor="specialInstructions" className="text-white">
            Special Instructions
          </Label>
          <Textarea
            id="specialInstructions"
            value={customerInfo.specialInstructions}
            onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="Any special requests or dietary restrictions..."
            rows={3}
          />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <h3 className="font-semibold text-grill-gold mb-2">Payment Information</h3>
          <p className="text-gray-300 text-sm">
            Payment will be collected upon pickup. We accept cash and all major credit cards.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black font-semibold py-3"
        >
          {isSubmitting ? 'Processing Order...' : 'Place Order'}
        </Button>
      </form>
    </Card>
  );
};

export default CheckoutForm;
