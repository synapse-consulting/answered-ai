import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
      <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "font-mono text-sm resize-y",
          error &&
            "border-red-300 dark:border-red-600 focus-visible:ring-red-500",
        )}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
