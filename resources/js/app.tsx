import React from "react";
import ReactDOM from "react-dom/client";
import WorkflowPage from "./react/Pages/WorkflowPage";
import "@xyflow/react/dist/style.css";
import "../css/app.css";
import { ReactFlowProvider } from "@xyflow/react";
import { Toaster } from "sonner";

const rootEl = document.getElementById("react-root");

if (rootEl) {
    ReactDOM.createRoot(rootEl).render(
        <React.StrictMode>
            <ReactFlowProvider>
                <Toaster position="bottom-right" theme="dark" richColors />
                <WorkflowPage />
            </ReactFlowProvider>
        </React.StrictMode>
    );
}
