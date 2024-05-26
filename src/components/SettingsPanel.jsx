import React, { useState, useEffect } from 'react';

function SettingsPanel({ selectedNode, onUpdate }) {
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.label);
    }
  }, [selectedNode]);

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(label);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="node-label">Node Label:</label>
      <input
        type="text"
        id="node-label"
        value={label}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default SettingsPanel;