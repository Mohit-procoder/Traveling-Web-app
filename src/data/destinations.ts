import { Destination } from '../types/destination';

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    region: 'europe',
    type: 'Island',
    imageUrl: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    price: 1200,
    rating: 4.8,
    features: ['Beach', 'Romantic'],
    description: 'Santorini is known for its stunning white-washed buildings with blue domes, spectacular sunsets, and crystal-clear waters. This volcanic island offers a perfect blend of natural beauty, rich history, and vibrant culture.',
    highlights: ['Oia Sunset', 'Black Sand Beaches', 'Akrotiri Ruins', 'Caldera Views'],
    emoji: '🇬🇷',
    temperature: '25'
  },
  {
    id: '2',
    name: 'Kyoto',
    country: 'Japan',
    region: 'asia',
    type: 'Cultural',
    imageUrl: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg',
    price: 1500,
    rating: 4.7,
    features: ['Historic', 'Cultural'],
    description: 'Kyoto, the cultural heart of Japan, is home to over 1,600 Buddhist temples, 400 Shinto shrines, and 17 UNESCO World Heritage sites. Experience traditional tea ceremonies, stunning gardens, and historic geisha districts.',
    highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji Temple', 'Gion District'],
    emoji: '🇯🇵',
    temperature: '22'
  },
  {
    id: '3',
    name: 'Bali',
    country: 'Indonesia',
    region: 'asia',
    type: 'Tropical',
    imageUrl: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg',
    price: 950,
    rating: 4.6,
    features: ['Beach', 'Adventure'],
    description: 'Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Immerse yourself in the vibrant culture, explore ancient temples, relax on pristine beaches, or adventure through lush rice terraces.',
    highlights: ['Ubud Monkey Forest', 'Tegallalang Rice Terraces', 'Uluwatu Temple', 'Kuta Beach'],
    emoji: '🇮🇩',
    temperature: '29'
  },
  {
    id: '4',
    name: 'Machu Picchu',
    country: 'Peru',
    region: 'americas',
    type: 'Adventure',
    imageUrl: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg',
    price: 1800,
    rating: 4.9,
    features: ['Historic', 'Adventure'],
    description: 'Machu Picchu stands as a testament to the Incan civilization, perched high in the Andes mountains. This mysterious ancient city offers breathtaking views and an unforgettable journey through history and natural beauty.',
    highlights: ['Inca Trail', 'Sun Gate', 'Huayna Picchu', 'Temple of the Sun'],
    emoji: '🇵🇪',
    temperature: '15'
  },
  {
    id: '5',
    name: 'Serengeti',
    country: 'Tanzania',
    region: 'africa',
    type: 'Safari',
    imageUrl: 'https://images.pexels.com/photos/59989/elephants-elephant-baby-kenya-59989.jpeg',
    price: 2200,
    rating: 4.8,
    features: ['Wildlife', 'Adventure'],
    description: 'The Serengeti is one of the most spectacular wildlife destinations on Earth. Witness the Great Migration, where millions of wildebeest and zebra traverse the plains, and experience close encounters with Africa\'s iconic wildlife.',
    highlights: ['Great Migration', 'Big Five Safaris', 'Hot Air Balloon Rides', 'Masai Villages'],
    emoji: '🇹🇿',
    temperature: '30'
  },
  {
    id: '6',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'europe',
    type: 'Coastal',
    imageUrl: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg',
    price: 1600,
    rating: 4.7,
    features: ['Scenic', 'Romantic'],
    description: 'The Amalfi Coast is a stretch of coastline in southern Italy renowned for its extraordinary beauty. With colorful cliffside villages, fragrant lemon groves, and the sparkling Mediterranean Sea, it\'s a dream destination for many travelers.',
    highlights: ['Positano', 'Ravello Gardens', 'Path of the Gods', 'Limoncello Tasting'],
    emoji: '🇮🇹',
    temperature: '26'
  },
  {
    id: '7',
    name: 'Great Barrier Reef',
    country: 'Australia',
    region: 'oceania',
    type: 'Marine',
    imageUrl: 'https://images.pexels.com/photos/921277/pexels-photo-921277.jpeg',
    price: 1700,
    rating: 4.8,
    features: ['Wildlife', 'Adventure'],
    description: 'The Great Barrier Reef is the world\'s largest coral reef system, visible even from outer space. Dive or snorkel among thousands of reef systems and hundreds of tropical islands with beautiful golden beaches.',
    highlights: ['Snorkeling & Diving', 'Whitehaven Beach', 'Heart Reef', 'Marine Wildlife'],
    emoji: '🇦🇺',
    temperature: '27'
  },
  {
    id: '8',
    name: 'New York City',
    country: 'USA',
    region: 'americas',
    type: 'Urban',
    imageUrl: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg',
    price: 1400,
    rating: 4.6,
    features: ['Urban', 'Cultural'],
    description: 'New York City, the city that never sleeps, is a global center for art, culture, fashion, and finance. With iconic landmarks, world-class museums, diverse neighborhoods, and endless entertainment options, it\'s a must-visit urban destination.',
    highlights: ['Central Park', 'Times Square', 'Empire State Building', 'Broadway Shows'],
    emoji: '🇺🇸',
    temperature: '18'
  },
  {
    id: '9',
    name: 'Paris',
    country: 'France',
    region: 'europe',
    type: 'Urban',
    imageUrl: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
    price: 1300,
    rating: 4.7,
    features: ['Cultural', 'Romantic'],
    description: 'Paris, the City of Light, captivates visitors with its iconic landmarks, world-class museums, and charming neighborhoods. Experience the perfect blend of history, culture, and gastronomy in this romantic European capital.',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Montmartre'],
    emoji: '🇫🇷',
    temperature: '21'
  },
  {
    id: '10',
    name: 'Maldives',
    country: 'Maldives',
    region: 'asia',
    type: 'Island',
    imageUrl: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    price: 2500,
    rating: 4.9,
    features: ['Beach', 'Luxury'],
    description: 'The Maldives is a tropical paradise of pristine white-sand beaches, turquoise lagoons, and vibrant coral reefs. Stay in iconic overwater bungalows and experience some of the world\'s most breathtaking marine life.',
    highlights: ['Overwater Bungalows', 'Underwater Dining', 'Snorkeling & Diving', 'Dolphin Cruises'],
    emoji: '🇲🇻',
    temperature: '31'
  },
  {
    id: '11',
    name: 'Cairo',
    country: 'Egypt',
    region: 'africa',
    type: 'Historic',
    imageUrl: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg',
    price: 1100,
    rating: 4.5,
    features: ['Historic', 'Cultural'],
    description: 'Cairo offers a journey through time, from ancient wonders to modern metropolitan life. Explore the last surviving wonder of the ancient world, discover treasures in world-class museums, and experience the bustling energy of Arab culture.',
    highlights: ['Great Pyramids of Giza', 'Egyptian Museum', 'Khan el-Khalili Bazaar', 'Nile River Cruises'],
    emoji: '🇪🇬',
    temperature: '32'
  },
  {
    id: '12',
    name: 'Queenstown',
    country: 'New Zealand',
    region: 'oceania',
    type: 'Adventure',
    imageUrl: 'https://images.pexels.com/photos/8997588/pexels-photo-8997588.jpeg',
    price: 1600,
    rating: 4.8,
    features: ['Adventure', 'Scenic'],
    description: 'Queenstown is the adventure capital of the world, set against the dramatic backdrop of the Southern Alps. From adrenaline-pumping activities to stunning alpine scenery, it offers unforgettable experiences for thrill-seekers and nature lovers alike.',
    highlights: ['Bungee Jumping', 'Milford Sound', 'Skyline Gondola', 'Routeburn Track'],
    emoji: '🇳🇿',
    temperature: '16'
  }
];

export const featuredDestinations: Destination[] = [
  destinations[0], // Santorini
  destinations[2], // Bali
  destinations[4], // Serengeti
  destinations[9], // Maldives
];