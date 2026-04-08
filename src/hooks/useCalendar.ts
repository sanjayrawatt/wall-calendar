import { useState, useMemo } from 'react';
import { 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  format
} from 'date-fns';

export interface CalendarState {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
}

export const useCalendar = (initialDate = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDayClick = (day: Date) => {
    // Toggle off: If clicking the exact start or end date again, clear the selection
    if ((startDate && isSameDay(day, startDate)) || (endDate && isSameDay(day, endDate))) {
      setStartDate(null);
      setEndDate(null);
      return;
    }

    if (!startDate) {
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isBefore(day, startDate)) {
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    } else if (startDate && endDate) {
      // Starting a new selection from scratch if clicking an unselected day
      setStartDate(day);
      setEndDate(null);
    }
  };

  const isSelected = (day: Date) => {
    return Boolean((startDate && isSameDay(day, startDate)) || (endDate && isSameDay(day, endDate)));
  };

  const isInRange = (day: Date) => {
    if (startDate && endDate) {
      return isAfter(day, startDate) && isBefore(day, endDate);
    }
    return false;
  };

  const daysInMonth = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDateInterval = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start like the design
    const endDateInterval = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({
      start: startDateInterval,
      end: endDateInterval,
    }).map(day => ({
      date: day,
      isCurrentMonth: isSameMonth(day, currentDate),
      isSelected: isSelected(day),
      isInRange: isInRange(day),
      isStart: startDate ? isSameDay(day, startDate) : false,
      isEnd: endDate ? isSameDay(day, endDate) : false,
    }));
  }, [currentDate, startDate, endDate]);

  return {
    currentDate,
    startDate,
    endDate,
    daysInMonth,
    nextMonth,
    prevMonth,
    handleDayClick,
    monthName: format(currentDate, 'MMMM'),
    year: format(currentDate, 'yyyy'),
  };
};
