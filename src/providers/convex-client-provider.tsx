"use client";

import { useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useMemo, type ReactNode } from "react";

function missingConvexUrlMessage() {
  return [
    "Missing NEXT_PUBLIC_CONVEX_URL in .env.local.",
    "Run: bunx convex login",
    "Then: bunx convex dev --configure existing --dev-deployment cloud",
    "(The CLI will fill CONVEX_DEPLOYMENT and NEXT_PUBLIC_CONVEX_* for a hosted dev deployment, not localhost:3210.)",
  ].join(" ");
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();

  const client = useMemo(() => {
    if (!convexUrl) {
      return null;
    }

    return new ConvexReactClient(convexUrl);
  }, [convexUrl]);

  if (!client) {
    throw new Error(missingConvexUrlMessage());
  }

  return (
    <ConvexProviderWithClerk client={client} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
