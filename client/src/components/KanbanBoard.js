import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    responsible: '',
    client: '',
    status: 'To Do',
  });
  const [isFormShown, setIsFormShown] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { token: localStorage.getItem('token') },
      });
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleAddTask = () => {
    setSelectedTaskId(null);
    setIsFormShown(true);
    setFormData({
      title: '',
      description: '',
      due_date: '',
      responsible: '',
      client: '',
      status: 'To Do',
    });
  };

  const handleEditTask = (task) => {
    setSelectedTaskId(task._id);
    setIsFormShown(true);
    setFormData(task);
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
      if (selectedTaskId) {
        await axios.put(`http://localhost:5000/api/tasks/${selectedTaskId}`, formData, {
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

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    reorderedItem.status = result.destination.droppableId;
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);

    try {
      await axios.put(`http://localhost:5000/api/tasks/${reorderedItem._id}`, reorderedItem, {
        headers: { token: localStorage.getItem('token') },
      });
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  return (
    <div className="kanban-board">
      <div className="header">
        <h2>Kanban Board</h2>
        <button onClick={handleAddTask}>+ Add Task</button>
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
              required
            />
            <label>Due Date</label>
            <input
              type="date"
              value={formData.due_date.split('T')[0]}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              required
            />
            <label>Responsible</label>
            <input
              type="text"
              value={formData.responsible}
              onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
              required
            />
            <label>Client</label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              required
            />
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsFormShown(false)}>Cancel</button>
          </form>
        </div>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                className="column"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h3>{status}</h3>
                {tasks.filter((task) => task.status === status).map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        className="task-card"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={() => handleEditTask(task)}
                      >
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
                        <p>Responsible: {task.responsible}</p>
                        <p>Client: {task.client}</p>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteTask(task._id); }}>Delete</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
