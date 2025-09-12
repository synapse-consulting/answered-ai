import React, { useState, useRef, useEffect } from "react";
import { Suggestion } from "../../utils/jsonTraverser";
import { FormField } from "./FormField";

interface SuggestiveInputProps {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "password" | "email" | "url";
    required?: boolean;
    error?: string;
    suggestions?: Suggestion[];
}

export const SuggestiveInput: React.FC<SuggestiveInputProps> = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    error = "",
    suggestions = [],
}) => {
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [currentPath, setCurrentPath] = useState<Suggestion[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
                setCurrentPath([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentSuggestions =
        currentPath.length > 0
            ? currentPath[currentPath.length - 1].children || []
            : suggestions;

    const handleSuggestionClick = (suggestion: Suggestion) => {
        if (suggestion.children) {
            setCurrentPath([...currentPath, suggestion]);
        } else {
            const fullPath = [...currentPath, suggestion]
                .map((s) => s.value)
                .join(".");
            onChange("{{" + fullPath + "}}");
            setShowSuggestions(false);
            setCurrentPath([]);
        }
    };

    return (
        <div ref={wrapperRef} className="relative">
            <div>
                <FormField
                    label={label}
                    value={value}
                    onChange={(newValue: string) => {
                        onChange(newValue);
                        if (newValue.includes("{{")) {
                            setShowSuggestions(true);
                        } else {
                            setShowSuggestions(false);
                        }
                    }}
                    placeholder={placeholder}
                    type={type}
                    required={required}
                    error={error}
                />
            </div>
            {showSuggestions && (
                <div
                    className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 border border-gray-200 
          dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto"
                >
                    {/* Breadcrumb navigation */}
                    {currentPath.length > 0 && (
                        <div className="flex items-center space-x-2 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                            <button
                                className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                                onClick={() => setCurrentPath([])}
                                type="button"
                            >
                                Root
                            </button>
                            {currentPath.map((item, index) => (
                                <React.Fragment key={index}>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        /
                                    </span>
                                    <button
                                        type="button"
                                        className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                                        onClick={() =>
                                            setCurrentPath(
                                                currentPath.slice(0, index + 1)
                                            )
                                        }
                                    >
                                        {item.label}
                                    </button>
                                </React.Fragment>
                            ))}
                        </div>
                    )}

                    {/* Suggestions list */}
                    <div className="py-1">
                        {currentSuggestions.map((suggestion, index) => (
                            <button
                                type="button"
                                key={index}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 
                  transition-colors duration-150 flex items-center justify-between"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSuggestionClick(suggestion);
                                }}
                            >
                                <span
                                    className={
                                        suggestion.children
                                            ? "text-gray-900 dark:text-gray-100 font-medium"
                                            : "text-gray-700 dark:text-gray-300"
                                    }
                                >
                                    {suggestion.label}
                                </span>
                                {suggestion.children && (
                                    <span className="text-gray-400 dark:text-gray-500">
                                        →
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
