import React from 'react';
import { ChoiceChip } from './ChoiceChip';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export const GuestSelector: React.FC<Props> = ({ value, onChange }) => {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-2">
        {options.map((option) => (
          <ChoiceChip
            key={option}
            // label={`${option} ${option === 1 ? 'Guest' : 'Guests'}`}
            label={`${option}`}
            selected={value === option}
            onClick={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  );
};