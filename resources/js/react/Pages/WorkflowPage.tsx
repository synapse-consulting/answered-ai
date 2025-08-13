import React from "react";
import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Sidebar from "../components/Sidebar";
import CustomNode from "../components/CustomNode";
import { HttpRequestModal } from "../nodes/http-request";
import { NotificationModal } from "../nodes/notification";
import { CrmModal } from "../nodes/crm";
import { useWorkflowState } from "../hooks/useWorkflowState";
import { NODE_TYPES, NodeTypes } from "../types";

const customNodeTypes: Record<NodeTypes, React.ComponentType<any>> = {
  "http-request": CustomNode,
  notification: CustomNode,
  crm: CustomNode,
  condition: CustomNode,
  trigger: CustomNode,
};

export default function WorkflowBuilder() {
  const {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
  } = useWorkflowState();

  // Modal visibility
  const isHttpRequestModalOpen = Boolean(
    selectedNode && selectedNode.data.type === NODE_TYPES.HTTP_REQUEST,
  );

  const isNotificationModalOpen = Boolean(
    selectedNode && selectedNode.data.type === NODE_TYPES.NOTIFICATION,
  );

  const isCrmModalOpen = Boolean(
    selectedNode && selectedNode.data.type === NODE_TYPES.CRM,
  );

  // Configuration extraction
  const httpRequestConfig =
    selectedNode?.data && "httpConfig" in selectedNode.data
      ? (selectedNode.data as any).httpConfig
      : undefined;
  const notificationConfig =
    selectedNode?.data && "notificationConfig" in selectedNode.data
      ? (selectedNode.data as any).notificationConfig
      : undefined;
  const crmConfig =
    selectedNode?.data && "crmConfig" in selectedNode.data
      ? (selectedNode.data as any).crmConfig
      : undefined;

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Flow Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={customNodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          deleteKeyCode={["Backspace", "Delete"]}
          colorMode="dark"
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
          className="bg-gray-900">
          <Background gap={20} size={1} className="bg-gray-900" />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Configuration Modals */}
      <HttpRequestModal
        isOpen={isHttpRequestModalOpen}
        onClose={() => setSelectedNode(null)}
        nodeId={selectedNode?.id}
        initialConfig={httpRequestConfig}
      />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setSelectedNode(null)}
        nodeId={selectedNode?.id}
        initialConfig={notificationConfig}
      />

      <CrmModal
        isOpen={isCrmModalOpen}
        onClose={() => setSelectedNode(null)}
        nodeId={selectedNode?.id}
        initialConfig={crmConfig}
      />
    </div>
  );
}
