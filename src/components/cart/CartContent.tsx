
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import GuestCheckoutModal from '../checkout/GuestCheckoutModal';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

interface CartContentProps {
  onClose?: () => void;
}

const CartContent = ({ onClose }: CartContentProps) => {
  const { state, updateQuantity, removeItem, clearCart, getCartTotal, setGuestData } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showGuestModal, setShowGuestModal] = useState(false);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
        duration: 2000,
      });
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string, itemName: string) => {
    removeItem(itemId);
    toast({
      title: "Item removed",
      description: `${itemName} has been removed from your cart.`,
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 2000,
    });
  };

  const handleCheckout = () => {
    if (onClose) {
      onClose();
    }
    navigate('/checkout');
  };

  const handleSignIn = () => {
    if (onClose) {
      onClose();
    }
    navigate('/auth');
  };

  const handleGuestCheckout = (guestData: any) => {
    setGuestData(guestData);
    setShowGuestModal(false);
    if (onClose) {
      onClose();
    }
    navigate('/checkout');
  };

  if (state.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className="space-y-4 h-full flex flex-col">
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full max-h-[60vh] md:max-h-96">
            <div className="space-y-4 pr-4">
              {state.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <Separator />
        
        <div className="space-y-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total:</span>
            <span className="font-bold text-lg">${getCartTotal().toFixed(2)}</span>
          </div>
          
          {!user && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800 mb-2">
                <strong>Members earn loyalty points!</strong> Sign in to earn 1 point per dollar spent.
              </p>
              <p className="text-xs text-yellow-700">
                Or continue as a guest (no points earned)
              </p>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="flex-1"
            >
              Clear Cart
            </Button>
            {user ? (
              <Button 
                onClick={handleCheckout}
                className="flex-1 bg-grill-gold hover:bg-grill-orange text-grill-black"
              >
                Checkout
              </Button>
            ) : (
              <div className="flex-1 space-y-2">
                <Button 
                  onClick={handleSignIn}
                  className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
                >
                  Sign In & Earn Points
                </Button>
                <Button
                  onClick={() => setShowGuestModal(true)}
                  variant="outline"
                  className="w-full border-gray-400 text-gray-600 hover:bg-gray-50"
                >
                  Continue as Guest
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <GuestCheckoutModal
        isOpen={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        onSubmit={handleGuestCheckout}
      />
    </>
  );
};

export default CartContent;
