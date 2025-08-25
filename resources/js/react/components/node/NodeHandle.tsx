import { Handle, HandleProps, Position } from "@xyflow/react";
import React from "react";

type Props = HandleProps & {};

export default function NodeHandle(props: Props) {
  return (
    <Handle
      className="size-5 bg-gray-700 border-2 border-white"
      isConnectable={true}
      {...props}
    />
  );
}
