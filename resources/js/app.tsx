import React from "react";
import ReactDOM from "react-dom/client";
import WorkflowPage from "./react/Pages/WorkflowPage";
import "@xyflow/react/dist/style.css";
import "../css/app.css";
import { ReactFlowProvider } from "@xyflow/react";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const rootEl = document.getElementById("react-root");
const queryClient = new QueryClient();

if (rootEl) {
    ReactDOM.createRoot(rootEl).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <ReactFlowProvider>
                    <Toaster position="bottom-right" theme="dark" richColors />
                    <WorkflowPage />
                </ReactFlowProvider>
            </QueryClientProvider>
        </React.StrictMode>
    );
}
