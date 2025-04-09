const jwt = require('jsonwebtoken');
const users = require('./data/users.json');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { username, password } = JSON.parse(event.body);

  const user = users.find(u => u.username === username);

  if (user && user.password === password) {
    const userPayload = {
      id: users.indexOf(user) + 1,
      username: user.username,
    };

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      console.error('JWT_SECRET environment variable not set!');
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Server error: JWT secret not configured.' }),
      };
    }

    const token = jwt.sign(userPayload, secretKey, { expiresIn: '1h' });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login successful', token: token }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid username or password' }),
    };
  }
};