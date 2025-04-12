const SupabaseUserRepository = require('./repositories/user-repository');
const AuthService = require('./services/auth-service');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const jwtSecret = process.env.JWT_SECRET;

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { username, password } = JSON.parse(event.body);

  console.log('Attempting login for username:', username);

  const userRepository = new SupabaseUserRepository(supabaseUrl, supabaseKey);
  const authService = new AuthService(userRepository, jwtSecret);

  try {
    const result = await authService.login(username, password);

    if (result.success) {
      return {
        statusCode: result.statusCode,
        body: JSON.stringify({ message: 'Login successful', token: result.token }),
      };
    } else {
      return {
        statusCode: result.statusCode,
        body: JSON.stringify({ message: result.message }),
      };
    }
  } catch (error) {
    console.error('An unexpected error occurred in login handler:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Server error: An unexpected error occurred.' }) };
  }
};