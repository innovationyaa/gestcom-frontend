import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DetailModal({
  isOpen,
  onClose,
  title,
  children,
  size = "default", // default, large, xl
}) {
  const getSizeClass = () => {
    switch (size) {
      case "large":
        return "max-w-4xl";
      case "xl":
        return "max-w-6xl";
      default:
        return "max-w-2xl";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {" "}
      <DialogContent
        className={`${getSizeClass()} max-h-[90vh] overflow-y-auto bg-[var(--color-surface)] border-[var(--color-border)]`}
      >
        <DialogHeader className="pb-4 border-b border-[var(--color-border)]">
          <DialogTitle className="text-lg font-semibold text-[var(--color-foreground)]">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="pt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
