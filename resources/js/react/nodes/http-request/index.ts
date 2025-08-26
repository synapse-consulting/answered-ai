// Export original modal (preserved)
export { HttpRequestModal } from './HttpRequestModal';

// Export new RJSF-based modal 
export { HttpRequestRjsfModal } from './HttpRequestRjsfModal';

// Export the HTTP request node
export { default as HttpRequestNode } from './HttpRequestNode';

// Export types and schema
export type { HttpConfig, HttpRequestNodeData } from './types';
export { httpRequestSchema, httpRequestUiSchema, defaultHttpRequestData } from './httpRequestSchema';

// Export the custom hook (for the original modal)
export { useHttpRequestData } from './useHttpRequestData';
