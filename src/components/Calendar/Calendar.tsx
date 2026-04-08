import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isToday } from 'date-fns';
import './Calendar.css';

interface DayItem {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isStart: boolean;
  isEnd: boolean;
}

interface CalendarProps {
  daysInMonth: DayItem[];
  nextMonth: () => void;
  prevMonth: () => void;
  handleDayClick: (day: Date) => void;
  monthName: string;
  year: string;
}

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const Calendar = ({
  daysInMonth,
  nextMonth,
  prevMonth,
  handleDayClick,
  monthName,
  year
}: CalendarProps) => {
  return (
    <div className="calendar-component">
      <div className="calendar-header">
        <div className="calendar-month-year">
          {monthName} {year}
        </div>
        <div className="calendar-nav">
          <button className="nav-btn" onClick={prevMonth} aria-label="Previous Month">
            <ChevronLeft size={20} />
          </button>
          <button className="nav-btn" onClick={nextMonth} aria-label="Next Month">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="calendar-grid" key={`${monthName}-${year}`}>
        {WEEKDAYS.map((day) => (
          <div 
            key={day} 
            className={`weekday-header ${day === 'SAT' || day === 'SUN' ? 'is-weekend' : ''}`}
          >
            {day}
          </div>
        ))}

        {daysInMonth.map((day, idx) => {
          const isTodayDate = isToday(day.date);
          const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
          
          let classes = 'day-cell';
          if (!day.isCurrentMonth) classes += ' not-current-month';
          if (isWeekend && day.isCurrentMonth) classes += ' is-weekend';
          if (day.isSelected) classes += ' is-selected';
          if (day.isInRange) classes += ' is-in-range';
          if (day.isStart) classes += ' is-start-date';
          if (day.isEnd) classes += ' is-end-date';
          if (isTodayDate) classes += ' is-today';

          return (
            <button
              key={idx}
              className={classes}
              onClick={() => handleDayClick(day.date)}
              disabled={!day.isCurrentMonth}
            >
              <div className="day-number">{format(day.date, 'd')}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
