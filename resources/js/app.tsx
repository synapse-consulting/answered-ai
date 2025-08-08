import React from 'react';
import ReactDOM from 'react-dom/client';
import WorkflowPage from './Pages/WorkflowPage';

const rootEl = document.getElementById('react-root');

if (rootEl) {
    ReactDOM.createRoot(rootEl).render(
        <React.StrictMode>
            <WorkflowPage />
        </React.StrictMode>
    );
}
