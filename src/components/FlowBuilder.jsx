import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import SettingsPanel from './SettingsPanel';


function FlowBuilder() {
const NODE_TYPES = [
  { id: 'text', name: 'Text Node' },
];

  const [elements, setElements] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const onConnect = (params) => setElements((els) => addEdge(els, params));

  const addEdge = (elements, { id, source, target }) => {
  const existingElementIndex = elements.findIndex((el) => el.id === source);
  let updatedElements = [...elements];

  if (existingElementIndex !== -1) {
    const existingElement = updatedElements[existingElementIndex];
    if (!existingElement.targetHandles ||!Array.isArray(existingElement.targetHandles)) {
      existingElement.targetHandles = [];
    }
    existingElement.targetHandles.push(target);
  }

  updatedElements = updatedElements.concat({
    id,
    source,
    target,
    animated: true,
  });

  return updatedElements;
};

  const handleSelectNode = (e, selectedElement, nodeId) => {
      e.stopPropagation()
      if (selectedElement) {        
        console.log(selectedElement.id); 
      }
      setSelectedNode(nodeId);
      setShowSettings(true);
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
    
  const onSaveButtonClick = () => {
    const nodesWithEmptyTargetHandles = elements.filter(
    (element) =>
      Array.isArray(element.targetHandles) &&
      element.targetHandles.length > 0 &&
      element.targetHandles.every((targetHandle) => targetHandle === '')
  );

  if (nodesWithEmptyTargetHandles.length > 0) {
    alert("Error: More than one node has empty target handles.");
    return;
  }

  console.log("Saving the flow...");
  };

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
        <button onClick={onSaveButtonClick}>Save</button>
    {showSettings && (
      <SettingsPanel
        selectedNode={selectedNode}
        onUpdate={(newLabel) => {
          setElements((els) =>
            els.map((el) =>
              el.id === selectedNode? {...el, label: newLabel } : el
            )
          );
          setShowSettings(false); 
        }}
      />
    )} 
    </div>
  );
};

export default FlowBuilder;
