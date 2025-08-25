import React, { useState, useEffect } from "react";
import DialogContainer from "../../components/DialogContainer";
import { FormField } from "../../components/ui/FormField";
import { SelectField } from "../../components/ui/SelectField";
import { KeyValueEditor } from "../../components/ui/KeyValueEditor";
import { CheckboxField } from "../../components/ui/CheckboxField";
import { CrmConfig } from "../../types";
import { useReactFlow } from "@xyflow/react";

const DEFAULT_CRM_CONFIG: CrmConfig = {
  provider: "hubspot",
  action: "create",
  object: "contact",
  fields: [],
  apiKey: "",
  enableLogging: true,
  autoRetry: false,
};

interface CrmModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId?: string;
  initialConfig?: CrmConfig;
}

export const CrmModal: React.FC<CrmModalProps> = ({
  isOpen,
  onClose,
  nodeId,
  initialConfig,
}) => {
  const { updateNodeData } = useReactFlow();
  const [config, setConfig] = useState<CrmConfig>(
    initialConfig || DEFAULT_CRM_CONFIG,
  );

  useEffect(() => {
    setConfig(initialConfig || DEFAULT_CRM_CONFIG);
  }, [initialConfig, isOpen]);

  const handleSave = () => {
    const errors = validateConfig();
    if (errors.length === 0 && nodeId) {
      updateNodeData(nodeId, {
        crmConfig: config,
        isConfigured: true,
      });
      onClose();
    }
  };

  const validateConfig = (): string[] => {
    const errors: string[] = [];
    if (!config.apiKey.trim()) {
      errors.push("API Key is required");
    }
    if (!config.object.trim()) {
      errors.push("Object type is required");
    }
    if (config.fields.length === 0) {
      errors.push("At least one field mapping is required");
    }
    return errors;
  };

  const addField = () => {
    setConfig((prev) => ({
      ...prev,
      fields: [...prev.fields, { key: "", value: "" }],
    }));
  };

  const updateField = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    setConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((fieldItem, i) =>
        i === index ? { ...fieldItem, [field]: value } : fieldItem,
      ),
    }));
  };

  const removeField = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }));
  };

  const providerOptions = [
    { value: "hubspot", label: "HubSpot" },
    { value: "salesforce", label: "Salesforce" },
    { value: "pipedrive", label: "Pipedrive" },
    { value: "zoho", label: "Zoho CRM" },
  ];

  const actionOptions = [
    { value: "create", label: "Create" },
    { value: "update", label: "Update" },
    { value: "get", label: "Get" },
    { value: "delete", label: "Delete" },
    { value: "search", label: "Search" },
  ];

  const objectOptions = [
    { value: "contact", label: "Contact" },
    { value: "company", label: "Company" },
    { value: "deal", label: "Deal" },
    { value: "ticket", label: "Ticket" },
    { value: "product", label: "Product" },
  ];

  const errors = validateConfig();

  return (
    <DialogContainer
      isOpen={isOpen}
      onClose={onClose}
      title="CRM Integration Configuration"
      description="Configure your CRM integration settings"
      maxWidth="2xl">
      <div className="space-y-6">
        {/* Validation Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
              Please fix the following errors:
            </h4>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Basic Configuration */}
        <div className="grid grid-cols-3 gap-4">
          <SelectField
            label="CRM Provider"
            value={config.provider}
            onChange={(value) =>
              setConfig((prev) => ({
                ...prev,
                provider: value as CrmConfig["provider"],
              }))
            }
            options={providerOptions}
            required
          />

          <SelectField
            label="Action"
            value={config.action}
            onChange={(value) =>
              setConfig((prev) => ({
                ...prev,
                action: value as CrmConfig["action"],
              }))
            }
            options={actionOptions}
            required
          />

          <SelectField
            label="Object Type"
            value={config.object}
            onChange={(value) =>
              setConfig((prev) => ({
                ...prev,
                object: value as CrmConfig["object"],
              }))
            }
            options={objectOptions}
            required
          />
        </div>

        {/* API Configuration */}
        <FormField
          label="API Key"
          value={config.apiKey}
          onChange={(value) =>
            setConfig((prev) => ({ ...prev, apiKey: value }))
          }
          placeholder={`Enter your ${config.provider} API key`}
          type="password"
          required
        />

        {/* Field Mappings */}
        <KeyValueEditor
          label="Field Mappings"
          items={config.fields}
          onAdd={addField}
          onUpdate={updateField}
          onRemove={removeField}
          keyPlaceholder="CRM Field"
          valuePlaceholder="Value/Variable"
        />

        {/* Advanced Options */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Advanced Options
          </h4>
          <div className="space-y-3">
            <CheckboxField
              label="Enable detailed logging"
              checked={config.enableLogging}
              onChange={(checked) =>
                setConfig((prev) => ({ ...prev, enableLogging: checked }))
              }
              description="Log all API requests and responses for debugging"
            />
            <CheckboxField
              label="Auto-retry on failure"
              checked={config.autoRetry}
              onChange={(checked) =>
                setConfig((prev) => ({ ...prev, autoRetry: checked }))
              }
              description="Automatically retry failed requests up to 3 times"
            />
          </div>
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
            disabled={errors.length > 0}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition-all duration-200 ${
                errors.length === 0
                  ? "bg-blue-500 hover:bg-blue-600 transform hover:-translate-y-0.5"
                  : "bg-gray-400 cursor-not-allowed"
              }`}>
            Save Configuration
          </button>
        </div>
      </div>
    </DialogContainer>
  );
};
