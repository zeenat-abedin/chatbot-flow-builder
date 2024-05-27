import React, { useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TextNode from './TextNode';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import SaveButton from './SaveButton';

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = (params) => setEdges((els) => addEdge(params, els));

  const onNodeClick = (event, node) => {
    // Handle node click event
    
    setSelectedNode(node); // Update selectedNode state
  };

  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', height: '100vh' }}>
        <NodesPanel setNodes={setNodes} nodes={nodes} />
        <div style={{ flex: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={{ textNode: TextNode }}
            onNodeClick={onNodeClick}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <SettingsPanel nodes={nodes} setNodes={setNodes} />
        <SaveButton nodes={nodes} edges={edges} />
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBuilder;