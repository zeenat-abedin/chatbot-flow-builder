import React from 'react';

function NodesPanel({ onAddNode }) {
  const nodeTypes = [
    { id: 'text', name: 'Text Node', position: { x: 250, y: 5 }, size: { width: 100, height: 40 } },
  ];

  return (
    <div className="nodes-panel">
      {nodeTypes.map((type) => (
        <div key={type.id} draggable="true" onDragStart={(e) => e.dataTransfer.setData('application/json', JSON.stringify(type))}>
          {type.name}
        </div>
      ))}
    </div>
  );
}

export default NodesPanel;