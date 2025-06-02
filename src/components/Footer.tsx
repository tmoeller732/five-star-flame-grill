
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-grill-black border-t border-grill-brown">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/">
              <img 
                src="/lovable-uploads/1769fc8b-f400-416e-ad38-c763a0dfa09a.png" 
                alt="5 Star Grill" 
                className="h-20 mb-4 transition-transform duration-500 hover:rotate-360" 
              />
            </Link>
            <p className="text-gray-400 text-sm text-center md:text-left">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="text-gray-400 hover:text-grill-gold transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="text-gray-400 hover:text-grill-gold transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter" 
                className="text-gray-400 hover:text-grill-gold transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white mb-4">{t('footer.quickLinks')}</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-400 hover:text-grill-gold transition-colors">{t('nav.home')}</Link>
              <Link to="/about" className="text-gray-400 hover:text-grill-gold transition-colors">{t('nav.about')}</Link>
              <Link to="/menu" className="text-gray-400 hover:text-grill-gold transition-colors">{t('nav.menu')}</Link>
              <Link to="/order" className="text-gray-400 hover:text-grill-gold transition-colors">{t('nav.order')}</Link>
              <Link to="/blog" className="text-gray-400 hover:text-grill-gold transition-colors">{t('nav.blog')}</Link>
              <Link to="/contact" className="text-gray-400 hover:text-grill-gold transition-colors">{t('nav.contact')}</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white mb-4">{t('footer.contactUs')}</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-grill-gold" />
                <span className="text-gray-400">1681 Lakewood Rd, Toms River, NJ 08755</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-grill-gold" />
                <a href="tel:+18565594938" className="text-gray-400 hover:text-grill-gold transition-colors">
                  {t('cta.callNow')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-grill-gold" />
                <a href="mailto:info@5stargrill.com" className="text-gray-400 hover:text-grill-gold transition-colors">
                  info@5stargrill.com
                </a>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-bold text-white mb-2">{t('footer.hours')}</h4>
              <p className="text-gray-400">{t('footer.hoursText')}</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-grill-brown text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} 5 Star Grill. {t('footer.copyright')}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {t('footer.designedBy')} <a href="https://moeller.marketing" target="_blank" rel="noopener noreferrer" className="text-grill-gold hover:underline">Moeller Marketing</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
