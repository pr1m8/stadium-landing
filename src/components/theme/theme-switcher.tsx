"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { themes } from "@/lib/design/themes";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Select Theme" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(themes).flatMap(([key, value]) => [
          <SelectItem key={`${key}-light`} value={value.lightClass}>
            {value.name} (Light)
          </SelectItem>,
          <SelectItem key={`${key}-dark`} value={value.darkClass}>
            {value.name} (Dark)
          </SelectItem>,
        ])}
      </SelectContent>
    </Select>
  );
}
