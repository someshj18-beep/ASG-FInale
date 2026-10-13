
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
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        { error: "Email service is not configured. Please check Vercel environment variables." },
        { status: 503 }
      );
    }

    const isVerification = formType === "verification";

    const emailBody = [
      `Form: ${isVerification ? "Employee Verification" : "Contact Enquiry"}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Organisation: ${company || "Not provided"}`,
      `Interest: ${interest || "Not provided"}`,
      `Employee Name: ${employeeName || "Not provided"}`,
      `Employee ID: ${employeeId || "Not provided"}`,
      `Verification Purpose: ${purpose || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const response = await fetch(
      "https://api.resend.com/emails",
      {
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
            ? `Employee Verification Request - ${employeeName || name}`
            : `Website Enquiry - ${interest || "General Enquiry"}`,
          text: emailBody,
        }),
      }
    );

    if (!response.ok) {
      console.error("Email delivery error:", await response.text());

      return NextResponse.json(
        { error: "Unable to send your enquiry. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 400 }
    );
  }
}
