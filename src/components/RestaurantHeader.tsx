import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { Restaurant } from '../types/api';

interface Props {
  restaurant: Restaurant;
}
const imgUrl = 'https://reserve-api-santosh.wegsoft.com/';
 
export const RestaurantHeader: React.FC<Props> = ({ restaurant }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={`${imgUrl}${restaurant.img_logo}`}
            alt={restaurant.title}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{restaurant.title}</h1>
            <p className="text-gray-600">{restaurant.location_title}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row sm:space-x-6">
        <a
          href={`tel:${restaurant.phone}`}
          className="flex items-center space-x-2 text-gray-600 hover:text-black"
        >
          <Phone size={20} />
          <span>Call Restaurant</span>
        </a>
        
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            `${restaurant.street}, ${restaurant.landmark}, ${restaurant.city}, ${restaurant.state}, ${restaurant.pincode}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-600 hover:text-black"
        >
          <MapPin size={20} />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  );
};