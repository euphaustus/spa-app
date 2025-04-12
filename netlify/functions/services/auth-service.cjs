const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor(userRepository, jwtSecret) {
    this.userRepository = userRepository;
    this.jwtSecret = jwtSecret;
  }

  async login(username, password) {
    const user = await this.userRepository.findUserByUsername(username);

    if (!user) {
      return { success: false, message: 'Invalid username or password', statusCode: 401 };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { success: false, message: 'Invalid username or password', statusCode: 401 };
    }

    if (!this.jwtSecret) {
      console.error('JWT_SECRET environment variable not set!');
      return { success: false, message: 'Server error: JWT secret not configured.', statusCode: 500 };
    }

    const userPayload = { id: user.id, username: user.username };
    const token = jwt.sign(userPayload, this.jwtSecret, { expiresIn: '1h' });

    return { success: true, token: token, statusCode: 200 };
  }
}

module.exports = AuthService;