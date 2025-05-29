
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface CartDialogProps {
  children: React.ReactNode;
}

const CartDialog = ({ children }: CartDialogProps) => {
  const { state, updateQuantity, removeItem, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

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
    navigate('/checkout');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            Your Cart ({state.itemCount} items)
          </DialogTitle>
        </DialogHeader>
        
        {state.items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-2">Add some delicious items to get started!</p>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-96">
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      
                      {/* Customizations */}
                      {item.customizations.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-gray-600">Customizations:</p>
                          <ul className="text-xs text-gray-500 ml-2">
                            {item.customizations.map((customization, index) => (
                              <li key={index}>
                                • {customization.name} (+${customization.price.toFixed(2)})
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus size={12} />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${item.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-lg">${getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="flex-1"
                >
                  Clear Cart
                </Button>
                <Button 
                  onClick={handleCheckout}
                  className="flex-1 bg-grill-gold hover:bg-grill-orange text-grill-black"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
