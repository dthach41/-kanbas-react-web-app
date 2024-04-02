import React, { useState, useEffect } from "react";
import axios from "axios";

function WorkingWithArrays() {
    const API = "http://localhost:4000/a5/todos";

    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    const [todos, setTodos] = useState<any[]>([]);
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    const removeTodo = async (todo: {
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    }) => {
        const response = await axios.get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };

    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };

    const fetchTodoById = async (id: number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };

    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };


    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };


    const deleteTodo = async (todo: {
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    }) => {
        const response = await axios.delete(`${API}/${todo.id}`);
        setTodos(todos.filter((t) => t.id !== todo.id));
    };


    const updateTodo = async () => {
        const response = await axios.put(`${API}/${todo.id}`, todo);
        setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    };


    return (
        <div>
            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a href={API}>
                Get Todos
            </a>

            <h4>Retrieving an Item from an Array by ID</h4>
            <input type="number" value={todo.id}
                onChange={(e) => setTodo({
                    ...todo,
                    id: parseInt(e.target.value)
                })} />
            <a href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>

            <h3>Filtering Array Items</h3>
            <a href={`${API}?completed=true`} className="btn btn-primary">
                Get Completed Todos
            </a>

            <h3>Creating new Items in an Array</h3>
            <a href={`${API}/create`} className="btn btn-primary">
                Create Todo
            </a>

            <h3>Deleting from an Array</h3>
            <a href={`${API}/${todo.id}/delete`} className="btn btn-danger">
                Delete Todo with ID = {todo.id}
            </a>


            <h2>Working with Arrays</h2>
            <input type="number" value={todo.id}
                onChange={(e) => setTodo({
                    ...todo, id: parseInt(e.target.value)
                })} />
            <input type="text" value={todo.title}
                onChange={(e) => setTodo({
                    ...todo, title: e.target.value
                })} />
            <h3>Updating an Item in an Array</h3>
            <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary">
                Update Title to {todo.title}
            </a>


            <h3>Updating Todo's 'Completed' Property </h3>
            {/* clicking this btn updates the completed property */}
            <a href={`${API}/${todo.id}/completed/${todo.completed}`} className="btn btn-primary" style={{marginRight:'10px'}}>
                Update Todo's 'Completed' Property
            </a>
            <input type="checkbox" checked={todo.completed}
                onChange={(e)=> setTodo({
                    ...todo,
                    completed: !todo.completed
                })}>
            </input>


            <h3>Updating Todo's Description</h3>
            <a href={`${API}/${todo.id}/description/${todo.description}`} className="btn btn-primary"
             style={{ marginBottom: '10px' }}>
                Update Module Description
            </a>
            <br/>
            <textarea value={todo.description}
                onChange={(e) => setTodo({
                    ...todo,
                    description: e.target.value
                })}>

            </textarea>

            <br/>


            <input type="number" value={todo.id}
                onChange={(e) => setTodo({
                    ...todo, id: parseInt(e.target.value)
                })} />
            <input type="text" value={todo.title}
                onChange={(e) => setTodo({
                    ...todo, title: e.target.value
                })} />

            <textarea value={todo.description} 
                onChange={(e) => setTodo({
                    ...todo,
                    description: e.target.value
                })} />
            <input value={todo.due} type="date"
                onChange={(e) => setTodo({
                    ...todo, due: e.target.value
                })} />
            <label>
                <input checked={todo.completed} type="checkbox"
                    onChange={(e) => setTodo({
                        ...todo, completed: e.target.checked
                    })} />
                Completed
            </label>

            <ul className='list-group'>
                <li>
                    <button onClick={createTodo} className='btn btn-primary'>
                        Create Todo
                    </button>
                </li>
                <li>
                    <button onClick={updateTitle} className='btn btn-success'>
                        Update Title
                    </button>
                </li>
                <li>
                    <button onClick={postTodo} className='btn btn-warning'> Post Todo </button>
                </li>
                <li>
                    <button onClick={updateTodo} className='btn btn-info'> Update Todo </button>
                </li>
            </ul>

            <ul className="list-group">
                {todos.map((todo) => (
                    <li key={todo.id} className="list-group-item" style={{width:'280px'}}> 
                    
                        <input checked={todo.completed} style={{marginRight:'10px'}}
                            type="checkbox" readOnly />
                        {todo.title}
                        <p>{todo.description}</p>
                        <p>{todo.due}</p>
                        <p>{todo.completed + ''}</p>
                        <button onClick={() => deleteTodo(todo)}
                            className="btn btn-danger ms-2">
                            Delete
                        </button>
                        <button onClick={() => fetchTodoById(todo.id)} className='btn btn-warning' style={{ marginLeft: '10px' }}>
                            Edit
                        </button>
                    </li>
                ))}
            </ul>

            

            
        </div>
    );
}
export default WorkingWithArrays;