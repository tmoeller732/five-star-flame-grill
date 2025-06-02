
import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from '../../contexts/CartContext';

const OrderSummary = () => {
  const { state, getCartTotal } = useCart();

  if (state.items.length === 0) {
    return null;
  }

  const cartTotal = getCartTotal();

  return (
    <Card className="p-6 bg-card border-gray-700 sticky top-4">
      <h2 className="text-2xl font-bold text-grill-gold mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        {state.items.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-white">{item.name}</h4>
              <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
              
              {item.customizations.length > 0 && (
                <div className="mt-1">
                  <p className="text-xs text-gray-500">Customizations:</p>
                  <ul className="text-xs text-gray-400 ml-2">
                    {item.customizations.map((customization, index) => (
                      <li key={index}>
                        • {customization.name} (+${customization.price.toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="font-medium text-white">${item.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4 bg-gray-600" />

      <div className="space-y-2">
        <div className="flex justify-between text-white">
          <span>Subtotal:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-white">
          <span>Tax (6.625%):</span>
          <span>${(cartTotal * 0.06625).toFixed(2)}</span>
        </div>
        <Separator className="my-2 bg-gray-600" />
        <div className="flex justify-between text-lg font-bold text-grill-gold">
          <span>Total:</span>
          <span>${(cartTotal * 1.06625).toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-600">
        <h3 className="font-semibold text-grill-gold mb-2">Pickup Information</h3>
        <p className="text-gray-300 text-sm mb-2">
          <strong>Estimated pickup time:</strong> 15-20 minutes
        </p>
        <p className="text-gray-300 text-sm">
          We'll call you when your order is ready for pickup at our location.
        </p>
      </div>
    </Card>
  );
};

export default OrderSummary;
