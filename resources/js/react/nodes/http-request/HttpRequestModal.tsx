import React from "react";
import DialogContainer from "../../components/DialogContainer";
import { FormField } from "../../components/ui/FormField";
import { SelectField } from "../../components/ui/SelectField";
import { TextareaField } from "../../components/ui/TextareaField";
import { CheckboxField } from "../../components/ui/CheckboxField";
import { KeyValueEditor } from "../../components/ui/KeyValueEditor";
import { Button } from "../../components/ui/Button";
import { useHttpRequestData } from "./useHttpRequestData";
import { HTTP_METHODS, AUTH_TYPES } from "../../types";
import { useReactFlow } from "@xyflow/react";
import { HttpConfig } from "./types";

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
  const { updateNodeData, getNode } = useReactFlow();
  const [error, setError] = React.useState<string | null>(null);
  const [response, setResponse] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

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

  const handleSave = async () => {
    if (!isValid || !nodeId) return;

    setError(null);
    setIsLoading(true);

    try {
      const queryString = config.queryParams?.length
        ? "?" +
          config.queryParams
            .map(
              (p) =>
                `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`,
            )
            .join("&")
        : "";

      const headers =
        config.headers?.reduce((acc: Record<string, string>, h) => {
          if (h.key && h.value) acc[h.key] = h.value;
          return acc;
        }, {}) || {};

      let options: RequestInit = {
        method: config.method,
        headers,
      };

      if (
        ["POST", "PUT", "PATCH", "DELETE"].includes(config.method.toUpperCase())
      ) {
        options.body = config.body?.content || null;
        if (config.body?.contentType) {
          options.headers = {
            ...options.headers,
            "Content-Type": config.body.contentType,
          };
        }
      }

      const url = config.url + queryString;
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Request failed with status ${response.status}`,
        );
      }

      // Update node data and response state
      const updatedData = {
        httpConfig: config,
        isConfigured: true,
        response: data,
      };

      updateNodeData(nodeId, updatedData);
      setResponse(data); // Update local state too
    } catch (error: any) {
      setError(error.message || "An error occurred while making the request");
    } finally {
      setIsLoading(false);
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
      maxWidth="2xl"
      footer={
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!isValid}
            isLoading={isLoading}>
            Execute
          </Button>
        </div>
      }>
      <div className="space-y-6">
        {/* API Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
              Request Failed
            </h4>
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

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
          <h4 className="text-sm font-medium text-gray-300">Request Options</h4>
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

        {/* Response Section */}
        {response && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Response
            </h4>
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </DialogContainer>
  );
};
