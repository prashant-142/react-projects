import { useState } from 'react';

const Todo = () => {
    const [query, setQuery] = useState('');
    const [todos, setTodos] = useState([]);

    const handleAdd = () => {
        setTodos([...todos, query]);
        setQuery('');
    }

    const handleDelete = (index) => {
        setTodos(todos.toSpliced(index,1));
    }

    const handleKeyDown  = (e) => {
        if (e.key === 'Enter') {
            handleAdd()
        }
    }

    return <div>
        <input placeholder="Add todo" value={query} onChange={e => setQuery(e.target.value)}  onKeyDown={handleKeyDown} />
        <button onClick={handleAdd}>Add</button>

        <ul>
            {todos.map((todo, index) => { return (<span><li key={index-`${todo}`}>{todo}</li> <button onClick={() => handleDelete(index)}>x</button> </span>) })}
        </ul>
    </div>
}

export default Todo;