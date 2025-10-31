
import React from 'react';


function TodoItem({ todo, toggleTodo }) {
  

  const itemStyle = {
    textDecoration: todo.isCompleted ? 'line-through' : 'none',
    cursor: 'pointer' 
  };

  return (
    <li style={itemStyle} onClick={() => toggleTodo(todo.id)}>
      {todo.text}
    </li>
  );
}

export default TodoItem;