
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { CartItem } from '../types/cart';

export interface FavoriteOrder {
  id: string;
  order_name: string;
  items: CartItem[];
  total: number;
  created_at: string;
}

export const useFavoriteOrders = () => {
  const { user } = useAuth();
  const [favoriteOrders, setFavoriteOrders] = useState<FavoriteOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavoriteOrders = async () => {
    if (!user) {
      setFavoriteOrders([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_favorite_orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const convertedOrders: FavoriteOrder[] = (data || []).map(order => ({
        id: order.id,
        order_name: order.order_name,
        items: Array.isArray(order.items) ? order.items as CartItem[] : [],
        total: order.total,
        created_at: order.created_at
      }));

      setFavoriteOrders(convertedOrders);
    } catch (error) {
      console.error('Error fetching favorite orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavoriteOrder = async (orderName: string, items: CartItem[], total: number) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { data, error } = await supabase
        .from('user_favorite_orders')
        .insert({
          user_id: user.id,
          order_name: orderName,
          items: items as any,
          total: total
        })
        .select()
        .single();

      if (error) throw error;

      await fetchFavoriteOrders(); // Refresh the list
      return { data, error: null };
    } catch (error) {
      console.error('Error saving favorite order:', error);
      return { data: null, error };
    }
  };

  const deleteFavoriteOrder = async (orderId: string) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { error } = await supabase
        .from('user_favorite_orders')
        .delete()
        .eq('id', orderId)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchFavoriteOrders(); // Refresh the list
      return { error: null };
    } catch (error) {
      console.error('Error deleting favorite order:', error);
      return { error };
    }
  };

  useEffect(() => {
    fetchFavoriteOrders();
  }, [user]);

  return {
    favoriteOrders,
    loading,
    saveFavoriteOrder,
    deleteFavoriteOrder,
    refetchFavoriteOrders: fetchFavoriteOrders
  };
};
