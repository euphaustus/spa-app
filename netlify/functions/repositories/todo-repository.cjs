const fs = require('fs').promises;
const path = require('path');
const fsSync = require('fs');
const { v4: uuidv4 } = require('uuid');

class TodoRepository {
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
      fsSync.writeFileSync(this.dataFilePath, JSON.stringify({ todos: [] }, null, 2), 'utf8');
    }
  }

  async getTodos() {
    const rawData = await fs.readFile(this.dataFilePath, 'utf8');
    return JSON.parse(rawData).todos;
  }

  async saveTodos(todos) {
    await fs.writeFile(this.dataFilePath, JSON.stringify({ todos }, null, 2), 'utf8');
  }

  async addTodo(todo, description = '') {
    const todos = await this.getTodos();
    const newTodo = { id: uuidv4(), completed: false, description: '', ...todo };
    todos.push(newTodo);
    await this.saveTodos(todos);
    return newTodo;
  }

  async updateTodo(id, updatedTodo) {
    const todos = await this.getTodos();
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updatedTodo };
      await this.saveTodos(todos);
      return todos[index];
    }
    return null;
  }
}

module.exports = TodoRepository;