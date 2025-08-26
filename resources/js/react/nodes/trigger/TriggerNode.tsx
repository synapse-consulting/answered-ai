import { Node, NodeProps, Position } from "@xyflow/react";
import NodeContainer from "../../components/node/NodeContainer";
import NodeHandle from "../../components/node/NodeHandle";
import { TriggerNodeData } from "../../types";
import { FiPlayCircle } from "react-icons/fi";

type Props = NodeProps<Node<TriggerNodeData, "trigger">>;

export default function TriggerNode(props: Props) {
  return (
    <NodeContainer
      {...props}
      data={{
        ...props.data,
        view: { ...props.data.view, icon: <FiPlayCircle size={20} /> },
      }}>
      <NodeHandle type="source" position={Position.Right} nodeProps={props} />
    </NodeContainer>
  );
}
