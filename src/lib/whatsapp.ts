import { siteConfig } from "@/lib/seo/siteConfig";

// WhatsApp Cloud API helpers. If credentials aren't configured, these no-op so
// the checkout flow still works in development.

interface Customer {
  name: string;
  phone: string;
}

// Send a plain-text WhatsApp message to a recipient number (digits only).
export async function sendWhatsApp(to: string, message: string): Promise<boolean> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) {
    console.info("[whatsapp] not configured — skipping message:", message);
    return false;
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to.replace(/[^0-9]/g, ""),
        type: "text",
        text: { body: message },
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[whatsapp] send failed", err);
    return false;
  }
}

// Notify the store owner that a new order was placed.
export async function notifyOrder(reference: string, customer: Customer, total: number): Promise<void> {
  const owner = siteConfig.contact.whatsapp;
  const message = `🛒 New order ${reference}\n${customer.name} · ${customer.phone}\nTotal: Rs. ${total.toLocaleString("en-US")}`;
  await sendWhatsApp(owner, message);
}
