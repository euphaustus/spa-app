const fs = require('fs').promises;
const path = require('path');
const fsSync = require('fs');
const { v4: uuidv4 } = require('uuid');

class CalendarEventRepository {
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
    this.ensureDataFileExists();
  }

  async ensureDataFileExists() {
    const dataDir = path.dirname(this.dataFilePath);
    if (!fsSync.existsSync(dataDir)) {
      fsSync.mkdirSync(dataDir, { recursive: true });
    }
    if (!fsSync.existsSync(this.dataFilePath)) {
      fsSync.writeFileSync(this.dataFilePath, JSON.stringify({ events: [] }, null, 2), 'utf8');
    }
  }

  async getEvents() {
    const rawData = await fs.readFile(this.dataFilePath, 'utf8');
    return JSON.parse(rawData).events;
  }

  async saveEvents(events) {
    await fs.writeFile(this.dataFilePath, JSON.stringify({ events }, null, 2), 'utf8');
  }

  async addEvent(event) {
    const events = await this.getEvents();
    const newEvent = { id: uuidv4(), ...event };
    events.push(newEvent);
    await this.saveEvents(events);
    return newEvent;
  }

  async updateEvent(id, updatedEvent) {
    const events = await this.getEvents();
    const index = events.findIndex(event => event.id === id);
    if (index !== -1) {
      events[index] = { id, ...updatedEvent };
      await this.saveEvents(events);
      return events[index];
    }
    return null;
  }

  async deleteEvent(id) {
    const events = await this.getEvents();
    const initialLength = events.length;
    const updatedEvents = events.filter(event => event.id !== id);
    if (updatedEvents.length < initialLength) {
      await this.saveEvents(updatedEvents);
      return true;
    }
    return false;
  }
}

module.exports = CalendarEventRepository;