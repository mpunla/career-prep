import { GithubIcon } from "@/components/GithubIcon";

export function Footer() {
  return (
    <footer className="py-6 bg-card border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
          <p className="text-muted-foreground">
            Empowering your job journey with AI-powered career preparation
            tools.
          </p>
          <a
            className="flex flex-row gap-1 h-6 items-center justify-center text-center text-muted-foreground"
            href="https://github.com/mpunla"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="fill-primary" /> mpunla
          </a>
        </div>
      </div>
    </footer>
  );
}
