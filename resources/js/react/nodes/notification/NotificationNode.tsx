import { Node, NodeProps, Position } from "@xyflow/react";
import { NotificationNodeData } from "../../types";
import NodeHandle from "../../components/node/NodeHandle";
import NodeContainer from "@/react/components/node/NodeContainer";

// type Props<T extends Record<string, unknown>> = Node<
//     BaseNodeData<T>,
//     NodeTypes
// >;
type Props = NodeProps<Node<NotificationNodeData, "notification">>;
export default function NotificationNode(props: Props) {
    // props: NodeProps<Props<T>>
    return (
        <NodeContainer {...props}>
            {/* {props.data.executionStatus == "Completed" && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Method</span>
                  <span className="text-sm">{props.data.metadata.method}</span>
                </div>
              </div>
            )} */}
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
