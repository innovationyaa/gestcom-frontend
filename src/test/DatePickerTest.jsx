import * as React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function DatePickerTest() {
  const [date, setDate] = React.useState({
    from: undefined,
    to: undefined,
  });
  const [singleDate, setSingleDate] = React.useState();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            shadcn/ui Date Picker Test
          </h1>
          <p className="text-muted-foreground mb-8">
            Testing the date range picker component to ensure it matches the
            shadcn/ui documentation styling.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Date Range Picker from Documentation */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Date Range Picker (Documentation Pattern)
            </h2>
            <DatePickerWithRange date={date} setDate={setDate} />
            <div className="p-4 bg-muted rounded-lg">
              <pre className="text-sm">{JSON.stringify(date, null, 2)}</pre>
            </div>
          </div>

          {/* Manual Implementation */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Manual Date Range Picker</h2>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date?.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "dd LLL y", { locale: fr })} -{" "}
                          {format(date.to, "dd LLL y", { locale: fr })}
                        </>
                      ) : (
                        format(date.from, "dd LLL y", { locale: fr })
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Single Date Picker */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Single Date Picker</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !singleDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {singleDate ? (
                    format(singleDate, "dd LLL y", { locale: fr })
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={singleDate}
                  onSelect={setSingleDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Component Tests */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Component Style Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Button Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Calendar Standalone</h3>
                <div className="border rounded-md p-3 inline-block bg-popover">
                  <Calendar
                    mode="single"
                    selected={singleDate}
                    onSelect={setSingleDate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
