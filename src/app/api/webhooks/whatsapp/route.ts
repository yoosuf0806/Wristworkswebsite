import { NextResponse } from "next/server";

// WhatsApp Cloud API webhook.
// GET  — verification handshake (Meta calls this when you register the webhook).
// POST — inbound message / status events. Extend to route enquiries to your CRM.

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge || "", { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Meta wraps events in entry[].changes[].value. Inbound messages arrive under
  // value.messages; delivery/read receipts under value.statuses.
  try {
    const changes = body?.entry?.[0]?.changes?.[0]?.value;
    const messages = changes?.messages;
    if (Array.isArray(messages)) {
      for (const m of messages) {
        console.info("[whatsapp] inbound from", m.from, "-", m.text?.body ?? m.type);
        // TODO: persist enquiry / forward to team. Kept minimal here.
      }
    }
  } catch (err) {
    console.error("[whatsapp] webhook parse error", err);
  }

  // Always 200 quickly so Meta doesn't retry.
  return NextResponse.json({ received: true });
}
