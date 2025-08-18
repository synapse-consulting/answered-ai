import React from "react";
import DialogContainer from "../../components/DialogContainer";
import {
  SelectField,
  FormField,
} from "../../components/ui";
import { SuggestiveInput } from './components/SuggestiveInput';
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
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' },
  { value: 'contains', label: 'Contains' },
];

const DATA_TYPES = [
  { value: 'string', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'True/False' },
];

// Example API responses - these would typically come from props or context
const apiResponses = {
  'Response 1': JSON.stringify({
    "status": true,
    "message": "mtjonline.com Result",
    "data": {
      "id": 76767,
      "name": "mtjonline.com",
      "score": 98,
      "score_status": "permanent",
      "scan_date": "2025-08-01",
      "scan_type": 2,
      "created_at": "1754006400.0"
    }
  }),
  'Response 2': JSON.stringify({
    "success": true,
    "result": {
      "user": {
        "id": 123,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "settings": {
        "theme": "dark",
        "notifications": true
      }
    }
  })
};

// Get hierarchical suggestions from all responses
const suggestions = getJsonSuggestions(apiResponses);

export const ConditionModal: React.FC<ConditionModalProps> = ({
  isOpen,
  onClose,
  nodeId,
  initialConfig,
}) => {
  const { updateNodeData } = useReactFlow();
  const [config, setConfig] = React.useState<ConditionConfig>(
    initialConfig || {
      operator: 'equals',
      leftValue: '',
      rightValue: '',
      dataType: 'string',
    }
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
            placeholder={'Enter value'}
            type="text"
            required
            error=""
            suggestions={suggestions}
          />

          <SelectField
            label="Operator"
            value={config.operator}
            onChange={(value) => setConfig({ ...config, operator: value as ConditionConfig['operator'] })}
            options={OPERATORS}
            required
            error=""
          />
          <FormField
            label="Right Value"
            value={config.rightValue}
            onChange={(value) => setConfig({ ...config, rightValue: value })}
            placeholder={'Enter value'}
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
