
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    specialInstructions: string;
  };
  orderDate: string;
  status: 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  estimatedPickupTime: string;
  actualPickupTime?: string;
}

export interface CartItem {
  id: string;
  menuItemId: number;
  name: string;
  description: string;
  basePrice: number;
  quantity: number;
  customizations: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
  }>;
  totalPrice: number;
  category: 'breakfast' | 'lunch' | 'bowls';
}
