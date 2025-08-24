import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import React from "react";
import {
  BaseNodeData,
  ExecutionStatus,
  NodeType,
  NodeTypes,
  RecordUnknown,
  TriggerNodeData,
} from "../../types";
import NodeHandle from "./NodeHandle";

interface Props
  extends NodeProps<Node<BaseNodeData<RecordUnknown>, NodeTypes>> {
  children: React.ReactNode;
}

export default function NodeContainer({ data, selected, children }: Props) {
  const { color, icon, label, description } = data.view;
  return (
    <div
      className={`cursor-pointer p-3 rounded-lg text-white font-sans flex items-center gap-2 min-w-[140px] transition-all duration-200 ${
        selected ? "ring-2 ring-blue-400 ring-opacity-75" : ""
      }`}
      style={{ backgroundColor: color }}>
      {children}

      <div className="bg-white bg-opacity-20 rounded-md w-9 h-9 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <span className="font-semibold text-sm truncate">{label}</span>

        {description && (
          <div className="text-xs opacity-90 mt-0.5 line-clamp-2">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
