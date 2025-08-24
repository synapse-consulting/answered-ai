import React, { useState, useEffect } from "react";
import DialogContainer from "../../components/DialogContainer";
import { FormField } from "../../components/ui/FormField";
import { SelectField } from "../../components/ui/SelectField";
import { TextareaField } from "../../components/ui/TextareaField";
import { CheckboxField } from "../../components/ui/CheckboxField";
import { KeyValueEditor } from "../../components/ui/KeyValueEditor";
import { NotificationConfig } from "../../types";
import { useReactFlow } from "@xyflow/react";

const DEFAULT_NOTIFICATION_CONFIG: NotificationConfig = {
  type: "email",
  recipients: [],
  subject: "",
  message: "",
  template: "",
  enableLogging: true,
  autoRetry: false,
};

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId?: string;
  initialConfig?: NotificationConfig;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  nodeId,
  initialConfig,
}) => {
  const { updateNodeData } = useReactFlow();
  const [config, setConfig] = useState<NotificationConfig>(
    initialConfig || DEFAULT_NOTIFICATION_CONFIG,
  );

  useEffect(() => {
    setConfig(initialConfig || DEFAULT_NOTIFICATION_CONFIG);
  }, [initialConfig, isOpen]);

  const handleSave = () => {
    const errors = validateConfig();
    if (errors.length === 0 && nodeId) {
      updateNodeData(nodeId, {
        notificationConfig: config,
        isConfigured: true,
      });
      onClose();
    }
  };

  const validateConfig = (): string[] => {
    const errors: string[] = [];
    if (!config.message.trim()) {
      errors.push("Message is required");
    }
    if (config.recipients.length === 0) {
      errors.push("At least one recipient is required");
    }
    return errors;
  };

  const addRecipient = () => {
    setConfig((prev) => ({
      ...prev,
      recipients: [...prev.recipients, { key: "", value: "" }],
    }));
  };

  const updateRecipient = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    setConfig((prev) => ({
      ...prev,
      recipients: prev.recipients.map((recipient, i) =>
        i === index ? { ...recipient, [field]: value } : recipient,
      ),
    }));
  };

  const removeRecipient = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      recipients: prev.recipients.filter((_, i) => i !== index),
    }));
  };

  const typeOptions = [
    { value: "email", label: "Email" },
    { value: "slack", label: "Slack" },
    { value: "sms", label: "SMS" },
    { value: "webhook", label: "Webhook" },
  ];

  const errors = validateConfig();

  return (
    <DialogContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Notification Configuration"
      description="Configure your notification settings"
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

        {/* Notification Type */}
        <SelectField
          label="Notification Type"
          value={config.type}
          onChange={(value) =>
            setConfig((prev) => ({
              ...prev,
              type: value as NotificationConfig["type"],
            }))
          }
          options={typeOptions}
          required
        />

        {/* Subject (for email) */}
        {config.type === "email" && (
          <FormField
            label="Subject"
            value={config.subject || ""}
            onChange={(value) =>
              setConfig((prev) => ({ ...prev, subject: value }))
            }
            placeholder="Enter email subject"
            required
          />
        )}

        {/* Message */}
        <TextareaField
          label="Message"
          value={config.message}
          onChange={(value) =>
            setConfig((prev) => ({ ...prev, message: value }))
          }
          placeholder="Enter your notification message..."
          rows={4}
          required
        />

        {/* Recipients */}
        <KeyValueEditor
          label="Recipients"
          items={config.recipients}
          onAdd={addRecipient}
          onUpdate={updateRecipient}
          onRemove={removeRecipient}
          keyPlaceholder="Name"
          valuePlaceholder={
            config.type === "email"
              ? "email@example.com"
              : config.type === "slack"
              ? "@username or #channel"
              : "Recipient"
          }
        />

        {/* Template Options */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Template Options
          </h4>
          <div className="space-y-3">
            <CheckboxField
              label="Use custom template"
              checked={!!config.template}
              onChange={(checked) =>
                setConfig((prev) => ({
                  ...prev,
                  template: checked ? "custom" : "",
                }))
              }
              description="Enable to use a custom message template"
            />

            {config.template && (
              <FormField
                label="Template ID"
                value={config.template}
                onChange={(value) =>
                  setConfig((prev) => ({ ...prev, template: value }))
                }
                placeholder="Enter template ID"
              />
            )}
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
