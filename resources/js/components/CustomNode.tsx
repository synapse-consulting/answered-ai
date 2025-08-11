import React from 'react';
import { Handle, Position } from 'reactflow';

interface CustomNodeProps {
  data: {
    color: string;
    icon: React.ReactNode;
    label: string;
    description?: string;
  };
}

export default function CustomNode({ data }: CustomNodeProps) {
  console.log('Rendering CustomNode:', data);
  return (
    <div
      className="cursor-pointer"
      style={{
        background: data.color,
        padding: '10px',
        borderRadius: '8px',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '140px'
      }}
    >
      <div style={{
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '6px',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {data.icon}
      </div>
      <div>
        <div style={{ fontWeight: 'bold' }}>{data.label}</div>
        {data.description && (
          <div style={{ fontSize: '0.75rem' }}>{data.description}</div>
        )}
      </div>

      {/* Connection handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
