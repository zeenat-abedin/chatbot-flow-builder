import React from 'react';
import './globalStyles.css'

function NodesPanel({nodes, setNodes}){
  const addTextNode = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: 'textNode',
      position: { x: nodes.length * 10, y: nodes.length * 10 },
      data: { label: 'New Text Node' },
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div style={{ padding: '10px', background: '#eee' }}>
      <h3>Nodes</h3>
      <button className='add-text-node' onClick={addTextNode}>Add Text Node</button>
    </div>
  );
};

export default NodesPanel;