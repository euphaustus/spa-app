import React from 'react';

const Calendar = () => {
  return (
    <div style={divStyle} className='contentbox'>
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

const divStyle = {
  width: '100%',
  height: '100%',

};

const tableStyle = {
  width: '100%',
  height: '100%',
  borderCollapse: 'collapse',
};

const headerCellStyle = {

  border: '1px solid black',
  textAlign: 'center',
  padding: '10px',
  boxSizing: 'border-box',
};

const cellStyle = {
  border: '1px solid black',
  textAlign: 'center',
  padding: '10px',
  boxSizing: 'border-box',
  verticalAlign: 'top',
  textAlign: 'left',
};

const generateCalendarRows = () => {
  const daysInMonth = 30;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = [];

  while (daysArray.length) {
    const week = daysArray.splice(0, 7);
    weeks.push(week);
  }

  return weeks.map((week, index) => (
    <tr key={index}>
      {week.map((day, i) => (
        <td key={i} style={cellStyle}>
          {day}
        </td>
      ))}
    </tr>
  ));
};

export default Calendar;
