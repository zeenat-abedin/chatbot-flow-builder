import React from 'react';
import { Handle, Position } from 'reactflow';

function TextNode ({ data }) {
  return (
    <>
      <div
        style={{
          background: '#fff',
          border: '1px solid #ddd',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </>
  );
};

export default TextNode;