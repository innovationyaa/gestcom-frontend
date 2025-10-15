import React from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export function SimpleDateRangePicker({ date, setDate, className = "" }) {
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    return dateValue.toISOString().split("T")[0];
  };

  const parseDate = (dateString) => {
    if (!dateString) return undefined;
    return new Date(dateString);
  };

  const handleFromDateChange = (e) => {
    const fromDate = parseDate(e.target.value);
    setDate({
      from: fromDate,
      to: date?.to,
    });
  };

  const handleToDateChange = (e) => {
    const toDate = parseDate(e.target.value);
    setDate({
      from: date?.from,
      to: toDate,
    });
  };

  const clearDates = () => {
    setDate({ from: undefined, to: undefined });
  };

  const hasDateRange = date?.from || date?.to;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Input
        type="date"
        value={formatDate(date?.from)}
        onChange={handleFromDateChange}
        className="w-[140px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
        placeholder="Du"
      />
      <span className="text-[var(--color-foreground-muted)] text-sm">au</span>
      <Input
        type="date"
        value={formatDate(date?.to)}
        onChange={handleToDateChange}
        className="w-[140px] bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20"
        placeholder="Au"
      />
      {hasDateRange && (
        <button
          onClick={clearDates}
          className="text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors p-1"
          type="button"
          title="Effacer les dates"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
