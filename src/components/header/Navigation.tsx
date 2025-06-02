
import { Link, useLocation } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageToggle from '../LanguageToggle';

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
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
  );
};

export default Navigation;
