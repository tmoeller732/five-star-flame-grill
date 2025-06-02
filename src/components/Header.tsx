import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flame, ShoppingCart, User, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import OrderDropdown from './OrderDropdown';
import ScrollingBanner from './ScrollingBanner';
import CartDialog from './cart/CartDialog';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();
  const { user } = useAuth();
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
      
      // Check if user has scrolled past hero section (roughly viewport height)
      const heroHeight = window.innerHeight * 0.7; // 70% of viewport height
      setIsHeroVisible(scrollPosition <= heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const showLogo = !isHeroVisible || location.pathname !== '/';
  const cartItemCount = getItemCount();

  return (
    <>
      <ScrollingBanner />
      <header 
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-grill-black bg-opacity-90 shadow-lg' : 'bg-transparent'
        }`}
      >
        {/* Black overlay at 50% opacity */}
        <div 
          className="absolute inset-0 bg-black opacity-50 z-0"
          style={{
            backgroundImage: `url('/lovable-uploads/b619f0c4-4d98-480e-b4b8-582c397779b4.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex justify-center items-center relative">
            {/* Logo (centered) - hidden on home page until scrolled past hero */}
            {showLogo && (
              <Link to="/" className={`flex justify-center items-center absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
                <img 
                  src="/lovable-uploads/1769fc8b-f400-416e-ad38-c763a0dfa09a.png" 
                  alt="5 Star Grill" 
                  className={`transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}
                />
              </Link>
            )}

            {/* Left navigation items - language toggle first, then nav items */}
            <nav className="hidden md:flex space-x-10 mr-20 items-center">
              {/* Language Toggle placed before navigation items */}
              <div className="nav-item">
                <LanguageToggle />
              </div>
              
              <Link to="/" className="nav-item group">
                <div className="relative">
                  <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
                  <span className={`font-medium font-bold text-lg px-4 py-2 rounded transition-all duration-300 hover:text-grill-gold ${isActive('/') ? 'text-grill-gold' : 'text-white'}`}>
                    {t('nav.home')}
                  </span>
                </div>
              </Link>
              <Link to="/about" className="nav-item group">
                <div className="relative">
                  <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
                  <span className={`font-medium font-bold text-lg px-4 py-2 rounded transition-all duration-300 hover:text-grill-gold ${isActive('/about') ? 'text-grill-gold' : 'text-white'}`}>
                    {t('nav.about')}
                  </span>
                </div>
              </Link>
              <Link to="/menu" className="nav-item group">
                <div className="relative">
                  <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
                  <span className={`font-medium font-bold text-lg px-4 py-2 rounded transition-all duration-300 hover:text-grill-gold ${isActive('/menu') ? 'text-grill-gold' : 'text-white'}`}>
                    {t('nav.menu')}
                  </span>
                </div>
              </Link>
            </nav>

            {/* Right navigation items - removed language toggle */}
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

            {/* Mobile menu button */}
            <div className="md:hidden absolute right-0">
              <button 
                onClick={toggleMobileMenu}
                className="text-white hover:text-grill-gold transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-grill-black bg-opacity-95 p-4 relative z-10">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/') ? 'text-grill-gold' : 'text-white'} flex items-center`}
                onClick={closeMobileMenu}
              >
                <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
                {t('nav.home')}
              </Link>
              <Link 
                to="/about" 
                className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/about') ? 'text-grill-gold' : 'text-white'} flex items-center`}
                onClick={closeMobileMenu}
              >
                <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
                {t('nav.about')}
              </Link>
              <Link 
                to="/menu" 
                className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/menu') ? 'text-grill-gold' : 'text-white'} flex items-center`}
                onClick={closeMobileMenu}
              >
                <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
                {t('nav.menu')}
              </Link>
              <Link 
                to="/order" 
                className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/order') ? 'text-grill-gold' : 'text-white'} flex items-center`}
                onClick={closeMobileMenu}
              >
                <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
                {t('nav.order')}
              </Link>
              <Link 
                to="/blog" 
                className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/blog') ? 'text-grill-gold' : 'text-white'} flex items-center`}
                onClick={closeMobileMenu}
              >
                <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
                {t('nav.blog')}
              </Link>
              <Link 
                to="/contact" 
                className={`font-bold text-lg transition-colors hover:text-grill-gold px-4 py-2 rounded ${isActive('/contact') ? 'text-grill-gold' : 'text-white'} flex items-center`}
                onClick={closeMobileMenu}
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
                  onClick={closeMobileMenu}
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
                onClick={closeMobileMenu}
              >
                <User size={18} className="mr-2 text-grill-gold" />
                {user ? t('nav.account') : t('nav.signIn')}
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
