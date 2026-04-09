"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const themes = [
  {
    Icon: Sun,
    name: "Light",
    value: "light",
  },
  {
    Icon: Moon,
    name: "Dark",
    value: "dark",
  },
  {
    Icon: Monitor,
    name: "System",
    value: "system",
  },
] as const;

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {resolvedTheme === "dark" ? <Moon /> : <Sun />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ name, Icon, value }) => (
          <DropdownMenuItem
            className={cn(
              "cursor-pointer",
              theme === value && "bg-accent text-accent-foreground",
            )}
            key={value}
            onClick={() => setTheme(value)}
          >
            <Icon className="size-4" />
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
