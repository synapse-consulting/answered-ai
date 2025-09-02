import React, { useState } from "react";
import { nodeMenuItems } from "../config/nodeTypes";
import { NODE_TYPES, NodeMenuItem, NodeType, NodeTypes } from "../types";
import { useReactFlow, useNodes } from "@xyflow/react";
import { createNodeStructured } from "../utils/node-utils";
import useSuggestionData from "../nodes/hooks/useSuggestionData";

interface Props {}

const Sidebar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const { addNodes, getNodes, getEdges } = useReactFlow<NodeType>();
    const nodes = useNodes<NodeType>();

    let nodeIdCounter = Date.now();
    const onSave = async () => {
        const structuredNodes = createNodeStructured(nodes, getEdges());
        // Example: Fetch data from an API

        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts",
                {
                    method: "PUT", // or "POST", "PUT", "DELETE"
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(structuredNodes),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched data:", data);
        } catch (error) {
            console.error("Fetch error:", error);
        }

        console.log("🍪 SIDEBAR.TSX ==> onSave", structuredNodes);
    };

    const handleAddNode = (item: NodeMenuItem) => {
        // get last node position
        const lastNode = getNodes()[getNodes().length - 1];
        const lastNodePosition = lastNode?.position;

        // const nodeLength = getNodes().length;
        // console.log(nodeLength);
        const nodes = getNodes();
        const typeCount = nodes.filter((n) => n.type === item.type).length;

        const itemLabel = item.label.toLowerCase().replace(/\s+/g, "");

        const newNode: NodeType = {
            id: `${itemLabel}${++nodeIdCounter}`,
            type: item.type,
            position: {
                x: (lastNodePosition?.x ?? 0) + 300,
                y: lastNodePosition?.y ?? 0,
            },
            data: {
                view: { ...item, name: itemLabel + (typeCount + 1) },
                result: null,
                metadata: {},
            },
        };
        // console.log(newNode);
        addNodes(newNode);
    };

    const filteredItems = nodeMenuItems.filter(
        (item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-80 bg-background border-l border-gray-600 p-4 flex flex-col    h-full">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-3">
                    Add Node
                </h3>
                <input
                    type="text"
                    placeholder="Search nodes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg 
            text-white placeholder-gray-400 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
            </div>

            {/* Node List */}
            <div className="flex-1 space-y-2 overflow-y-auto">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleAddNode(item)}
                            className="flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer 
                transition-all duration-200 hover:bg-gray-600 hover:shadow-md 
                group active:scale-95"
                        >
                            {/* Icon */}
                            <div
                                className="w-10 h-10 rounded-md flex items-center justify-center 
                  mr-3 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                                style={{ backgroundColor: item.color }}
                            >
                                {item.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="text-white font-medium text-sm truncate">
                                    {item.label}
                                </div>
                                <div className="text-gray-300 text-xs mt-0.5 line-clamp-2">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-400 text-sm">
                            No nodes found matching "{searchQuery}"
                        </div>
                    </div>
                )}
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-700">
                <button
                    onClick={onSave}
                    className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white 
            font-medium text-sm rounded-lg transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
            focus:ring-offset-gray-800 transform hover:scale-105 active:scale-95 
            shadow-lg hover:shadow-xl"
                >
                    Save Workflow
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
