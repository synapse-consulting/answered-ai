import React, { useCallback } from 'react';
import { 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Connection,
  Edge,
  useReactFlow
} from '@xyflow/react';
import { 
  NodeType,
  NODE_TYPES 
} from '../types';

const initialNodes: NodeType[] = [
  {
    id: "1",
    position: { x: 250, y: 50 },
    type: NODE_TYPES.TRIGGER,
    data: {
      view: {
        label: "Trigger Flow",
        color: "#555",
        icon: null,
        description: "",
        type: NODE_TYPES.TRIGGER,
      },
      metadata: {},
    },
  },
];

const initialEdges: Edge[] = [];

export const useWorkflowState = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = React.useState<NodeType | null>(null);
  
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const handleNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    const nodeType = node.data.type;
    if ([NODE_TYPES.HTTP_REQUEST, NODE_TYPES.NOTIFICATION, NODE_TYPES.CRM].includes(nodeType)) {
      setSelectedNode(node);
    }
  }, []);

  // const handleSaveWorkflow = useCallback(() => {
  //   const workflow = createWorkflowStructure();

  //   console.log("📊 Workflow Structure:", workflow);

  //   // Log detailed connection info for each node
  //   workflow.nodes.forEach((node) => {
  //     if (node.connections.count.total > 0) {
  //       console.log(`📋 Node "${node.data.label}" (${node.id}) has:`, {
  //         totalConnections: node.connections.count.total,
  //         incoming: node.connections.incoming.map(
  //           (c) => `from ${c.connectedNodeLabel}`,
  //         ),
  //         outgoing: node.connections.outgoing.map(
  //           (c) => `to ${c.connectedNodeLabel}`,
  //         ),
  //       });
  //     }
  //   });
  // }, [nodes, edges]);

  // const createWorkflowStructure = useCallback((): WorkflowStructure => {
  //   const enhancedNodes: EnhancedWorkflowNode[] = nodes.map((node) => {
  //     const connections: ConnectionMetadata[] = edges
  //       .filter((edge) => edge.source === node.id || edge.target === node.id)
  //       .map((edge) => ({
  //         id: edge.id,
  //         type: edge.source === node.id ? "outgoing" : "incoming",
  //         connectedNodeId: edge.source === node.id ? edge.target : edge.source,
  //         connectedNodeLabel:
  //           nodes.find(
  //             (n) =>
  //               n.id === (edge.source === node.id ? edge.target : edge.source),
  //           )?.data?.label || "Unknown",
  //         sourceHandle: edge.sourceHandle,
  //         targetHandle: edge.targetHandle,
  //       }));

  //     const incomingConnections = connections.filter(
  //       (c) => c.type === "incoming",
  //     );
  //     const outgoingConnections = connections.filter(
  //       (c) => c.type === "outgoing",
  //     );

  //     return {
  //       ...node,
  //       connections: {
  //         all: connections,
  //         incoming: incomingConnections,
  //         outgoing: outgoingConnections,
  //         count: {
  //           total: connections.length,
  //           incoming: incomingConnections.length,
  //           outgoing: outgoingConnections.length,
  //         },
  //       },
  //     } as EnhancedWorkflowNode;
  //   });

  //   return {
  //     nodes: enhancedNodes,
  //     metadata: {
  //       totalNodes: enhancedNodes.length,
  //       totalConnections: edges.length,
  //       timestamp: new Date().toISOString(),
  //       nodeTypes: [...new Set(enhancedNodes.map((n) => n.data.label || 'Unknown'))],
  //     },
  //     originalEdges: edges,
  //   };
  // }, [nodes, edges]);

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
  };
};