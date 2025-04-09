const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');

class UserRepository {
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
    this.ensureDataFileExists();
  }

  ensureDataFileExists() {
    const dataDir = path.dirname(this.dataFilePath);
    if (!fsSync.existsSync(dataDir)) {
      fsSync.mkdirSync(dataDir, { recursive: true });
    }
    if (!fsSync.existsSync(this.dataFilePath)) {
      fsSync.writeFileSync(this.dataFilePath, JSON.stringify([]), 'utf8');
    }
  }

  async getUsers() {
    try {
      const rawData = await fs.readFile(this.dataFilePath, 'utf8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error('Error reading user data:', error);
      return [];
    }
  }

  async findUserByUsername(username) {
    const users = await this.getUsers();
    return users.find(user => user.username === username);
  }
}

module.exports = UserRepository;