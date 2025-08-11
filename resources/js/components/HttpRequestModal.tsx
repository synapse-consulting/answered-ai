import { XMarkIcon } from "@heroicons/react/24/outline";
import DialogContainer from "./DialogContainer";
import React, { useState } from "react";

interface QueryParam {
  key: string;
  value: string;
}

interface Header {
  key: string;
  value: string;
}

interface HttpConfig {
  method: string;
  url: string;
  queryParams: QueryParam[];
  headers: Header[];
  body?: {
    contentType: string;
    content: string;
  };
  options: {
    followRedirects: boolean;
    verifySSL: boolean;
  };
  auth: {
    type: "none" | "basic" | "bearer";
    username?: string;
    password?: string;
    token?: string;
  };
}

interface HttpRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: HttpConfig) => void;
  initialConfig?: HttpConfig;
}

export default function HttpRequestModal({
  isOpen,
  onClose,
  onSave,
  initialConfig,
}: HttpRequestModalProps) {
  const getDefaultConfig = (): HttpConfig => ({
    method: "GET",
    url: "",
    queryParams: [],
    headers: [],
    body: undefined,
    auth: { type: "none" },
    options: {
      followRedirects: true,
      verifySSL: true,
    },
  });

  const [config, setConfig] = useState<HttpConfig>(
    initialConfig || getDefaultConfig(),
  );

  // Update config when initialConfig changes (when different node is selected)
  React.useEffect(() => {
    setConfig(initialConfig || getDefaultConfig());
  }, [initialConfig, isOpen]);

  // Helper functions
  const addQueryParam = () => {
    setConfig((prev) => ({
      ...prev,
      queryParams: [...prev.queryParams, { key: "", value: "" }],
    }));
  };

  const addHeader = () => {
    setConfig((prev) => ({
      ...prev,
      headers: [...prev.headers, { key: "", value: "" }],
    }));
  };

  const updateQueryParam = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    setConfig((prev) => ({
      ...prev,
      queryParams: prev.queryParams.map((param, i) =>
        i === index ? { ...param, [field]: value } : param,
      ),
    }));
  };

  const updateHeader = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    setConfig((prev) => ({
      ...prev,
      headers: prev.headers.map((header, i) =>
        i === index ? { ...header, [field]: value } : header,
      ),
    }));
  };

  const removeQueryParam = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      queryParams: prev.queryParams.filter((_, i) => i !== index),
    }));
  };

  const removeHeader = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      headers: prev.headers.filter((_, i) => i !== index),
    }));
  };

  const handleBodyChange = (contentType: string, content?: string) => {
    setConfig((prev) => ({
      ...prev,
      body:
        contentType === "none"
          ? undefined
          : {
              contentType,
              content: content || prev.body?.content || "",
            },
    }));
  };

  return (
    <DialogContainer
      isOpen={isOpen}
      onClose={onClose}
      title="HTTP Request Configuration"
      description="Configure your HTTP request parameters"
      maxWidth="2xl">
      <div className="space-y-6">
        {/* Basic Configuration */}
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Method
            </label>
            <select
              value={config.method}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, method: e.target.value }))
              }
              className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL
            </label>
            <input
              type="text"
              value={config.url}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, url: e.target.value }))
              }
              className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200"
              placeholder="https://api.example.com/endpoint"
            />
          </div>
        </div>

        {/* Query Parameters */}
        <div>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Query Parameters
            </label>
            <button
              onClick={addQueryParam}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              + Add Parameter
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {config.queryParams.map((param, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={param.key}
                  onChange={(e) =>
                    updateQueryParam(index, "key", e.target.value)
                  }
                  placeholder="Key"
                  className="flex-1 p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
                />
                <input
                  type="text"
                  value={param.value}
                  onChange={(e) =>
                    updateQueryParam(index, "value", e.target.value)
                  }
                  placeholder="Value"
                  className="flex-1 p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
                />
                <button
                  onClick={() => removeQueryParam(index)}
                  className="px-3 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Headers */}
        <div>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Headers
            </label>
            <button
              onClick={addHeader}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              + Add Header
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {config.headers.map((header, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) => updateHeader(index, "key", e.target.value)}
                  placeholder="Header Name"
                  className="flex-1 p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) => updateHeader(index, "value", e.target.value)}
                  placeholder="Value"
                  className="flex-1 p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
                />
                <button
                  onClick={() => removeHeader(index)}
                  className="px-3 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Authentication */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Authentication
          </label>
          <select
            value={config.auth.type}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                auth: {
                  type: e.target.value as "none" | "basic" | "bearer",
                  ...(e.target.value === "none" ? {} : prev.auth),
                },
              }))
            }
            className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200">
            <option value="none">No Authentication</option>
            <option value="basic">Basic Auth</option>
            <option value="bearer">Bearer Token</option>
          </select>

          {config.auth.type === "basic" && (
            <div className="mt-3 grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Username"
                value={config.auth.username || ""}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    auth: { ...prev.auth, username: e.target.value },
                  }))
                }
                className="p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200"
              />
              <input
                type="password"
                placeholder="Password"
                value={config.auth.password || ""}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    auth: { ...prev.auth, password: e.target.value },
                  }))
                }
                className="p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200"
              />
            </div>
          )}

          {config.auth.type === "bearer" && (
            <input
              type="text"
              placeholder="Bearer Token"
              value={config.auth.token || ""}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  auth: { ...prev.auth, token: e.target.value },
                }))
              }
              className="mt-3 w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200"
            />
          )}
        </div>

        {/* Body Content */}
        {config.method !== "GET" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Request Body
            </label>
            <div className="space-y-3">
              <select
                value={config.body?.contentType || "none"}
                onChange={(e) => handleBodyChange(e.target.value)}
                className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200">
                <option value="none">No Body</option>
                <option value="application/json">JSON</option>
                <option value="application/x-www-form-urlencoded">
                  Form URL Encoded
                </option>
                <option value="multipart/form-data">Form Data</option>
                <option value="text/plain">Raw</option>
              </select>
              {config.body && (
                <textarea
                  value={config.body.content}
                  onChange={(e) =>
                    handleBodyChange(config.body!.contentType, e.target.value)
                  }
                  placeholder={
                    config.body.contentType === "application/json"
                      ? '{\n  "key": "value"\n}'
                      : "Enter request body"
                  }
                  rows={5}
                  className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-sm"
                />
              )}
            </div>
          </div>
        )}

        {/* Options */}
        <div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="followRedirects"
                checked={config.options.followRedirects}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    options: {
                      ...prev.options,
                      followRedirects: e.target.checked,
                    },
                  }))
                }
                className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
              />
              <label
                htmlFor="followRedirects"
                className="text-sm text-gray-700 dark:text-gray-300">
                Follow redirects
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="verifySSL"
                checked={config.options.verifySSL}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    options: { ...prev.options, verifySSL: e.target.checked },
                  }))
                }
                className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
              />
              <label
                htmlFor="verifySSL"
                className="text-sm text-gray-700 dark:text-gray-300">
                Verify SSL certificates
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(config);
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5">
            Save Configuration
          </button>
        </div>
      </div>
    </DialogContainer>
  );
}
