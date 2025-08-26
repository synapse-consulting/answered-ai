# HTTP Request Node Components

This directory contains two implementations of HTTP request configuration modals:

## 🔧 Original Implementation (`HttpRequestModal`)

The original custom implementation with hand-crafted form components.

### Features:
- ✅ Custom form components with full styling control
- ✅ Manual validation logic
- ✅ Custom error handling
- ✅ Direct TypeScript integration
- ✅ Existing codebase compatibility

### Usage:
```typescript
import { HttpRequestModal } from './HttpRequestModal';

<HttpRequestModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  nodeId="node-123"
  initialConfig={httpConfig}
/>
```

## 🚀 RJSF Implementation (`HttpRequestRjsfModal`)

New data-driven implementation using React JSON Schema Form.

### Features:
- ✅ Schema-driven form generation
- ✅ Automatic validation via JSON Schema
- ✅ Configuration-based field definitions
- ✅ Reduced maintenance overhead
- ✅ Standardized form behavior
- ✅ Built-in accessibility features

### Usage:
```typescript
import { HttpRequestRjsfModal } from './HttpRequestRjsfModal';

<HttpRequestRjsfModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  nodeId="node-123"
  initialConfig={httpConfig}
/>
```

## 📋 Schema Definition

The RJSF implementation uses a comprehensive JSON schema defined in `httpRequestSchema.ts`:

```typescript
import { httpRequestSchema, httpRequestUiSchema, defaultHttpRequestData } from './httpRequestSchema';
```

### Schema Features:
- **Method selection**: GET, POST, PUT, DELETE, PATCH
- **URL validation**: Built-in URI format validation
- **Dynamic authentication**: None, Basic Auth, Bearer Token
- **Request body**: Support for different content types
- **Headers & Query params**: Dynamic key-value pair arrays
- **Options**: SSL verification, redirect following

## 🎯 When to Use Which?

### Use Original Modal When:
- You need maximum customization control
- You have specific styling requirements
- You're working with existing integrations
- You need custom validation logic

### Use RJSF Modal When:
- You want to reduce maintenance overhead
- You need quick form modifications via schema
- You want standardized validation
- You're building new features
- You need consistent form behavior across the app

## 📁 File Structure

```
http-request/
├── HttpRequestModal.tsx          # Original custom modal
├── HttpRequestRjsfModal.tsx      # New RJSF-based modal
├── HttpRequestNode.tsx           # The actual node component
├── HttpRequestModalExample.tsx   # Demo component showing both
├── httpRequestSchema.ts          # JSON schema definition
├── types.ts                      # TypeScript interfaces
├── useHttpRequestData.ts         # Custom hook for original modal
├── index.ts                      # Barrel exports
└── README.md                     # This file
```

## 🔄 Migration Path

Both implementations are fully compatible and can coexist. To migrate:

1. **Test with RJSF**: Use `HttpRequestRjsfModal` in new features
2. **Gradual replacement**: Replace original modals one by one
3. **Schema refinement**: Adjust the JSON schema as needed
4. **Custom widgets**: Add custom RJSF widgets if needed

## 🛠 Development Notes

### Adding New Fields (RJSF):
1. Update `httpRequestSchema.ts` schema definition
2. Update `httpRequestUiSchema.ts` for UI customization
3. Update `defaultHttpRequestData` if needed

### Adding New Fields (Original):
1. Update `types.ts` interfaces
2. Update `useHttpRequestData.ts` hook
3. Add form components to `HttpRequestModal.tsx`
4. Add validation logic

## 📦 Dependencies

### RJSF Dependencies:
- `@rjsf/core`: Core RJSF functionality
- `@rjsf/utils`: Utility types and functions
- `@rjsf/validator-ajv8`: JSON Schema validation

Install with:
```bash
yarn add @rjsf/core @rjsf/utils @rjsf/validator-ajv8
```

## 🧪 Testing

Use `HttpRequestModalExample.tsx` to test both implementations side by side with the same configuration data.
