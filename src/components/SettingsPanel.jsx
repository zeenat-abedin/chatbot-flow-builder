import React, { useEffect, useState } from 'react';

function SettingsPanel({selectedNode, nodes, setNodes, setSelectedNode}) {
  const [label, setLabel] = useState(() => selectedNode ? selectedNode.data.label : '');

  console.log('selectedNode', selectedNode);

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
      const updatedNodes = nodes.map((node) =>
        node.id === selectedNode.id ? updatedNode : node
      );
      console.log('updatedNodes', updatedNodes);
      setNodes(updatedNodes);
      setSelectedNode(null)
      setLabel('')
    }
  };

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label);
    }
  }, [selectedNode])

  return (
    <div style={{ padding: '10px', background: '#eee' }}>
      <h3>Settings</h3>
      <input type="text" value={label} onChange={onLabelChange} />
      <button onClick={updateNode}>Update</button>
    </div>
  );
};

export default SettingsPanel;