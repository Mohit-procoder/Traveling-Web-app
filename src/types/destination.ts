export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  type: string;
  imageUrl: string;
  price: number;
  rating: number;
  features: string[];
  description?: string;
  highlights?: string[];
  emoji?: string;
  temperature?: string;
}