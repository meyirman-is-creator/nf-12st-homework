import React, { useReducer, useState } from 'react';

const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'add_todo':
      return { ...state, todos: [...state.todos, { text: action.text, completed: false }] };
    case 'toggle_todo':
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.index ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'clear_completed':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim()) {
      dispatch({ type: 'add_todo', text });
      setText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') addTodo();
        }}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {state.todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => dispatch({ type: 'toggle_todo', index })}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: 'clear_completed' })}>Clear Completed Tasks</button>
    </div>
  );
}

export default TodoList;
