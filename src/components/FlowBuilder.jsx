import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';


function FlowBuilder() {
const NODE_TYPES = [
  { id: 'text', name: 'Text Node' },
];

    const [elements, setElements] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
  
  const onConnect = (params) => setElements((els) => addEdge(els, params));

  const addEdge = (elements, { id, source, target }) =>
    elements.concat({
      id,
      source,
      target,
      animated: true,
    });

  const handleSelectNode = (e, selectedElement, nodeId) => {
      e.stopPropagation()
      if (selectedElement) {        
        console.log(selectedElement.id); 
      }
      setSelectedNode(nodeId);
    };
    
  const handleSelectionChange = (e) => {
    if (e.selectedElement && typeof e.selectedElement.id === 'string') {
    handleSelectNode(e, e.selectedElement.id);
    } else {
    console.error('Selected element is undefined or does not have an id');
    }
  }

  const handleDeselectNode = () => {
    setSelectedNode(null);
    };
    
  const nodeTypes = NODE_TYPES.map((type) => ({
   ...type,
    position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
  }));

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onSelectionChange={handleSelectionChange}
        onDragStop={() => handleDeselectNode()}
       >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
