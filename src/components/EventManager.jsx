import React, { useState, useEffect } from 'react';
import { addCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from '../services/calendarService'; // Import service functions

const EventManager = ({ onEventAdded, selectedEvent, selectedDateForAdd, clearSelectedEvent }) => {
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      console.log('Selected Event:', selectedEvent);
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

    const eventData = {
      title: newEventTitle,
      date: newEventDate,
      time: newEventTime,
    };

    try {
      let savedEvent;
      if (selectedEvent) {
        savedEvent = await updateCalendarEvent({ ...eventData, id: selectedEvent.id });
        setMessage('Event updated successfully');
      } else {
        savedEvent = await addCalendarEvent(eventData);
        setMessage('Event added successfully');
      }

      if (savedEvent) {
        if (onEventAdded) {
          onEventAdded();
        }
        if (selectedEvent) {
          clearSelectedEvent();
        }
        setNewEventTitle('');
        setNewEventDate('');
        setNewEventTime('');
      } else {
        setError('Failed to save event.');
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
      const deletedId = await deleteCalendarEvent(selectedEvent.id);
      if (deletedId) {
        setMessage('Event removed successfully');
        if (onEventAdded) {
          onEventAdded();
        }
        setNewEventTitle('');
        setNewEventDate('');
        setNewEventTime('');
      } else {
        setError('Failed to remove event.');
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