
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Navigation from './header/Navigation';
import RightNavigation from './header/RightNavigation';
import MobileMenu from './header/MobileMenu';
import ScrollingBanner from './ScrollingBanner';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const location = useLocation();

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

  const showLogo = !isHeroVisible || location.pathname !== '/';

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

            {/* Left navigation items */}
            <Navigation />

            {/* Right navigation items */}
            <RightNavigation />

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
        <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
      </header>
    </>
  );
};

export default Header;
