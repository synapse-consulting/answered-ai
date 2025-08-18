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
