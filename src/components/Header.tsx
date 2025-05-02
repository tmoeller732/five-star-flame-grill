
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-grill-black bg-opacity-95 shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left navigation items */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/') ? 'text-grill-gold' : 'text-white'}`}>
              Home
            </Link>
            <Link to="/about" className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/about') ? 'text-grill-gold' : 'text-white'}`}>
              About
            </Link>
            <Link to="/menu" className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/menu') ? 'text-grill-gold' : 'text-white'}`}>
              Menu
            </Link>
          </nav>

          {/* Logo (centered) */}
          <Link to="/" className="flex justify-center items-center">
            <img 
              src="/public/lovable-uploads/1769fc8b-f400-416e-ad38-c763a0dfa09a.png" 
              alt="5 Star Grill" 
              className={`transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}
            />
          </Link>

          {/* Right navigation items */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/order" className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/order') ? 'text-grill-gold' : 'text-white'}`}>
              Order
            </Link>
            <Link to="/blog" className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/blog') ? 'text-grill-gold' : 'text-white'}`}>
              Blog
            </Link>
            <Link to="/contact" className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/contact') ? 'text-grill-gold' : 'text-white'}`}>
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
        <div className="md:hidden bg-grill-black bg-opacity-95 p-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/') ? 'text-grill-gold' : 'text-white'}`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/about') ? 'text-grill-gold' : 'text-white'}`}
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link 
              to="/menu" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/menu') ? 'text-grill-gold' : 'text-white'}`}
              onClick={closeMobileMenu}
            >
              Menu
            </Link>
            <Link 
              to="/order" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/order') ? 'text-grill-gold' : 'text-white'}`}
              onClick={closeMobileMenu}
            >
              Order
            </Link>
            <Link 
              to="/blog" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/blog') ? 'text-grill-gold' : 'text-white'}`}
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium text-lg transition-colors hover:text-grill-gold ${isActive('/contact') ? 'text-grill-gold' : 'text-white'}`}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
