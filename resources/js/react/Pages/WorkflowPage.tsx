import React, { useEffect } from "react";
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
import ConditionNode from "../nodes/condition/ConditionNode";
import ScheduleNode from "../nodes/schedule/ScheduleNode";
import { ScheduelModal } from "../nodes/schedule/ScheduelModal";
import NotificationNode from "../nodes/notification/NotificationNode";
// import ConnectionLine from "../components/node/ConnectionLine";
// import { ShadcnExamples } from "../examples/ShadcnExamples";

const customNodeTypes: Record<NodeTypes, React.ComponentType<any>> = {
    trigger: TriggerNode,
    httpRequest: HttpRequestNode,
    // notification: CustomNode,
    notification: NotificationNode,
    crm: CustomNode,
    condition: ConditionNode,
    schedule: ScheduleNode,
};

export default function WorkflowBuilder() {
    const {
        nodes,
        setNodes,
        edges,
        setEdges,
        selectedNode,
        setSelectedNode,
        onNodesChange,
        onEdgesChange,
        isSaved,
        onConnect,
        handleNodeClick,
    } = useWorkflowState();

    // const notificationConfig =
    //     selectedNode?.data && "config" in selectedNode.data
    //         ? (selectedNode.data as any).config
    //         : undefined;
    // const crmConfig =
    //     selectedNode?.data && "config" in selectedNode.data
    //         ? (selectedNode.data as any).config
    //         : undefined;

    // const conditionConfig =
    //     selectedNode?.data && "config" in selectedNode.data
    //         ? (selectedNode.data as any).config
    //         : undefined;

    const scheduelConfig =
        selectedNode?.data && "scheduelConfig" in selectedNode.data
            ? (selectedNode.data as any).scheduelConfig
            : undefined;

    // useEffect(() => {
    //     var handleBeforeUnload = (e: BeforeUnloadEvent) => {
    //         if (!isSaved && (nodes.length > 0 || edges.length > 0)) {
    //             e.preventDefault();
    //             e.returnValue = ""; // Chrome requires this
    //         }
    //     };

    //     window.addEventListener("beforeunload", handleBeforeUnload);
    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, [isSaved, nodes, edges]);
    const baseUrl =
        document
            .querySelector('meta[name="app-url"]')
            ?.getAttribute("content") || "";
    useEffect(() => {
        async function LoadWorkFlow() {
            const url = new URL(window.location.href);
            const id = url.searchParams.get("id");
            // const baseUrl = import.meta.env.VITE_APP_URL;
            try {
                const response = await fetch(`${baseUrl}/api/workflow/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `Failed to save. Status: ${response.status}`
                    );
                }

                const result = await response.json();
                console.log("Save successful:", result);

                if (result?.Workflow.executable_flow) {
                    setNodes(result.Workflow.executable_flow.nodes || []);
                    setEdges(result.Workflow.executable_flow.edges || []);
                    console.log(result?.Workflow.executable_flow);
                } else {
                    console.warn("No executable_flow found in response");
                }
            } catch (error) {
                console.error("Error saving nodes:", error);
            }
        }
        LoadWorkFlow();
    }, [setNodes, setEdges]);
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
                    onNodeDoubleClick={handleNodeClick}
                    // deleteKeyCode={["Backspace", "Delete"]}
                    colorMode="dark"
                    onDelete={() => {
                        console.log("onDelete");
                    }}
                    onNodesDelete={(nodes) => {
                        console.log("onNodesDelete", nodes);
                    }}
                    fitView
                    fitViewOptions={{ padding: 0.2 }}
                    proOptions={{ hideAttribution: true }}
                    className="bg-gray-900"
                >
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
            />

            <NotificationModal
                isOpen={selectedNode?.type === NODE_TYPES.NOTIFICATION}
                onClose={() => setSelectedNode(null)}
                nodeId={selectedNode?.id}
            />

            <CrmModal
                isOpen={selectedNode?.type === NODE_TYPES.CRM}
                onClose={() => setSelectedNode(null)}
                nodeId={selectedNode?.id}
            />

            <ConditionModal
                isOpen={selectedNode?.type === NODE_TYPES.CONDITION}
                onClose={() => setSelectedNode(null)}
                nodeId={selectedNode?.id}
            />

            <ScheduelModal
                isOpen={selectedNode?.type === NODE_TYPES.SCHEDULE}
                onClose={() => setSelectedNode(null)}
                nodeId={selectedNode?.id}
                initialConfig={scheduelConfig}
            />
        </div>
    );
}
