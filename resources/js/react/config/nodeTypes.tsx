import { FiMail, FiGlobe } from "react-icons/fi";
import { FaHubspot, FaSalesforce } from "react-icons/fa";
import { FiGitBranch, FiClock } from "react-icons/fi";
import { NodeMenuItem, NODE_TYPES } from "../types";

export const nodeMenuItems: NodeMenuItem[] = [
    {
        label: "Notification",
        name: "notification",
        icon: <FiMail size={20} />,
        description: "Send Email or Slack message",
        color: "#4cafef",
        type: NODE_TYPES.NOTIFICATION,
    },
    {
        label: "HTTP Request",
        name: "http",
        icon: <FiGlobe size={20} />,
        description: "Call an API endpoint",
        color: "#f39c12",
        type: NODE_TYPES.HTTP_REQUEST,
    },
    {
        label: "HubSpot",
        name: "hubstop",
        icon: <FaHubspot size={20} />,
        description: "Integrate HubSpot CRM",
        color: "#ff7a59",
        type: NODE_TYPES.CRM,
    },
    {
        label: "Salesforce",
        name: "salesforce",
        icon: <FaSalesforce size={20} />,
        description: "Integrate Salesforce CRM",
        color: "#00a1e0",
        type: NODE_TYPES.CRM,
    },
    {
        label: "Conditions",
        name: "condition",
        icon: <FiGitBranch size={20} />,
        description: "Add conditional logic",
        color: "#8b5cf6",
        type: NODE_TYPES.CONDITION,
    },
    {
        label: "Task",
        name: "task",
        icon: <FiClock size={20} />,
        description: "Add task logic",
        color: "#8cfa3e",
        type: NODE_TYPES.TASK,
    },
];
