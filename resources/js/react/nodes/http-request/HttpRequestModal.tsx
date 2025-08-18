import React from "react";
import DialogContainer from "../../components/DialogContainer";
import {
  FormField,
  SelectField,
  TextareaField,
  CheckboxField,
  KeyValueEditor,
} from "../../components/ui";
import { useHttpRequestData } from "./useHttpRequestData";
import { HttpConfig, HTTP_METHODS, AUTH_TYPES } from "../../types";
import { useReactFlow } from "@xyflow/react";

interface HttpRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId?: string;
  initialConfig?: HttpConfig;
}

export const HttpRequestModal: React.FC<HttpRequestModalProps> = ({
  isOpen,
  onClose,
  nodeId,
  initialConfig,
}) => {
  const { updateNodeData } = useReactFlow();
  const {
    config,
    updateMethod,
    updateUrl,
    addQueryParam,
    updateQueryParam,
    removeQueryParam,
    addHeader,
    updateHeader,
    removeHeader,
    updateAuth,
    updateAuthCredentials,
    updateBody,
    updateOptions,
    validateConfig,
    isValid,
  } = useHttpRequestData(initialConfig);

  const handleSave = () => {
    if (isValid && nodeId) {
      updateNodeData(nodeId, {
        httpConfig: config,
        isConfigured: true,
      });
      onClose();
    }
  };

  const methodOptions = [
    { value: HTTP_METHODS.GET, label: "GET" },
    { value: HTTP_METHODS.POST, label: "POST" },
    { value: HTTP_METHODS.PUT, label: "PUT" },
    { value: HTTP_METHODS.DELETE, label: "DELETE" },
    { value: HTTP_METHODS.PATCH, label: "PATCH" },
  ];

  const authOptions = [
    { value: AUTH_TYPES.NONE, label: "No Authentication" },
    { value: AUTH_TYPES.BASIC, label: "Basic Auth" },
    { value: AUTH_TYPES.BEARER, label: "Bearer Token" },
  ];

  const bodyTypeOptions = [
    { value: "none", label: "No Body" },
    { value: "application/json", label: "JSON" },
    { value: "application/x-www-form-urlencoded", label: "Form URL Encoded" },
    { value: "multipart/form-data", label: "Form Data" },
    { value: "text/plain", label: "Raw" },
  ];

  const errors = validateConfig();

  return (
    <DialogContainer
      isOpen={isOpen}
      onClose={onClose}
      title="HTTP Request Configuration"
      description="Configure your HTTP request parameters"
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
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <SelectField
              label="Method"
              value={config.method}
              onChange={(value) => updateMethod(value as HttpConfig["method"])}
              options={methodOptions}
              required
              placeholder={""}
              error={""}
            />
          </div>
          <div className="col-span-3">
            <FormField
              label="URL"
              value={config.url}
              onChange={updateUrl}
              placeholder="https://api.example.com/endpoint"
              type="url"
              required
              error={""}
            />
          </div>
        </div>

        {/* Query Parameters */}
        <KeyValueEditor
          label="Query Parameters"
          items={config.queryParams}
          onAdd={addQueryParam}
          onUpdate={updateQueryParam}
          onRemove={removeQueryParam}
          keyPlaceholder="Parameter name"
          valuePlaceholder="Parameter value"
        />

        {/* Headers */}
        <KeyValueEditor
          label="Headers"
          items={config.headers}
          onAdd={addHeader}
          onUpdate={updateHeader}
          onRemove={removeHeader}
          keyPlaceholder="Header name"
          valuePlaceholder="Header value"
        />

        {/* Authentication */}
        <div className="space-y-4">
          <SelectField
            label="Authentication"
            value={config.auth.type}
            onChange={(value) =>
              updateAuth(value as HttpConfig["auth"]["type"])
            }
            options={authOptions}
            placeholder={""}
            error={""}
          />

          {config.auth.type === AUTH_TYPES.BASIC && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Username"
                value={config.auth.username || ""}
                onChange={(value) => updateAuthCredentials("username", value)}
                placeholder="Enter username"
                required
                error={""}
              />
              <FormField
                label="Password"
                value={config.auth.password || ""}
                onChange={(value) => updateAuthCredentials("password", value)}
                placeholder="Enter password"
                type="password"
                required
                error={""}
              />
            </div>
          )}

          {config.auth.type === AUTH_TYPES.BEARER && (
            <FormField
              label="Bearer Token"
              value={config.auth.token || ""}
              onChange={(value) => updateAuthCredentials("token", value)}
              placeholder="Enter bearer token"
              required
              error={""}
            />
          )}
        </div>

        {/* Body Content */}
        {config.method !== HTTP_METHODS.GET && (
          <div className="space-y-4">
            <SelectField
              label="Request Body"
              value={config.body?.contentType || "none"}
              onChange={(value) => updateBody(value)}
              options={bodyTypeOptions}
              placeholder={""}
              error={""}
            />

            {config.body && (
              <TextareaField
                label="Body Content"
                value={config.body.content}
                onChange={(value) =>
                  updateBody(config.body?.contentType || "", value)
                }
                placeholder={
                  config.body.contentType === "application/json"
                    ? '{\n  "key": "value"\n}'
                    : "Enter request body"
                }
                rows={5}
                error={""}
              />
            )}
          </div>
        )}

        {/* Options */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Request Options
          </h4>
          <div className="space-y-3">
            <CheckboxField
              label="Follow redirects"
              checked={config.options.followRedirects}
              onChange={(checked) => updateOptions("followRedirects", checked)}
              description="Automatically follow HTTP redirects"
            />
            <CheckboxField
              label="Verify SSL certificates"
              checked={config.options.verifySSL}
              onChange={(checked) => updateOptions("verifySSL", checked)}
              description="Verify SSL certificates for HTTPS requests"
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
            disabled={!isValid}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition-all duration-200 ${
                isValid
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
