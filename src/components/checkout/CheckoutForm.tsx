import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { validateSpecialInstructions } from '../../utils/security';

const CheckoutForm = () => {
  const { state, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateWaitTime = (total: number) => {
    if (total <= 40) return 15;
    if (total <= 70) return 20;
    return 40;
  };

  const handleSpecialInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitized = validateSpecialInstructions(e.target.value);
    setSpecialInstructions(sanitized);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const taxAmount = state.total * 0.085;
      const grandTotal = state.total + taxAmount;
      const waitMinutes = calculateWaitTime(grandTotal);
      const pickupTime = new Date(Date.now() + waitMinutes * 60000);

      // Get user's profile to include phone number
      const { data: profile } = await supabase
        .from('profiles')
        .select('phone')
        .eq('id', user.id)
        .single();

      // Sanitize special instructions before saving
      const sanitizedInstructions = validateSpecialInstructions(specialInstructions);

      // Create order in database with pickup time, wait minutes, and customer phone
      const { data: orderData, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          items: state.items as any,
          total: state.total,
          tax_amount: taxAmount,
          grand_total: grandTotal,
          special_instructions: sanitizedInstructions || null,
          status: 'confirmed',
          pickup_time: pickupTime.toISOString(),
          estimated_wait_minutes: waitMinutes,
          customer_phone: profile?.phone || null
        })
        .select()
        .single();

      if (error) throw error;

      console.log('Order created successfully:', orderData);

      // Send email notification to restaurant
      try {
        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-order-notification', {
          body: {
            order: orderData,
            customerEmail: user.email
          }
        });

        if (emailError) {
          console.error('Email notification failed:', emailError);
          // Don't fail the order if email fails, just log it
          toast({
            title: "Order Placed",
            description: "Your order was placed successfully, but email notification failed.",
            variant: "default"
          });
        } else {
          console.log('Email notification sent:', emailData);
        }
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // Don't fail the order if email fails
      }

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
        state: { order: orderData },
        replace: true 
      });

    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive"
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="p-6 bg-card border-gray-700">
      <h2 className="text-2xl font-bold text-grill-gold mb-6">Order Details</h2>
      
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
        <h3 className="font-semibold text-grill-gold mb-2">Ordering as:</h3>
        <p className="text-white">{user?.email}</p>
        <p className="text-sm text-gray-400">
          Update your profile information in your account settings if needed.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="specialInstructions" className="text-white">
            Special Instructions (Optional)
          </Label>
          <Textarea
            id="specialInstructions"
            value={specialInstructions}
            onChange={handleSpecialInstructionsChange}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="Any special requests, dietary restrictions, or cooking preferences... (max 500 characters)"
            rows={3}
            maxLength={500}
          />
          <p className="text-xs text-gray-400 mt-1">
            {specialInstructions.length}/500 characters
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <h3 className="font-semibold text-grill-gold mb-2">Estimated Wait Time</h3>
          <p className="text-grill-gold text-lg font-semibold">
            {calculateWaitTime(state.total + (state.total * 0.085))} minutes
          </p>
          <p className="text-gray-300 text-sm mt-1">
            Based on your order total of ${(state.total + (state.total * 0.085)).toFixed(2)}
          </p>
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
