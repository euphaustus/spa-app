class CalendarEventService {
    constructor(calendarEventRepository) {
      this.calendarEventRepository = calendarEventRepository;
    }
  
    async getEvents() {
      return await this.calendarEventRepository.getEvents();
    }
  
    async addEvent(event) {
      return await this.calendarEventRepository.addEvent(event);
    }
  
    async updateEvent(id, event) {
      return await this.calendarEventRepository.updateEvent(id, event);
    }
  
    async deleteEvent(id) {
      return await this.calendarEventRepository.deleteEvent(id);
    }
  }
  
  module.exports = CalendarEventService;