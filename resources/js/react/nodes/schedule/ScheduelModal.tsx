import React from "react";
import {
    ScheduelConfig,
    ScheduelConfigSchema,
    ScheduelNodeData,
} from "@/react/types";
import DialogContainer from "@/react/components/DialogContainer";
import { SelectField } from "@/react/components/ui/SelectField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReactFlow } from "@xyflow/react";
import { SuggestiveInput } from "@/react/components/ui/SuggestiveInput";
import {
    getNodeNameIdSuggestions,
    getNodeSuggestions,
} from "../../utils/jsonTraverser";
import useSuggestionData, { useNodeData } from "../hooks/useSuggestionData";
import { DatePicker } from "@/react/components/ui/DatePicker";
import { CheckboxField } from "@/react/components/ui/CheckboxField";

interface ConditionModalProps {
    isOpen: boolean;
    onClose: () => void;
    nodeId?: string;
}

// const defaultValues: ScheduelConfig = {
//     interval: "seconds",
//     secondsBetween: "",
//     minutesBetween: "",
//     hoursBetween: "",
//     daysBetween: "",
//     weeksBetween: "",
//     monthsBetween: "",
//     triggerAtMinute: "",
//     triggerAtHour: "1am",
//     triggerAtDate: "2",
//     triggerAtDay: "monday",
// };
// const defaultValues: ScheduelConfig = {
//     interval: "seconds",
//     secondsBetween: "",
// };

const defaultValues: ScheduelConfig = {
    dateTime: new Date().toISOString(),
    interval: "seconds",
    isRecuring: false,
    action: "",
    secondsBetween: "",
};

const IntervalOptions = [
    { value: "seconds", label: "Seconds" },
    { value: "minutes", label: "Minutes" },
    { value: "hours", label: "Hours" },
    { value: "days", label: "Days" },
    { value: "weeks", label: "Weeks" },
    { value: "months", label: "Months" },
];

const HoursOptions = [
    { value: "1am", label: "1am" },
    { value: "2am", label: "2am" },
    { value: "3am", label: "3am" },
    { value: "4am", label: "4am" },
    { value: "5am", label: "5am" },
    { value: "6am", label: "6am" },
    { value: "7am", label: "7am" },
    { value: "8am", label: "8am" },
];

const DaysOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Thursday" },
    { value: "saturday", label: "Thursday" },
    { value: "sunday", label: "Thursday" },
];

