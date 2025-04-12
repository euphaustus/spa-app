const { createClient } = require('@supabase/supabase-js');

class SupabaseToDoRepository {
  constructor(supabaseUrl, supabaseKey) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
  }

  async getTodos() {
    const supabase = createClient(this.supabaseUrl, this.supabaseKey);
    try {
      const { data: todos, error } = await supabase
        .from('todo')
        .select('*');
      if (error) {
        console.error('Error fetching todos from Supabase:', error);
        return null;
      }
      return todos;
    } catch (error) {
      console.error('An unexpected error occurred in getTodos:', error);
      return null;
    }
  }

  async addTodo(todo) {
    const supabase = createClient(this.supabaseUrl, this.supabaseKey);
    try {
      const { data: newTodo, error } = await supabase
        .from('todo')
        .insert([todo])
        .select()
        .single();
      if (error) {
        console.error('Error adding todo to Supabase:', error);
        return null;
      }
      return newTodo;
    } catch (error) {
      console.error('An unexpected error occurred in addTodo:', error);
      return null;
    }
  }

  async updateTodo(id, todo) {
    const supabase = createClient(this.supabaseUrl, this.supabaseKey);
    try {
      const { data: updatedTodo, error } = await supabase
        .from('todo')
        .update(todo)
        .eq('id', id)
        .select()
        .single();
      if (error) {
        console.error('Error updating todo in Supabase:', error);
        return null;
      }
      return updatedTodo;
    } catch (error) {
      console.error('An unexpected error occurred in updateTodo:', error);
      return null;
    }
  }

  async deleteTodo(id) {
    const supabase = createClient(this.supabaseUrl, this.supabaseKey);
    try {
      const { error } = await supabase
        .from('todo')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Error deleting todo from Supabase:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('An unexpected error occurred in deleteTodo:', error);
      return false;
    }
  }
}

module.exports = SupabaseToDoRepository;