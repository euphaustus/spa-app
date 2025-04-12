const { createClient } = require('@supabase/supabase-js');

class SupabaseUserRepository {
  constructor(supabaseUrl, supabaseKey) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
  }

  async findUserByUsername(username) {
    const supabase = createClient(this.supabaseUrl, this.supabaseKey);

    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username);

      if (error) {
        console.error('Error fetching user from Supabase:', error);
        return null;
      }

      return users && users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('An unexpected error occurred in UserRepository:', error);
      return null;
    }
  }
}

module.exports = SupabaseUserRepository;