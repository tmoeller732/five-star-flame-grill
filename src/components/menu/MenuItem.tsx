
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "../../../contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export interface MenuItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'breakfast' | 'lunch' | 'bowls';
  popular?: boolean;
}

const MenuItem = ({ item }: { item: MenuItemProps }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  if (!item) {
    return null;
  }

  const handleAddToCart = () => {
    try {
      addItem({
        menuItemId: item.id,
        name: item.name,
        description: item.description,
        basePrice: item.price,
        quantity: 1,
        customizations: [],
        category: item.category,
      });

      toast({
        title: "Added to cart!",
        description: `${item.name} has been added to your cart.`,
        duration: 2000,
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <Card className="overflow-hidden bg-card hover:shadow-lg transition-all duration-300 menu-item">
      <div className="aspect-video overflow-hidden bg-muted">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="animate-pulse bg-secondary/20 w-full h-full"></div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair text-xl text-grill-gold">{item.name}</h3>
          <span className="font-medium text-lg text-white">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{item.description}</p>
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
        >
          Add to Order
        </Button>
      </div>
    </Card>
  );
};

export default MenuItem;
