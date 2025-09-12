import { NodeType } from "@/react/types";
import { useNodes, useEdges } from "@xyflow/react";

export default function useSuggestionData(nodeId: string) {
    const nodes = useNodes<NodeType>();
    const edges = useEdges();

    const connectedSourceNodes = getConnectedSourceNodes(nodeId, nodes, edges);

    const allData = connectedSourceNodes.map((it) => {
        const view = it.data?.view ?? {};
        return {
            name: view.name ?? "Untitled",
            data: it.data?.config ?? null, // Should their be config or result
        };
    });

    return {
        allResults: allData,
    };
}

export function getConnectedSourceNodes(
    nodeId: string,
    nodes: NodeType[],
    edges: any[]
) {
    // 1. Find edges where current node is target
    const incomingEdges = edges.filter((edge) => edge.target === nodeId);

    // 2. Get all source nodeIds
    const sourceIds = incomingEdges.map((edge) => edge.source);

    // 3. Return only those nodes whose id is in sourceIds
    return nodes.filter((node) => sourceIds.includes(node.id));
}

export function useNodeData() {
    const nodes = useNodes<NodeType>();
    const allData = nodes.map((it) => {
        const view = it.data?.view ?? {};
        return {
            name: view.name ?? "Untitled",
            id: it.id ?? null,
        };
    });

    return {
        NodesId: allData,
    };
}
