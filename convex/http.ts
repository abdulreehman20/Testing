import { Webhook } from "svix";
import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

type ClerkEmailAddress = {
  id: string;
  email_address: string;
};

type ClerkUserPayload = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  email_addresses?: ClerkEmailAddress[];
  primary_email_address_id?: string | null;
};

function displayNameFromClerkUser(data: ClerkUserPayload): string {
  const parts = [data.first_name, data.last_name].filter(
    (p): p is string => typeof p === "string" && p.length > 0,
  );
  if (parts.length > 0) {
    return parts.join(" ");
  }
  if (data.username) {
    return data.username;
  }
  return "Clerk user";
}

/** Primary email from Clerk webhook user payload (matches Clerk User JSON). */
function primaryEmailFromClerkUser(data: ClerkUserPayload): string | undefined {
  const addresses = data.email_addresses;
  if (!Array.isArray(addresses) || addresses.length === 0) {
    return undefined;
  }
  const primaryId = data.primary_email_address_id;
  if (primaryId) {
    const primary = addresses.find((e) => e.id === primaryId);
    if (primary?.email_address) {
      return primary.email_address;
    }
  }
  const first = addresses[0];
  return typeof first?.email_address === "string" &&
    first.email_address.length > 0
    ? first.email_address
    : undefined;
}

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
      return new Response("Missing CLERK_WEBHOOK_SECRET in Convex env", {
        status: 500,
      });
    }

    const svixId = request.headers.get("svix-id");
    const svixTimestamp = request.headers.get("svix-timestamp");
    const svixSignature = request.headers.get("svix-signature");
    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response("Missing Svix headers", { status: 400 });
    }

    const payload = await request.text();
    let evt: { type: string; data: ClerkUserPayload };
    try {
      const wh = new Webhook(secret);
      evt = wh.verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as { type: string; data: ClerkUserPayload };
    } catch {
      return new Response("Invalid signature", { status: 400 });
    }

    const { type, data } = evt;

    switch (type) {
      case "user.created":
      case "user.updated": {
        const name = displayNameFromClerkUser(data);
        const email = primaryEmailFromClerkUser(data);
        await ctx.runMutation(internal.users.upsertFromClerk, {
          externalId: data.id,
          name,
          ...(email !== undefined ? { email } : {}),
        });
        break;
      }
      case "user.deleted": {
        await ctx.runMutation(internal.users.deleteFromClerk, {
          externalId: data.id,
        });
        break;
      }
      default: {
        break;
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

export default http;
