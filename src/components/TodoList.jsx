import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

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
    if (newTask.trim()) {
      const method = editingId ? 'PUT' : 'POST';
      const url = '/.netlify/functions/todo';
      const bodyData = editingId
        ? { id: editingId, task: newTask, description: newDescription }
        : { task: newTask, description: newDescription };

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          const data = await response.json();
          if (editingId) {
            setTodos(todos.map(todo =>
              todo.id === editingId ? data.todo : todo
            ));
            setEditingId(null);
          } else {
            setTodos([...todos, data.todo]);
          }
          setNewTask('');
          setNewDescription('');
        } else {
          console.error(`Error ${editingId ? 'updating' : 'adding'} todo:`, response.status);
        }
      } catch (error) {
        console.error(`Error ${editingId ? 'updating' : 'adding'} todo:`, error);
      }
    }
  };

  const handleEditClick = (todo) => {
    setNewTask(todo.task);
    setNewDescription(todo.description);
    setEditingId(todo.id);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch('/.netlify/functions/todo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
        if (editingId === id) {
          setEditingId(null);
          setNewTask('');
          setNewDescription('');
        }
      } else {
        console.error('Error deleting todo:', response.status);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCompleteToggle = async (id, completed) => {
    try {
      const response = await fetch('/.netlify/functions/todo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, completed: !completed }),
      });

      if (response.ok) {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        ));
      } else {
        console.error('Error updating todo completion:', response.status);
      }
    } catch (error) {
      console.error('Error updating todo completion:', error);
    }
  };

  const handleClearInput = () => {
    setNewTask('');
    setNewDescription('');
    setEditingId(null);
  };

  return (
    <div style={todoListContainerStyle}>
      <h2>Todo List</h2>
      <div style={addTodoContainerStyle}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Add a description..."
        />
        <button onClick={handleAddTodo}>{editingId ? 'Update' : 'Save'}</button>
        <button onClick={handleClearInput}>Clear</button>
      </div>
      <ul style={todoListStyle}>
        {todos.map((todo) => (
          <li key={todo.id} style={todoItemStyle} onClick={() => handleEditClick(todo)}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCompleteToggle(todo.id, todo.completed)}
              style={{ width: '20px', height: '20px', marginRight: '10px' }}
            />
            <div>
              <h3>{todo.task}</h3>
              {todo.description && <p>{todo.description}</p>}
            </div>
            <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const todoListContainerStyle = {
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  flexGrow: 1,
};

const addTodoContainerStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '15px',
};

const todoListStyle = {
  listStyleType: 'none',
  padding: 0,
  overflowY: 'auto',
  maxHeight: window.innerHeight - 300,
};

const todoItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  marginBottom: '8px',
  borderBottom: '1px solid #eee',
  cursor: 'pointer',
};

export default TodoList;