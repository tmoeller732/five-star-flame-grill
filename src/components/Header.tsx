
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Clock } from 'lucide-react';
import CartDialog from './cart/CartDialog';
import OrderDropdown from './OrderDropdown';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-grill-black text-white relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-grill-gold rounded-full flex items-center justify-center">
              <span className="text-grill-black font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold text-grill-gold">GRILL & GATHER</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="hover:text-grill-gold transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-grill-gold transition-colors">
              About
            </Link>
            <Link to="/menu" className="hover:text-grill-gold transition-colors">
              Menu
            </Link>
            <OrderDropdown />
            <Link to="/order-tracking" className="hover:text-grill-gold transition-colors flex items-center gap-1">
              <Search size={16} />
              Track Order
            </Link>
            <Link to="/order-history" className="hover:text-grill-gold transition-colors flex items-center gap-1">
              <Clock size={16} />
              Order History
            </Link>
            <Link to="/blog" className="hover:text-grill-gold transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-grill-gold transition-colors">
              Contact
            </Link>
          </nav>

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <CartDialog />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="lg:hidden text-white hover:text-grill-gold"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-700 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="hover:text-grill-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="hover:text-grill-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/menu" 
                className="hover:text-grill-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/order" 
                className="hover:text-grill-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Order Online
              </Link>
              <Link 
                to="/order-tracking" 
                className="hover:text-grill-gold transition-colors flex items-center gap-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Search size={16} />
                Track Order
              </Link>
              <Link 
                to="/order-history" 
                className="hover:text-grill-gold transition-colors flex items-center gap-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Clock size={16} />
                Order History
              </Link>
              <Link 
                to="/blog" 
                className="hover:text-grill-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="hover:text-grill-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
