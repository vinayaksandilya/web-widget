import React from 'react';
import { ChoiceChip } from './ChoiceChip';
import { Preference } from '../types/api';

interface Props {
  preferences: Preference[];
  selectedPreferences: number[];
  onToggle: (prefId: number) => void;
}

export const PreferenceSelector: React.FC<Props> = ({
  preferences,
  selectedPreferences,
  onToggle,
}) => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-2">
        {preferences.map((pref) => (
          <ChoiceChip
            key={pref.id}
            label={pref.title}
            selected={selectedPreferences.includes(pref.id)}
            onClick={() => onToggle(pref.id)}
          />
        ))}
      </div>
    </div>
  );
};