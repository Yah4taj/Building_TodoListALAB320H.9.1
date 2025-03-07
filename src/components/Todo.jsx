import { useState } from "react"

function Todo({title, completed, id, dispatch}) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(title)
    
    const handleDelete = () => {
        dispatch({type: 'delete_todo', payload: id})
    }
    
    const handleEdit = () => {
        setIsEditing(true)
    }
    
    const saveEdit = () => {
        if (editText.trim()) {
            dispatch({
                type: 'edit_todo',
                payload: { id, title: editText }
            })
            setIsEditing(false)
        }
    }
    
    const cancelEdit = () => {
        setIsEditing(false)
        setEditText(title)
    }
    
    return (
        <div style={styles}>
            {isEditing ? (
                <>
                    <input 
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        style={{flex: 1, marginRight: '10px'}}
                    />
                    <button onClick={saveEdit} style={buttonStyle}>Save</button>
                    <button onClick={cancelEdit} style={buttonStyle}>Cancel</button>
                </>
            ) : (
                <>
                    <h2 style={{
                        flex: 1, 
                        textDecoration: completed ? 'line-through' : 'none'
                    }}>
                        {title}
                    </h2>
                    <input 
                        type="checkbox" 
                        checked={completed} 
                        onChange={() => dispatch({type: 'toggle_todo', payload: id})}
                    />
                    <button onClick={handleEdit} style={buttonStyle}>Edit</button>
                    <button onClick={handleDelete} style={buttonStyle}>Delete</button>
                </>
            )}
        </div>
    )
}

const styles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: "10px",
    borderBottom: '1px solid #ddd'
}

const buttonStyle = {
    padding: '5px 10px',
    margin: '0 3px',
    cursor: 'pointer'
}

export default Todo