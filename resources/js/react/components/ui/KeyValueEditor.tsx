import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyValuePair } from "../../types";

interface Props {
    label: string;
    items: KeyValuePair[];
    onAdd: () => void;
    onUpdate: (index: number, field: "key" | "value", value: string) => void;
    onRemove: (index: number) => void;
    keyPlaceholder?: string;
    valuePlaceholder?: string;
}

export const KeyValueEditor = ({
    label,
    items,
    onAdd,
    onUpdate,
    onRemove,
    keyPlaceholder = "Key",
    valuePlaceholder = "Value",
}: Props) => {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </Label>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onAdd}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 
            dark:hover:text-blue-300 font-medium h-auto p-1"
                >
                    + Add {label.slice(0, -1)}
                </Button>
            </div>

            {items.length > 0 ? (
                <div className="space-y-2">
                    {items.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <Input
                                type="text"
                                value={item.key}
                                onChange={(e) =>
                                    onUpdate(index, "key", e.target.value)
                                }
                                placeholder={keyPlaceholder}
                                className="flex-1"
                            />
                            <Input
                                type="text"
                                value={item.value}
                                onChange={(e) =>
                                    onUpdate(index, "value", e.target.value)
                                }
                                placeholder={valuePlaceholder}
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => onRemove(index)}
                                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 
                  dark:hover:text-red-400 h-auto"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No {label.toLowerCase()} added yet. Click "Add{" "}
                    {label.slice(0, -1)}" to get started.
                </p>
            )}
        </div>
    );
};
