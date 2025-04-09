const jwt = require('jsonwebtoken');
const path = require('path');
const UserRepository = require('./repositories/user-repository');
const bcrypt = require('bcrypt'); // Import bcrypt

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { username, password } = JSON.parse(event.body);
  const usersFilePath = path.join(__dirname, 'data', 'users.json');
  const userRepository = new UserRepository(usersFilePath);

  console.log('Attempting login for username:', username); // Log the username

  const user = await userRepository.findUserByUsername(username);

  if (user) {
    console.log('Found user:', user.username); // Log if the user is found
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch); // Log the result of the comparison
    if (isMatch) {
      const allUsers = await userRepository.getUsers();
      const userPayload = { id: allUsers.indexOf(user) + 1, username: user.username };
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
    console.log('User not found with username:', username); // Log if the user is not found
    return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password' }) };
  }
};