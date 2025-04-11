import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/.netlify/functions/todo');
        if (response.ok) {
          const data = await response.json();
          setTodos(data.todos);
        } else {
          console.error('Error fetching todos:', response.status);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await fetch('/.netlify/functions/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task: newTodo }),
        });

        if (response.ok) {
          const data = await response.json();
          setTodos([...todos, data.todo]);
          setNewTodo('');
        } else {
          console.error('Error adding todo:', response.status);
        }
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;