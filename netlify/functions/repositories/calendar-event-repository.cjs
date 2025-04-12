const { createClient } = require('@supabase/supabase-js');

class SupabaseCalendarEventRepository {
  constructor(supabaseUrl, supabaseKey) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
  }

  async getEvents() {
    const supabase = createClient(this.supabaseUrl, this.supabaseKey);
    try {
      const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .order('time', { ascending: true });
      if (error) {
        console.error('Error fetching events from Supabase:', error);
        return null;
      }
      return events;
    } catch (error) {
      console.error('An unexpected error occurred in getEvents:', error);
      return null;
    }
  }

  async addEvent(event) {
    const supabase = createClient(this.supabaseUrl, this.supabaseKey);
    try {
      const { data: newEvent, error } = await supabase
        .from('events')
        .insert([event])
        .select()
        .single();
      if (error) {
        console.error('Error adding event to Supabase:', error);
        return null;
      }
      return newEvent;
    } catch (error) {
      console.error('An unexpected error occurred in addEvent:', error);
      return null;
    }
  }

  async updateEvent(id, event) {
    const supabase = createClient(this.supabaseUrl, this.supabaseKey);
    try {
      const { data: updatedEvent, error } = await supabase
        .from('events')
        .update(event)
        .eq('id', id)
        .select();
      if (error) {
        console.error('Error updating event in Supabase:', error);
        return null;
      }
      return updatedEvent;
    } catch (error) {
      console.error('An unexpected error occurred in updateEvent:', error);
      return null;
    }
  }

  async deleteEvent(id) {
    const supabase = createClient(this.supabaseUrl, this.supabaseKey);
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Error deleting event from Supabase:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('An unexpected error occurred in deleteEvent:', error);
      return false;
    }
  }
}

module.exports = SupabaseCalendarEventRepository;