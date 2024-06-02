import React from 'react';
import Board from 'react-trello';

const data = {
  lanes: [
    {
      id: '1',
      title: 'To Do',
      cards: [
        { id: 'Card1', title: 'Card 1', description: 'This is the first card in To Do lane' }
      ]
    },
    {
      id: '2',
      title: 'In Progress',
      cards: [
        { id: 'Card2', title: 'Card 2', description: 'This is the first card in In Progress lane' }
      ]
    },
    {
      id: '3',
      title: 'Done',
      cards: [
        { id: 'Card3', title: 'Card 3', description: 'This is the first card in Done lane' }
      ]
    }
  ]
};

const KanbanBoard = () => {
  return <Board data={data} draggable />;
};

export default KanbanBoard;
