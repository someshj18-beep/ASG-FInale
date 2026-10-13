import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, interest, employeeName, employeeId, purpose, message, formType } = body ?? {};
    if (!name || !email || !message) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    if (typeof message !== "string" || message.length > 5000) return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "The enquiry service is not configured yet. Please try again later." }, { status: 503 });
    const verification = formType === "verification";
    const subject = verification ? `Employee verification request — ${employeeName || name}` : `Website enquiry — ${interest || "General enquiry"}`;
    const lines = [
      `Form: ${verification ? "Employee Verification" : "Contact Enquiry"}`,
      `Name: ${name}`, `Email: ${email}`, `Organisation: ${company || "Not provided"}`,
      `Interest: ${interest || "Not applicable"}`, `Employee name: ${employeeName || "Not provided"}`,
      `Employee ID: ${employeeId || "Not provided"}`, `Verification purpose: ${purpose || "Not applicable"}`,
      "", "Message:", message
    ];
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Arctic Staffing Global Website <website@resend.dev>",
        to: ["Menka@arctic-staffing-global.com"],
        reply_to: email,
        subject,
        text: lines.join("\n")
      })
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("Email provider error", error);
      return NextResponse.json({ error: "We couldn’t send your message right now. Please try again later." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request. Please refresh and try again." }, { status: 400 });
  }
}
