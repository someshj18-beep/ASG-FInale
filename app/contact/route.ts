import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      company,
      interest,
      employeeName,
      employeeId,
      purpose,
      message,
      formType,
    } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      console.error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL environment variable.");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the website administrator." },
        { status: 503 }
      );
    }

    const isVerification = formType === "verification";
    const details = [
      `Form: ${isVerification ? "Employee Verification" : "Contact Enquiry"}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Organisation: ${company || "Not provided"}`,
      `Interest: ${interest || "Not provided"}`,
      `Employee name: ${employeeName || "Not provided"}`,
      `Employee ID: ${employeeId || "Not provided"}`,
      `Verification purpose: ${purpose || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: ["Menka@arctic-staffing-global.com"],
        reply_to: email,
        subject: isVerification
          ? `Employee Verification Request — ${employeeName || name}`
          : `Website Enquiry — ${interest || "General Enquiry"}`,
        text: details,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend email error:", errorText);
      return NextResponse.json(
        { error: "We could not send your enquiry right now. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Invalid request. Please refresh and try again." },
      { status: 400 }
    );
  }
}
