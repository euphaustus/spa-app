import React, { useState } from 'react';

const EventManager = ({ onEventAdded }) => {
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState(''); // New state for time
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
          time: newEventTime, // Include the time
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
      setNewEventTime(''); // Clear the time input
    } catch (err) {
      setError('Error adding event: ' + err.message);
      console.error('Error adding event:', err);
    }
  };

  return (
    <div>
      <h2>Add New Event</h2>
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
          type="time" // Use type="time" for a time picker
          id="event-time"
          value={newEventTime}
          onChange={(e) => setNewEventTime(e.target.value)}
        />
      </div>
      <button onClick={handleAddEvent}>Add Event</button>

      {/* You could add a section here to list or remove existing events */}
    </div>
  );
};

export default EventManager;