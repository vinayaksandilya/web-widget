import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { getRestaurantDetails, createReservation } from './services/api';
import { RestaurantHeader } from './components/RestaurantHeader';
import { ReservationForm } from './components/ReservationForm';
import { ReservationSuccess } from './components/ReservationSuccess';
import { Restaurant, Preference } from './types/api';

const DEFAULT_SLACK = 'U12AB34CDEFG5678H';

function ReservationPage() {
  const { slack = DEFAULT_SLACK } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [reservationSuccess, setReservationSuccess] = useState<{
    id: number;
    details: any;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRestaurantDetails();
  }, [slack]);

  const loadRestaurantDetails = async () => {
    try {
      const data = await getRestaurantDetails(slack);
      setRestaurant(data.Restaurant);
      setPreferences(data.prefrences);
    } catch (error) {
      setError('Failed to load restaurant details. Please try again later.');
    }
  };

  const handleReservation = async (formData: any) => {
    try {
      const response = await createReservation(slack, formData);
      setReservationSuccess({
        id: response.reservation,
        details: formData,
      });
    } catch (error) {
      setError('Failed to create reservation. Please try again or contact the restaurant directly.');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Reservation Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          {restaurant && (
            <div className="text-left">
              <h3 className="font-semibold mb-2">Contact Restaurant</h3>
              <p className="text-gray-600">{restaurant.title}</p>
              <p className="text-gray-600">{restaurant.street}</p>
              <p className="text-gray-600">{restaurant.landmark}</p>
              <p className="text-gray-600">
                {restaurant.city}, {restaurant.state} {restaurant.pincode}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {reservationSuccess ? (
          <ReservationSuccess
            reservationId={reservationSuccess.id}
            restaurant={restaurant}
            reservationDetails={reservationSuccess.details}
          />
        ) : (
          <>
            <RestaurantHeader restaurant={restaurant} />
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Make a Reservation</h2>
              <ReservationForm
                slack={slack}
                preferences={preferences}
                onSubmit={handleReservation}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReservationPage />} />
        <Route path="/:slack" element={<ReservationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;