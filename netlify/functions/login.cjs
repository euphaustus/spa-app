const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { username, password } = JSON.parse(event.body);
  const tableNameToCheck = 'users';

  console.log('Attempting login for username:', username);

  try {

    const { data: schemas, error: schemasError } = await supabase
      .from('information_schema.schemata')
      .select('schema_name');

    if (schemasError) {
      console.error('Error fetching schemas from information_schema:', schemasError);
    } else {
      console.log('Available schemas in information_schema:', schemas);
    }

    const { data: users, error } = await supabase
      .from(tableNameToCheck)
      .select('*')
      .eq('username', username);

    console.log('Supabase query result:', { users, error });

    if (error) {
      console.error('Error fetching user from Supabase:', error);
      return { statusCode: 500, body: JSON.stringify({ message: 'Server error: Could not fetch user.' }) };
    }

    if (users && users.length > 0) {
      const user = users[0];
      console.log('Found user:', user.username);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match result:', isMatch);

      if (isMatch) {
        const userPayload = { id: user.id, username: user.username };
        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
          console.error('JWT_SECRET environment variable not set!');
          return { statusCode: 500, body: JSON.stringify({ message: 'Server error: JWT secret not configured.' }) };
        }

        const token = jwt.sign(userPayload, secretKey, { expiresIn: '1h' });
        return { statusCode: 200, body: JSON.stringify({ message: 'Login successful', token: token }) };
      } else {
        return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password' }) };
      }
    } else {
      console.log('User not found with username:', username);
      return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password' }) };
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Server error: An unexpected error occurred.' }) };
  }
};