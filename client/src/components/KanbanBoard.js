import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanBoard.css';

const KanbanBoard = ({ onReturn, projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [isFormShown, setIsFormShown] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', due_date: '', responsable: '', status: 'To Do' });
  const [users, setUsers] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks?projectId=${projectId}`, {
        headers: { token: localStorage.getItem('token') },
      });
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [projectId]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { token: localStorage.getItem('token') },
      });
      const employees = response.data.filter(user => user.role === 'admin' || user.role === 'chef d\'équipe');
      setUsers(employees);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, [fetchTasks, fetchUsers]);

  const handleAddTask = () => {
    setIsFormShown(true);
    setFormData({ title: '', description: '', due_date: '', responsable: '', status: 'To Do' });
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { token: localStorage.getItem('token') },
      });
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err.response ? err.response.data : err.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`http://localhost:5000/api/tasks/${formData._id}`, formData, {
          headers: { token: localStorage.getItem('token') },
        });
      } else {
        await axios.post('http://localhost:5000/api/tasks', formData, {
          headers: { token: localStorage.getItem('token') },
        });
      }
      fetchTasks();
      setIsFormShown(false);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks => prevTasks.map(task => {
        if (task.status !== 'Done' && new Date(task.due_date) < new Date()) {
          return { ...task, status: 'Overdue' };
        }
        return task;
      }));
    }, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.status = result.destination.droppableId;
    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);

    // Update the task status in the backend
    axios.put(`http://localhost:5000/api/tasks/${movedTask._id}`, movedTask, {
      headers: { token: localStorage.getItem('token') },
    }).catch(err => console.error('Error updating task status:', err));
  };

  return (
    <div className="kanban-board">
      <div className="header">
        <h2>Kanban Board</h2>
        <button onClick={handleAddTask}>+ Add Task</button>
        <button onClick={onReturn}>Return to Project Management</button>
      </div>
      {isFormShown && (
        <div className="form-container">
          <form onSubmit={handleFormSubmit}>
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <label>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <label>Due Date</label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            />
            <label>Responsible</label>
            <select
              value={formData.responsable}
              onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
              required
            >
              <option value="">Select Responsible</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              <option value="Overdue" disabled={true}>Overdue</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsFormShown(false)}>Cancel</button>
          </form>
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-columns">
          {['To Do', 'In Progress', 'Done', 'Overdue'].map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{status}</h3>
                  {tasks.filter(task => task.status === status).map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          className="task-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h4>{task.title}</h4>
                          <p>{task.description}</p>
                          <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
                          <p>Responsible: {users.find(user => user._id === task.responsable)?.name || 'N/A'}</p>
                          <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
