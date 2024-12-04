import React, { useState } from 'react';
import { ChoiceChip } from './ChoiceChip';
import { TimeSlot } from '../types/api';

interface Props {
  timeSlots: TimeSlot[];
  selectedTime: string;
  onSelect: (time: string) => void;
}

export const TimeSelector: React.FC<Props> = ({ timeSlots, selectedTime, onSelect }) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {timeSlots.map((slot) => (
            <ChoiceChip
              key={slot.id}
              label={slot.name}
              selected={selectedSlot === slot.name}
              onClick={() => setSelectedSlot(slot.name)}
            />
          ))}
        </div>
      </div>

      {selectedSlot && (
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {timeSlots
              .find((slot) => slot.name === selectedSlot)
              ?.slots.map((time) => (
                <ChoiceChip
                  key={time}
                  label={time}
                  selected={selectedTime === time}
                  onClick={() => onSelect(time)}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};