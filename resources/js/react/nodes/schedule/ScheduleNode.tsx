import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { BaseNodeData, NodeTypes } from "../../types";
import NodeContainer from "../../components/node/NodeContainer";
import NodeHandle from "../../components/node/NodeHandle";

type Props<T extends Record<string, unknown>> = Node<
    BaseNodeData<T>,
    NodeTypes
>;

export default function ConditionNode<T extends Record<string, unknown>>(
    props: NodeProps<Props<T>>
) {
    return (
        <NodeContainer {...props}>
            <NodeHandle
                type="target"
                position={Position.Left}
                id="target"
                nodeProps={props}
            />

            <NodeHandle
                type="source"
                position={Position.Right}
                id="source2"
                nodeProps={props}
            />
        </NodeContainer>
    );
}
