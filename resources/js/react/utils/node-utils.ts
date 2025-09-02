import { Edge, Node } from "@xyflow/react";
import { NodeType } from "../types";

export function createNodeStructured(nodes: NodeType[], edges: Edge[]) {

     const allData = nodes.map((it) => ({
      id: it.id,
      type: it.type,
      name: it.data.view.name,
      data: it.data.result,
  }));
  

  return {nodes: allData, edges}

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
              data: foundNode.data.metadata,
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