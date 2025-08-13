import { Edge, Node } from "@xyflow/react";

export function createNodeStructured(nodes: Node[], edges: Edge[]) {

  const structuredNodes = nodes.map((node) => {
    const nodeId = node.id;
    const connections = edges.reduce((acc: {id: string, type: string, data: any}[], edge) => {
      if (edge.source === nodeId) {
        const foundNode = nodes.find((n) => n.id === edge.target);
        if (foundNode) {
          return [
            ...acc,
            {
              id: foundNode.id,
              type: foundNode.type || "custom",
              data: foundNode.data,
            }
          ];
        }
      }
      return acc;
      },
      [],
    );

    return {
      id: nodeId,
      type: node.type,
      connections: connections,
    };
  });

  return structuredNodes;
}