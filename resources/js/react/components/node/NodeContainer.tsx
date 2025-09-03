import { Node, NodeProps } from "@xyflow/react";
import React from "react";
import { BaseNodeData, NodeTypes, RecordUnknown } from "../../types";
import { dimColor } from "@/lib/utils";

interface Props
    extends NodeProps<Node<BaseNodeData<RecordUnknown>, NodeTypes>> {
    children: React.ReactNode;
}

export default function NodeContainer({ data, selected, children }: Props) {
    const view = data?.view;

    const {
        color = "#888", // fallback color
        icon = null,
        label = "Untitled",
        description,
        name = "",
    } = view;

    const isConfigured = data && data.isConfigured;

    return (
        <div
            className={`cursor-pointer p-3 rounded-lg text-white font-sans min-w-[140px] transition-all duration-200 ${
                selected ? "ring-2 ring-blue-400 ring-opacity-75" : ""
            }`}
            style={{
                backgroundColor: dimColor(color, 0.3),
                boxShadow: selected
                    ? `0 0 0 2px ${dimColor(color, 0.8)}`
                    : `0 0 0 1px ${dimColor(color, 0.6)}`,
            }}
        >
            <div className="absolute inset-0">{children}</div>
            <div className="flex items-center gap-2">
                <div
                    className="rounded-md w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    {/* {icon} */}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex gap-2 items-center">
                        <p className="text-xs font-extralight">{name}</p>
                        {!isConfigured ? (
                            <div className="h-2 w-2 bg-amber-800 rounded-full"></div>
                        ) : (
                            <div className="h-2 w-2 bg-green-700 rounded-full"></div>
                        )}
                    </div>
                    <span className="font-semibold text-sm truncate">
                        {label}
                    </span>
                    {description && (
                        <div className="text-xs opacity-90 mt-0.5 line-clamp-2">
                            {description}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
