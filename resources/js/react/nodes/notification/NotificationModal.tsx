import React, { useState, useEffect } from "react";
import DialogContainer from "../../components/DialogContainer";
import { FormField } from "../../components/ui/FormField";
import { SelectField } from "../../components/ui/SelectField";
// import { TextareaField } from "../../components/ui/TextareaField";
import { CheckboxField } from "../../components/ui/CheckboxField";
import { KeyValueEditor } from "../../components/ui/KeyValueEditor";
import {
    NotificationConfig,
    NotificationConfigSchema,
    NotificationNodeData,
} from "../../types";
import { useReactFlow } from "@xyflow/react";
import { SuggestiveInput } from "@/react/components/ui/SuggestiveInput";
import { getNodeSuggestions } from "../../utils/jsonTraverser";
import useSuggestionData from "../hooks/useSuggestionData";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CredentialsModal } from "./CredentialsModal";

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    nodeId?: string;
}

const defaultValues: NotificationConfig = {
    credential: "credentials1",
    type: "email",
    recipients: [],
    subject: "",
    message: "",
    template: "",
    enableLogging: true,
    autoRetry: false,
};

export const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
    nodeId,
}) => {
    const { updateNodeData, getNode } = useReactFlow();
    const [showCredentialsModal, setShowCredentialsModal] = useState(false);

    const initialConfig = getNode(nodeId ?? "")?.data as
        | NotificationNodeData
        | undefined;

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        watch,
    } = useForm<NotificationConfig>({
        resolver: zodResolver(NotificationConfigSchema),
        defaultValues: { ...defaultValues, ...initialConfig?.config },
    });
    React.useEffect(() => {
        if (initialConfig) {
            reset({ ...defaultValues, ...initialConfig?.config });
        }
    }, [initialConfig, isOpen]);

    const baseUrl =
        document
            .querySelector('meta[name="app-url"]')
            ?.getAttribute("content") || "";

    const handleSave = (data: NotificationConfig) => {
        if (nodeId) {
            updateNodeData(nodeId, (currentData) => ({
                ...currentData,
                config: data,
                result: data,
                isConfigured: true,
            }));
            onClose();
        }
    };
    useEffect(() => {
        const getCredentials = async () => {
            // console.log("Saved data:", data);
            const url = new URL(window.location.href);
            // const parts = url.split("/");
            // const workflowId = parts[2];
            const id = url.searchParams.get("id");
            console.log(id);

            try {
                const data = await fetch(`${baseUrl}/api/workflow/${id}`).then(
                    (res) => res.json()
                );
                var company_id = data.Workflow.company_id;
                console.log(company_id);
            } catch (error) {
                console.log("Untitled Workflow");
            }

            // Saving the workflow
            try {
                const response = await fetch(
                    `${baseUrl}/api/credentials?company_id=${company_id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                // setLoading(false);
                const result = await response.json();
                if (!response.ok) {
                    // toast.error(`Failed to save. Status: ${response.status}`);
                    console.log(result);
                } else {
                    // toast.success("Workflow saved successfully!");
                    console.log(result);
                }
            } catch (error) {
                console.error("catch error", error);
                // toast(`Error saving nodes`);
            }
        };
        getCredentials();
    }, []);

    const typeOptions = [
        { value: "email", label: "Email" },
        { value: "slack", label: "Slack" },
        { value: "sms", label: "SMS" },
        { value: "webhook", label: "Webhook" },
    ];

    const credentialsOptions = [
        { value: "credentials1", label: "credentials1" },
        { value: "credentials2", label: "credentials2" },
        { value: "credentials3", label: "credentials3" },
        { value: "credentials4", label: "credentials4" },
    ];

    // const errors = validateConfig();

    const { allResults } = useSuggestionData();
    const nodessugg = getNodeSuggestions(allResults);

    return (
        <DialogContainer
            isOpen={isOpen}
            onClose={onClose}
            title="Notification Configuration"
            description="Configure your notification settings"
            maxWidth="2xl"
        >
            <CredentialsModal
                isOpen={showCredentialsModal}
                onClose={() => setShowCredentialsModal(false)}
            />
            <form onSubmit={handleSubmit(handleSave)}>
                <div className="space-y-6">
                    {/* Validation Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
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

                    <Controller
                        name="credential"
                        control={control}
                        render={({ field }) => (
                            <div className="space-y-2">
                                <SelectField
                                    label="Add Credentials"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={credentialsOptions}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCredentialsModal(true)
                                    }
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    + Add New Credential
                                </button>
                            </div>
                        )}
                    />

                    {/* Notification Type */}

                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <SelectField
                                label="Notification Type"
                                value={field.value}
                                onChange={field.onChange}
                                options={typeOptions}
                                required
                            />
                        )}
                    />

                    {/* Subject (for email) */}
                    {watch("type") == "email" && (
                        <Controller
                            name="subject"
                            control={control}
                            render={({ field }) => (
                                <SuggestiveInput
                                    label="Subject"
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    type="text"
                                    placeholder="Enter email subject"
                                    required
                                    // error="adsfa"
                                    suggestions={nodessugg}
                                />
                            )}
                        />
                    )}

                    {/* Message */}
                    <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                            <SuggestiveInput
                                label="Message"
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Enter your notification message..."
                                required
                                suggestions={nodessugg}
                            />
                        )}
                    />

                    <Controller
                        name="recipients"
                        control={control}
                        render={({ field }) => (
                            <KeyValueEditor
                                label="Recipients"
                                items={field.value}
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
                                keyPlaceholder="Name"
                                valuePlaceholder={
                                    watch("type") === "email"
                                        ? "email@example.com"
                                        : watch("type") === "slack"
                                        ? "@username or #channel"
                                        : "Recipient"
                                }
                            />
                        )}
                    />

                    {/* Template Options */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Template Options
                        </h4>
                        <div className="space-y-3">
                            <Controller
                                name="template"
                                control={control}
                                render={({ field }) => (
                                    <CheckboxField
                                        label="Use custom template"
                                        checked={!!field.value}
                                        onChange={(checked) =>
                                            field.onChange(
                                                checked ? "custom" : ""
                                            )
                                        }
                                        description="Enable to use a custom message template"
                                    />
                                )}
                            />

                            {/* {config.template && ( */}
                            {watch("template") && (
                                <Controller
                                    name="template"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            label="Template ID"
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            placeholder="Enter template ID"
                                        />
                                    )}
                                />
                            )}
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
                            // onClick={handleSave}
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
                </div>
            </form>
        </DialogContainer>
    );
};
