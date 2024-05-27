import React from 'react';

function NodesPanel({nodes, setNodes}){
  const addTextNode = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: 'textNode',
      position: { x: 0, y: 0 },
      data: { label: 'New Text Node' },
    };
    console.log(setNodes())
    setNodes([...nodes, newNode]);
  };

  return (
    <div style={{ padding: '10px', background: '#eee' }}>
      <h3>Nodes</h3>
      <button onClick={addTextNode}>Add Text Node</button>
    </div>
  );
};

export default NodesPanel;