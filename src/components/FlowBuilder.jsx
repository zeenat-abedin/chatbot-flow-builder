import React, { useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';

import NodesPanel from './NodesPanel';
import SaveButton from './SaveButton';
import SettingsPanel from './SettingsPanel';
import TextNode from './TextNode';

const initialNodes = []

function FlowBuilder () {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const nodeTypes = useMemo(() => ({ textNode: TextNode }), []);

  const onConnect = (params) => setEdges((els) => addEdge(params, els));

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  return (
    <>
      <div style={{ display: 'flex', height: '100vh' }}>
        <NodesPanel setNodes={setNodes} nodes={nodes} />
        <div style={{ flex: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <SettingsPanel nodes={nodes} setNodes={setNodes} selectedNode={selectedNode} setSelectedNode={setSelectedNode}/>
        <SaveButton nodes={nodes} edges={edges} />
      </div>
    </>
  );
};

export default FlowBuilder;