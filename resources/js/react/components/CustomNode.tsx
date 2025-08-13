import React from "react";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { BaseNodeData, NodeType, NodeTypes } from "../types";

type Props<T extends Record<string, unknown>> = Node<
  BaseNodeData<T>,
  NodeTypes
>;

export default function CustomNode<T extends Record<string, unknown>>({
  data,
  ...rest
}: NodeProps<Props<T>>) {
  return (
    <div
      className={`cursor-pointer p-3 rounded-lg text-white font-sans flex items-center gap-2 min-w-[140px] transition-all duration-200 ${
        rest.selected ? "ring-2 ring-blue-400 ring-opacity-75" : ""
      }`}
      style={{ backgroundColor: data.view.color }}>
      {/* Icon Container */}
      <div className="bg-white bg-opacity-20 rounded-md w-9 h-9 flex items-center justify-center flex-shrink-0">
        {data.view.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-sm truncate">
            {data.view.label}
          </span>
          {data.isConfigured && (
            <span className="text-xs bg-green-500 bg-opacity-80 text-white px-1.5 py-0.5 rounded text-center whitespace-nowrap">
              ✓
            </span>
          )}
        </div>

        {data.view.description && (
          <div className="text-xs opacity-90 mt-0.5 line-clamp-2">
            {data.view.description}
          </div>
        )}
      </div>

      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-300 border-2 border-white"
        isConnectable={rest.isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-300 border-2 border-white"
        isConnectable={rest.isConnectable}
      />
    </div>
  );
}
