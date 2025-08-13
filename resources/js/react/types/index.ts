import { Node, Edge, Connection } from "@xyflow/react";
import React from "react";

export interface BaseNodeData<T extends Record<string, unknown>> extends Record<string, unknown> {
  view: NodeView;
  isConfigured?: boolean
  metadata: T;
}

export interface NodeView {
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  type: NodeTypes;
}


export type NodeTypes = 'trigger' | 'http-request' | 'notification' | 'crm' | 'condition';

export interface NodeType extends Node<BaseNodeData<Record<string, unknown>>, NodeTypes> {}

// HTTP Request Configuration
export interface HttpConfig extends Record<string, unknown> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  queryParams: KeyValuePair[];
  headers: KeyValuePair[];
  body?: {
    contentType: string;
    content: string;
  };
  options: {
    followRedirects: boolean;
    verifySSL: boolean;
  };
  auth: {
    type: 'none' | 'basic' | 'bearer';
    username?: string;
    password?: string;
    token?: string;
  };
}

// Notification Configuration
export interface NotificationConfig extends Record<string, unknown> {
  type: 'email' | 'slack' | 'sms' | 'webhook';
  recipients: KeyValuePair[];
  subject?: string;
  message: string;
  template?: string;
  enableLogging?: boolean;
  autoRetry?: boolean;
}

// CRM Configuration
export interface CrmConfig extends Record<string, unknown> {
  provider: 'hubspot' | 'salesforce' | 'pipedrive' | 'zoho';
  action: 'create' | 'update' | 'get' | 'delete' | 'search';
  object: 'contact' | 'company' | 'deal' | 'ticket' | 'product';
  fields: KeyValuePair[];
  apiKey: string;
  enableLogging: boolean;
  autoRetry: boolean;
}

// Condition Configuration
export interface ConditionConfig extends Record<string, unknown> {
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
  leftValue: string;
  rightValue: string;
  dataType: 'string' | 'number' | 'boolean';
}

export interface HttpRequestNodeData extends BaseNodeData<HttpConfig> {}

export interface NotificationNodeData extends BaseNodeData<NotificationConfig> {}

export interface CrmNodeData extends BaseNodeData<CrmConfig> {}

export interface ConditionNodeData extends BaseNodeData<ConditionConfig> {}

export interface TriggerNodeData extends BaseNodeData<Record<string, unknown>> {}


export interface KeyValuePair {
  key: string;
  value: string;
}

// Node menu item for sidebar
export interface NodeMenuItem {
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  type: NodeTypes;
}


// Constants
export const NODE_TYPES = {
  TRIGGER: 'trigger' as const,
  HTTP_REQUEST: 'http-request' as const,
  NOTIFICATION: 'notification' as const,
  CRM: 'crm' as const,
  CONDITION: 'condition' as const,
} as const;

export const HTTP_METHODS = {
  GET: 'GET' as const,
  POST: 'POST' as const,
  PUT: 'PUT' as const,
  DELETE: 'DELETE' as const,
  PATCH: 'PATCH' as const,
} as const;

export const AUTH_TYPES = {
  NONE: 'none' as const,
  BASIC: 'basic' as const,
  BEARER: 'bearer' as const,
} as const;
