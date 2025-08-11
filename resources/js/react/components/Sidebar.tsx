import React from "react";
import { FiMail, FiGlobe } from "react-icons/fi";
import { FaHubspot, FaSalesforce } from "react-icons/fa";

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface SidebarProps {
  addNode: (item: MenuItemType) => void;
  onSave: () => void;
}

const menuItems: MenuItemType[] = [
  {
    label: "Notification",
    icon: <FiMail size={20} />,
    description: "Send Email or Slack message",
    color: "#4cafef",
  },
  {
    label: "HTTP Request",
    icon: <FiGlobe size={20} />,
    description: "Call an API endpoint",
    color: "#f39c12",
  },
  {
    label: "HubSpot",
    icon: <FaHubspot size={20} />,
    description: "Integrate HubSpot CRM",
    color: "#ff7a59",
  },
  {
    label: "Salesforce",
    icon: <FaSalesforce size={20} />,
    description: "Integrate Salesforce CRM",
    color: "#00a1e0",
  },
  {
    label: "Conditions",
    icon: <FaSalesforce size={20} />,
    description: "Add Conditions",
    color: "#00a1e0",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ addNode, onSave }) => {
  return (
    <div
      style={{
        width: 300,
        background: "#2c2c2c",
        borderLeft: "1px solid #444",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}>
      <h3
        style={{
          marginBottom: "12px",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}>
        Add Node
      </h3>
      <input
        type="text"
        placeholder="Search..."
        style={{
          padding: "8px",
          borderRadius: "6px",
          border: "none",
          marginBottom: "16px",
          outline: "none",
          background: "#1e1e1e",
          color: "#fff",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={() => addNode(item)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              background: "#3a3a3a",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#4a4a4a")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#3a3a3a")
            }>
            <div
              style={{
                width: 36,
                height: 36,
                background: item.color,
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
              }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontWeight: "bold" }}>{item.label}</div>
              <div style={{ fontSize: "0.85rem", color: "#ccc" }}>
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "auto", paddingTop: "16px" }}>
        <button
          onClick={onSave}
          style={{
            width: "100%",
            padding: "12px",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#45a049")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#4caf50")}>
          Save Workflow
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
