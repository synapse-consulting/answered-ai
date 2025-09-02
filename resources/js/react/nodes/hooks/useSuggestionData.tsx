import { NodeType } from "@/react/types";
import { useNodes } from "@xyflow/react";

export default function useSuggestionData() {
    const nodes = useNodes<NodeType>();
    const allData = nodes.map((it) => {
        return {
            name: it.data.view.name,
            data: it.data.result,
        };
    });

    return {
        allResults: allData,
    };
}
