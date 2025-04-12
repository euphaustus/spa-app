const SupabaseToDoRepository = require('./repositories/todo-repository');
const ToDoService = require('./services/todo-service');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

exports.handler = async (event, context) => {
  const toDoRepository = new SupabaseToDoRepository(supabaseUrl, supabaseKey);
  const toDoService = new ToDoService(toDoRepository);

  if (event.httpMethod === 'GET') {
    try {
      const todos = await toDoService.getTodos();
      if (todos === null) {
        return { statusCode: 500, body: JSON.stringify({ message: 'Failed to read todos' }) };
      }
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
      const { task, description, completed } = JSON.parse(event.body);
      const newTodo = await toDoService.addTodo({ task, description, completed });
      if (newTodo) {
        return {
          statusCode: 201, // Use 201 Created for successful POST requests
          body: JSON.stringify({ message: 'Todo added successfully', todo: newTodo }),
        };
      } else {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Failed to add todo' }),
        };
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to add todo' }),
      };
    }
  } else if (event.httpMethod === 'PUT') {
    try {
      const { id, task, description, completed } = JSON.parse(event.body);
      const updatedTodo = await toDoService.updateTodo(id, { task, description, completed });
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
      const deleted = await toDoService.deleteTodo(id);
      if (deleted) {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Todo removed successfully' }),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Todo not found' }),
        };
      }
    } catch (error) {
      console.error('Error removing todo:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to delete todo' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
};