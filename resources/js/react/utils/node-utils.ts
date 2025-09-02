import { Edge, Node, Position } from "@xyflow/react";
import { NodeType } from "../types";

export function createNodeStructured(nodes: NodeType[], edges: Edge[]) {

  //    const allData = nodes.map((it) => ({
  //     id: it.id,
  //     type: it.type,
  //     name: it.data.view.name,
  //     position: it.position,
  //     data: it.data.result ?? {},
  // }));
  const allData = nodes.map((it) => ({
  id: it.id,
  type: it.type,
  position: it.position,
  data: {
    view: it.data.view ?? {},
    result: it.data.result ?? {},
    config: it.data.config ?? {},
    metadata: it.data.metadata ?? {},
    isConfigured: it.data.isConfigured ?? false,
  }
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