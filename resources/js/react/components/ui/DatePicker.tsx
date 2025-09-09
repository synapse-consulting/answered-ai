import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerRenderProps } from "react-hook-form";

interface DatePickerProps {
    field: ControllerRenderProps<any, any>; // react-hook-form field
}

export function DatePicker({ field }: DatePickerProps) {
    const [open, setOpen] = React.useState(false);
    // const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [date, setDate] = React.useState<Date | undefined>(
        field.value ? new Date(field.value) : undefined
    );

    const [time, setTime] = React.useState(
        field.value
            ? new Date(field.value).toTimeString().slice(0, 8)
            : "10:30:00" // fallback
    );

    React.useEffect(() => {
        if (date && time) {
            const [hours, minutes, seconds] = time.split(":").map(Number);
            if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
                const updated = new Date(date);
                updated.setHours(hours, minutes, seconds);
                field.onChange(updated.toISOString()); // save ISO string
            }
        }
    }, [date, time]);

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                    Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="w-full justify-between font-normal"
                        >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="min-w-full overflow-hidden p-0"
                        align="start"
                    >
                        <Calendar
                            className="w-full"
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(d) => {
                                setDate(d || undefined);
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                    Time
                </Label>
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    );
}
