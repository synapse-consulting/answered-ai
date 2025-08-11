import React from "react";
import { Handle, Position } from "reactflow";

interface CustomNodeProps {
  data: {
    color: string;
    icon: React.ReactNode;
    label: string;
    description?: string;
    isConfigured?: boolean;
    httpConfig?: any;
  };
  isConnectable?: boolean;
  selected?: boolean;
}

export default function CustomNode({
  data,
  isConnectable,
  selected,
}: CustomNodeProps) {
  console.log("🔄 Rendering CustomNode:", {
    data,
    isConnectable,
    selected,
  });
  return (
    <div
      className="cursor-pointer"
      style={{
        background: data.color,
        padding: "10px",
        borderRadius: "8px",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        minWidth: "140px",
      }}>
      <div
        style={{
          background: "rgba(255,255,255,0.2)",
          borderRadius: "6px",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {data.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}>
          {data.label}
          {data.isConfigured && data.label === "HTTP Request" && (
            <span
              style={{
                fontSize: "10px",
                background: "rgba(34, 197, 94, 0.8)",
                color: "white",
                padding: "2px 6px",
                borderRadius: "4px",
                fontWeight: "normal",
              }}>
              ✓ Configured
            </span>
          )}
        </div>
        {data.description && (
          <div style={{ fontSize: "0.75rem" }}>{data.description}</div>
        )}
        {data.isConfigured && data.httpConfig?.url && (
          <div style={{ fontSize: "0.65rem", opacity: 0.8, marginTop: "2px" }}>
            {data.httpConfig.method} {data.httpConfig.url}
          </div>
        )}
      </div>

      {/* Connection handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
