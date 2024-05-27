import React, { useState } from 'react';

function SettingsPanel({selectedNode, nodes, setNodes}) {
  const [label, setLabel] = useState(selectedNode ? selectedNode.data.label : '');

  const onNodeClick = (event, node) => {
    setLabel(node.data.label);
  };

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const updateNode = () => {
    if (selectedNode) {
      const updatedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          label,
        },
      };
      setNodes((nodes) =>
        nodes.map((node) => (node.id === selectedNode.id ? updatedNode : node))
      );
    }
  };

  return (
    <div style={{ padding: '10px', background: '#eee' }}>
      <h3>Settings</h3>
      <input type="text" value={label} onChange={onLabelChange} />
      <button onClick={updateNode}>Update</button>
    </div>
  );
};

export default SettingsPanel;