# React Workflow Builder - TypeScript Edition

A modular, TypeScript-based workflow builder using React Flow with decentralized state management.

## 🏗️ Architecture

This project uses **React Flow's built-in state management** with the `useReactFlow` hook for decentralized, component-level state control instead of centralized state management.

### Core Principle
Each component manages its own interactions with the React Flow instance:
- **Sidebar**: Directly adds nodes using `addNodes()`
- **Modals**: Directly update node data using `updateNodeData()`
- **WorkflowPage**: Minimal orchestration, mostly event handling

## 📂 Project Structure

```
resources/js/react/
├── types/
│   └── index.ts                    # Complete TypeScript type definitions
├── components/
│   ├── ui/                        # Reusable UI components
│   │   ├── FormField.tsx
│   │   ├── SelectField.tsx
│   │   ├── TextareaField.tsx
│   │   ├── CheckboxField.tsx
│   │   ├── KeyValueEditor.tsx
│   │   └── index.ts
│   ├── CustomNode.tsx             # Flow node renderer
│   ├── DialogContainer.tsx        # Modal wrapper
│   └── Sidebar.tsx               # Node palette + workflow actions
├── hooks/
│   └── useWorkflowState.ts       # Minimal state + utility functions
├── nodes/                        # Node-specific modules
│   ├── http-request/
│   │   ├── HttpRequestModal.tsx
│   │   ├── useHttpRequestData.ts
│   │   └── index.ts
│   ├── notification/
│   │   ├── NotificationModal.tsx
│   │   └── index.ts
│   └── crm/
│       ├── CrmModal.tsx
│       └── index.ts
├── config/
│   └── nodeTypes.tsx            # Node definitions for sidebar
├── Pages/
│   └── WorkflowPage.tsx         # Main workflow interface
└── index.ts                     # Barrel exports
```

## 🔄 State Management Philosophy

### React Flow Native Approach
Instead of custom state management, we leverage React Flow's built-in capabilities:

```typescript
// ❌ Old approach: Centralized state
const useWorkflowState = () => {
  const [nodes, setNodes] = useState([]);
  const addNode = (nodeData) => { /* custom logic */ };
  const updateNode = (id, data) => { /* custom logic */ };
  // ... many more functions
};

// ✅ New approach: Direct React Flow usage
const Sidebar = () => {
  const { addNodes } = useReactFlow();
  
  const handleAddNode = (item) => {
    addNodes({
      id: generateId(),
      type: "custom",
      position: randomPosition(),
      data: item
    });
  };
};

const Modal = ({ nodeId }) => {
  const { updateNodeData } = useReactFlow();
  
  const handleSave = (config) => {
    updateNodeData(nodeId, {
      httpConfig: config,
      isConfigured: true
    });
  };
};
```

### Benefits of This Approach

1. **🎯 Single Responsibility**: Each component handles its own React Flow interactions
2. **📦 Less Code**: Eliminated custom state synchronization logic
3. **⚡ Better Performance**: Direct React Flow updates without intermediate state
4. **🔧 Easier Debugging**: State changes happen where they're triggered
5. **🛡️ Type Safety**: Full TypeScript support with React Flow's built-in types

## 📋 Core Components

### 1. useWorkflowState Hook (Simplified)
```typescript
export const useWorkflowState = () => {
  // Basic React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  
  // React Flow utilities
  const { deleteElements } = useReactFlow();
  
  // Minimal utility functions
  const handleKeyDown = (event) => { /* delete selected */ };
  const handleNodeClick = (event, node) => { /* select for config */ };
  const handleSaveWorkflow = () => { /* export workflow */ };
  
  return {
    // State
    nodes, edges, selectedNode, setSelectedNode,
    // React Flow handlers
    onNodesChange, onEdgesChange, onConnect,
    // Utility functions
    handleKeyDown, handleNodeClick, handleSaveWorkflow
  };
};
```

### 2. Self-Managing Sidebar
```typescript
const Sidebar = ({ onSave }) => {
  const { addNodes } = useReactFlow();
  
  const handleAddNode = (item) => {
    addNodes({
      id: generateId(),
      type: "custom", 
      position: randomPosition(),
      data: item
    });
  };
  
  return (
    <div>
      {nodeMenuItems.map(item => (
        <div onClick={() => handleAddNode(item)}>
          {item.label}
        </div>
      ))}
    </div>
  );
};
```

### 3. Self-Updating Modals
```typescript
const HttpRequestModal = ({ isOpen, onClose, nodeId, initialConfig }) => {
  const { updateNodeData } = useReactFlow();
  const { config, /* ... other hooks */ } = useHttpRequestData(initialConfig);
  
  const handleSave = () => {
    if (isValid && nodeId) {
      updateNodeData(nodeId, {
        httpConfig: config,
        isConfigured: true
      });
      onClose();
    }
  };
  
  return (
    <DialogContainer isOpen={isOpen} onClose={onClose}>
      {/* Form fields */}
      <button onClick={handleSave}>Save</button>
    </DialogContainer>
  );
};
```

## 🎨 Node Types

### Available Node Types
- **🔄 Trigger**: Workflow starting point
- **🌐 HTTP Request**: API calls with full configuration
- **📧 Notification**: Email/SMS/Slack messaging  
- **👥 CRM**: Customer relationship management integration
- **🔀 Condition**: Conditional logic branching

### Adding New Node Types
1. **Define Types**: Add interfaces to `types/index.ts`
2. **Create Module**: Add folder under `nodes/`
3. **Build Modal**: Create configuration modal component
4. **Register**: Add to `config/nodeTypes.tsx`
5. **Handle**: Update `CustomNode.tsx` display logic

## 🔧 Usage Patterns

### Creating Nodes
```typescript
// Sidebar automatically handles node creation
const { addNodes } = useReactFlow();
addNodes(newNodeData);
```

### Configuring Nodes  
```typescript
// Modal handles its own updates
const { updateNodeData } = useReactFlow();
updateNodeData(nodeId, { config: newConfig, isConfigured: true });
```

### Workflow Export
```typescript
// Hook provides workflow structure
const { nodes, edges } = useReactFlow();
const workflow = createWorkflowStructure(nodes, edges);
```

## 🚀 Development

### Key Advantages
- **Decentralized Logic**: Components own their React Flow interactions
- **Minimal Coordination**: Less prop drilling and state synchronization
- **Native Performance**: Direct React Flow updates
- **Type Safety**: Full TypeScript coverage
- **Easy Testing**: Components can be tested in isolation

### Best Practices
1. **Use `useReactFlow` Directly**: Don't wrap React Flow functionality unnecessarily
2. **Component Responsibility**: Let each component handle its own state updates
3. **Minimal Hooks**: Keep custom hooks focused on business logic, not state management
4. **Type Everything**: Leverage TypeScript for compile-time safety

This architecture provides a clean, performant, and maintainable workflow builder that scales with your needs while leveraging React Flow's powerful built-in capabilities.