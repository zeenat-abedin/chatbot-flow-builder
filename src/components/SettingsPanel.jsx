import React, { useState, useEffect } from 'react';

function SettingsPanel({ selectedNode, onUpdate, nodes }) {
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setLabel(nodes.find(node => node.id === selectedNode).data.label);
    }
  }, [nodes, selectedNode]);

  const handleChange = (e) => {
    setLabel(e.target.value);
  };

  return (
     <div>
      <h3>Edit Node</h3>
      <input type="text" value={label} onChange={handleChange} />
      <button onClick={() => onUpdate(label)}>Update</button>
    </div>
  );
}

export default SettingsPanel;