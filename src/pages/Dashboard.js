import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  const loadTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    await API.post('/tasks', { title, description: desc });
    setTitle('');
    setDesc('');
    loadTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    loadTasks();
  }, [navigate]);

  return (
    <div>
      <h2>Task Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong>: {task.description}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;