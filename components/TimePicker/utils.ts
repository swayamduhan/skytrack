export function formatTime(hours: number, minutes: number, period: 'AM' | 'PM'): string {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  
  export function convertTo24Hour(hours: number, period: 'AM' | 'PM'): number {
    if (period === 'AM') {
      return hours === 12 ? 0 : hours;
    }
    return hours === 12 ? 12 : hours + 12;
  }
  
  export function convertTo12Hour(hours: number): { hours: number; period: 'AM' | 'PM' } {
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    return { hours, period };
  }