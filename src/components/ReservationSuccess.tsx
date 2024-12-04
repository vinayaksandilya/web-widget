import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Share2, Download } from 'lucide-react';
import { Restaurant } from '../types/api';

interface Props {
  reservationId: number;
  restaurant: Restaurant;
  reservationDetails: any;
}

export const ReservationSuccess: React.FC<Props> = ({
  reservationId,
  restaurant,
  reservationDetails,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (contentRef.current) {
      const dataUrl = await toPng(contentRef.current);
      const link = document.createElement('a');
      link.download = `reservation-${reservationId}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleShare = async () => {
    if (contentRef.current) {
      const dataUrl = await toPng(contentRef.current);
      try {
        await navigator.share({
          title: 'My Restaurant Reservation',
          text: `Reservation at ${restaurant.title}`,
          files: [new File([dataUrl], 'reservation.png', { type: 'image/png' })],
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        ref={contentRef}
        className="bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Reservation Confirmed!</h2>
          <p className="text-gray-600">Booking ID: {reservationId}</p>
        </div>

        <div className="flex justify-center">
          <QRCodeSVG
            value={`${window.location.origin}/reservation/${reservationId}`}
            size={200}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Reservation Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Date</p>
              <p className="font-medium">{reservationDetails.reserve_date}</p>
            </div>
            <div>
              <p className="text-gray-600">Time</p>
              <p className="font-medium">{reservationDetails.reserve_checkin_time}</p>
            </div>
            <div>
              <p className="text-gray-600">Guests</p>
              <p className="font-medium">
                {reservationDetails.od_adult} Adults, {reservationDetails.od_kids} Kids
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-2">Restaurant Details</h3>
          <p className="font-medium">{restaurant.title}</p>
          <p className="text-gray-600">{restaurant.street}</p>
          <p className="text-gray-600">{restaurant.landmark}</p>
          <p className="text-gray-600">
            {restaurant.city}, {restaurant.state} {restaurant.pincode}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          <Download size={20} />
          <span>Download</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 bg-gray-100 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200"
        >
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <a
          href="https://wegsoft.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          Powered by Wegsoft
        </a>
      </div>
    </div>
  );
};