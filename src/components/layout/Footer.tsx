import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary-500 text-white p-2 rounded-full">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xl font-heading font-bold text-white">
                Wanderlust
              </span>
            </Link>
            <p className="text-neutral-300 mb-4">
              Your ultimate travel companion for planning, organizing, and enjoying your adventures around the world.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/gallery" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/planner" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/checklist" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  Packing Lists
                </Link>
              </li>
              <li>
                <Link to="/itinerary" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  Itineraries
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Tools</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/currency-converter" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  Currency Converter
                </Link>
              </li>
              <li>
                <Link to="/budget-tracker" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  Budget Tracker
                </Link>
              </li>
              <li>
                <Link to="/language-cheatsheet" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  Language Cheat Sheet
                </Link>
              </li>
              <li>
                <Link to="/airport-navigation" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                  Airport Navigation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Get in Touch</h4>
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-primary-400" />
              <a href="mailto:info@wanderlust.com" className="text-neutral-300 hover:text-primary-400 transition-colors duration-300">
                info@wanderlust.com
              </a>
            </div>
            <div className="bg-neutral-700 rounded-lg p-4">
              <p className="text-sm text-neutral-300 mb-3">
                Subscribe to our newsletter
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-3 py-2 rounded-l-lg text-neutral-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} Wanderlust. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-neutral-400 hover:text-primary-400 text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="#" className="text-neutral-400 hover:text-primary-400 text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="#" className="text-neutral-400 hover:text-primary-400 text-sm transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;