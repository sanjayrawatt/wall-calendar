import './App.css'
import HeroImage from './components/HeroImage/HeroImage'
import Calendar from './components/Calendar/Calendar'
import Notes from './components/Notes/Notes'
import { useCalendar } from './hooks/useCalendar'

function App() {
  const {
    daysInMonth,
    nextMonth,
    prevMonth,
    handleDayClick,
    monthName,
    year,
    startDate,
    endDate
  } = useCalendar();

  // Create a unique key for the notes based on the displayed month
  const monthKey = `${monthName}-${year}`;

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div className="calendar-hanger">
          <div className="wire-loop"></div>
          <div className="nail"></div>
        </div>
        <div className="calendar-body">
          <HeroImage monthName={monthName} year={year} />
        
        <div className="calendar-content">
          <div className="notes-wrapper">
             <Notes 
                monthKey={monthKey} 
                startDate={startDate} 
                endDate={endDate} 
             />
          </div>
          
          <div className="calendar-wrapper">
             <Calendar
                daysInMonth={daysInMonth}
                nextMonth={nextMonth}
                prevMonth={prevMonth}
                handleDayClick={handleDayClick}
                monthName={monthName}
                year={year}
             />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
