import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, CheckSquare, CalendarDays, DollarSign, 
  Image, PieChart, Languages, ClipboardList, Plane, PaintBucket } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Packing Checklist', path: '/checklist', icon: <CheckSquare className="w-5 h-5" /> },
    { name: 'Trip Planner', path: '/planner', icon: <CalendarDays className="w-5 h-5" /> },
    { name: 'Currency Converter', path: '/currency-converter', icon: <DollarSign className="w-5 h-5" /> },
    { name: 'Travel Gallery', path: '/gallery', icon: <Image className="w-5 h-5" /> },
    { name: 'Budget Tracker', path: '/budget-tracker', icon: <PieChart className="w-5 h-5" /> },
    { name: 'Language Cheat Sheet', path: '/language-cheatsheet', icon: <Languages className="w-5 h-5" /> },
    { name: 'Itinerary Board', path: '/itinerary', icon: <ClipboardList className="w-5 h-5" /> },
    { name: 'Airport Navigation', path: '/airport-navigation', icon: <Plane className="w-5 h-5" /> },
    { name: 'Trip Moodboard', path: '/moodboard', icon: <PaintBucket className="w-5 h-5" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-heading font-semibold">Navigate</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-neutral-500 hover:text-neutral-800 transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                      location.pathname === link.path
                        ? 'bg-primary-50 text-primary-600'
                        : 'hover:bg-neutral-100'
                    }`}
                    onClick={onClose}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;