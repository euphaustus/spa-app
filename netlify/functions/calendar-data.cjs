const fs = require('fs').promises;
const path = require('path');
const fsSync = require('fs');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
  const filePath = path.join(process.cwd(), 'netlify', 'functions', 'data', 'calendar-events.json');
  const dataDir = path.join(process.cwd(), 'netlify', 'functions', 'data');


  if (!fsSync.existsSync(dataDir)) {
    fsSync.mkdirSync(dataDir, { recursive: true });
  }


  if (!fsSync.existsSync(filePath)) {
    fsSync.writeFileSync(filePath, JSON.stringify({ events: [] }, null, 2), 'utf8');
  }

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
      const { title, date, time } = JSON.parse(event.body);
      const rawData = await fs.readFile(filePath, 'utf8');
      const eventsData = JSON.parse(rawData);

      const newEvent = { id: uuidv4(), title, date, time };
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
  } else if (event.httpMethod === 'DELETE') {
    try {
      const { id } = JSON.parse(event.body);
      const rawData = await fs.readFile(filePath, 'utf8');
      const eventsData = JSON.parse(rawData);

      const updatedEvents = eventsData.events.filter(event => event.id !== id);

      await fs.writeFile(filePath, JSON.stringify({ events: updatedEvents }, null, 2), 'utf8');

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Event removed successfully', id: id }),
      };
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