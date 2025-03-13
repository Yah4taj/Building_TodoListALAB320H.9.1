import { useState } from 'react'
import './index.css'
import Todo from './components/Todo'
import initialState from './data/data'
import { useReducer } from 'react'

// Reducer
function todosReducer(state, action) {
  switch (action.type) {
    case "add_todo":
      const newTodo = {
        title: action.payload,
        completed: false,
        id: Date.now(),
        userId: 1
      };
      return [newTodo, ...state];
      
    case "toggle_todo":
      return state.map(todo => 
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      )
      
    case "delete_todo":
      return state.filter(todo => todo.id !== action.payload)
      
    case "edit_todo":
      return state.map(todo => 
        todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
      )
      
    default:
      return state;
  }
}

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, dispatch] = useReducer(todosReducer, initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      dispatch({ type: 'add_todo', payload: newTodo })
      setNewTodo('')
    }
  }

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', padding: '15px'}}>
      <h1>Create to-do List</h1>
      
      <form onSubmit={handleSubmit} style={{display: 'flex', margin: '15px 0'}}>
        <input 
          type="text" 
          placeholder="Add task" 
          value={newTodo} 
          onChange={e => setNewTodo(e.target.value)}
          style={{flex: 1, padding: '5px', marginRight: '10px'}}
        />
        <button type="submit">Add</button>
      </form>
      
      
      <div style={{margin: '15px 0'}}>
        <div style={{display: 'flex', alignItems: 'center', margin: '5px 0'}}>
          <input type="checkbox" id="mockup" defaultChecked style={{marginRight: '8px'}} />
          <label htmlFor="mockup" style={{flex: 1}}>Brainstorm Vision and Research</label>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        
        <div style={{display: 'flex', alignItems: 'center', margin: '5px 0'}}>
          <input type="checkbox" id="static" style={{marginRight: '8px'}} />
          <label htmlFor="static" style={{flex: 1}}>Create Vision Map</label>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
      
      <div>
        {todos.map(todo => (
          <Todo 
            key={todo.id} 
            dispatch={dispatch} 
            {...todo}
          />
        ))}
      </div>
    </div>
  )
}

export default App

