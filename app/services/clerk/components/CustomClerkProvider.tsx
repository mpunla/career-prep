import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

export function CustomClerkProivider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        cssLayerName: "vendor",
        variables: {
          borderRadius: "var(--radius-md)",
          colorBackground: "var(--color-background)",
          colorBorder: "var(--color-secondary-foreground)",
          colorDanger: "var(--color-destructive)",
          colorForeground: "var(--color-foreground)",
          colorInput: "var(--color-input)",
          colorInputForeground: "var(--color-text)",
          colorMuted: "var(--color-muted)",
          colorMutedForeground: "var(--color-muted-foreground)",
          colorNeutral: "var(--color-secondary-foreground)",
          colorPrimary: "var(--color-primary)",
          colorPrimaryForeground: "var(--color-primary-foreground)",
          colorRing: "var(--color-ring)",
          colorShadow: "var(--color-shadow-color)",
          colorSuccess: "var(--color-primary)",
          colorWarning: "var(--color-warning)",
          fontFamily: "var(--font-sans)",
          fontFamilyButtons: "var(--font-sans)",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
