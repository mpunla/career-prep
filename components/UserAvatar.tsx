import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ComponentProps } from "react";

export function UserAvatar({
  user,
  ...props
}: {
  user: { name: string; imageUrl: string };
} & ComponentProps<typeof Avatar>) {
  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
  return (
    <Avatar {...props}>
      <AvatarImage alt={initials} src={user.imageUrl} />
      <AvatarFallback className="uppercase">{initials}</AvatarFallback>
    </Avatar>
  );
}
