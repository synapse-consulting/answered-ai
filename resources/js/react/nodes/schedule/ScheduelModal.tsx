import React from "react";
import { ScheduelConfig } from "@/react/types";
import DialogContainer from "@/react/components/DialogContainer";

interface ConditionModalProps {
    isOpen: boolean;
    onClose: () => void;
    nodeId?: string;
    initialConfig?: ScheduelConfig;
}

export const ScheduelModal: React.FC<ConditionModalProps> = ({
    isOpen,
    onClose,
    nodeId,
    initialConfig,
}) => {
    return (
        <DialogContainer
            isOpen={isOpen}
            onClose={onClose}
            title={"Scheduel Trigger"}
            description="Configure your Scheduel logic"
            maxWidth="2xl"
        >
            <div>asdasdasdas</div>
        </DialogContainer>
    );
};
// export default ScheduelModal;
