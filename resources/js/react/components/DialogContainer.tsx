import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const maxWidthClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  maxWidth?: keyof typeof maxWidthClasses;
  showCloseButton?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function DialogContainer({
  isOpen,
  onClose,
  title,
  description,
  maxWidth = "2xl",
  showCloseButton = true,
  children,
  footer,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          maxWidthClasses[maxWidth],
          "max-h-[90vh] flex flex-col p-0",
        )}
        showCloseButton={showCloseButton}>
        {/* Header */}
        {(title || description) && (
          <DialogHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
            {title && (
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-background">
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
