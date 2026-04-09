import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export function BackLink({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn("-ml-3", className)}
    >
      <Link
        className="flex gap-2 items-center text-sm text-muted-foreground"
        href={href}
      >
        <ArrowLeftIcon />
        {children}
      </Link>
    </Button>
  );
}
