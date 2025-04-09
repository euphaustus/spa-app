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
    const daysInMonth = 30; // This will eventually be dynamic
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const weeks = [];

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    while (daysArray.length) {
      const week = daysArray.splice(0, 7);
      weeks.push(week);
    }

    return weeks.map((week, weekIndex) => (
      <tr key={weekIndex}>
        {week.map((day, dayIndex) => {
          const currentDate = new Date(currentYear, currentMonth, day);
          const displayDate = new Date(currentDate);
          displayDate.setDate(currentDate.getDate() - 1); // shift display in month for now

          const eventsForDay = events ? events.filter(event => {
            const eventDate = new Date(event.date);
            return (
              eventDate.getFullYear() === displayDate.getFullYear() &&
              eventDate.getMonth() === displayDate.getMonth() &&
              eventDate.getDate() === displayDate.getDate()
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