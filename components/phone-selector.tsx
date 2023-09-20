"use client";

import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { FormControl } from "./ui/form";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export type TCountriesCode = {
  label: string;
  value: string;
};

type PhoneSelectorProps = {
  value: string;
  setValue: (value: string) => void;
  countries: TCountriesCode[];
  defaultIndex?: number;
};

const PhoneSelector = ({
  value,
  setValue,
  countries,
  defaultIndex = 0,
}: PhoneSelectorProps) => {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(defaultIndex);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-28 justify-between",
              !value && "text-muted-foreground"
            )}
          >
            {value}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandEmpty>Empty!</CommandEmpty>
          <CommandGroup className="max-h-[40vh] overflow-y-auto">
            {countries.map((contr, _index) => (
              <CommandItem
                value={contr.label}
                key={_index}
                onSelect={() => {
                  setValue(contr.value);
                  setIndex(_index);
                  setOpen(false);
                }}
              >
                {contr.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    _index === index ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PhoneSelector;
