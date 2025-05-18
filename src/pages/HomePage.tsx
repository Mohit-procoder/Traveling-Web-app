import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Search, Globe, Filter, Users, CheckSquare, DollarSign } from 'lucide-react';

// Components
import DestinationCard from '../components/home/DestinationCard';
import FeaturedCarousel from '../components/home/FeaturedCarousel';
import { destinations } from '../data/destinations';

const HomePage: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const regions = ['all', 'asia', 'europe', 'africa', 'americas', 'oceania'];

  const filteredDestinations = activeRegion === 'all' 
    ? destinations.slice(0, 8) 
    : destinations.filter(dest => dest.region === activeRegion).slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg"
            alt="World Map Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="container-custom relative z-10 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-white mb-6">Discover the world, one journey at a time</h1>
            <p className="text-xl text-white/90 mb-8">
              Plan your perfect trip, from destinations to itineraries. 
              Your adventure awaits with our comprehensive travel companion.
            </p>

            <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="Where to?" 
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-3 text-neutral-400" />
                  <select 
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                  >
                    <option>2 travelers</option>
                    <option>1 traveler</option>
                    <option>3 travelers</option>
                    <option>4+ travelers</option>
                  </select>
                </div>
                <Link 
                  to="/planner"
                  className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  <span>Plan Your Trip</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-2">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="mb-2">Popular Destinations</h2>
              <p className="text-neutral-600">Explore the world's most captivating locations</p>
            </div>
            
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-300 ${
                    activeRegion === region
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {region === 'all' ? 'All Regions' : (
                    <>
                      {region.charAt(0).toUpperCase() + region.slice(1)} 
                      {region === 'asia' ? ' 🌏' : 
                       region === 'europe' ? ' 🌍' : 
                       region === 'africa' ? ' 🌍' :
                       region === 'americas' ? ' 🌎' :
                       region === 'oceania' ? ' 🌏' : ''}
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-500 font-medium rounded-lg border border-primary-500 hover:bg-primary-50 transition-colors duration-300"
            >
              <span>View All Destinations</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Places Carousel */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-3">Featured Places</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Handpicked destinations to inspire your next adventure
            </p>
          </div>

          <FeaturedCarousel />
        </div>
      </section>

      {/* Travel Tools Section */}
      <section className="py-20 bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-3">Travel Planning Tools</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Everything you need to plan, organize, and enjoy your trip
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mb-4">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Packing Checklist</h3>
              <p className="text-neutral-600 mb-4">
                Never forget essential items with customizable packing lists for any trip
              </p>
              <Link 
                to="/checklist" 
                className="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center gap-1"
              >
                <span>Get Started</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trip Planner</h3>
              <p className="text-neutral-600 mb-4">
                Plan your daily activities with our interactive trip planner and countdown
              </p>
              <Link 
                to="/planner" 
                className="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center gap-1"
              >
                <span>Plan Now</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Budget Tracker</h3>
              <p className="text-neutral-600 mb-4">
                Keep track of your travel expenses and stay within your budget
              </p>
              <Link 
                to="/budget-tracker" 
                className="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center gap-1"
              >
                <span>Track Expenses</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/itinerary" 
              className="btn-primary"
            >
              <span>Explore All Tools</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Import this component within the same file since it's used only once
const Calendar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

export default HomePage;