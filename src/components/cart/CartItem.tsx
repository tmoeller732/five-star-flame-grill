
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/cart';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string, itemName: string) => void;
}

const CartItem = ({ item, onQuantityChange, onRemoveItem }: CartItemProps) => {
  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg">
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
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              className="h-8 w-8 p-0"
            >
              <Minus size={12} />
            </Button>
            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
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
        onClick={() => onRemoveItem(item.id, item.name)}
        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <X size={14} />
      </Button>
    </div>
  );
};

export default CartItem;
