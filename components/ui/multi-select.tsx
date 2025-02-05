"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Option = {
  value: string;
  label: string;
};
interface MultiSelectProps {
  name: string;
  values: Option[];
  isLoading?: boolean;
}
export function MultiSelect({
  name,
  values,
  isLoading = true,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const toggleValue = (value: string) => {
    setSelectedValues((current) =>
      current.includes(value)
        ? current.filter((f) => f !== value)
        : [...current, value],
    );
  };

  return (
    <div>
      {/* Hidden input to support native form submission */}
      {selectedValues.map((value) => (
        <input key={value} type="hidden" name={name} value={value} />
      ))}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : selectedValues.length > 0 ? (
              `${selectedValues.length} selected`
            ) : (
              "Select Value..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search equipment..." />
            <CommandList>
              <CommandEmpty>No equipment found.</CommandEmpty>
              <CommandGroup>
                {values.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={toggleValue}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
