const path = require('path');
const CalendarEventRepository = require('./repositories/calendar-event-repository');

exports.handler = async (event, context) => {
  const dataFilePath = path.join(process.cwd(), 'netlify', 'functions', 'data', 'calendar-events.json');
  const repository = new CalendarEventRepository(dataFilePath);

  if (event.httpMethod === 'GET') {
    try {
      const events = await repository.getEvents();
      return {
        statusCode: 200,
        body: JSON.stringify({ events }),
      };
    } catch (error) {
      console.error('Error reading calendar data:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to read calendar data' }),
      };
    }
  } else if (event.httpMethod === 'POST') {
    try {
      const { title, date, time, id } = JSON.parse(event.body);
      let resultEvent;
      if (id) {
        // Update existing event
        resultEvent = await repository.updateEvent(id, { title, date, time });
        if (resultEvent) {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Event updated successfully', event: resultEvent }),
          };
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Event not found' }),
          };
        }
      } else {
        // Add new event
        resultEvent = await repository.addEvent({ title, date, time });
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Event added successfully', event: resultEvent }),
        };
      }
    } catch (error) {
      console.error('Error adding/updating calendar event:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to add/update calendar event' }),
      };
    }
  } else if (event.httpMethod === 'DELETE') {
    try {
      const { id } = JSON.parse(event.body);
      const deleted = await repository.deleteEvent(id);
      if (deleted) {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Event removed successfully', id }),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Event not found' }),
        };
      }
    } catch (error) {
      console.error('Error removing calendar event:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to remove calendar event' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
};