import React from "react";
import DialogContainer from "../../components/DialogContainer";
import { SelectField } from "../../components/ui/SelectField";
import { FormField } from "../../components/ui/FormField";
import { SuggestiveInput } from "./components/SuggestiveInput";
import { useReactFlow } from "@xyflow/react";
import { ConditionConfig } from "../../types";
import { getJsonSuggestions } from "../../utils/jsonTraverser";

interface ConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId?: string;
  initialConfig?: ConditionConfig;
}

const OPERATORS = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not Equals" },
  { value: "greater_than", label: "Greater Than" },
  { value: "less_than", label: "Less Than" },
  { value: "contains", label: "Contains" },
];

const DATA_TYPES = [
  { value: "string", label: "Text" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "True/False" },
];

// Function to collect responses from HTTP request nodes
const collectHttpResponses = (nodes: any[]) => {
  const responses: Record<string, string> = {};

  nodes.forEach((node) => {
    // Only collect responses from http-request type nodes
    if (node.type === "http-request" && node.data?.response) {
      // Add node label or id for better identification
      const nodeName = node.data?.httpConfig?.url
        ? `Response from ${node.data.httpConfig.url}`
        : `Response from Node ${node.id}`;

      responses[nodeName] = JSON.stringify(node.data.response);
    }
  });

  // Add default response if no responses found
  if (Object.keys(responses).length === 0) {
    responses["Example Response"] = JSON.stringify({
      status: true,
      message: "Example Response",
      data: {
        id: 123,
        name: "example",
        value: "sample",
      },
    });
  }

  return responses;
};

export const ConditionModal: React.FC<ConditionModalProps> = ({
  isOpen,
  onClose,
  nodeId,
  initialConfig,
}) => {
  const { updateNodeData, getNodes } = useReactFlow();
  const [apiResponses, setApiResponses] = React.useState<
    Record<string, string>
  >({});

  // Update API responses whenever nodes change
  React.useEffect(() => {
    // Initial load of responses
    const responses = collectHttpResponses(getNodes());
    setApiResponses(responses);

    // Set up an interval to check for new responses
    const checkInterval = setInterval(() => {
      const updatedResponses = collectHttpResponses(getNodes());
      setApiResponses((prev) => {
        // Only update if there are actual changes
        const prevString = JSON.stringify(prev);
        const newString = JSON.stringify(updatedResponses);
        return prevString !== newString ? updatedResponses : prev;
      });
    }, 1000); // Check every second

    // Cleanup interval
    return () => clearInterval(checkInterval);
  }, [getNodes]);

  const suggestions = getJsonSuggestions(apiResponses);

  const [config, setConfig] = React.useState<ConditionConfig>(
    initialConfig || {
      operator: "equals",
      leftValue: "",
      rightValue: "",
      dataType: "string",
    },
  );

  React.useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig);
    }
  }, [initialConfig]);

  const handleSave = () => {
    if (nodeId) {
      updateNodeData(nodeId, {
        conditionConfig: config,
        isConfigured: true,
      });
      onClose();
    }
  };

  return (
    <DialogContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Condition Configuration"
      description="Configure your condition logic"
      maxWidth="2xl">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <SuggestiveInput
            label="Left Value"
            value={config.leftValue}
            onChange={(value) => setConfig({ ...config, leftValue: value })}
            placeholder={"Enter value"}
            type="text"
            required
            error=""
            suggestions={suggestions}
          />

          <SelectField
            label="Operator"
            value={config.operator}
            onChange={(value) =>
              setConfig({
                ...config,
                operator: value as ConditionConfig["operator"],
              })
            }
            options={OPERATORS}
            required
            error=""
          />
          <FormField
            label="Right Value"
            value={config.rightValue}
            onChange={(value) => setConfig({ ...config, rightValue: value })}
            placeholder={"Enter value"}
            type="text"
            required
            error=""
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
              bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
              rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition-all duration-200">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 
              rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 
              transform hover:-translate-y-0.5">
            Save Configuration
          </button>
        </div>
      </div>
    </DialogContainer>
  );
};
