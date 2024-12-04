import axios from 'axios';
import { Restaurant, DateSlot, TimeSlot, ReservationResponse } from '../types/api';

const BASE_URL = 'https://reserve-api-santosh.wegsoft.com/api';

export const getRestaurantDetails = async (slack: string) => {
  const response = await axios.get<{ Restaurant: Restaurant, prefrences: any[] }>(
    `${BASE_URL}/restaurant_widget?slack=${slack}`
  );
  return response.data;
};

export const getAvailableDates = async () => {
  const response = await axios.get<{ date: DateSlot[] }>(
    `${BASE_URL}/restaurant_widget_date`
  );
  return response.data.date;
};

export const getAvailableTimeSlots = async (date: string, slack: string) => {
  const response = await axios.post<{ slots: TimeSlot[] }>(
    `${BASE_URL}/restaurant_widget_time?date=${date}&slack=${slack}`
  );
  return response.data.slots;
};

export const createReservation = async (slack: string, data: any) => {
  const response = await axios.post<ReservationResponse>(
    `${BASE_URL}/guest_reservation?slack=${slack}`,
    data
  );
  return response.data;
};