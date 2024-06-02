import React from 'react';
import KanbanTask from './KanbanTask';

function KanbanList({ list, tasks }) {
  return (
    <div style={{ margin: '8px', border: '1px solid lightgrey', borderRadius: '2px', padding: '8px', width: '250px' }}>
      <h3>{list.title}</h3>
      <div>
        {tasks.map((task) => (
          <KanbanTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default KanbanList;
