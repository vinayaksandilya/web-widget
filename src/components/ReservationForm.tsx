import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { DateSlot, TimeSlot, Preference } from "../types/api";
import { getAvailableDates, getAvailableTimeSlots } from "../services/api";
import { DateSelector } from "./DateSelector";
import { TimeSelector } from "./TimeSelector";
import { GuestSelector } from "./GuestSelector";
import { PreferenceSelector } from "./PreferenceSelector";
import "../styles/ReservationForm.css";
import Collapsible from "react-collapsible";

interface Props {
  slack: string;
  preferences: Preference[];
  onSubmit: (formData: any) => void;
}

export const ReservationForm: React.FC<Props> = ({
  slack,
  preferences,
  onSubmit,
}) => {
  const [dates, setDates] = useState<DateSlot[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    country_code: "+91",
    phone: "",
    email: "",
    date_of_birth: "",
    anniversary: "",
    reserve_date: "",
    reserve_checkin_time: "",
    od_total: 1,
    od_adult: 0,
    od_kids: 0,
    comment: "",
    preferences_id: [] as number[],
  });

  const [errorMessage, setErrorMessage] = useState("");

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
      console.error("Failed to load dates:", error);
    }
  };

  const loadTimeSlots = async () => {
    try {
      const slots = await getAvailableTimeSlots(formData.reserve_date, slack);
      setTimeSlots(slots);
    } catch (error) {
      console.error("Failed to load time slots:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = Number(value);

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    const totalGuests =
      name === "od_adult"
        ? newValue + formData.od_kids
        : formData.od_adult + newValue;

    if (totalGuests > formData.od_total) {
      setErrorMessage(
        "The combined count of adults and kids cannot exceed the total number of guests."
      );
    } else {
      setErrorMessage(""); 
    }
  };

  const togglePreference = (prefId: number) => {
    setFormData((prev) => ({
      ...prev,
      preferences_id: prev.preferences_id.includes(prefId)
        ? prev.preferences_id.filter((id) => id !== prefId)
        : [...prev.preferences_id, prefId],
    }));
  };

  const validateGuests = () => {
    const totalGuests = formData.od_adult + formData.od_kids;
    if (totalGuests > formData.od_total) {
      setErrorMessage(
        "The combined count of adults and kids cannot exceed the total number of guests."
      );
      return false;
    }
    
    // Check if the selected time slot is available
    if (formData.reserve_checkin_time) {
      const selectedSlotCategory = timeSlots.find(slot => 
        slot.slots.some(s => s.time === formData.reserve_checkin_time)
      );
      
      if (selectedSlotCategory) {
        const selectedTimeSlot = selectedSlotCategory.slots.find(
          s => s.time === formData.reserve_checkin_time
        );
        
        if (selectedTimeSlot && !selectedTimeSlot.is_available) {
          setErrorMessage("The selected time slot is not available. Please choose another time.");
          return false;
        }
      }
    }
    
    setErrorMessage(""); 
    return true;
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.od_total > 0 &&
      formData.reserve_date !== "" &&
      formData.reserve_checkin_time !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneWithoutCountryCode =
      formData.phone.length > 10 ? formData.phone.substring(2) : formData.phone;
    console.log(phoneWithoutCountryCode);
    const dataToSubmit = { ...formData, phone: phoneWithoutCountryCode };
    if (validateGuests()) {
      onSubmit(dataToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="span">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            className="block w-full rounded-lg border border-black shadow-sm focus:outline-none px-4 name"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="span">*</span>
          </label>
          <PhoneInput
            country={"in"}
            value={formData.phone}
            countryCodeEditable={false}
            onChange={(phone, data: any) => {
              console.log("Phone Input:", phone);
              console.log("COuntry code:", data);

              setFormData((prev) => ({
                ...prev,
                phone: phone.replace(`+${data.dialCode}`, ""), 
                country_code: `+${data.dialCode}`, 
              }));
            }}
            inputClass="!w-full !rounded-lg border border-black !px-4 !py-2"
            containerClass="!w-full mt-3"
            buttonStyle={{
              width: "40px", // Adjust the width of the country code dropdown
            }}
            inputStyle={{
              paddingLeft: "80px", // Add padding to accommodate the country code width
            }}
            onBlur={() => {
              if (formData.phone === "") {
                setFormData((prev) => ({
                  ...prev,
                  country_code: "+91",
                }));
              }
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Guests <span className="span">*</span>
          </label>
          <div className="scrollbar-hide chipsc">
            <GuestSelector
              value={formData.od_total}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, od_total: value }))
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 date">
            Date <span className="span">*</span>
          </label>
          <div className="scrollbar-hide datep">
            <DateSelector
              dates={dates}
              selectedDate={formData.reserve_date}
              onSelect={(date) =>
                setFormData((prev) => ({ ...prev, reserve_date: date }))
              }
            />
          </div>
        </div>

        {formData.reserve_date && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 time">
              Time <span className="span">*</span>
            </label>
            <div className="scrollbar-hide stime">
              <TimeSelector
                timeSlots={timeSlots}
                selectedTime={formData.reserve_checkin_time}
                onSelect={(time) =>
                  setFormData((prev) => ({
                    ...prev,
                    reserve_checkin_time: time,
                  }))
                }
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 pref">
            Preferences
          </label>
          <div className="scrollbar-hide spref">
            <PreferenceSelector
              preferences={preferences}
              selectedPreferences={formData.preferences_id}
              onToggle={togglePreference}
            />
          </div>
        </div>

        <div className="collapsible-container">
          <Collapsible
            trigger={
              <div className="collapsible-header">
                <span>Additional Details</span>
                <span className={`arrow-icon ${isOpen ? "open" : ""}`}>▲</span>
              </div>
            }
            onOpening={() => setIsOpen(true)}
            onClosing={() => setIsOpen(false)}
          >
            <div className="collapsible-content">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="block w-full rounded-lg border border-black shadow-sm focus:outline-none px-4 name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">
                    Adults
                  </label>
                  <input
                    type="number"
                    name="od_adult"
                    min="0"
                    className="block w-full rounded-lg border border-black shadow-sm focus:outline-none px-4 name"
                    value={formData.od_adult || ""}
                    onChange={handleGuestChange}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setFormData((prev) => ({ ...prev, od_adult: 0 }));
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">
                    Kids
                  </label>
                  <input
                    type="number"
                    name="od_kids"
                    min="0"
                    className="block w-full rounded-lg border border-black shadow-sm focus:outline-none px-4 name"
                    value={formData.od_kids || ""}
                    onChange={handleGuestChange}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setFormData((prev) => ({ ...prev, od_kids: 0 }));
                      }
                    }}
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">
                  Comments
                </label>
                <input
                  type="text"
                  name="comment"
                  className="block w-full rounded-lg border border-black shadow-sm focus:outline-none px-4 py-2"
                  onChange={handleInputChange}
                  value={formData.comment}
                />
              </div>
            </div>
          </Collapsible>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`block w-full rounded-lg border border-black py-2 ${
            isFormValid()
              ? "bg-black text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Reserve Now
        </button>
      </div>
    </form>
  );
};
