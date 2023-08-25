import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "preact/hooks";

import { cn } from "netzo/ui/components/utils.ts";
import { Button } from "netzo/ui/components/ui/button.tsx";
import { Calendar } from "netzo/ui/components/ui/calendar.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "netzo/ui/components/ui/popover.tsx";

export default () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};