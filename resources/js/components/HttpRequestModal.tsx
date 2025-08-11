import React, { useState } from 'react';

interface HttpRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: any) => void;
}

export default function HttpRequestModal({ isOpen, onClose, onSave }: HttpRequestModalProps) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('http://example.com/index.html');
  const [hasQueryParams, setHasQueryParams] = useState(false);
  const [hasHeaders, setHasHeaders] = useState(false);
  const [hasBody, setHasBody] = useState(false);

  console.log('Modal render:', { isOpen });
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto"
        style={{ position: 'relative', zIndex: 1001 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">HTTP Request Configuration</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Method Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
            </select>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter URL"
            />
          </div>

          {/* Authentication */}
          <div>
            <label className="block text-sm font-medium mb-1">Authentication</label>
            <select className="w-full p-2 border rounded-lg">
              <option>None</option>
              <option>Basic Auth</option>
              <option>Bearer Token</option>
            </select>
          </div>

          {/* Query Parameters Toggle */}
          <div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hasQueryParams}
                onChange={(e) => setHasQueryParams(e.target.checked)}
                id="queryParams"
              />
              <label htmlFor="queryParams" className="text-sm font-medium">
                Send Query Parameters
              </label>
            </div>
            {hasQueryParams && (
              <div className="mt-2 p-3 border rounded-lg">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Key"
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    className="flex-1 p-2 border rounded"
                  />
                  <button className="px-3 py-2 bg-gray-100 rounded">+</button>
                </div>
              </div>
            )}
          </div>

          {/* Headers Toggle */}
          <div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hasHeaders}
                onChange={(e) => setHasHeaders(e.target.checked)}
                id="headers"
              />
              <label htmlFor="headers" className="text-sm font-medium">
                Send Headers
              </label>
            </div>
            {hasHeaders && (
              <div className="mt-2 p-3 border rounded-lg">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Key"
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    className="flex-1 p-2 border rounded"
                  />
                  <button className="px-3 py-2 bg-gray-100 rounded">+</button>
                </div>
              </div>
            )}
          </div>

          {/* Body Toggle */}
          <div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hasBody}
                onChange={(e) => setHasBody(e.target.checked)}
                id="body"
              />
              <label htmlFor="body" className="text-sm font-medium">
                Send Body
              </label>
            </div>
            {hasBody && (
              <div className="mt-2">
                <select className="w-full p-2 border rounded-lg mb-2">
                  <option>none</option>
                  <option>application/json</option>
                  <option>application/x-www-form-urlencoded</option>
                  <option>multipart/form-data</option>
                  <option>text/plain</option>
                </select>
                <textarea
                  className="w-full p-2 border rounded-lg h-32"
                  placeholder="Request body"
                />
              </div>
            )}
          </div>

          {/* Options */}
          <div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="followRedirects" />
                <label htmlFor="followRedirects" className="text-sm">
                  Follow redirects
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="rejectUnauthorized" />
                <label htmlFor="rejectUnauthorized" className="text-sm">
                  Verify SSL certificates
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave({ method, url })}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
