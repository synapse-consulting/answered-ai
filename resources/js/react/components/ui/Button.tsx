import React from "react";
import { cn } from "../../utils/cn";

// Button variant types
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const buttonVariants = {
  primary:
    "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
  secondary:
    "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm",
  danger:
    "bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
  ghost:
    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
};

const disabledVariants = {
  primary: "bg-gray-400 cursor-not-allowed text-white",
  secondary:
    "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-700 cursor-not-allowed",
  danger: "bg-gray-400 cursor-not-allowed text-white",
  ghost: "text-gray-400 dark:text-gray-600 cursor-not-allowed",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  children,
  className,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  const baseClasses =
    "font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 inline-flex items-center justify-center";

  const variantClasses = isDisabled
    ? disabledVariants[variant]
    : buttonVariants[variant];

  const sizeClasses = buttonSizes[size];

  const buttonClasses = cn(baseClasses, variantClasses, sizeClasses, className);

  return (
    <button {...props} disabled={isDisabled} className={buttonClasses}>
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};
