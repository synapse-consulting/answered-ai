import React from "react";
import { FiMail, FiGlobe } from "react-icons/fi";
import { FaHubspot, FaSalesforce } from "react-icons/fa";
import { FiGitBranch } from "react-icons/fi";
import { NodeMenuItem, NODE_TYPES } from "../types";

export const nodeMenuItems: NodeMenuItem[] = [
  {
    label: "Notification",
    icon: <FiMail size={20} />,
    description: "Send Email or Slack message",
    color: "#4cafef",
    type: NODE_TYPES.NOTIFICATION,
  },
  {
    label: "HTTP Request",
    icon: <FiGlobe size={20} />,
    description: "Call an API endpoint",
    color: "#f39c12",
    type: NODE_TYPES.HTTP_REQUEST,
  },
  {
    label: "HubSpot",
    icon: <FaHubspot size={20} />,
    description: "Integrate HubSpot CRM",
    color: "#ff7a59",
    type: NODE_TYPES.CRM,
  },
  {
    label: "Salesforce",
    icon: <FaSalesforce size={20} />,
    description: "Integrate Salesforce CRM",
    color: "#00a1e0",
    type: NODE_TYPES.CRM,
  },
  {
    label: "Conditions",
    icon: <FiGitBranch size={20} />,
    description: "Add conditional logic",
    color: "#8b5cf6",
    type: NODE_TYPES.CONDITION,
  },
];
