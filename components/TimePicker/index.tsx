import React, { useState } from 'react';
import { TimeInput } from './TimeInput';
import { TimeList } from './TimeList';
import { convertTo24Hour } from './utils';
import { AnimatePresence, motion } from 'motion/react';
import { TimeListMin } from './TimeListMin';

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

function nearestMultiple(mins : number){
    const q = Math.trunc(mins/5)
    return q*5;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(value.getHours() % 12 || 12);
  const [minutes, setMinutes] = useState(nearestMultiple(value.getMinutes()));
  const [period, setPeriod] = useState<'AM' | 'PM'>(value.getHours() >= 12 ? 'PM' : 'AM');

  const handleTimeChange = (newHours: number, newMinutes: number, newPeriod: 'AM' | 'PM') => {
    const hours24 = convertTo24Hour(newHours, newPeriod);
    const newDate = new Date(value);
    newDate.setHours(hours24);
    newDate.setMinutes(newMinutes);
    onChange(newDate);
  };

  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    handleTimeChange(hours, minutes, newPeriod);
  };

  const updateHours = (newHours: number) => {
    setHours(newHours);
    handleTimeChange(newHours, minutes, period);
  };

  const updateMinutes = (newMinutes: number) => {
    setMinutes(newMinutes);
    handleTimeChange(hours, newMinutes, period);
  };

  return (
    <div className="relative">
      <TimeInput
        hours={hours}
        minutes={minutes}
        period={period}
        onClick={() => setIsOpen(!isOpen)}
      />
      <AnimatePresence>
      {isOpen && (
        <motion.div className="absolute mt-2 p-4 bg-white rounded-lg shadow-lg border w-[280px] z-50 dark:bg-[var(--background-dark)] overflow-hidden" initial={{scale : 0, height : "0px", opacity : 0}} animate={{scale : 1, height : "auto", opacity : 1}} exit={{opacity : 0, scale : 0, height : "0px"}}>
          <div className="flex items-center justify-center gap-8">
            <TimeList
              value={hours}
              min={1}
              max={12}
              onChange={updateHours}
              label="Hours"
            />
            <div className="text-2xl font-semibold text-gray-400">:</div>
            <TimeListMin
              value={minutes}
              onChange={updateMinutes}
              label="Minutes"
            />
            <button
              onClick={togglePeriod}
              className="flex flex-col items-center justify-center px-4 py-2 
                       rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className={`text-sm font-semibold ${period === 'AM' ? 'text-indigo-600' : 'text-gray-400'}`}>
                AM
              </span>
              <span className={`text-sm font-semibold ${period === 'PM' ? 'text-indigo-600' : 'text-gray-400'}`}>
                PM
              </span>
            </button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}