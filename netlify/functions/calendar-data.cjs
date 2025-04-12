const SupabaseCalendarEventRepository = require('./repositories/calendar-event-repository');
const CalendarEventService = require('./services/calendar-event-service');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

exports.handler = async (event, context) => {
  const calendarEventRepository = new SupabaseCalendarEventRepository(supabaseUrl, supabaseKey);
  const calendarEventService = new CalendarEventService(calendarEventRepository);

  if (event.httpMethod === 'GET') {
    try {
      const events = await calendarEventService.getEvents();
      if (events === null) {
        return { statusCode: 500, body: JSON.stringify({ message: 'Failed to read calendar data' }) };
      }
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
      const eventData = JSON.parse(event.body);
      let result;
      if (eventData.id) {
        result = await calendarEventService.updateEvent(eventData.id, eventData);
        if (result) {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Event updated successfully', event: result }),
          };
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Event not found' }),
          };
        }
      } else {
        result = await calendarEventService.addEvent(eventData);
        if (result) {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Event added successfully', event: result }),
          };
        } else {
          return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to add calendar event' }),
          };
        }
      }
    } catch (error) {
      console.error('Error adding/updating calendar event:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to add/update calendar event' }),
      };
    }
  } else if (event.httpMethod === 'PUT') {
    try {
      const eventData = JSON.parse(event.body);
      if (!eventData.id) {
        return { statusCode: 400, body: JSON.stringify({ message: 'Missing event ID for update' }) };
      }
      const result = await calendarEventService.updateEvent(eventData.id, eventData);
      if (result) {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Event updated successfully', event: result }),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Event not found' }),
        };
      }
    } catch (error) {
      console.error('Error updating calendar event via PUT:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to update calendar event' }),
      };
    }
  } else if (event.httpMethod === 'DELETE') {
    try {
      const { id } = JSON.parse(event.body);
      const deleted = await calendarEventService.deleteEvent(id);
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