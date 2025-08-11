import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from '../components/Sidebar';
import CustomNode from '../components/CustomNode';

let nodeId = 1;

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 250, y: 50 },
    type: 'custom',
    data: { label: 'Trigger Flow', color: '#555', icon: null, description: '' },
  },
];

const initialEdges: Edge[] = [];

export default function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const [onModalOpened, setModalOpended] = React.useState(false)

  const onConnect = useCallback((params: Edge | Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      setNodes(nodes => nodes.filter(node => !node.selected));
      setEdges(edges => edges.filter(edge => !edge.selected));
    }
  }, []);

  const addNode = (item: any) => {
    const newNode: Node = {
      id: `${++nodeId}`,
      type: 'custom',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: item.label,
        color: item.color,
        icon: item.icon,
        description: item.description
      }
    };
    setNodes((nds) => [...nds, newNode]);
  };
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif', background: '#1e1e1e', color: '#fff' }}>
      {/* Flow Canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ custom: CustomNode }} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(it) => {
            console.log('🍪 WORKFLOWPAGE.TSX ==> Tag', it);
          }}
          onKeyDown={onKeyDown}
          deleteKeyCode={['Backspace', 'Delete']}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      {/* Sidebar */}
      <Sidebar addNode={addNode} />
    </div>
  );
}
