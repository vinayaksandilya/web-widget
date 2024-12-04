import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { DateSlot, TimeSlot, Preference } from '../types/api';
import { getAvailableDates, getAvailableTimeSlots } from '../services/api';
import { DateSelector } from './DateSelector';
import { TimeSelector } from './TimeSelector';
import { GuestSelector } from './GuestSelector';
import { PreferenceSelector } from './PreferenceSelector';

interface Props {
  slack: string;
  preferences: Preference[];
  onSubmit: (formData: any) => void;
}

export const ReservationForm: React.FC<Props> = ({ slack, preferences, onSubmit }) => {
  const [dates, setDates] = useState<DateSlot[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    country_code: '+91',
    phone: '',
    email: '',
    date_of_birth: '',
    anniversary: '',
    reserve_date: '',
    reserve_checkin_time: '',
    od_total: 2,
    od_adult: 0,
    od_kids: 0,
    women: 0,
    men: 0,
    status: 5,
    comment: '',
    preferences_id: [] as number[],
  });

  useEffect(() => {
    loadDates();
  }, []);

  useEffect(() => {
    if (formData.reserve_date) {
      loadTimeSlots();
    }
  }, [formData.reserve_date, slack]);

  const loadDates = async () => {
    try {
      const availableDates = await getAvailableDates();
      setDates(availableDates);
    } catch (error) {
      console.error('Failed to load dates:', error);
    }
  };

  const loadTimeSlots = async () => {
    try {
      const slots = await getAvailableTimeSlots(formData.reserve_date, slack);
      setTimeSlots(slots);
    } catch (error) {
      console.error('Failed to load time slots:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePreference = (prefId: number) => {
    setFormData(prev => ({
      ...prev,
      preferences_id: prev.preferences_id.includes(prefId)
        ? prev.preferences_id.filter(id => id !== prefId)
        : [...prev.preferences_id, prefId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            name="name"
            required
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <PhoneInput
            country={'in'}
            value={formData.phone}
            onChange={(phone, data: any) => {
              setFormData(prev => ({
                ...prev,
                phone,
                country_code: `+${data.dialCode}`
              }));
            }}
            inputClass="!w-full !rounded-lg"
            containerClass="!w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests *</label>
          <div className="scrollbar-hide">
            <GuestSelector
              value={formData.od_total}
              onChange={(value) => setFormData(prev => ({ ...prev, od_total: value }))}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <div className="scrollbar-hide">
            <DateSelector
              dates={dates}
              selectedDate={formData.reserve_date}
              onSelect={(date) => setFormData(prev => ({ ...prev, reserve_date: date }))}
            />
          </div>
        </div>

        {formData.reserve_date && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
            <div className="scrollbar-hide">
              <TimeSelector
                timeSlots={timeSlots}
                selectedTime={formData.reserve_checkin_time}
                onSelect={(time) => setFormData(prev => ({ ...prev, reserve_checkin_time: time }))}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferences</label>
          <div className="scrollbar-hide">
            <PreferenceSelector
              preferences={preferences}
              selectedPreferences={formData.preferences_id}
              onToggle={togglePreference}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
            <input
              type="number"
              name="od_adult"
              min="0"
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kids</label>
            <input
              type="number"
              name="od_kids"
              min="0"
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-black text-white rounded-lg py-3 px-4 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Make Reservation
        </button>
      </div>
    </form>
  );
};