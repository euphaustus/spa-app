const path = require('path');
const TodoRepository = require('./repositories/todo-repository.cjs');

exports.handler = async (event, context) => {
  const dataFilePath = path.join(process.cwd(), 'netlify', 'functions', 'data', 'todos.json');
  const repository = new TodoRepository(dataFilePath);

  if (event.httpMethod === 'GET') {
    try {
      const todos = await repository.getTodos();
      return {
        statusCode: 200,
        body: JSON.stringify({ todos }),
      };
    } catch (error) {
      console.error('Error reading todos:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to read todos' }),
      };
    }
  } else if (event.httpMethod === 'POST') {
    try {
      const { task } = JSON.parse(event.body);
      const newTodo = await repository.addTodo({ task });
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Todo added successfully', todo: newTodo }),
      };
    } catch (error) {
      console.error('Error adding todo:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to add todo' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
};