
import React, { useState } from 'react'; 
import TodoList from './components/TodoList';
import './App.css';

const initialTodos = [
  { id: 1, text: 'Learn React', isCompleted: false },
  { id: 2, text: 'Build Todo App', isCompleted: false },
  { id: 3, text: 'Master React Hooks', isCompleted: false }
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      isCompleted: false
    };
    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodoText.trim() === '') return; 
    addTodo(newTodoText);
    setNewTodoText('');
  };
  const toggleTodo = (idToToggle) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === idToToggle) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
    
        return todo;
      })
    );
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>

      {}
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;