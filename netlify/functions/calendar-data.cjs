const fs = require('fs').promises;
const path = require('path');
const fsSync = require('fs'); // Import the synchronous fs module

exports.handler = async (event, context) => {
  const filePath = path.join(process.cwd(), 'netlify', 'functions', 'data', 'calendar-events.json');
  console.log('Attempting to access file at:', filePath);
  console.log('Current working directory:', process.cwd());

  const dataDir = path.join(process.cwd(), 'netlify', 'functions', 'data');
  console.log('Checking contents of data directory:', dataDir);

  try {
    const filesInDataDir = fsSync.readdirSync(dataDir);
    console.log('Contents of data directory:', filesInDataDir);
  } catch (error) {
    console.log('Error reading data directory:', error);
  }

  if (event.httpMethod === 'GET') {
    try {
      // Check if the file exists
      if (!fsSync.existsSync(filePath)) {
        console.log('Calendar data file not found, creating a new one.');
        // Create the directory if it doesn't exist
        if (!fsSync.existsSync(dataDir)) {
          fsSync.mkdirSync(dataDir, { recursive: true });
        }
        await fs.writeFile(filePath, JSON.stringify({ events: [] }, null, 2), 'utf8');
      }
      const rawData = await fs.readFile(filePath, 'utf8');
      const eventsData = JSON.parse(rawData);
      return {
        statusCode: 200,
        body: JSON.stringify(eventsData),
      };
    } catch (error) {
      console.error('Error reading or creating calendar data:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to read or create calendar data' }),
      };
    }
  } else if (event.httpMethod === 'POST') {
    try {
      const { title, date, time } = JSON.parse(event.body);
      // Ensure the file exists before trying to read it for POST as well
      if (!fsSync.existsSync(filePath)) {
        // This should ideally be handled by the GET, but as a safeguard:
        if (!fsSync.existsSync(dataDir)) {
          fsSync.mkdirSync(dataDir, { recursive: true });
        }
        await fs.writeFile(filePath, JSON.stringify({ events: [] }, null, 2), 'utf8');
      }
      const rawData = await fs.readFile(filePath, 'utf8');
      const eventsData = JSON.parse(rawData);

      const newEvent = { title, date, time };
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