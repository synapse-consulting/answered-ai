import React from "react";
import { ScheduelConfig, ScheduelConfigSchema } from "@/react/types";
import DialogContainer from "@/react/components/DialogContainer";
import { SelectField } from "@/react/components/ui/SelectField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReactFlow } from "@xyflow/react";

interface ConditionModalProps {
    isOpen: boolean;
    onClose: () => void;
    nodeId?: string;
    initialConfig?: ScheduelConfig;
}
const IntervalOptions = [
    { value: "seconds", label: "Seconds" },
    { value: "minutes", label: "Minutes" },
    { value: "hours", label: "Hours" },
    { value: "days", label: "Days" },
    { value: "months", label: "Months" },
];

export const ScheduelModal: React.FC<ConditionModalProps> = ({
    isOpen,
    onClose,
    nodeId,
    initialConfig,
}) => {
    const { control, handleSubmit } = useForm<ScheduelConfig>({
        resolver: zodResolver(ScheduelConfigSchema),
        defaultValues: initialConfig ?? {
            interval: "minutes",
        },
    });
    const { updateNodeData } = useReactFlow();
    const handleSave = (data: ScheduelConfig) => {
        console.log(data);
        if (nodeId) {
            updateNodeData(nodeId, {
                scheduleConfig: data,
                result: data,
                isConfigured: true,
            });
            console.log(data);
            onClose();
        }
    };

    return (
        <DialogContainer
            isOpen={isOpen}
            onClose={onClose}
            title={"Scheduel Trigger"}
            description="Configure your Scheduel logic"
            maxWidth="2xl"
        >
            <form onSubmit={handleSubmit(handleSave)}>
                <Controller
                    control={control}
                    name="interval"
                    render={({ field }) => (
                        <SelectField
                            label="Notification Type"
                            {...field}
                            options={IntervalOptions}
                            required
                        />
                    )}
                />
                <button type="submit">Save</button>
            </form>
        </DialogContainer>
    );
};
// export default ScheduelModal;
