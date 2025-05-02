
import React from 'react';
import MenuItem, { MenuItemProps } from './MenuItem';

const FeaturedItems = ({ items }: { items: MenuItemProps[] }) => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-playfair text-grill-gold text-center mb-8">Featured Selections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedItems;
