import { SignInButton, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div>
      <SignInButton />
      <UserButton />
    </div>
  );
}
