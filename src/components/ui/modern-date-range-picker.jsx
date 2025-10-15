import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export function ModernDateRangePicker({ date, setDate, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert our date format to react-date-range format
  const dateRange = [
    {
      startDate: date?.from || new Date(),
      endDate: date?.to || new Date(),
      key: "selection",
    },
  ];

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDate({
      from: startDate,
      to: endDate,
    });
  };

  const clearDates = (e) => {
    e.stopPropagation();
    setDate({ from: undefined, to: undefined });
  };

  const formatDateRange = () => {
    if (!date?.from) return "Sélectionner une période";

    if (date.from && date.to) {
      return `${format(date.from, "dd MMM", { locale: fr })} - ${format(date.to, "dd MMM", { locale: fr })}`;
    }

    return format(date.from, "dd MMM yyyy", { locale: fr });
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[200px] justify-start text-left font-normal bg-[var(--color-surface)] border-[var(--color-border)] focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/20 hover:bg-[var(--color-surface)]"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-[var(--color-foreground-muted)]" />
            <span className="text-[var(--color-foreground)] truncate">
              {formatDateRange()}
            </span>
            {date?.from && (
              <X
                className="ml-auto h-4 w-4 text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] flex-shrink-0"
                onClick={clearDates}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-[var(--color-surface)] border-[var(--color-border)]"
          align="start"
        >
          <div className="modern-date-picker">
            <DateRangePicker
              ranges={dateRange}
              onChange={handleSelect}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              direction="horizontal"
              preventSnapRefocus={true}
              calendarFocus="forwards"
              locale={fr}
              showDateDisplay={false}
              showMonthAndYearPickers={false}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
