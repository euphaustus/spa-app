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
      const { task, description } = JSON.parse(event.body);
      const newTodo = await repository.addTodo({ task, description: '' });
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
    
  } else if (event.httpMethod === 'PUT') {
    try {
      const { id, task, description } = JSON.parse(event.body);
      const updatedTodo = await repository.updateTodo(id, { task, description });
      if (updatedTodo) {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Todo updated successfully', todo: updatedTodo }),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Todo not found' }),
        };
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to update todo' }),
      };
    }
  } else if (event.httpMethod === 'DELETE') {
    try {
      const { id } = JSON.parse(event.body);
      const todos = await repository.getTodos();
      const index = todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        todos.splice(index, 1);
        await repository.saveTodos(todos);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Todo deleted successfully' }),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Todo not found' }),
        };
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to delete todo' }),
      };
    }
  }
  else {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
};