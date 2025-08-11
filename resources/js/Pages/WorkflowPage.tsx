import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "../components/Sidebar";
import CustomNode from "../components/CustomNode";
import HttpRequestModal from "../components/HttpRequestModal";
import { Dialog } from "@headlessui/react";

let nodeId = 1;

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 250, y: 50 },
    type: "custom",
    data: { label: "Trigger Flow", color: "#555", icon: null, description: "" },
  },
];

const initialEdges: Edge[] = [];

const customNode = { custom: CustomNode };

export default function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNode, setSelectedNode] = React.useState<Node | null>(null);

  interface HttpConfig {
    method: string;
    url: string;
    queryParams: { key: string; value: string }[];
    headers: { key: string; value: string }[];
    body?: {
      contentType: string;
      content: string;
    };
    options: {
      followRedirects: boolean;
      verifySSL: boolean;
    };
    auth: {
      type: "none" | "basic" | "bearer";
      username?: string;
      password?: string;
      token?: string;
    };
  }

  const onConnect = useCallback((params: Edge | Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        setNodes((nodes) => nodes.filter((node) => !node.selected));
        setEdges((edges) => edges.filter((edge) => !edge.selected));
      }
    },
    [],
  );

  const addNode = (item: any) => {
    const newNode: Node = {
      id: `${++nodeId}`,
      type: "custom",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: item.label,
        color: item.color,
        icon: item.icon,
        description: item.description,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Helper function to create merged workflow structure
  const createMergedWorkflow = () => {
    const mergedNodes = nodes.map((node) => {
      // Find all connections for this node
      const connections = edges
        .filter((edge) => edge.source === node.id || edge.target === node.id)
        .map((edge) => ({
          id: edge.id,
          type: edge.source === node.id ? "outgoing" : "incoming",
          connectedNodeId: edge.source === node.id ? edge.target : edge.source,
          connectedNodeLabel:
            nodes.find(
              (n) =>
                n.id === (edge.source === node.id ? edge.target : edge.source),
            )?.data?.label || "Unknown",
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle,
        }));

      // Separate connections by type for easier access
      const incomingConnections = connections.filter(
        (c) => c.type === "incoming",
      );
      const outgoingConnections = connections.filter(
        (c) => c.type === "outgoing",
      );

      return {
        ...node,
        connections: {
          all: connections,
          incoming: incomingConnections,
          outgoing: outgoingConnections,
          count: {
            total: connections.length,
            incoming: incomingConnections.length,
            outgoing: outgoingConnections.length,
          },
        },
      };
    });

    return {
      nodes: mergedNodes,
      metadata: {
        totalNodes: mergedNodes.length,
        totalConnections: edges.length,
        timestamp: new Date().toISOString(),
        nodeTypes: [...new Set(mergedNodes.map((n) => n.data.label))],
      },
      originalEdges: edges, // Keep for reference/reconstruction
    };
  };

  const saveWorkflow = () => {
    const workflow = createMergedWorkflow();

    console.log("ninaodsnufoasnudofasnonu", workflow);

    // Example: Log detailed connection info for each node
    workflow.nodes.forEach((node) => {
      if (node.connections.count.total > 0) {
        console.log(`📋 Node "${node.data.label}" (${node.id}) has:`, {
          totalConnections: node.connections.count.total,
          incoming: node.connections.incoming.map(
            (c) => `from ${c.connectedNodeLabel}`,
          ),
          outgoing: node.connections.outgoing.map(
            (c) => `to ${c.connectedNodeLabel}`,
          ),
        });
      }
    });

    // Show a simple notification
    alert(
      `Workflow saved! ${workflow.metadata.totalNodes} nodes, ${workflow.metadata.totalConnections} connections`,
    );
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Inter, sans-serif",
        background: "#1e1e1e",
        color: "#fff",
      }}>
      {/* Flow Canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={customNode}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(event, node) => {
            if (node.data.label === "HTTP Request") {
              setSelectedNode(node);
            }
          }}
          onKeyDown={onKeyDown}
          deleteKeyCode={["Backspace", "Delete"]}
          fitView>
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      {/* Sidebar */}
      <Sidebar addNode={addNode} onSave={saveWorkflow} />

      <HttpRequestModal
        isOpen={
          selectedNode !== null && selectedNode.data.label === "HTTP Request"
        }
        onClose={() => setSelectedNode(null)}
        onSave={(config: HttpConfig) => {
          if (selectedNode) {
            // Update the node with the HTTP configuration
            setNodes((nodes) =>
              nodes.map((node) =>
                node.id === selectedNode.id
                  ? {
                      ...node,
                      data: {
                        ...node.data,
                        httpConfig: config,
                        isConfigured: true,
                      },
                    }
                  : node,
              ),
            );
            setSelectedNode(null);
          }
        }}
        initialConfig={selectedNode?.data?.httpConfig}
      />
    </div>
  );
}
