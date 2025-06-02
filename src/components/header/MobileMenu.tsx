
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, ShoppingCart, User, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import CartDialog from '../cart/CartDialog';
import LanguageToggle from '../LanguageToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
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

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-grill-black bg-opacity-95 p-4 relative z-10">
      <nav className="flex flex-col space-y-4">
        <Link 
          to="/" 
          className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/') ? 'text-grill-gold' : 'text-white'} flex items-center`}
          onClick={onClose}
        >
          <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
          {t('nav.home')}
        </Link>
        <Link 
          to="/about" 
          className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/about') ? 'text-grill-gold' : 'text-white'} flex items-center`}
          onClick={onClose}
        >
          <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
          {t('nav.about')}
        </Link>
        <Link 
          to="/menu" 
          className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/menu') ? 'text-grill-gold' : 'text-white'} flex items-center`}
          onClick={onClose}
        >
          <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
          {t('nav.menu')}
        </Link>
        <Link 
          to="/order" 
          className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/order') ? 'text-grill-gold' : 'text-white'} flex items-center`}
          onClick={onClose}
        >
          <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
          {t('nav.order')}
        </Link>
        <Link 
          to="/blog" 
          className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/blog') ? 'text-grill-gold' : 'text-white'} flex items-center`}
          onClick={onClose}
        >
          <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
          {t('nav.blog')}
        </Link>
        <Link 
          to="/contact" 
          className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/contact') ? 'text-grill-gold' : 'text-white'} flex items-center`}
          onClick={onClose}
        >
          <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
          {t('nav.contact')}
        </Link>
        
        {/* Language Toggle in Mobile Menu */}
        <div className="px-4 py-2">
          <LanguageToggle />
        </div>
        
        {/* Mobile Admin Link - only show for admin users */}
        {isAdmin && (
          <Link 
            to="/admin" 
            className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/admin') ? 'text-grill-gold' : 'text-white'} flex items-center`}
            onClick={onClose}
          >
            <Shield size={18} className="mr-2 text-grill-gold" />
            {t('nav.admin')}
          </Link>
        )}
        
        {/* Mobile Cart */}
        <CartDialog>
          <button 
            className="font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded text-white flex items-center"
          >
            <ShoppingCart size={18} className="mr-2 text-grill-gold" />
            {t('nav.cart')} {cartItemCount > 0 && `(${cartItemCount})`}
          </button>
        </CartDialog>
        
        {/* Mobile Account */}
        <Link 
          to={user ? "/account" : "/auth"}
          className="font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded text-white flex items-center"
          onClick={onClose}
        >
          <User size={18} className="mr-2 text-grill-gold" />
          {user ? t('nav.account') : t('nav.signIn')}
        </Link>
      </nav>
    </div>
  );
};

export default MobileMenu;
