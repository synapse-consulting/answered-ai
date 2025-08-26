import { Node, NodeProps } from "@xyflow/react";
import { BaseNodeData, NodeTypes } from "../types";
import NodeContainer from "./node/NodeContainer";

type Props<T extends Record<string, unknown>> = Node<
  BaseNodeData<T>,
  NodeTypes
>;

export default function CustomNode<T extends Record<string, unknown>>(
  props: NodeProps<Props<T>>,
) {
  return (
    <NodeContainer {...props}>
      <></>
    </NodeContainer>
  );
}
