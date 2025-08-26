import React, { useState } from "react";
import { HttpRequestModal } from "./HttpRequestModal";
import { HttpRequestRjsfModal } from "./HttpRequestRjsfModal";
import { CustomButton as Button } from "../../components/ui/Button";
import { HttpConfig } from "./types";

/**
 * Example component demonstrating both HttpRequest modal implementations
 * - Original custom modal (HttpRequestModal)
 * - New RJSF-based modal (HttpRequestRjsfModal)
 */
export const HttpRequestModalExample: React.FC = () => {
  const [showOriginalModal, setShowOriginalModal] = useState(false);
  const [showRjsfModal, setShowRjsfModal] = useState(false);

  // Example initial configuration for both modals
  const exampleConfig: HttpConfig = {
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    queryParams: [{ key: "userId", value: "1" }],
    headers: [{ key: "Accept", value: "application/json" }],
    auth: {
      type: "none",
    },
    options: {
      followRedirects: true,
      verifySSL: true,
    },
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        HTTP Request Modal Examples
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Modal */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Original Custom Modal</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            The existing HttpRequestModal with custom form components and
            validation logic.
          </p>
          <Button variant="primary" onClick={() => setShowOriginalModal(true)}>
            Open Original Modal
          </Button>
        </div>

        {/* RJSF Modal */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">RJSF-Based Modal</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            The new data-driven modal using React JSON Schema Form library for
            automatic form generation.
          </p>
          <Button variant="primary" onClick={() => setShowRjsfModal(true)}>
            Open RJSF Modal
          </Button>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Features Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Feature
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Original Modal
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  RJSF Modal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2 text-sm">Form Generation</td>
                <td className="px-4 py-2 text-sm">Manual components</td>
                <td className="px-4 py-2 text-sm">Schema-driven</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">Validation</td>
                <td className="px-4 py-2 text-sm">Custom validation logic</td>
                <td className="px-4 py-2 text-sm">JSON Schema validation</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">Maintainability</td>
                <td className="px-4 py-2 text-sm">Requires code changes</td>
                <td className="px-4 py-2 text-sm">Configuration-based</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm">Customization</td>
                <td className="px-4 py-2 text-sm">Full control</td>
                <td className="px-4 py-2 text-sm">UI Schema + themes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <HttpRequestModal
        isOpen={showOriginalModal}
        onClose={() => setShowOriginalModal(false)}
        nodeId="example-node-1"
        initialConfig={exampleConfig}
      />

      <HttpRequestRjsfModal
        isOpen={showRjsfModal}
        onClose={() => setShowRjsfModal(false)}
        nodeId="example-node-2"
        initialConfig={exampleConfig}
      />
    </div>
  );
};
