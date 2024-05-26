import React from 'react';
import { useNodesState, useEdgesState } from 'reactflow';

const SaveButton = () => {
  const [nodes] = useNodesState([]);
  const [edges] = useEdgesState([]);

  const saveFlow = () => {
    const isValid = validateFlow(nodes, edges);
    if (isValid) {
      // Save the flow data (nodes and edges)
      console.log('Saving flow:', { nodes, edges });
    } else {
      alert('Invalid flow: More than one node has empty target handles.');
    }
  };

  const validateFlow = (nodes, edges) => {
    const nodesWithEmptyTargets = nodes.filter(
      (node) => node.type === 'textNode' && !edges.some((edge) => edge.target === node.id)
    );
    return nodesWithEmptyTargets.length <= 1;
  };

  return (
    <div style={{ padding: '10px', background: '#eee' }}>
      <h3>Save</h3>
      <button onClick={saveFlow}>Save</button>
    </div>
  );
};

export default SaveButton;