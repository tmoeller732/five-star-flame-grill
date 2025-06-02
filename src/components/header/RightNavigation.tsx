
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import OrderDropdown from '../OrderDropdown';
import CartDialog from '../cart/CartDialog';

const RightNavigation = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { getItemCount } = useCart();
  const { t } = useLanguage();

  // Check if user is admin
  useEffect(() => {
    if (user) {
      checkAdminRole();
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const checkAdminRole = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .eq('role', 'admin')
        .single();

      if (data && !error) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      setIsAdmin(false);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const cartItemCount = getItemCount();

  return (
    <nav className="hidden md:flex space-x-6 ml-20 items-center">
      <div className="nav-item group">
        <OrderDropdown />
      </div>
      <Link to="/blog" className="nav-item group">
        <div className="relative">
          <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
          <span className={`font-medium font-bold text-lg px-4 py-2 rounded transition-all duration-300 hover:text-grill-gold ${isActive('/blog') ? 'text-grill-gold' : 'text-white'}`}>
            {t('nav.blog')}
          </span>
        </div>
      </Link>
      <Link to="/contact" className="nav-item group">
        <div className="relative">
          <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
          <span className={`font-medium font-bold text-lg px-4 py-2 rounded transition-all duration-300 hover:text-grill-gold ${isActive('/contact') ? 'text-grill-gold' : 'text-white'}`}>
            {t('nav.contact')}
          </span>
        </div>
      </Link>
      
      {/* Admin Panel Link - only show for admin users */}
      {isAdmin && (
        <Link to="/admin" className="nav-item group">
          <div className="relative">
            <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
            <span className={`font-medium font-bold text-lg px-4 py-2 rounded transition-all duration-300 hover:text-grill-gold ${isActive('/admin') ? 'text-grill-gold' : 'text-white'}`}>
              {t('nav.admin')}
            </span>
          </div>
        </Link>
      )}
      
      {/* Cart Icon */}
      <CartDialog>
        <button className="nav-item group relative p-2">
          <div className="relative">
            <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
            <ShoppingCart size={24} className="text-white hover:text-grill-gold transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-grill-gold text-grill-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
        </button>
      </CartDialog>

      {/* Account Icon */}
      <Link to={user ? "/account" : "/auth"} className="nav-item group p-2">
        <div className="relative">
          <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
          <User size={24} className="text-white hover:text-grill-gold transition-colors" />
        </div>
      </Link>
    </nav>
  );
};

export default RightNavigation;
