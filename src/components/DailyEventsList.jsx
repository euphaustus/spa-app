import React from 'react';

const DailyEventsList = ({ events }) => {
  //console.log('All Events received by DailyEventsList:', events);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();

  const todaysEvents = events ? events.filter(event => {
    const eventDate = new Date(event.date);
    console.log('Event Date:', event.date, '=>', eventDate);

    return (
      eventDate.getFullYear() === currentYear &&
      eventDate.getMonth() === currentMonth &&
      eventDate.getDate() === currentDate - 1
    );
  }) : [];

  //console.log('Events filtered for today:', todaysEvents);

  const containerStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    height: '96%',
    width: '90%',
    overflowY: 'auto',
  };

  const eventItemStyle = {
    marginBottom: '8px',
    fontSize: '0.9em',
    border: '1px solid #eee',
    padding: '10px 8px',
    display: 'block',
    width: '100%',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <h3>Today's Events</h3>
      {todaysEvents.length > 0 ? (
        <ul>
          {todaysEvents.map((event, index) => (
            <li key={index} style={eventItemStyle}>
              {event.time && `(${event.time}) `}
              {event.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events for today.</p>
      )}
    </div>
  );
};

export default DailyEventsList;