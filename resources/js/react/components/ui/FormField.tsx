import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "password" | "email" | "url";
    required?: boolean;
    error?: string;
}

export const FormField = ({
    label,
    value,
    onChange,
    placeholder = "Enter your text here...",
    type = "text",
    required = false,
    error = "",
}: Props) => {
    return (
        <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    error &&
                        "border-red-300 dark:border-red-600 focus-visible:ring-red-500"
                )}
            />
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
};
