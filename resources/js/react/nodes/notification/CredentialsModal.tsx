import React, { useState, useEffect } from "react";
import DialogContainer from "../../components/DialogContainer";
import { FormField } from "../../components/ui/FormField";
import { SelectField } from "../../components/ui/SelectField";
// import { TextareaField } from "../../components/ui/TextareaField";
import { CheckboxField } from "../../components/ui/CheckboxField";
import { KeyValueEditor } from "../../components/ui/KeyValueEditor";
import { CredentialConfig, CredentialConfigSchema } from "../../types";
import { useReactFlow } from "@xyflow/react";
import { SuggestiveInput } from "@/react/components/ui/SuggestiveInput";
import { getNodeSuggestions } from "../../utils/jsonTraverser";
import useSuggestionData from "../hooks/useSuggestionData";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CredentialModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const defaultValues: CredentialConfig = {
    type: "smtp",
    name: "",
    credentials: {
        host: "",
        port: "",
        encryption: "",
        username: "",
        password: "",
    },
};

export const CredentialsModal: React.FC<CredentialModalProps> = ({
    isOpen,
    onClose,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        watch,
    } = useForm<CredentialConfig>({
        resolver: zodResolver(CredentialConfigSchema),
        defaultValues: { ...defaultValues },
    });

    const [loading, setLoading] = useState<boolean>(false);

    const baseUrl =
        document
            .querySelector('meta[name="app-url"]')
            ?.getAttribute("content") || "";

    const handleSave = async (data: CredentialConfig) => {
        const url = new URL(window.location.href);
        const id = url.searchParams.get("id");

        try {
            const data = await fetch(`${baseUrl}/api/workflow/${id}`).then(
                (res) => res.json()
            );
            var company_id = data.Workflow.company_id;
        } catch (error) {
            console.log("Untitled Workflow");
        }

        // Saving the workflow
        try {
            const response = await fetch(`${baseUrl}/api/credentials`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    company_id,
                    configuration: data.credentials,
                    type: data.type,
                }),
            });

            setLoading(false);
            if (!response.ok) {
                toast.error(`Failed to save. Status: ${response.status}`);
            } else {
                reset();
                onClose();
            }
        } catch (error) {
            console.error("Error Saving Credentials:", error);
            toast(`Error Saving Credentials`);
        }
    };

    const typeOptions = [
        { value: "smtp", label: "SMTP" },
        { value: "slack", label: "Slack" },
        { value: "sms", label: "SMS" },
        { value: "webhook", label: "Webhook" },
    ];

    const { allResults } = useSuggestionData();
    const nodessugg = getNodeSuggestions(allResults);

    return (
        <DialogContainer
            isOpen={isOpen}
            onClose={onClose}
            title="Add Credentials"
            // description="Configure your notification settings"
            maxWidth="lg"
        >
            <form onSubmit={handleSubmit(handleSave)}>
                <div className="space-y-4">
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <FormField
                                label="Credientials Name"
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Credientials Name"
                                type="text"
                                required
                                error={errors.name?.message}
                                // error={error
                            />
                        )}
                    />

                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <SelectField
                                label="Credientials Type"
                                value={field.value}
                                onChange={field.onChange}
                                options={typeOptions}
                                required
                                error={errors.type?.message}
                            />
                        )}
                    />
                    <Controller
                        name="credentials.host"
                        control={control}
                        render={({ field }) => (
                            <SuggestiveInput
                                label="Host"
                                value={field.value || ""}
                                onChange={field.onChange}
                                type="text"
                                placeholder="Enter email Host"
                                required
                                error={errors.credentials?.host?.message}
                                suggestions={nodessugg}
                            />
                        )}
                    />
                    <Controller
                        name="credentials.port"
                        control={control}
                        render={({ field }) => (
                            <SuggestiveInput
                                label="Port"
                                value={field.value || ""}
                                onChange={field.onChange}
                                type="text"
                                placeholder="Enter email Port"
                                required
                                // error="adsfa"
                                error={errors.credentials?.port?.message}
                                suggestions={nodessugg}
                            />
                        )}
                    />
                    <Controller
                        name="credentials.encryption"
                        control={control}
                        render={({ field }) => (
                            <SuggestiveInput
                                label="Encryption"
                                value={field.value || ""}
                                onChange={field.onChange}
                                type="text"
                                placeholder="Enter Encryption"
                                required
                                // error="adsfa"
                                error={errors.credentials?.encryption?.message}
                                suggestions={nodessugg}
                            />
                        )}
                    />
                    <Controller
                        name="credentials.username"
                        control={control}
                        render={({ field }) => (
                            <SuggestiveInput
                                label="Username"
                                value={field.value || ""}
                                onChange={field.onChange}
                                type="text"
                                placeholder="Enter Username"
                                required
                                // error="adsfa"
                                suggestions={nodessugg}
                            />
                        )}
                    />
                    <Controller
                        name="credentials.password"
                        control={control}
                        render={({ field }) => (
                            <SuggestiveInput
                                label="Password"
                                value={field.value || ""}
                                onChange={field.onChange}
                                type="password"
                                placeholder="Enter Password"
                                required
                                // error="adsfa"
                                suggestions={nodessugg}
                            />
                        )}
                    />
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
                            Save Credentials
                        </button>
                    </div>
                </div>
            </form>
        </DialogContainer>
    );
};
