import { Italic } from "lucide-react";

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject {
  [key: string]: JsonValue;
}
interface JsonArray extends Array<JsonValue> {}

export interface Suggestion {
  label: string;
  value: string;
  children?: Suggestion[];
  type?: string;
}

export const traverseJson = (
  obj: JsonValue,
  parentPath: string = '',
): Suggestion[] => {
  if (obj === null || obj === undefined) {
    return [];
  }

  // For primitive values, return the type
  if (typeof obj !== 'object') {
    return [{
      label: `${parentPath} (${typeof obj})`,
      value: parentPath,
      type: typeof obj
    }];
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    const suggestions: Suggestion[] = [];
    if (obj.length > 0) {
      // Only traverse the first item as an example
      const childSuggestions = traverseJson(obj[0], `${parentPath}[0]`);
      suggestions.push(...childSuggestions);
    }
    return suggestions;
  }

  // Handle objects
  const suggestions: Suggestion[] = [];
  Object.entries(obj).forEach(([key, value]) => {
    const newPath = parentPath ? `${parentPath}.${key}` : key;
    const childSuggestions = traverseJson(value, newPath);
    
    if (typeof value === 'object' && value !== null) {
      // For objects, create a parent suggestion with children
      suggestions.push({
        label: key,
        value: newPath,
        children: childSuggestions,
        type: Array.isArray(value) ? 'array' : 'object'
      });
    } else {
      // For primitives, add them directly
      suggestions.push(...childSuggestions);
    }
  });

  return suggestions;
};

export const getJsonSuggestions = (responses: Record<string, string>): Suggestion[] => {
  const suggestions: Suggestion[] = [];
  
  Object.entries(responses).forEach(([responseName, jsonString]) => {
    try {
      const parsed = JSON.parse(jsonString);
      suggestions.push({
        label: responseName,
        value: responseName,
        children: traverseJson(parsed),
        type: 'response'
      });
    } catch (e) {
      console.error(`Failed to parse JSON for ${responseName}:`, e);
    }
  });
  
  return suggestions;
};


// export const getNodeSuggestions = (
//   sourceNodes: {name: any, data: any}[]
// ): Suggestion[] => {
//   const suggestions = sourceNodes
//   .filter((it) => it.data)
//   .map((sourceNode) => {

//     const response = sourceNode.data;
//     const nodeName = sourceNode.name;
//     // console.log(nodeName);

//     if (!response) {
//       return {
//         label: nodeName,
//         value: nodeName,
//         type: "node",
//         children: [],
//       }
//     }

//     let responseChildren: Suggestion[] = [];

//     // Case 1: Array of objects
//     if (Array.isArray(response)) {
//       responseChildren = response.map((item, index) => ({
//         label: `response_${index + 1}`,
//         value: `response_${index + 1}`,
//         type: "node",
//         children: traverseJson(item),
//       }));
//     }
//     // Case 2: Single object
//     else if (typeof response === "object") {
//       responseChildren = [
//         {
//           label: "response",
//           value: "response",
//           type: "node",
//           children: traverseJson(response),
//         },
//       ];
//     }

//     return {
//       label: nodeName,
//       value: nodeName,
//       type: "node",
//       children: responseChildren,
//     }
//   })

//   return suggestions
// };

export const getNodeSuggestions = (
  sourceNodes: {name: any, data: any}[]
): Suggestion[] => {
  return sourceNodes.map((sourceNode) => {
    const response = sourceNode.data;
    const nodeName = sourceNode.name;

    console.log(sourceNode);

    let responseChildren: Suggestion[] = [];

    if (response) {
      if (Array.isArray(response)) {
        responseChildren = response.map((item, index) => ({
          label: `response_${index + 1}`,
          value: `response_${index + 1}`,
          type: "node",
          children: traverseJson(item),
        }));
      } else if (typeof response === "object") {
        responseChildren = [{
          label: "response",
          value: "response",
          type: "node",
          children: traverseJson(response),
        }];
      }
    }

    return {
      label: nodeName,
      value: nodeName,
      type: "node",
      children: responseChildren,
    };
  });
};





// export const getNodeNameIdSuggestions = (
//   sourceNodes: { id: string; name: any;}[]
// ): Suggestion[] => {
//   return sourceNodes.map((node) => ({
//     label: node.name ?? "Untitled",
//     value: node.id, // ✅ use id as value
//   }));
// };
