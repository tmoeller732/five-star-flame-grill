
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { MenuItemProps } from './MenuItem';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from '../../types/cart';
import { useToast } from "@/hooks/use-toast";

interface ItemCustomizationModalProps {
  item: MenuItemProps;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ItemCustomizationModal: React.FC<ItemCustomizationModalProps> = ({
  item,
  open,
  onOpenChange
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Array<{
    id: string;
    name: string;
    price: number;
    category: string;
  }>>([]);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setSelectedCustomizations([]);
      // Debug log to see what customizations are available
      console.log('Modal opened for item:', item.name);
      console.log('Item customizations:', item.customizations);
    }
  }, [open, item]);

  const handleCustomizationToggle = (customization: {
    id: number;
    name: string;
    price: number;
  }, categoryName: string) => {
    const customizationWithCategory = {
      id: `${customization.id}-${categoryName}`,
      name: customization.name,
      price: customization.price,
      category: categoryName
    };

    setSelectedCustomizations(prev => {
      const existingIndex = prev.findIndex(c => c.id === customizationWithCategory.id);
      if (existingIndex >= 0) {
        return prev.filter(c => c.id !== customizationWithCategory.id);
      } else {
        return [...prev, customizationWithCategory];
      }
    });
  };

  const isCustomizationSelected = (customizationId: number, categoryName: string) => {
    return selectedCustomizations.some(c => c.id === `${customizationId}-${categoryName}`);
  };

  const calculateTotalPrice = () => {
    const basePrice = item.price;
    const customizationsPrice = selectedCustomizations.reduce((sum, c) => sum + c.price, 0);
    return (basePrice + customizationsPrice) * quantity;
  };

  const handleAddToCart = () => {
    const cartItem: Omit<CartItem, 'id' | 'totalPrice'> = {
      menuItemId: item.id,
      name: item.name,
      description: item.description,
      basePrice: item.price,
      quantity: quantity,
      customizations: selectedCustomizations,
      category: item.category as 'breakfast' | 'lunch' | 'bowls'
    };

    addItem(cartItem);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
    onOpenChange(false);
  };

  const adjustQuantity = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  // Use imageUrl if available, otherwise fall back to image, then to placeholder
  const displayImage = item.imageUrl || item.image || "/placeholder.svg";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-gray-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-grill-gold">{item.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={displayImage}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          
          <p className="text-gray-300 text-sm">{item.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-white">Base Price: ${item.price.toFixed(2)}</span>
            {item.popular && (
              <Badge className="bg-grill-gold text-grill-black">
                Popular
              </Badge>
            )}
          </div>

          {/* Debug info - remove this after testing */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-500">
              Debug: Customizations available: {item.customizations ? item.customizations.length : 0}
            </div>
          )}

          {item.customizations && item.customizations.length > 0 ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-white text-lg">Customizations</h3>
              {item.customizations.map((category) => (
                <div key={category.id} className="space-y-3">
                  <h4 className="font-medium text-gray-300 text-base">{category.name}</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {category.options.map((option) => (
                      <div
                        key={option.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                          isCustomizationSelected(option.id, category.name)
                            ? 'border-grill-gold bg-grill-gold/20 shadow-md'
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                        }`}
                        onClick={() => handleCustomizationToggle(option, category.name)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{option.name}</span>
                          <span className="text-grill-gold font-semibold">
                            {option.price > 0 ? `+$${option.price.toFixed(2)}` : 'Free'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              No customization options available for this item.
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustQuantity(-1)}
                disabled={quantity <= 1}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-white font-medium text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustQuantity(1)}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-white">
                Total: ${calculateTotalPrice().toFixed(2)}
              </div>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black font-semibold"
            disabled={!item.isAvailable}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemCustomizationModal;
