import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: keyof typeof maxWidthClasses;
  showCloseButton?: boolean;
}

export default function DialogContainer({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "2xl",
  showCloseButton = true,
}: Props) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 
            shadow-2xl transition-all duration-300 w-full ${maxWidthClasses[maxWidth]} 
            animate-in zoom-in-95 fade-in duration-300`}
          onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          {(title || description || showCloseButton) && (
            <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700">
              {(title || description) && (
                <div className="flex-1">
                  {title && (
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {description}
                    </p>
                  )}
                </div>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="ml-4 rounded-lg p-1 text-gray-400 hover:text-gray-600 
                    dark:hover:text-gray-300 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 transition-colors duration-200"
                  onClick={onClose}>
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );

  // Use dedicated modal root if available, otherwise fall back to document body
  const modalRoot = document.getElementById("modal-root") || document.body;
  return createPortal(modalContent, modalRoot);
}
