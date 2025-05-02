
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flame } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
      
      // Check if user has scrolled past hero section (roughly viewport height)
      const heroHeight = window.innerHeight * 0.7; // 70% of viewport height
      setIsHeroVisible(scrollPosition <= heroHeight);
      
      // Set light mode when scrolled past certain point
      setIsLightMode(scrollPosition > heroHeight);
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

  // Determine text color based on mode
  const textColorClass = isLightMode ? 'text-grill-black' : 'text-white';
  const hoverColorClass = 'hover:text-grill-gold';
  const activeColorClass = 'text-grill-gold';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? isLightMode 
          ? 'bg-white bg-opacity-95 shadow-lg' 
          : 'bg-grill-black bg-opacity-95 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center relative">
          {/* Logo (centered) - hidden on home page until scrolled past hero */}
          {showLogo && (
            <Link to="/" className={`flex justify-center items-center absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
              <img 
                src="/public/lovable-uploads/1769fc8b-f400-416e-ad38-c763a0dfa09a.png" 
                alt="5 Star Grill" 
                className={`transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}
              />
            </Link>
          )}

          {/* Left navigation items - moved closer to center */}
          <nav className="hidden md:flex space-x-6 mr-28">
            <Link to="/" className="nav-item group">
              <div className="relative">
                <Flame size={20} className={`absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame`} />
                <span className={`font-medium text-lg transition-all duration-300 ${hoverColorClass} ${isActive('/') ? activeColorClass : textColorClass}`}>
                  Home
                </span>
              </div>
            </Link>
            <Link to="/about" className="nav-item group">
              <div className="relative">
                <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
                <span className={`font-medium text-lg transition-all duration-300 ${hoverColorClass} ${isActive('/about') ? activeColorClass : textColorClass}`}>
                  About
                </span>
              </div>
            </Link>
            <Link to="/menu" className="nav-item group">
              <div className="relative">
                <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
                <span className={`font-medium text-lg transition-all duration-300 ${hoverColorClass} ${isActive('/menu') ? activeColorClass : textColorClass}`}>
                  Menu
                </span>
              </div>
            </Link>
          </nav>

          {/* Right navigation items - moved closer to center */}
          <nav className="hidden md:flex space-x-6 ml-28">
            <Link to="/order" className="nav-item group">
              <div className="relative">
                <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
                <span className={`font-medium text-lg transition-all duration-300 ${hoverColorClass} ${isActive('/order') ? activeColorClass : textColorClass}`}>
                  Order
                </span>
              </div>
            </Link>
            <Link to="/blog" className="nav-item group">
              <div className="relative">
                <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
                <span className={`font-medium text-lg transition-all duration-300 ${hoverColorClass} ${isActive('/blog') ? activeColorClass : textColorClass}`}>
                  Blog
                </span>
              </div>
            </Link>
            <Link to="/contact" className="nav-item group">
              <div className="relative">
                <Flame size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-grill-gold opacity-0 group-hover:opacity-100 transition-all duration-300 animate-flame" />
                <span className={`font-medium text-lg transition-all duration-300 ${hoverColorClass} ${isActive('/contact') ? activeColorClass : textColorClass}`}>
                  Contact
                </span>
              </div>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden absolute right-0">
            <button 
              onClick={toggleMobileMenu}
              className={`${textColorClass} hover:text-grill-gold transition-colors`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden p-4 ${isLightMode ? 'bg-white bg-opacity-95' : 'bg-grill-black bg-opacity-95'}`}>
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/') ? 'text-grill-gold' : textColorClass} flex items-center`}
              onClick={closeMobileMenu}
            >
              <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/about') ? 'text-grill-gold' : textColorClass} flex items-center`}
              onClick={closeMobileMenu}
            >
              <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
              About
            </Link>
            <Link 
              to="/menu" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/menu') ? 'text-grill-gold' : textColorClass} flex items-center`}
              onClick={closeMobileMenu}
            >
              <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
              Menu
            </Link>
            <Link 
              to="/order" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/order') ? 'text-grill-gold' : textColorClass} flex items-center`}
              onClick={closeMobileMenu}
            >
              <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
              Order
            </Link>
            <Link 
              to="/blog" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/blog') ? 'text-grill-gold' : textColorClass} flex items-center`}
              onClick={closeMobileMenu}
            >
              <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/contact') ? 'text-grill-gold' : textColorClass} flex items-center`}
              onClick={closeMobileMenu}
            >
              <Flame size={18} className="mr-2 text-grill-gold animate-flame" />
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
