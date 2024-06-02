import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KanbanList from './KanbanList';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Setup project repository' },
    'task-2': { id: 'task-2', content: 'Create project structure' },
    'task-3': { id: 'task-3', content: 'Develop login functionality' },
  },
  lists: {
    'list-1': { id: 'list-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
    'list-2': { id: 'list-2', title: 'In Progress', taskIds: ['task-3'] },
    'list-3': { id: 'list-3', title: 'Done', taskIds: [] },
  },
  listOrder: ['list-1', 'list-2', 'list-3'],
};

function KanbanBoard() {
  const [data, setData] = useState(initialData);

  const moveTask = (taskId, newListId) => {
    const sourceListId = Object.keys(data.lists).find((listId) =>
      data.lists[listId].taskIds.includes(taskId)
    );

    const sourceList = data.lists[sourceListId];
    const destinationList = data.lists[newListId];

    sourceList.taskIds = sourceList.taskIds.filter((id) => id !== taskId);
    destinationList.taskIds.push(taskId);

    setData({
      ...data,
      lists: {
        ...data.lists,
        [sourceListId]: sourceList,
        [newListId]: destinationList,
      },
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        {data.listOrder.map((listId) => {
          const list = data.lists[listId];
          const tasks = list.taskIds.map((taskId) => data.tasks[taskId]);

          return <KanbanList key={list.id} list={list} tasks={tasks} moveTask={moveTask} />;
        })}
      </div>
    </DndProvider>
  );
}

export default KanbanBoard;
