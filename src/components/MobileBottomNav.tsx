
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';
import CartDialog from './cart/CartDialog';

const MobileBottomNav = () => {
  const location = useLocation();
  const { getItemCount } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const cartItemCount = getItemCount();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-grill-black border-t border-gray-700 z-40 md:hidden">
      <div className="flex justify-around items-center py-2">
        <Link
          to="/menu"
          className={`flex flex-col items-center p-3 transition-colors ${
            isActive('/menu') ? 'text-grill-gold' : 'text-white hover:text-grill-gold'
          }`}
        >
          <Menu size={20} />
          <span className="text-xs mt-1">{t('nav.menu')}</span>
        </Link>
        
        <CartDialog>
          <button
            className={`flex flex-col items-center p-3 transition-colors relative text-white hover:text-grill-gold`}
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-grill-gold text-grill-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            <span className="text-xs mt-1">{t('nav.cart')}</span>
          </button>
        </CartDialog>
        
        <Link
          to={user ? "/account" : "/auth"}
          className={`flex flex-col items-center p-3 transition-colors ${
            isActive('/account') || isActive('/auth') ? 'text-grill-gold' : 'text-white hover:text-grill-gold'
          }`}
        >
          <User size={20} />
          <span className="text-xs mt-1">{user ? t('nav.account') : t('nav.signIn')}</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomNav;