export const ScheduelModal: React.FC<ConditionModalProps> = ({
    isOpen,
    onClose,
    nodeId,
}) => {
    const { updateNodeData, getNode } = useReactFlow();
    const initialConfig = getNode(nodeId ?? "")?.data as
        | ScheduelNodeData
        | undefined;

    const { control, handleSubmit, watch, reset } = useForm<ScheduelConfig>({
        resolver: zodResolver(ScheduelConfigSchema),
        defaultValues: { ...defaultValues, ...initialConfig?.config },
    });

    React.useEffect(() => {
        if (initialConfig) {
            reset({ ...defaultValues, ...initialConfig?.config });
        }
    }, [initialConfig, isOpen]);

    const { NodesId } = useNodeData(); // For Name and Id of Nodes
    const updatedNode = NodesId.filter((node) => node.id !== nodeId);
    const nodeIdName = getNodeNameIdSuggestions(updatedNode);

    const { allResults } = useSuggestionData();
    const nodessugg = getNodeSuggestions(allResults);

    const cleanConfig = (data: ScheduelConfig): Partial<ScheduelConfig> => {
        const { interval, ...rest } = data;

        switch (interval) {
            case "seconds":
                return {
                    interval,
                    isRecuring: data.isRecuring,
                    dateTime: data.dateTime,
                    action: data.action,
                    secondsBetween: data.secondsBetween,
                };
            case "minutes":
                return {
                    interval,
                    isRecuring: data.isRecuring,
                    dateTime: data.dateTime,
                    action: data.action,
                    minutesBetween: data.minutesBetween,
                };
            case "hours":
                return {
                    interval,
                    isRecuring: data.isRecuring,
                    dateTime: data.dateTime,
                    action: data.action,
                    hoursBetween: data.hoursBetween,
                    // triggerAtMinute: data.triggerAtMinute,
                };
            case "days":
                return {
                    interval,
                    isRecuring: data.isRecuring,
                    dateTime: data.dateTime,
                    action: data.action,
                    daysBetween: data.daysBetween,
                    // triggerAtHour: data.triggerAtHour,
                    // triggerAtMinute: data.triggerAtMinute,
                };
            case "weeks":
                return {
                    interval,
                    isRecuring: data.isRecuring,
                    dateTime: data.dateTime,
                    action: data.action,
                    weeksBetween: data.weeksBetween,
                    // triggerAtDay: data.triggerAtDay,
                    // triggerAtHour: data.triggerAtHour,
                    // triggerAtMinute: data.triggerAtMinute,
                };
            case "months":
                return {
                    interval,
                    isRecuring: data.isRecuring,
                    dateTime: data.dateTime,
                    action: data.action,
                    monthsBetween: data.monthsBetween,
                    // triggerAtDate: data.triggerAtDate,
                    // triggerAtHour: data.triggerAtHour,
                    // triggerAtMinute: data.triggerAtMinute,
                };
            default:
                return {
                    interval,
                };
        }
    };

    const handleSave = (data: ScheduelConfig) => {
        if (nodeId) {
            updateNodeData(nodeId, {
                config: cleanConfig(data),
                isConfigured: true,
            });
            onClose();
        }
    };

    const onError = (errors: any) => {
        console.log("❌ Validation errors:", errors);
    };

    return (
        <DialogContainer
            isOpen={isOpen}
            onClose={onClose}
            title={"Scheduel Trigger"}
            description="Configure your Scheduel logic"
            maxWidth="2xl"
        >
            <form onSubmit={handleSubmit(handleSave, onError)}>
                <div className="space-y-4">
                    <Controller
                        name="dateTime"
                        control={control}
                        render={({ field }) => <DatePicker field={field} />}
                    />
                    <Controller
                        control={control}
                        name="interval"
                        render={({ field }) => (
                            <SelectField
                                label="Trigger Interval"
                                {...field}
                                options={IntervalOptions}
                                required
                            />
                        )}
                    />

                    {["weeks"].includes(watch("interval")) && (
                        <Controller
                            name="weeksBetween"
                            control={control}
                            render={({ field, fieldState }) => (
                                <SuggestiveInput
                                    label="Weeks Between Trigger"
                                    type="text"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter Weeks"
                                    suggestions={nodessugg}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    )}

                    {/* {["weeks"].includes(watch("interval")) && (
                        <Controller
                            name="triggerAtDay"
                            control={control}
                            render={({ field, fieldState }) => (
                                <SelectField
                                    label="Trigger at Day"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter A Day"
                                    options={DaysOptions}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    )} */}

                    {watch("interval") == "seconds" && (
                        <Controller
                            name="secondsBetween"
                            control={control}
                            render={({ field, fieldState }) => (
                                <SuggestiveInput
                                    label="Seconds Between Trigger"
                                    type="text"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter Seconds"
                                    required
                                    suggestions={nodessugg}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    )}

                    {["months"].includes(watch("interval")) && (
                        <Controller
                            name="monthsBetween"
                            control={control}
                            render={({ field, fieldState }) => (
                                <SuggestiveInput
                                    label="Months Between Trigger"
                                    type="text"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter Months"
                                    suggestions={nodessugg}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    )}

                    {/* {["months"].includes(watch("interval")) && (
                        <Controller
                            name="triggerAtDate"
                            control={control}
                            render={({ field, fieldState }) => (
                                <SuggestiveInput
                                    label="Date of Month"
                                    type="text"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter Date"
                                    suggestions={nodessugg}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    )} */}

                    {watch("interval") == "minutes" && (
                        <Controller
                            name="minutesBetween"
                            control={control}
                            render={({ field, fieldState }) => (
                                <SuggestiveInput
                                    label="Minutes Between Trigger"
                                    type="text"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter Minutes"
                                    suggestions={nodessugg}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    )}

                    {watch("interval") == "hours" && (
                        <Controller
                            name="hoursBetween"
                            control={control}
                            render={({ field, fieldState }) => (
                                <SuggestiveInput
                                    label="Hours Between Trigger"
                                    type="text"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter Hours"
                                    suggestions={nodessugg}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    )}

                    {["days"].includes(watch("interval")) && (
                        <Controller
                            name="daysBetween"
                            control={control}
                            render={({ field, fieldState }) => (
                                <SuggestiveInput
                                    label="Days Between Trigger"
                                    type="text"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter Days"
                                    suggestions={nodessugg}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    )}

                    <Controller
                        name="action"
                        control={control}
                        render={({ field, fieldState }) => (
                            <SelectField
                                label="Action"
                                placeholder="Please select node"
                                value={field.value}
                                onChange={field.onChange}
                                options={nodeIdName}
                                // error={fieldState.error}
                            />
                        )}
                    />

                    {/* {["days", "weeks", "months"].includes(
                        watch("interval")
                    ) && (
                        <Controller
                            name="triggerAtHour"
                            control={control}
                            render={({ field, fieldState }) => (
                                <SelectField
                                    label="Trigger at Hour"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter Hour"
                                    error={fieldState.error?.message}
                                    options={HoursOptions}
                                />
                            )}
                        />
                    )} */}

                    {/* {["hours", "days", "weeks", "months"].includes(
                        watch("interval")
                    ) && (
                        <Controller
                            name="triggerAtMinute"
                            control={control}
                            render={({ field, fieldState }) => (
                                <SuggestiveInput
                                    label="Trigger at Minute"
                                    type="text"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter Minutes"
                                    suggestions={nodessugg}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    )} */}
                    <Controller
                        name="isRecuring"
                        control={control}
                        render={({ field }) => (
                            <CheckboxField
                                label="Is Recuring"
                                checked={field.value ?? false}
                                onChange={field.onChange}
                                description="Check the box if you want Recuring"
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
                            className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition-all duration-200
                bg-blue-500 hover:bg-blue-600 transform hover:-translate-y-0.5
                       
               `}
                        >
                            Save Configuration
                        </button>
                    </div>
                </div>
            </form>
        </DialogContainer>
    );
};
// export default ScheduelModal;
