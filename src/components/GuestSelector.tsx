import React from 'react';
import { ChoiceChip } from './ChoiceChip';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export const GuestSelector: React.FC<Props> = ({ value, onChange }) => {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-2">
        {options.map((option) => (
          <ChoiceChip
            key={option}
            label={`${option} ${option === 1 ? 'Guest' : 'Guests'}`}
            selected={value === option}
            onClick={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  );
};