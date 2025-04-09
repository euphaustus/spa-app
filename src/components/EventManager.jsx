import React, { useState, useEffect } from 'react';

const EventManager = ({ onEventAdded, selectedEvent, selectedDateForAdd }) => {
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setNewEventTitle(selectedEvent.title || '');
      setNewEventDate(selectedEvent.date || '');
      setNewEventTime(selectedEvent.time || '');
      setMessage('');
      setError('');
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (selectedDateForAdd) {
      setNewEventDate(selectedDateForAdd);
      setMessage('');
      setError('');
    }
  }, [selectedDateForAdd]);

  const handleAddEvent = async () => {
    setMessage('');
    setError('');

    try {
      const response = await fetch('/.netlify/functions/calendar-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newEventTitle,
          date: newEventDate,
          time: newEventTime,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        if (onEventAdded) {
          onEventAdded();
        }
      } else {
        setError(data.message || 'Failed to add event.');
      }

      setNewEventTitle('');
      setNewEventDate('');
      setNewEventTime('');
    } catch (err) {
      setError('Error adding event: ' + err.message);
      console.error('Error adding event:', err);
    }
  };

  const handleRemoveEvent = async () => {
    if (!selectedEvent || !selectedEvent.id) {
      setError('No event selected to remove.');
      return;
    }

    setMessage('');
    setError('');

    try {
      const response = await fetch('/.netlify/functions/calendar-data', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedEvent.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        if (onEventAdded) {
          onEventAdded();
        }
        setNewEventTitle('');
        setNewEventDate('');
        setNewEventTime('');
      } else {
        setError(data.message || 'Failed to remove event.');
      }
    } catch (err) {
      setError('Error removing event: ' + err.message);
      console.error('Error removing event:', err);
    }
  };

  return (
    <div>
      <h2>{selectedEvent ? 'Edit Event' : 'Add New Event'}</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="event-title">Title:</label>
        <input
          type="text"
          id="event-title"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="event-date">Date:</label>
        <input
          type="date"
          id="event-date"
          value={newEventDate}
          onChange={(e) => setNewEventDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="event-time">Time:</label>
        <input
          type="time"
          id="event-time"
          value={newEventTime}
          onChange={(e) => setNewEventTime(e.target.value)}
        />
      </div>
      <button onClick={handleAddEvent}>{selectedEvent ? 'Save Event' : 'Add Event'}</button>

      {selectedEvent && (
        <button style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }} onClick={handleRemoveEvent}>
          Remove Event
        </button>
      )}
    </div>
  );
};

export default EventManager;