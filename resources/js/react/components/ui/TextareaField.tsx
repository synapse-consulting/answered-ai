import React from "react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
}

export const TextareaField = ({
  label,
  value,
  onChange,
  placeholder = "Enter your text here...",
  rows = 4,
  required = false,
  error = "",
}: Props) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2 bg-white dark:bg-gray-900 border rounded-lg shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          transition-colors duration-200 font-mono text-sm resize-y ${
            error
              ? "border-red-300 dark:border-red-600"
              : "border-gray-300 dark:border-gray-700"
          }`}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
