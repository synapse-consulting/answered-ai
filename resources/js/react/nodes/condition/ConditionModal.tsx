import React, { useEffect } from "react";
import DialogContainer from "../../components/DialogContainer";
import { SelectField } from "../../components/ui/SelectField";
// import { FormField } from "../../components/ui/FormField";
import { SuggestiveInput } from "../../components/ui/SuggestiveInput";
import { useReactFlow } from "@xyflow/react";
import { ConditionConfig, conditionConfigSchema } from "../../types";
import { getNodeSuggestions } from "../../utils/jsonTraverser";
import useSuggestionData from "../hooks/useSuggestionData";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ConditionModalProps {
    isOpen: boolean;
    onClose: () => void;
    nodeId?: string;
    initialConfig?: ConditionConfig;
}

const OPERATORS = [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Not Equals" },
    { value: "greater_than", label: "Greater Than" },
    { value: "less_than", label: "Less Than" },
    { value: "contains", label: "Contains" },
];

const TYPES = [
    { value: "string", label: "String" },
    { value: "number", label: "Number" },
    { value: "boolean", label: "Boolean" },
];

export const ConditionModal: React.FC<ConditionModalProps> = ({
    isOpen,
    onClose,
    nodeId,
    initialConfig,
}) => {
    const { allResults } = useSuggestionData();
    const { updateNodeData } = useReactFlow();
    const nodessugg = getNodeSuggestions(allResults);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ConditionConfig>({
        resolver: zodResolver(conditionConfigSchema),
        defaultValues: initialConfig ?? {
            operator: { type: "string", operation: "equals" },
            leftValue: "",
            rightValue: "",
        },
    });

    const onSubmit = (data: ConditionConfig) => {
        if (!nodeId) return null;
        updateNodeData(nodeId, (currentData) => ({
            ...currentData,
            conditionConfig: data,
            config: data,
            isConfigured: true,
        }));
        console.log(data);
        onClose();
    };
    useEffect(() => {
        if (initialConfig) {
            reset(initialConfig); // <- replace s values when modal opens
        } else {
            reset({
                leftValue: "",
                operator: { operation: "equals", type: "string" },
                rightValue: "",
            });
        }
    }, [initialConfig, nodeId, reset]);

    return (
        <DialogContainer
            isOpen={isOpen}
            onClose={onClose}
            title={"Conditional Configuration"}
            description="Configure your condition logic"
            maxWidth="2xl"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        {/* Left Value */}
                        <Controller
                            name="leftValue"
                            control={control}
                            render={({ field }) => (
                                <SuggestiveInput
                                    label="Left Value"
                                    {...field}
                                    placeholder="Enter value"
                                    type="text"
                                    required
                                    error={errors.leftValue?.message}
                                    suggestions={nodessugg}
                                />
                            )}
                        />

                        {/* Operator */}
                        <Controller
                            name="operator.operation"
                            control={control}
                            render={({ field }) => (
                                <SelectField
                                    label="Operator"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={OPERATORS}
                                    required
                                    error={errors.operator?.operation?.message}
                                />
                            )}
                        />

                        {/* Right Value */}
                        <Controller
                            name="rightValue"
                            control={control}
                            render={({ field }) => (
                                <SuggestiveInput
                                    label="Right Value"
                                    {...field}
                                    placeholder="Enter value"
                                    type="text"
                                    required
                                    error={errors.rightValue?.message}
                                    suggestions={nodessugg}
                                />
                            )}
                        />

                        {/* Data Type */}
                        <Controller
                            name="operator.type"
                            control={control}
                            render={({ field }) => (
                                <SelectField
                                    label="Data Type"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={TYPES}
                                    required
                                    error={errors.operator?.type?.message}
                                />
                            )}
                        />
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
                            // onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 
                                   rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 
                                   focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 
                                   transform hover:-translate-y-0.5"
                        >
                            Save Configuration
                        </button>
                    </div>
                </div>
            </form>
        </DialogContainer>
    );
};
