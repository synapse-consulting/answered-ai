import { Node, NodeProps, Position } from "@xyflow/react";
import { HttpRequestNodeData } from "./types";
import NodeContainer from "../../components/node/NodeContainer";
import NodeHandle from "../../components/node/NodeHandle";

type Props = NodeProps<Node<HttpRequestNodeData, "httpRequest">>;

export default function HttpRequestNode(props: Props) {
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
