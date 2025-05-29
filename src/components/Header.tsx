
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import CartDialog from './cart/CartDialog';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, logout } = useAuth();
  const { items } = useCart();
  const location = useLocation();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

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

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-grill-black/95 backdrop-blur-sm border-b border-grill-brown">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <img 
                src="/lovable-uploads/1769fc8b-f400-416e-ad38-c763a0dfa09a.png" 
                alt="5 Star Grill" 
                className="h-12 transition-transform duration-500 hover:rotate-360"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-white hover:text-grill-gold transition-colors ${isActive('/') ? 'text-grill-gold' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-white hover:text-grill-gold transition-colors ${isActive('/about') ? 'text-grill-gold' : ''}`}
              >
                About
              </Link>
              <Link 
                to="/menu" 
                className={`text-white hover:text-grill-gold transition-colors ${isActive('/menu') ? 'text-grill-gold' : ''}`}
              >
                Menu
              </Link>
              <Link 
                to="/order" 
                className={`text-white hover:text-grill-gold transition-colors ${isActive('/order') ? 'text-grill-gold' : ''}`}
              >
                Order
              </Link>
              <Link 
                to="/blog" 
                className={`text-white hover:text-grill-gold transition-colors ${isActive('/blog') ? 'text-grill-gold' : ''}`}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className={`text-white hover:text-grill-gold transition-colors ${isActive('/contact') ? 'text-grill-gold' : ''}`}
              >
                Contact
              </Link>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-white hover:text-grill-gold transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-grill-gold text-grill-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {user ? (
                <div className="hidden md:flex items-center space-x-4">
                  <Link 
                    to="/account" 
                    className="text-white hover:text-grill-gold transition-colors flex items-center space-x-1"
                  >
                    <User size={20} />
                    <span>Account</span>
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className={`text-white hover:text-grill-gold transition-colors flex items-center space-x-1 ${isActive('/admin') ? 'text-grill-gold' : ''}`}
                    >
                      <Settings size={20} />
                      <span>Admin</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-grill-gold transition-colors flex items-center space-x-1"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="hidden md:block text-white hover:text-grill-gold transition-colors"
                >
                  Login
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-white hover:text-grill-gold transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-grill-black border-t border-grill-brown">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={`text-white hover:text-grill-gold transition-colors ${isActive('/') ? 'text-grill-gold' : ''}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className={`text-white hover:text-grill-gold transition-colors ${isActive('/about') ? 'text-grill-gold' : ''}`}
                  onClick={closeMenu}
                >
                  About
                </Link>
                <Link 
                  to="/menu" 
                  className={`text-white hover:text-grill-gold transition-colors ${isActive('/menu') ? 'text-grill-gold' : ''}`}
                  onClick={closeMenu}
                >
                  Menu
                </Link>
                <Link 
                  to="/order" 
                  className={`text-white hover:text-grill-gold transition-colors ${isActive('/order') ? 'text-grill-gold' : ''}`}
                  onClick={closeMenu}
                >
                  Order
                </Link>
                <Link 
                  to="/blog" 
                  className={`text-white hover:text-grill-gold transition-colors ${isActive('/blog') ? 'text-grill-gold' : ''}`}
                  onClick={closeMenu}
                >
                  Blog
                </Link>
                <Link 
                  to="/contact" 
                  className={`text-white hover:text-grill-gold transition-colors ${isActive('/contact') ? 'text-grill-gold' : ''}`}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
                
                {user ? (
                  <>
                    <Link 
                      to="/account" 
                      className="text-white hover:text-grill-gold transition-colors"
                      onClick={closeMenu}
                    >
                      Account
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className={`text-white hover:text-grill-gold transition-colors ${isActive('/admin') ? 'text-grill-gold' : ''}`}
                        onClick={closeMenu}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="text-white hover:text-grill-gold transition-colors text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/auth" 
                    className="text-white hover:text-grill-gold transition-colors"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      <CartDialog 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};

export default Header;
