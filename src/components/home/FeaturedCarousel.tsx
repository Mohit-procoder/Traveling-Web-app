import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { featuredDestinations } from '../../data/destinations';

const FeaturedCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextSlide = () => {
    setCurrent(current === featuredDestinations.length - 1 ? 0 : current + 1);
  };
  
  const prevSlide = () => {
    setCurrent(current === 0 ? featuredDestinations.length - 1 : current - 1);
  };
  
  const goToSlide = (index: number) => {
    setCurrent(index);
  };
  
  // Reset autoplay timer when user interacts
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    
    // Resume autoplay after 8 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
  };
  
  // Autoplay functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [current, isAutoPlaying]);

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {featuredDestinations.map((destination, index) => (
          <div
            key={destination.id}
            className="min-w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge-accent badge">{destination.region}</span>
                  <span className="badge-primary badge">{destination.type}</span>
                </div>
                
                <h3 className="text-3xl font-semibold mb-4">
                  {destination.name} <span className="text-4xl">{destination.emoji}</span>
                </h3>
                
                <p className="text-neutral-600 mb-6">
                  {destination.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  {destination.highlights?.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="btn-primary">
                    Explore Destination
                  </button>
                  <button className="btn-secondary">
                    Add to Wishlist
                  </button>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-100 text-primary-600 rounded-full p-2">
                      <span className="text-xl">🌡️</span>
                    </div>
                    <div>
                      <span className="block text-sm text-neutral-500">Temperature</span>
                      <span className="font-medium">{destination.temperature}°C</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 right-10 bg-white rounded-lg shadow-lg p-4 hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-accent-100 text-accent-600 rounded-full p-2">
                      <span className="text-xl">💰</span>
                    </div>
                    <div>
                      <span className="block text-sm text-neutral-500">Starting from</span>
                      <span className="font-medium">${destination.price}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Controls */}
      <div className="flex justify-between mt-12">
        <div className="flex gap-2">
          <button
            onClick={() => {
              prevSlide();
              handleUserInteraction();
            }}
            className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              nextSlide();
              handleUserInteraction();
            }}
            className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex gap-2">
          {featuredDestinations.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
                handleUserInteraction();
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index ? 'bg-primary-500 w-6' : 'bg-neutral-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;