import React, { useCallback, useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background, applyNodeChanges, applyEdgeChanges } from 'react-flow-renderer';
import SettingsPanel from './SettingsPanel';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [
  { id: '1-2', source: '1', target: '2', type: 'step', animated: true },
];

function FlowBuilder() {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    [],
  );
  const onConnect = (params) => setNodes((els) => addEdge(els, params));

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
    // setSelectedNode(null);
    };    
    
  const onSaveButtonClick = () => {
  const nodesWithEmptyTargetHandles = nodes.filter(
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

  const addNode = (type, position) => {
  if (!position ||!position.x ||!position.y) {
    console.error('Invalid position:', position);
    return;
  }
   const newNode = {
    id: Date.now().toString(),
    type, 
    data: { label: 'Send Message', inputValue: '',  },
    position,
    targetHandles: [], 
    sourceHandles: [] 
  };

  setNodes((prevNodes) => [...prevNodes, newNode]);
  };
  
  const CustomTextNode = ({ data, position, id, type, sourceHandles, targetHandles }) => {
  return (
    <div style={{ position: 'absolute', left: position.x, top: position.y }}>
      <div>{data.label}</div>
      <input
        type="text"
        value={data.inputValue}
        onChange={(e) => handleChange(e, id)}
      />
    </div>
  );
  };

   const handleChange = (e, id) => {
    const nodeIndex = nodes.findIndex(node => node.id === id);
    const updatedNodes = [...nodes];
    updatedNodes[nodeIndex].data.inputValue = e.target.value;
    setNodes(updatedNodes);
  };

  return (  
    <div style={{ height: 500 }}>
      <button style={{ display: 'flex', justifyContent: 'flex-end' }} onClick={onSaveButtonClick}>Save Changes</button>
      <ReactFlow
        nodeTypes={{
        text: CustomTextNode,
        }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={handleSelectionChange}
        onDragStop={() => handleDeselectNode()}
       >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    {showSettings && (
      <SettingsPanel
        selectedNode={selectedNode}
        onUpdate={(newLabel) => {
          setNodes((els) =>
            els.map((el) =>
              el.id === selectedNode? {...el, label: newLabel } : el
            )
          );
          setShowSettings(false); 
        }}
      />
      )} 
    <button onClick={() => addNode('text', { x: 100, y: 100 })}>Add New Node</button>  
    </div>
  );
};

export default FlowBuilder;
