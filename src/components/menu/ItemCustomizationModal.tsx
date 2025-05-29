import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MenuItemProps } from './MenuItem';
import { CartCustomization } from '../../types/cart';
import { useCart } from '../../contexts/CartContext';
import OrderDecisionModal from './OrderDecisionModal';

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface ItemCustomizationModalProps {
  item: MenuItemProps;
  children: React.ReactNode;
}

// Sample customization options - in a real app, this would come from your menu data
const getCustomizationOptions = (category: 'breakfast' | 'lunch' | 'bowls'): Record<string, CustomizationOption[]> => {
  const baseOptions = {
    'Cooking Style': [
      { id: 'rare', name: 'Rare', price: 0, category: 'Cooking Style' },
      { id: 'medium-rare', name: 'Medium Rare', price: 0, category: 'Cooking Style' },
      { id: 'medium', name: 'Medium', price: 0, category: 'Cooking Style' },
      { id: 'well-done', name: 'Well Done', price: 0, category: 'Cooking Style' },
    ],
    'Extras': [
      { id: 'extra-cheese', name: 'Extra Cheese', price: 1.50, category: 'Extras' },
      { id: 'bacon', name: 'Add Bacon', price: 2.50, category: 'Extras' },
      { id: 'avocado', name: 'Add Avocado', price: 2.00, category: 'Extras' },
    ]
  };

  if (category === 'breakfast') {
    return {
      ...baseOptions,
      'Toast Type': [
        { id: 'white', name: 'White Toast', price: 0, category: 'Toast Type' },
        { id: 'wheat', name: 'Wheat Toast', price: 0, category: 'Toast Type' },
        { id: 'sourdough', name: 'Sourdough', price: 0.50, category: 'Toast Type' },
      ]
    };
  }

  return baseOptions;
};

const ItemCustomizationModal = ({ item, children }: ItemCustomizationModalProps) => {
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, CustomizationOption>>({});
  const [quantity, setQuantity] = useState(1);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const { addItem } = useCart();

  const customizationOptions = getCustomizationOptions(item.category);

  const handleCustomizationChange = (category: string, option: CustomizationOption) => {
    setSelectedCustomizations(prev => ({
      ...prev,
      [category]: option
    }));
  };

  const calculateTotalPrice = () => {
    const customizationsPrice = Object.values(selectedCustomizations).reduce((sum, option) => sum + option.price, 0);
    return (item.price + customizationsPrice) * quantity;
  };

  const handleAddToCart = () => {
    const customizations: CartCustomization[] = Object.values(selectedCustomizations).map(option => ({
      id: option.id,
      name: option.name,
      price: option.price,
      category: option.category,
    }));

    addItem({
      menuItemId: item.id,
      name: item.name,
      description: item.description,
      basePrice: item.price,
      quantity,
      customizations,
      category: item.category,
    });

    // Reset form
    setSelectedCustomizations({});
    setQuantity(1);
    
    // Close customization modal and open decision modal
    setIsCustomizationOpen(false);
    setIsDecisionModalOpen(true);
  };

  return (
    <>
      <Dialog open={isCustomizationOpen} onOpenChange={setIsCustomizationOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{item.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
            </div>

            {Object.entries(customizationOptions).map(([categoryName, options]) => (
              <div key={categoryName}>
                <h4 className="font-medium mb-3">{categoryName}</h4>
                <RadioGroup
                  value={selectedCustomizations[categoryName]?.id || ''}
                  onValueChange={(value) => {
                    const option = options.find(opt => opt.id === value);
                    if (option) {
                      handleCustomizationChange(categoryName, option);
                    }
                  }}
                >
                  {options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span>{option.name}</span>
                          {option.price > 0 && (
                            <span className="text-sm text-gray-500">+${option.price.toFixed(2)}</span>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Quantity</h4>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 p-0"
                >
                  -
                </Button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  +
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-lg">${calculateTotalPrice().toFixed(2)}</span>
            </div>

            <Button 
              onClick={handleAddToCart}
              className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
            >
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <OrderDecisionModal
        isOpen={isDecisionModalOpen}
        onClose={() => setIsDecisionModalOpen(false)}
        itemName={item.name}
      />
    </>
  );
};

export default ItemCustomizationModal;
