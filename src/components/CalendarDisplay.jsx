import React from 'react';

const CalendarDisplay = ({ events, onCalendarClick }) => {
  const divStyle = {
    width: '100%',
    height: '90%',
  };

  const tableStyle = {
    width: '100%',
    height: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  };

  const headerCellStyle = {
    border: '1px solid black',
    textAlign: 'center',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const cellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    verticalAlign: 'top',
    height: '80px',
    maxHeight: '60px',
    overflow: 'hidden',
  };

  const generateCalendarRows = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const weeks = [];
    let currentDay = 1;
    let week = [];

 
    for (let i = 0; i < startingDayOfWeek; i++) {
      week.push(null);
    }

    while (currentDay <= daysInMonth) {
      week.push(currentDay);
      if (week.length === 7 || currentDay === daysInMonth) {
        weeks.push(week);
        week = [];
      }
      currentDay++;
    }


    while (weeks[weeks.length - 1].length < 7) {
      weeks[weeks.length - 1].push(null);
    }

    return weeks.map((week, weekIndex) => (
      <tr key={weekIndex}>
        {week.map((day, dayIndex) => {
          if (day === null) {
            return <td key={dayIndex} style={cellStyle}></td>;
          }
          const currentDate = new Date(currentYear, currentMonth, day);
          const displayDate = new Date(currentDate);

          const eventsForDay = events ? events.filter(event => {
            const eventDate = new Date(event.date);
            return (
              eventDate.getFullYear() === displayDate.getFullYear() &&
              eventDate.getMonth() === displayDate.getMonth() &&
              eventDate.getDate() === displayDate.getDate() - 1
            );
          }) : [];

          return (
            <td
              key={dayIndex}
              style={cellStyle}
              onClick={() => onCalendarClick(currentDate)}
            >
              {day}
              {eventsForDay.map((event, index) => (
                <div
                  key={index}
                  style={{ marginTop: '5px', fontSize: '0.8em', cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCalendarClick(event);
                  }}
                >
                  {event.time && `(${event.time}) `}
                  {event.title}
                </div>
              ))}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div style={divStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Sunday</th>
            <th style={headerCellStyle}>Monday</th>
            <th style={headerCellStyle}>Tuesday</th>
            <th style={headerCellStyle}>Wednesday</th>
            <th style={headerCellStyle}>Thursday</th>
            <th style={headerCellStyle}>Friday</th>
            <th style={headerCellStyle}>Saturday</th>
          </tr>
        </thead>
        <tbody>
          {generateCalendarRows()}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarDisplay;