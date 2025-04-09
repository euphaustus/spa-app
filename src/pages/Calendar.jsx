import React, { useState, useEffect, useCallback } from 'react';
import CalendarDisplay from '../components/CalendarDisplay';
import EventManager from '../components/EventManager';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDateForAdd, setSelectedDateForAdd] = useState('');


  const handleCalendarClick = useCallback((eventOrDate) => {
    if (eventOrDate && eventOrDate.id) {
      setSelectedEvent(eventOrDate);
      setSelectedDateForAdd('');
    } else if (eventOrDate instanceof Date) {
      const isoDate = eventOrDate.toISOString().split('T')[0];
      setSelectedDateForAdd(isoDate);
      setSelectedEvent(null);
    } else {
      setSelectedEvent(null);
      setSelectedDateForAdd('');
    }
  }, []);


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
    fetchEvents();
  }, [fetchEvents]);

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
        <CalendarDisplay events={events} onCalendarClick={handleCalendarClick} />
      </div>
      <div style={eventManagerStyle}>
        <EventManager
          onEventAdded={fetchEvents}
          selectedEvent={selectedEvent}
          selectedDateForAdd={selectedDateForAdd} 
        />
      </div>
    </div>
  );
};

export default Calendar;