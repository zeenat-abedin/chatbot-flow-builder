import React, { useState } from 'react';
import { useNodesState } from 'reactflow';

function SettingsPanel() {
  const [nodes, setNodes] = useNodesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [label, setLabel] = useState('');

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
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