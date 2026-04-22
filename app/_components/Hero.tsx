import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
            Land your dream job with{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent text-nowrap">
              AI-powered
            </span>{" "}
            career preparation
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Skip the guesswork and accelerate your job search. Our AI platform
            eliminates interview anxiety, optimizes your resume, and gives you
            the technical edge to land offers faster.
          </p>
          <Button asChild className="h-12 px-6 text-base" size="lg">
            <Link href="/dashboard">Get Started for Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
