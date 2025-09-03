import React, { useEffect } from "react";
import DialogContainer from "../../components/DialogContainer";
// import { FormField } from "../../components/ui/FormField";
import { SelectField } from "../../components/ui/SelectField";
import { KeyValueEditor } from "../../components/ui/KeyValueEditor";
import { CheckboxField } from "../../components/ui/CheckboxField";
import { CrmConfig, CrmConfigSchema } from "../../types";
import { useReactFlow } from "@xyflow/react";
import { SuggestiveInput } from "@/react/components/ui/SuggestiveInput";
import { getNodeSuggestions } from "../../utils/jsonTraverser";
import useSuggestionData from "../hooks/useSuggestionData";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { de } from "zod/v4/locales";
// import { fi } from "zod/v4/locales";

// const defaultValues: CrmConfig = {
//     provider: "hubspot",
//     action: "create",
//     object: "contact",
//     fields: [],
//     apiKey: "",
//     enableLogging: true,
//     autoRetry: false,
// };

interface CrmModalProps {
    isOpen: boolean;
    onClose: () => void;
    nodeId?: string;
    initialConfig?: CrmConfig;
}

export const CrmModal: React.FC<CrmModalProps> = ({
    isOpen,
    onClose,
    nodeId,
    initialConfig,
}) => {
    const { updateNodeData } = useReactFlow();
    // const [config, setConfig] = useState<CrmConfig>(
    //     initialConfig || defaultValues
    // );

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<CrmConfig>({
        resolver: zodResolver(CrmConfigSchema),
        defaultValues: initialConfig ?? {
            provider: "hubspot",
            action: "create",
            object: "contact",
            fields: [],
            apiKey: "",
            enableLogging: true,
            autoRetry: false,
        },
    });

    // useEffect(() => {
    //     setConfig(initialConfig || defaultValues);
    // }, [initialConfig, isOpen]);

    const handleSave = (data: CrmConfig) => {
        // const errors = validateConfig();
        if (nodeId) {
            updateNodeData(nodeId, {
                config: data,
                result: data,
                isConfigured: true,
            });
            console.log(data);
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            reset(
                initialConfig || {
                    provider: "hubspot",
                    action: "create",
                    object: "contact",
                    fields: [],
                    apiKey: "",
                    enableLogging: true,
                    autoRetry: false,
                }
            );
        }
    }, [isOpen, initialConfig, reset]);

    // const validateConfig = (): string[] => {
    //     const errors: string[] = [];
    //     if (!config.apiKey.trim()) {
    //         errors.push("API Key is required");
    //     }
    //     if (!config.object.trim()) {
    //         errors.push("Object type is required");
    //     }
    //     if (config.fields.length === 0) {
    //         errors.push("At least one field mapping is required");
    //     }
    //     return errors;
    // };

    // const addField = () => {
    //     setConfig((prev) => ({
    //         ...prev,
    //         fields: [...prev.fields, { key: "", value: "" }],
    //     }));
    // };

    // const updateField = (
    //     index: number,
    //     field: "key" | "value",
    //     value: string
    // ) => {
    //     setConfig((prev) => ({
    //         ...prev,
    //         fields: prev.fields.map((fieldItem, i) =>
    //             i === index ? { ...fieldItem, [field]: value } : fieldItem
    //         ),
    //     }));
    // };

    // const removeField = (index: number) => {
    //     setConfig((prev) => ({
    //         ...prev,
    //         fields: prev.fields.filter((_, i) => i !== index),
    //     }));
    // };

    const providerOptions = [
        { value: "hubspot", label: "HubSpot" },
        { value: "salesforce", label: "Salesforce" },
        { value: "pipedrive", label: "Pipedrive" },
        { value: "zoho", label: "Zoho CRM" },
    ];

    const actionOptions = [
        { value: "create", label: "Create" },
        { value: "update", label: "Update" },
        { value: "get", label: "Get" },
        { value: "delete", label: "Delete" },
        { value: "search", label: "Search" },
    ];

    const objectOptions = [
        { value: "contact", label: "Contact" },
        { value: "company", label: "Company" },
        { value: "deal", label: "Deal" },
        { value: "ticket", label: "Ticket" },
        { value: "product", label: "Product" },
    ];

    // const errors = validateConfig();

    const { allResults } = useSuggestionData();

    const nodessugg = getNodeSuggestions(allResults);

    return (
        <DialogContainer
            isOpen={isOpen}
            onClose={onClose}
            title="CRM Integration Configuration"
            description="Configure your CRM integration settings"
            maxWidth="2xl"
        >
            <div className="space-y-6">
                <form onSubmit={handleSubmit(handleSave)}>
                    {/* Validation Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-10">
                            <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                                Please fix the following errors:
                            </h4>
                            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                                {Object.entries(errors).map(([key, err]) => (
                                    <li key={key}>• {err.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Basic Configuration */}
                    <div className="grid grid-cols-3 gap-4">
                        <Controller
                            name="provider"
                            control={control}
                            render={({ field }) => (
                                <SelectField
                                    label="CRM Provider"
                                    // {...field}
                                    value={field.value || "hubspot"}
                                    onChange={field.onChange}
                                    options={providerOptions}
                                    required
                                />
                            )}
                        />

                        <Controller
                            name="action"
                            control={control}
                            render={({ field }) => (
                                <SelectField
                                    label="Action"
                                    // {...field}
                                    value={field.value || "create"}
                                    onChange={field.onChange}
                                    options={actionOptions}
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="object"
                            control={control}
                            render={({ field }) => (
                                <SelectField
                                    label="Object Type"
                                    // {...field}
                                    value={field.value || "contact"}
                                    onChange={field.onChange}
                                    options={objectOptions}
                                    required
                                />
                            )}
                        />
                    </div>

                    {/* API Configuration */}

                    <Controller
                        name="apiKey"
                        control={control}
                        render={({ field }) => (
                            <SuggestiveInput
                                {...field}
                                label="API Key"
                                placeholder={`Enter your API key`}
                                type="password"
                                required
                                suggestions={nodessugg}
                            />
                        )}
                    />

                    {/* Field Mappings */}
                    <Controller
                        name="fields"
                        control={control}
                        render={({ field }) => (
                            <KeyValueEditor
                                label="Field Mappings"
                                items={field.value || []}
                                onAdd={() =>
                                    field.onChange([
                                        ...field.value,
                                        { key: "", value: "" },
                                    ])
                                }
                                onUpdate={(index, key, value) => {
                                    const updated = [...field.value];
                                    updated[index] = {
                                        ...updated[index],
                                        [key]: value,
                                    };
                                    field.onChange(updated);
                                }}
                                onRemove={(index) => {
                                    field.onChange(
                                        field.value.filter(
                                            (_, i) => i !== index
                                        )
                                    );
                                }}
                                keyPlaceholder="CRM Field"
                                valuePlaceholder="Value/Variable"
                            />
                        )}
                    />

                    {/* Advanced Options */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Advanced Options
                        </h4>
                        <div className="space-y-3">
                            <Controller
                                name="enableLogging"
                                control={control}
                                render={({ field }) => (
                                    <CheckboxField
                                        label="Enable detailed logging"
                                        checked={field.value}
                                        onChange={field.onChange}
                                        description="Log all API requests and responses for debugging"
                                    />
                                )}
                            />
                            <Controller
                                name="autoRetry"
                                control={control}
                                render={({ field }) => (
                                    <CheckboxField
                                        label="Auto-retry on failure"
                                        checked={field.value}
                                        onChange={field.onChange}
                                        description="Automatically retry failed requests up to 3 times"
                                    />
                                )}
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
              transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition-all duration-200 
                  ${
                      isValid
                          ? "bg-blue-500 hover:bg-blue-600 transform hover:-translate-y-0.5"
                          : "bg-gray-400 cursor-not-allowed"
                  }`}
                        >
                            Save Configuration
                        </button>
                    </div>
                </form>
            </div>
        </DialogContainer>
    );
};
