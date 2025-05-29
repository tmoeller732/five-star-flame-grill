
import React from 'react';
import { ShoppingCart } from 'lucide-react';

const EmptyCart = () => (
  <div className="text-center py-8">
    <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
    <p className="text-gray-500">Your cart is empty</p>
    <p className="text-sm text-gray-400 mt-2">Add some delicious items to get started!</p>
  </div>
);

export default EmptyCart;
