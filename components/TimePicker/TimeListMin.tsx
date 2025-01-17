import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TimeListProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export function TimeListMin({ value, onChange, label }: TimeListProps) {
  const increment = () => {
    onChange(value + 5 === 60 ? 0 : value + 5);
  };

  const decrement = () => {
    onChange(value === 0 ? 55 : value - 5);
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