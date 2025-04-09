const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  const filePath = path.join(process.cwd(), 'netlify', 'functions', 'data', 'calendar-events.json');
  console.log('Attempting to read file at:', filePath); // Keep this line

  if (event.httpMethod === 'GET') {
    try {
      const rawData = await fs.readFile(filePath, 'utf8');
      const eventsData = JSON.parse(rawData);
      return {
        statusCode: 200,
        body: JSON.stringify(eventsData),
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
      const { title, date, time } = JSON.parse(event.body); // Receive the time
      const rawData = await fs.readFile(filePath, 'utf8');
      const eventsData = JSON.parse(rawData);

      const newEvent = { title, date, time }; // Store the time
      eventsData.events.push(newEvent);

      await fs.writeFile(filePath, JSON.stringify(eventsData, null, 2), 'utf8');

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Event added successfully', event: newEvent }),
      };
    } catch (error) {
      console.error('Error adding calendar event:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to add calendar event' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
};