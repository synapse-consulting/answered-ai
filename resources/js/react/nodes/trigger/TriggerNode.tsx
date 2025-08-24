import React from "react";
import { Node, NodeProps, Position } from "@xyflow/react";
import NodeContainer from "../../components/node/NodeContainer";
import NodeHandle from "../../components/node/NodeHandle";
import { TriggerNodeData } from "../../types";

type Props = NodeProps<Node<TriggerNodeData, "trigger">>;

export default function TriggerNode(props: Props) {
  return (
    <NodeContainer {...props}>
      <NodeHandle type="source" position={Position.Bottom} />
    </NodeContainer>
  );
}
