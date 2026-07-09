import { env } from "@/data/env/server";
import { TEST_ARCJET_KEY } from "@/lib/arcjet";
import arcjet, { detectBot, shield, slidingWindow } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhooks(.*)",
  "/sign-in(.*)",
]);

const aj = arcjet({
  key: env.ARCJET_KEY,
  rules: [
    detectBot({
      allow: ["CATEGORY:MONITOR", "CATEGORY:PREVIEW", "CATEGORY:SEARCH_ENGINE"],
      mode: "LIVE",
    }),
    shield({ mode: "LIVE" }),
    slidingWindow({
      interval: "1m",
      max: 100,
      mode: "LIVE",
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  const isArcjetEnabled = env.ARCJET_KEY !== TEST_ARCJET_KEY
  if (isArcjetEnabled) {
    console.log('**** Using Arcjet')
    console.log('**** Using Arcjet')
    console.log('**** Using Arcjet')
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      return new Response("Access denied", { status: 403 });
    }
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
