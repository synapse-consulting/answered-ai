import React, { useState, useEffect } from "react";
import Form from "@rjsf/core";
import { RJSFSchema, IChangeEvent } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import DialogContainer from "../../components/DialogContainer";
import { CustomButton as Button } from "../../components/ui/Button";
import { useReactFlow } from "@xyflow/react";
import { HttpConfig } from "./types";
import {
  httpRequestSchema,
  httpRequestUiSchema,
  defaultHttpRequestData,
} from "./httpRequestSchema";

interface HttpRequestRjsfModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId?: string;
  initialConfig?: HttpConfig;
}

export const HttpRequestRjsfModal: React.FC<HttpRequestRjsfModalProps> = ({
  isOpen,
  onClose,
  nodeId,
  initialConfig,
}) => {
  const { updateNodeData } = useReactFlow();
  const [formData, setFormData] = useState<any>(defaultHttpRequestData);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Initialize form data from initial config
  useEffect(() => {
    if (initialConfig) {
      setFormData({
        method: initialConfig.method,
        url: initialConfig.url,
        queryParams: initialConfig.queryParams || [],
        headers: initialConfig.headers || [],
        auth: initialConfig.auth || { type: "none" },
        body: initialConfig.body || { contentType: "none" },
        options: initialConfig.options || {
          followRedirects: true,
          verifySSL: true,
        },
      });
    } else {
      setFormData(defaultHttpRequestData);
    }
  }, [initialConfig, isOpen]);

  const handleFormChange = (e: IChangeEvent<any>) => {
    setFormData(e.formData);
    setError(null);
  };

  const handleValidation = (formData: any, errors: any) => {
    setIsValid(errors.length === 0);
    return errors;
  };

  const convertFormDataToHttpConfig = (data: any): HttpConfig => {
    return {
      method: data.method,
      url: data.url,
      queryParams: data.queryParams || [],
      headers: data.headers || [],
      body:
        data.body?.contentType !== "none"
          ? {
              contentType: data.body.contentType,
              content: data.body.content || "",
            }
          : undefined,
      auth: data.auth || { type: "none" },
      options: data.options || { followRedirects: true, verifySSL: true },
    };
  };

  const handleExecute = async () => {
    if (!isValid || !nodeId) return;

    setError(null);
    setIsLoading(true);

    try {
      const config = convertFormDataToHttpConfig(formData);

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

      // Add authentication headers
      if (
        config.auth.type === "basic" &&
        config.auth.username &&
        config.auth.password
      ) {
        const credentials = btoa(
          `${config.auth.username}:${config.auth.password}`,
        );
        options.headers = {
          ...options.headers,
          Authorization: `Basic ${credentials}`,
        };
      } else if (config.auth.type === "bearer" && config.auth.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${config.auth.token}`,
        };
      }

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
      setResponse(data);
    } catch (error: any) {
      setError(error.message || "An error occurred while making the request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContainer
      isOpen={isOpen}
      onClose={onClose}
      title="HTTP Request Configuration (RJSF)"
      description="Configure your HTTP request parameters using a data-driven form"
      maxWidth="4xl"
      footer={
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleExecute}
            disabled={!isValid}
            isLoading={isLoading}>
            Execute Request
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

        {/* RJSF Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <Form
            schema={httpRequestSchema}
            uiSchema={httpRequestUiSchema}
            formData={formData}
            validator={validator}
            onChange={handleFormChange}
            validate={handleValidation}
            noHtml5Validate={true}
            showErrorList={true}
            liveValidate={true}>
            {/* Remove default submit button since we have our own */}
            <div style={{ display: "none" }} />
          </Form>
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

        {/* Debug Information */}
        <details className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <summary className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            Debug: Current Form Data
          </summary>
          <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </details>
      </div>
    </DialogContainer>
  );
};
