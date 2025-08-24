import React from "react";
import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Sidebar from "../components/Sidebar";
import CustomNode from "../components/CustomNode";
import { NotificationModal } from "../nodes/notification/NotificationModal";
import { CrmModal } from "../nodes/crm/CrmModal";
import { ConditionModal } from "../nodes/condition/ConditionModal";
import { useWorkflowState } from "../hooks/useWorkflowState";
import { NODE_TYPES, NodeTypes } from "../types";
import { HttpRequestModal } from "../nodes/http-request/HttpRequestModal";
import HttpRequestNode from "../nodes/http-request/HttpRequestNode";
import TriggerNode from "../nodes/trigger/TriggerNode";

const customNodeTypes: Record<NodeTypes, React.ComponentType<any>> = {
  trigger: TriggerNode,
  httpRequest: HttpRequestNode,
  notification: CustomNode,
  crm: CustomNode,
  condition: CustomNode,
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

  const conditionConfig =
    selectedNode?.data && "conditionConfig" in selectedNode.data
      ? (selectedNode.data as any).conditionConfig
      : undefined;

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
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

      <Sidebar />

      <HttpRequestModal
        isOpen={selectedNode?.type === NODE_TYPES.HTTP_REQUEST}
        onClose={() => setSelectedNode(null)}
        nodeId={selectedNode?.id}
        initialConfig={httpRequestConfig}
      />

      <NotificationModal
        isOpen={selectedNode?.type === NODE_TYPES.NOTIFICATION}
        onClose={() => setSelectedNode(null)}
        nodeId={selectedNode?.id}
        initialConfig={notificationConfig}
      />

      <CrmModal
        isOpen={selectedNode?.type === NODE_TYPES.CRM}
        onClose={() => setSelectedNode(null)}
        nodeId={selectedNode?.id}
        initialConfig={crmConfig}
      />

      <ConditionModal
        isOpen={selectedNode?.type === NODE_TYPES.CONDITION}
        onClose={() => setSelectedNode(null)}
        nodeId={selectedNode?.id}
        initialConfig={conditionConfig}
      />
    </div>
  );
}
