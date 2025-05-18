import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Destination } from '../../types/destination';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card group overflow-hidden"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
        
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-white font-medium mb-1">{destination.name}</h3>
              <div className="flex items-center gap-1 text-white/80 text-sm">
                <MapPin className="w-3 h-3" />
                <span>{destination.country}</span>
              </div>
            </div>
            
            <div className="bg-primary-500/90 text-white rounded-lg py-1 px-2 text-sm font-medium">
              {destination.rating} ★
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          {destination.features.map((feature, index) => (
            <span 
              key={index} 
              className="badge badge-primary"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-sm text-neutral-500">Starting from</span>
            <span className="text-lg font-semibold text-neutral-900">${destination.price}</span>
          </div>
          
          <Link 
            to={`/gallery?destination=${destination.id}`}
            className="text-primary-500 hover:text-primary-600 font-medium text-sm"
          >
            Explore →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;