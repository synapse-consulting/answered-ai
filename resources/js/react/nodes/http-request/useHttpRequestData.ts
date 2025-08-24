import { useState, useEffect } from 'react';
import { HttpConfig } from './types';

const DEFAULT_HTTP_CONFIG: HttpConfig = {
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
};

export const useHttpRequestData = (initialConfig?: HttpConfig) => {
  const getDefaultConfig = (): HttpConfig => DEFAULT_HTTP_CONFIG;

  const [config, setConfig] = useState<HttpConfig>(
    initialConfig || getDefaultConfig()
  );

  useEffect(() => {
    setConfig(initialConfig || getDefaultConfig());
  }, [initialConfig]);

  // Query Parameters Management
  const addQueryParam = () => {
    setConfig((prev) => ({
      ...prev,
      queryParams: [...prev.queryParams, { key: "", value: "" }],
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

  const removeQueryParam = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      queryParams: prev.queryParams.filter((_, i) => i !== index),
    }));
  };

  // Headers Management
  const addHeader = () => {
    setConfig((prev) => ({
      ...prev,
      headers: [...prev.headers, { key: "", value: "" }],
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

  const removeHeader = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      headers: prev.headers.filter((_, i) => i !== index),
    }));
  };

  // Basic Configuration
  const updateMethod = (method: HttpConfig['method']) => {
    setConfig((prev) => ({ ...prev, method }));
  };

  const updateUrl = (url: string) => {
    setConfig((prev) => ({ ...prev, url }));
  };

  // Body Management
  const updateBody = (contentType: string, content?: string) => {
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

  // Authentication Management
  const updateAuth = (authType: HttpConfig['auth']['type']) => {
    setConfig((prev) => ({
      ...prev,
      auth: {
        type: authType,
        ...(authType === "none" ? {} : prev.auth),
      },
    }));
  };

  const updateAuthCredentials = (field: 'username' | 'password' | 'token', value: string) => {
    setConfig((prev) => ({
      ...prev,
      auth: { ...prev.auth, [field]: value },
    }));
  };

  // Options Management
  const updateOptions = (field: keyof HttpConfig['options'], value: boolean) => {
    setConfig((prev) => ({
      ...prev,
      options: { ...prev.options, [field]: value },
    }));
  };

  // Validation
  const validateConfig = (): string[] => {
    const errors: string[] = [];
    
    if (!config.url.trim()) {
      errors.push('URL is required');
    }
    
    if (config.url && !isValidUrl(config.url)) {
      errors.push('Please enter a valid URL');
    }
    
    if (config.auth.type === 'basic') {
      if (!config.auth.username?.trim()) {
        errors.push('Username is required for basic authentication');
      }
      if (!config.auth.password?.trim()) {
        errors.push('Password is required for basic authentication');
      }
    }
    
    if (config.auth.type === 'bearer' && !config.auth.token?.trim()) {
      errors.push('Token is required for bearer authentication');
    }
    
    return errors;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return {
    config,
    setConfig,
    
    // Query Parameters
    addQueryParam,
    updateQueryParam,
    removeQueryParam,
    
    // Headers
    addHeader,
    updateHeader,
    removeHeader,
    
    // Basic Configuration
    updateMethod,
    updateUrl,
    
    // Body
    updateBody,
    
    // Authentication
    updateAuth,
    updateAuthCredentials,
    
    // Options
    updateOptions,
    
    // Validation
    validateConfig,
    isValid: validateConfig().length === 0,
  };
};
