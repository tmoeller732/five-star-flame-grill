
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { MenuItemProps } from '../components/menu/MenuItem';

export const useTrackViewedItem = () => {
  const { user } = useAuth();

  const trackViewedItem = async (item: MenuItemProps) => {
    if (!user) return;

    try {
      // First, delete any existing entry for this item to avoid duplicates
      await supabase
        .from('user_viewed_items')
        .delete()
        .eq('user_id', user.id)
        .eq('menu_item_id', item.id);

      // Then insert the new view
      await supabase
        .from('user_viewed_items')
        .insert({
          user_id: user.id,
          menu_item_id: item.id,
          menu_item_name: item.name,
          menu_item_data: item as any
        });

      console.log('Tracked viewed item:', item.name);
    } catch (error) {
      console.error('Error tracking viewed item:', error);
    }
  };

  return { trackViewedItem };
};

export const useGetViewedItems = () => {
  const { user } = useAuth();

  const getLastViewedItems = async (limit: number = 3): Promise<MenuItemProps[]> => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('user_viewed_items')
        .select('menu_item_data')
        .eq('user_id', user.id)
        .order('viewed_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data?.map(item => {
        // Safely cast the JSON data to MenuItemProps
        const menuItemData = item.menu_item_data as unknown as MenuItemProps;
        return menuItemData;
      }).filter(Boolean) || [];
    } catch (error) {
      console.error('Error fetching viewed items:', error);
      return [];
    }
  };

  return { getLastViewedItems };
};
