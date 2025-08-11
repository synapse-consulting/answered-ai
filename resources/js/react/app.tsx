import React from "react";
import ReactDOM from "react-dom/client";
import WorkflowPage from "./Pages/WorkflowPage";
import "reactflow/dist/style.css";
import "@xyflow/react/dist/style.css";
import "../../css/app.css";

const rootEl = document.getElementById("react-root");

if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <WorkflowPage />
    </React.StrictMode>,
  );
}
