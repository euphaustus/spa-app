import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import CalendarDisplay from '../components/CalendarDisplay';
import EventManager from '../components/EventManager';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  // Use useCallback to memoize the fetchEvents function
  const fetchEvents = useCallback(() => {
    fetch('/.netlify/functions/calendar-data')
      .then(response => response.json())
      .then(data => {
        if (data && data.events) {
          setEvents(data.events);
        }
      })
      .catch(error => console.error('Error fetching calendar data:', error));
  }, []);

  useEffect(() => {
    fetchEvents(); // Fetch events when the component mounts
  }, [fetchEvents]); // Depend on fetchEvents

  const pageStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  };

  const calendarStyle = {
    flex: '3',
    height: '100%',
    paddingRight: '10px',
    boxSizing: 'border-box',
  };

  const eventManagerStyle = {
    flex: '1',
    height: '100%',
    paddingLeft: '10px',
    boxSizing: 'border-box',
    borderLeft: '1px solid #ccc',
  };

  return (
    <div style={pageStyle} className='contentbox'>
      <div style={calendarStyle}>
        <CalendarDisplay events={events} />
      </div>
      <div style={eventManagerStyle}>
        <EventManager onEventAdded={fetchEvents} /> {/* Pass fetchEvents as a prop */}
      </div>
    </div>
  );
};

export default Calendar;