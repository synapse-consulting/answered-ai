import { BaseNodeData, KeyValuePair } from "../../types";

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

export interface HttpRequestNodeData extends BaseNodeData<HttpConfig> {}