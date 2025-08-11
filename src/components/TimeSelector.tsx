import React, { useState } from 'react';
import { ChoiceChip } from './ChoiceChip';
import { TimeSlot, SlotDetail } from '../types/api';

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
              ?.slots.map((slotDetail) => (
                
                <ChoiceChip
                  key={slotDetail.time}
                  label={slotDetail.time}
                  subLabel={slotDetail.is_available 
                    ? (slotDetail.available_covers >= 1  ? `${Math.floor(slotDetail.available_covers)} left` : '') 
                    : 'Sold Out'}
                  selected={selectedTime === slotDetail.time}
                  onClick={() => slotDetail.is_available ? onSelect(slotDetail.time) : null}
                  className={!slotDetail.is_available && slotDetail.available_covers >= 0? 'opacity-50 cursor-not-allowed' : ''}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// import React, { useState } from 'react';
// import { ChoiceChip } from './ChoiceChip';
// import { TimeSlot, SlotDetail } from '../types/api';

// interface Props {
//   timeSlots: TimeSlot[];
//   selectedTime: string;
//   onSelect: (time: string) => void;
// }

// export const TimeSelector: React.FC<Props> = ({ timeSlots, selectedTime, onSelect }) => {
//   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

//   return (
//     <div className="space-y-4">
//       <div className="overflow-x-auto pb-2">
//         <div className="flex space-x-2">
//           {timeSlots.map((slot) => (
//             <ChoiceChip
//               key={slot.id}
//               label={slot.name}
//               selected={selectedSlot === slot.name}
//               onClick={() => setSelectedSlot(slot.name)}
//             />
//           ))}
//         </div>
//       </div>

//       {selectedSlot && (
//         <div className="overflow-x-auto pb-2">
//           <div className="flex space-x-2">
//             {timeSlots
//               .find((slot) => slot.name === selectedSlot)
//               ?.slots.map((slotDetail) => (
//                 <ChoiceChip
//                   key={slotDetail.time}
//                   label={slotDetail.time}
//                   subLabel={slotDetail.is_available 
//                     ? (slotDetail.available_covers > 0 && slotDetail.available_covers < 10 ? `${Math.floor(slotDetail.available_covers)} left` : '') 
//                     : 'Sold Out'}
//                   selected={selectedTime === slotDetail.time}
//                   onClick={() => slotDetail.is_available ? onSelect(slotDetail.time) : null}
//                   className={!slotDetail.is_available ? 'opacity-50 cursor-not-allowed' : ''}
//                 />
//               ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

