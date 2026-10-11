export type ConsultationLeadInput = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  websiteUrl: string | null;
  message: string | null;
};

export async function saveConsultationLead(input: ConsultationLeadInput) {
  if (process.env.VERCEL) {
    const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();

    if (!webhookUrl) {
      throw new Error(
        "LEAD_WEBHOOK_URL is required when the consultation form runs on Vercel.",
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...input,
        source: "digigrow-consultation-landing-page",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Lead webhook returned ${response.status}.`);
    }

    return { id: crypto.randomUUID() };
  }

  const [{ getDb }, { consultationLeads }] = await Promise.all([
    import("@/db"),
    import("@/db/schema"),
  ]);
  const db = getDb();
  const [lead] = await db
    .insert(consultationLeads)
    .values(input)
    .returning({ id: consultationLeads.id });

  return lead;
}
