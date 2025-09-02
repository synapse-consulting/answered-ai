import { dimColor } from "@/lib/utils";
import { BaseNodeData, NodeTypes } from "@/react/types";
import { Handle, HandleProps, Node, NodeProps } from "@xyflow/react";

type Props = HandleProps & {
    nodeProps: NodeProps<
        Node<BaseNodeData<Record<string, unknown>>, NodeTypes>
    >;
};

export default function NodeHandle(props: Props) {
    const view = props.nodeProps?.data?.view ?? {};
    const color = view.color ?? "#000";
    return (
        <Handle
            className="bg-gray-700 border-2"
            {...props}
            isConnectable={true}
            style={{
                width: "10px",
                height: "10px",
                border: "2px solid",
                borderColor: dimColor(color, 1),
                background: dimColor(color, 0.3),
                // borderColor: dimColor(
                //     props.nodeProps.data.view.color ?? "#000",
                //     1
                // ),
                // background: dimColor(
                //     props.nodeProps.data.view.color ?? "#000",
                //     0.3
                // ),
                ...props.style,
            }}
        />
    );
}
