import type { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      // Convex injects this from deployment env (Dashboard or `convex env set`).
      // biome-ignore lint/style/noNonNullAssertion: required by Convex auth config typing
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
