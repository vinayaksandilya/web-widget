import React from 'react';

interface Props {
  label: string;
  subLabel?: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export const ChoiceChip: React.FC<Props> = ({
  label,
  subLabel,
  selected,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
        transition-all duration-200 ease-in-out
        ${selected 
          ? 'bg-black text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
        ${className}
      `}
    >
      <div className="flex flex-col items-center">
        <span>{label}</span>
        {subLabel && (
          <span className={`text-xs ${selected ? 'text-gray-300' : 'text-gray-500'}`}>
            {subLabel}
          </span>
        )}
      </div>
    </button>
  );
};