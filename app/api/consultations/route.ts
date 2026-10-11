import { getDb } from "@/db";
import { consultationLeads } from "@/db/schema";

export const dynamic = "force-dynamic";

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    if (clean(body.nickname, 100)) return Response.json({ ok: true }, { status: 201 });
    const fullName = clean(body.fullName, 120);
    const email = clean(body.email, 254).toLowerCase();
    const whatsapp = clean(body.whatsapp, 40);
    const businessName = clean(body.businessName, 160);
    const websiteUrl = clean(body.websiteUrl, 500);
    const message = clean(body.message, 1500);

    if (!fullName || !businessName || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) return Response.json({ error: "Please enter a valid WhatsApp number." }, { status: 400 });
    if (websiteUrl) {
      try { new URL(/^https?:\/\//i.test(websiteUrl) ? websiteUrl : `https://${websiteUrl}`); }
      catch { return Response.json({ error: "Please enter a valid website URL." }, { status: 400 }); }
    }

    const db = getDb();
    const [lead] = await db.insert(consultationLeads).values({ fullName, email, whatsapp, businessName, websiteUrl: websiteUrl || null, message: message || null }).returning({ id: consultationLeads.id });
    return Response.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Consultation form submission failed", error);
    return Response.json({ error: "Unable to submit your request right now." }, { status: 500 });
  }
}
