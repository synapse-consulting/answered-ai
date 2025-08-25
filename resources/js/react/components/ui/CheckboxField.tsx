import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  const id = React.useId();

  return (
    <div className="flex items-start space-x-3">
      <div className="flex items-center h-5">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(checked) => onChange(checked === true)}
        />
      </div>
      <div className="text-sm">
        <Label
          htmlFor={id}
          className="font-medium text-gray-900 dark:text-gray-300">
          {label}
        </Label>
        {description && (
          <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};
