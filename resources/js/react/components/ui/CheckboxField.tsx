import React from "react";

interface Props {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export const CheckboxField = ({
  label,
  checked,
  onChange,
  description,
}: Props) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="text-sm">
        <label className="font-medium text-gray-900 dark:text-gray-300">
          {label}
        </label>
        {description && (
          <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};
