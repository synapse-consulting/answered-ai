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

interface CredentialModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const defaultValues: CredentialConfig = {
    type: "email",
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

    const handleSave = (data) => {};

    const typeOptions = [
        { value: "email", label: "Email" },
        { value: "slack", label: "Slack" },
        { value: "sms", label: "SMS" },
        { value: "webhook", label: "Webhook" },
    ];

    // const errors = validateConfig();

    const { allResults } = useSuggestionData();
    const nodessugg = getNodeSuggestions(allResults);

    return (
        <DialogContainer
            isOpen={isOpen}
            onClose={onClose}
            title="Add Credentials"
            // description="Configure your notification settings"
            maxWidth="xl"
        >
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
        </DialogContainer>
    );
};
