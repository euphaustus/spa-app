exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
    }
  
    const { username, password } = JSON.parse(event.body);
  
    // **Very Basic Authentication - Replace with secure logic later!**
    if (username === 'testuser' && password === 'password') {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login successful', token: 'mock-token-123' }), // In real app, generate a JWT here
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid username or password' }),
      };
    }
  };