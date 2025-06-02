
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, Menu } from 'lucide-react';

interface WelcomeBackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RecentOrder {
  id: string;
  items: any[];
  total: number;
  grand_total: number;
  created_at: string;
}

const WelcomeBackModal: React.FC<WelcomeBackModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && user) {
      fetchRecentOrders();
    }
  }, [isOpen, user]);

  const fetchRecentOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedOrders: RecentOrder[] = (data || []).map(order => ({
        id: order.id,
        items: Array.isArray(order.items) ? order.items : [],
        total: order.total,
        grand_total: order.grand_total,
        created_at: order.created_at
      }));
      
      setRecentOrders(transformedOrders);
    } catch (error) {
      console.error('Error fetching recent orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = (order: RecentOrder) => {
    try {
      order.items.forEach((item: any) => {
        const cartItem = {
          menuItemId: item.menuItemId || item.id,
          name: item.name,
          description: item.description || '',
          basePrice: item.basePrice || item.price || 0,
          quantity: item.quantity || 1,
          customizations: item.customizations || [],
          category: item.category || 'lunch' as const
        };
        addItem(cartItem);
      });
      onClose();
      navigate('/checkout');
    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  const handleViewMenu = () => {
    onClose();
    navigate('/menu');
  };

  const getUserFirstName = () => {
    return user?.user_metadata?.first_name || 
           user?.email?.split('@')[0] || 
           'Welcome back!';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-grill-black border-grill-gold">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-grill-gold text-center">
            Welcome back, {getUserFirstName()}! 👋
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-white text-center">
            Great to see you again! What would you like to do today?
          </p>

          <div className="grid grid-cols-1 gap-4">
            <Button
              onClick={handleViewMenu}
              className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black font-semibold py-3"
            >
              <Menu className="w-5 h-5 mr-2" />
              Browse Menu & Order
            </Button>

            {!loading && recentOrders.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-white font-medium text-center">Or reorder from recent orders:</h3>
                {recentOrders.map((order) => (
                  <div key={order.id} className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-white text-sm font-medium">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-grill-gold font-bold">${order.grand_total.toFixed(2)}</p>
                        <p className="text-gray-400 text-xs">{order.items.length} items</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleReorder(order)}
                      variant="outline"
                      size="sm"
                      className="w-full border-grill-gold text-grill-gold hover:bg-grill-gold hover:text-grill-black"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reorder
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-800"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeBackModal;
