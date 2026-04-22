import { HomeNavbar } from "@/app/_components/HomeNavbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-linear-to-b from-background to-muted/20">
      <HomeNavbar />
      <div className="flex flex-col h-screen-header justify-center items-center">
        <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
          Not Found
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Could not find requested resource
        </p>
        <Button asChild className="h-12 px-6 text-base" size="lg">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
