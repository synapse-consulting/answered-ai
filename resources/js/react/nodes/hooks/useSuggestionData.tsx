import { NodeType } from "@/react/types";
import { useNodes } from "@xyflow/react";

export default function useSuggestionData() {
    const nodes = useNodes<NodeType>();
    const allData = nodes.map((it) => {
        const view = it.data?.view ?? {};
        return {
            name: view.name ?? "Untitled",
            data: it.data?.result ?? null,
        };
    });

    return {
        allResults: allData,
    };
}

// export default function useSuggestionData() {
//     const nodes = useNodes<NodeType>();
//     const allData = nodes.map((it) => {
//         const view = it.data?.view ?? {};
//         return {
//             id: it.id, // ✅ include node id
//             name: view.name ?? "Untitled",
//             data: it.data?.result ?? null,
//         };
//     });

//     return {
//         allResults: allData,
//     };
// }

export function useNodeData() {
    const nodes = useNodes<NodeType>();
    const allData = nodes.map((it) => {
        const view = it.data?.view ?? {};
        return {
            name: view.name ?? "Untitled",
            id: it.id ?? null,
        };
    });

    return {
        NodesId: allData,
    };
}
