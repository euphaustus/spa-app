import React, { useState, useEffect } from 'react';

const EventManager = ({ onEventAdded, selectedEvent, selectedDateForAdd, clearSelectedEvent }) => {
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
    } else {
      setNewEventTitle('');
      setNewEventDate('');
      setNewEventTime('');
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

    const method = selectedEvent ? 'PUT' : 'POST';
    const url = '/.netlify/functions/calendar-data' + (selectedEvent ? `?id=${selectedEvent.id}` : '');

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedEvent?.id, // Include ID in the body for consistency
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
        if (selectedEvent) {
          clearSelectedEvent(); // Clear selected event after saving
        }
        setNewEventTitle('');
        setNewEventDate('');
        setNewEventTime('');
      } else {
        setError(data.message || 'Failed to save event.');
      }
    } catch (err) {
      setError('Error saving event: ' + err.message);
      console.error('Error saving event:', err);
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