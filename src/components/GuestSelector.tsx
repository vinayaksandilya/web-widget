import React from 'react';
import { ChoiceChip } from './ChoiceChip';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export const GuestSelector: React.FC<Props> = ({ value, onChange }) => {
  const options = Array.from({ length: 50 }, (_, i) => i + 1);

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