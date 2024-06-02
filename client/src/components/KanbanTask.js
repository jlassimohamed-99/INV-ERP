import React from 'react';

function KanbanTask({ task }) {
  return (
    <div style={{ padding: '8px', border: '1px solid lightgrey', borderRadius: '2px', marginBottom: '8px' }}>
      {task.content}
    </div>
  );
}

export default KanbanTask;
