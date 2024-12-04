import React from 'react';
import { ChoiceChip } from './ChoiceChip';
import { DateSlot } from '../types/api';

interface Props {
  dates: DateSlot[];
  selectedDate: string;
  onSelect: (date: string) => void;
}

export const DateSelector: React.FC<Props> = ({ dates, selectedDate, onSelect }) => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-2">
        {dates.map((date) => (
          <ChoiceChip
            key={date.dateformat}
            label={date.dates}
            subLabel={date.day}
            selected={selectedDate === date.dateformat}
            onClick={() => onSelect(date.dateformat)}
          />
        ))}
      </div>
    </div>
  );
};