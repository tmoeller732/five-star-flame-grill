
import React, { useState, useEffect } from 'react';
import MenuItem, { MenuItemProps } from './MenuItem';
import { useAuth } from '../../contexts/AuthContext';
import { useGetViewedItems } from '../../hooks/useViewedItems';

const FeaturedItems = ({ items }: { items: MenuItemProps[] }) => {
  const { user } = useAuth();
  const { getLastViewedItems } = useGetViewedItems();
  const [displayItems, setDisplayItems] = useState<MenuItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDisplayItems = async () => {
      if (user) {
        // Try to get last 3 viewed items for authenticated users
        const viewedItems = await getLastViewedItems(3);
        if (viewedItems.length > 0) {
          setDisplayItems(viewedItems);
        } else {
          // Fallback to provided featured items if no viewed items
          setDisplayItems(items.slice(0, 3));
        }
      } else {
        // For non-authenticated users, show provided featured items
        setDisplayItems(items.slice(0, 3));
      }
      setLoading(false);
    };

    loadDisplayItems();
  }, [user, items, getLastViewedItems]);

  const validItems = displayItems.filter(Boolean);
  
  // Don't render anything if no items to show
  if (loading) {
    return (
      <div className="mb-16">
        <h2 className="text-3xl font-playfair text-grill-gold text-center mb-8">Loading...</h2>
      </div>
    );
  }

  if (validItems.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-playfair text-grill-gold text-center mb-8">
        {user ? 'Recently Viewed' : 'Featured Selections'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {validItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedItems;
