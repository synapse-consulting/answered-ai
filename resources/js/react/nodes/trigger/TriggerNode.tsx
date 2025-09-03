import { Node, NodeProps, Position } from "@xyflow/react";
import NodeContainer from "../../components/node/NodeContainer";
import NodeHandle from "../../components/node/NodeHandle";
import { TriggerNodeData } from "../../types";
import { FiPlayCircle } from "react-icons/fi";

type Props = NodeProps<Node<TriggerNodeData, "trigger">>;

export default function TriggerNode(props: Props) {
    const safeData = props.data ?? { view: {} };
    return (
        <NodeContainer
            {...props}
            data={{
                ...safeData,
                view: {
                    ...(safeData.view ?? {}),
                    icon: <FiPlayCircle size={20} />,
                },
            }}
        >
            <NodeHandle
                type="source"
                position={Position.Right}
                nodeProps={props}
            />
        </NodeContainer>
    );
}
