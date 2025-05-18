import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Globe, MapPin } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Checklist', path: '/checklist' },
    { name: 'Planner', path: '/planner' },
    { name: 'Currency', path: '/currency-converter' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Budget', path: '/budget-tracker' },
  ];

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary-500 text-white p-2 rounded-full">
            <Globe className="w-6 h-6" />
          </div>
          <span className="text-xl font-heading font-bold text-primary-700">
            Wanderlust
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-primary-500'
                  : 'text-neutral-700 hover:text-primary-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/planner"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors duration-300"
          >
            <MapPin className="w-4 h-4" />
            <span>Plan Trip</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-neutral-700 hover:text-primary-500 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;