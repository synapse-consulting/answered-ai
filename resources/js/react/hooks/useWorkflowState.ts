import React, { useCallback, useState } from "react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from "@xyflow/react";
import { NodeType, NODE_TYPES } from "../types";
import { toast } from "sonner";

const initialNodes: NodeType[] = [
  {
    id: "1",
    position: { x: 250, y: 50 },
    type: NODE_TYPES.TRIGGER,
    deletable: false,
    data: {
      result: null,
      view: {
        name: "Initial Node",
        label: "Trigger Flow",
        color: "#555555",
        icon: null,
        description: "",
        type: NODE_TYPES.TRIGGER,
      },
      config: {},
    },
  },
];

const initialEdges: Edge[] = [];

export const useWorkflowState = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = React.useState<NodeType | null>(null);
  const [isSaved, setIsSaved] = useState(true);
 
 

  // 🚫 Prevent connecting a node to itself
//   const onConnect = (connection: Connection) => {
//   if (connection.source === connection.target) {
//     return;
//   }

//   setEdges((eds) => addEdge(connection, eds));
// };



  // 🚫 Prevent connecting a node to itself and cycle
// const onConnect = (connection: Connection) => {
//   const hasReverse = edges.some(
//     (e) => e.source === connection.target && e.target === connection.source
//   );

//   if (hasReverse) {
//     console.warn("Reverse edge not allowed!");
//     return; // 🚫 block the connection
//   }

//   setEdges((eds) => addEdge(connection, eds));
// };


const wouldCreateCycle = (edges: Edge[], connection: Connection) => {
  const graph: Record<string, string[]> = {};

  edges.forEach((e) => {
    if (!graph[e.source]) graph[e.source] = [];
    graph[e.source].push(e.target);
  });

  // add the new connection temporarily
  if (!graph[connection.source]) graph[connection.source] = [];
  graph[connection.source].push(connection.target);

  // DFS to check for a path back to source
  const visited = new Set<string>();
  const stack = [connection.target];

  while (stack.length) {
    const node = stack.pop()!;
    if (node === connection.source) return true; // cycle found
    if (!visited.has(node)) {
      visited.add(node);
      stack.push(...(graph[node] || []));
    }
  }

  return false;
};

const onConnect = (connection: Connection) => {
  if (wouldCreateCycle(edges, connection)) {
    console.warn("Cycle detected, connection blocked!");
    toast.warning("Cycle detected, connection blocked!")
    return;
  }
  setEdges((eds) => addEdge(connection, eds));
};


  const handleNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    const nodeType = node?.data.view.type;
    if (nodeType !== NODE_TYPES.TRIGGER) {
      setSelectedNode(node);
      setIsSaved(false);
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
    setNodes,
    setEdges,
    isSaved
  };
};
