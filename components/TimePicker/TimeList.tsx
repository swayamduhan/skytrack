import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TimeListProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  label: string;
}

export function TimeList({ value, min, max, onChange, label }: TimeListProps) {
  const increment = () => {
    onChange(value === max ? min : value + 1);
  };

  const decrement = () => {
    onChange(value === min ? max : value - 1);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={increment}
        className="p-1 hover:bg-gray-100 rounded-full text-gray-600"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
      
      <div className="flex flex-col items-center my-2">
        <span className="text-2xl font-semibold">{value.toString().padStart(2, '0')}</span>
        <span className="text-xs text-gray-500 mt-1">{label}</span>
      </div>

      <button
        onClick={decrement}
        className="p-1 hover:bg-gray-100 rounded-full text-gray-600"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
}