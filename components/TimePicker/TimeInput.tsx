import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from './utils';

interface TimeInputProps {
  hours: number;
  minutes: number;
  period: 'AM' | 'PM';
  onClick: () => void;
}

export function TimeInput({ hours, minutes, period, onClick }: TimeInputProps) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 text-left rounded-lg shadow-sm 
                 flex items-center gap-2 bg-black/10 hover:bg-black/5 border-b-2 border-r-2 border-black
                 transition-colors duration-200 dark:bg-black/60 dark:border-white dark:border-b dark:border-r dark:hover:bg-black/30 transition-all duration-200"
    >
      <Clock className="h-5 w-5 text-gray-500" />
      <span>{formatTime(hours, minutes, period)}</span>
    </button>
  );
}