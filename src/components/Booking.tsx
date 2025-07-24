import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Share2, Download } from 'lucide-react';
import { getReservationDetails } from '../services/api';
import { GetReservationDetailResponse } from '../types/api';

const Booking = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservation, setReservation] = useState<GetReservationDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
    try {
      const shareUrl = `${window.location.origin}/booking/${reservationId}`; 
      
      if (navigator.share) {
        await navigator.share({
          title: 'My Restaurant Reservation',
          text: `Reservation at ${reservation?.reservation.rest_name}. See the details:`,
          url: shareUrl,
        });
      } else {
        alert('Sharing is not supported on this platform.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  useEffect(() => {
    if (reservationId) {
      const fetchReservationDetails = async () => {
        try {
          const data = await getReservationDetails(reservationId);
          setReservation(data);
        } catch (error) {
          setError('Failed to fetch reservation details');
        } finally {
          setLoading(false);
        }
      };

      fetchReservationDetails();
    }
  }, [reservationId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {reservation && (
        <>
          <div
            ref={contentRef}
            className="bg-white p-8 rounded-lg shadow-md space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Reservation Details</h2>
              <p className="text-gray-600">Booking ID: {reservationId}</p>
            </div>

            <div className="flex justify-center">
              <QRCodeSVG
                value={`${reservationId}`}
                size={200}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Reservation Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium">{reservation.reservation.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-medium">{reservation.reservation.reserve_date}</p>
                </div>
                <div>
                  <p className="text-gray-600">Time</p>
                  <p className="font-medium">{reservation.reservation.reserve_time}</p>
                </div>
                <div>
                  <p className="text-gray-600">Guests</p>
                  <p className="font-medium">{reservation.reservation.total_pax}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-2">Restaurant Details</h3>
              <p className="font-medium">{reservation.reservation.rest_name}</p>
              <p className="text-gray-600">{reservation.reservation.street}</p>
              {/* <p className="text-gray-600">{reservation.reservation.landmark || ''}</p> */}
              <p className="text-gray-600">
                {reservation.reservation.city}, {reservation.reservation.state} {reservation.reservation.pincode}
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
        </>
      )}
    </div>
  );
};

export default Booking;