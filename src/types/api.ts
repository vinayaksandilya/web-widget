export interface Restaurant {
  slack: string;
  title: string;
  opening_time: string;
  closing_time: string;
  detail: string | null;
  max_table_occupancy: number;
  img_logo: string;
  profile_image: string;
  location_title: string;
  street: string;
  landmark: string;
  pincode: number;
  city: string;
  state: string;
  country: string;
}

export interface Preference {
  id: number;
  title: string;
  rest_id: number;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  icon: string | null;
  children: Preference[];
}

export interface DateSlot {
  dateformat: string;
  dates: string;
  day: string;
}

export interface TimeSlot {
  id: number;
  name: string;
  slots: string[];
}

export interface ReservationResponse {
  message: string;
  reservation: number;
}