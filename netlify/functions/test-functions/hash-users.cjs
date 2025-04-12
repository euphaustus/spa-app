const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const saltRounds = 10;
const usersFilePath = path.join(__dirname, 'data', 'users.json');

async function hashPasswords() {
  try {
    const rawData = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(rawData);

    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        if (user.password && !user.password.startsWith('$2b$')) {
          const hashedPassword = await bcrypt.hash(user.password, saltRounds);
          return { ...user, password: hashedPassword };
        }
        return user;
      })
    );

    await fs.writeFile(usersFilePath, JSON.stringify(updatedUsers, null, 2), 'utf8');
    console.log('Successfully hashed passwords in users.json');
  } catch (error) {
    console.error('Error hashing passwords:', error);
  }
}

hashPasswords();