
import React from 'react';
import MenuItem, { MenuItemProps } from './MenuItem';

const CategoryItems = ({ items }: { items: MenuItemProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CategoryItems;
